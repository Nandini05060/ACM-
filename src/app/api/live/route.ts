import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Get the current active/ongoing event
    let event = await prisma.event.findFirst({
      where: {
        status: {
          in: ["ONGOING", "REGISTRATION_OPEN"]
        }
      },
      orderBy: {
        date: "desc"
      },
      include: {
        announcements: {
          orderBy: {
            createdAt: "desc"
          }
        },
        registration: true,
        attendance: true
      }
    });

    if (!event) {
      event = await prisma.event.findFirst({
        orderBy: {
          date: "desc"
        },
        include: {
          announcements: {
            orderBy: {
              createdAt: "desc"
            }
          },
          registration: true,
          attendance: true
        }
      });
    }

    if (!event) {
      return NextResponse.json({ success: false, message: "No events found" });
    }

    // 2. Fetch or calculate statistics
    // Count actual attendees in the database for verification
    const attendees = await prisma.attendee.findMany({
      where: { eventId: event.id }
    });

    const approvedCount = attendees.filter(a => a.registrationStatus === "APPROVED").length;
    const totalCapacity = event.capacity > 0 ? event.capacity : 250;
    const remainingSeats = Math.max(0, totalCapacity - approvedCount);

    const presentCount = attendees.filter(a => a.attendanceStatus === "PRESENT").length;
    const absentCount = attendees.filter(a => a.attendanceStatus === "ABSENT").length;
    const totalTrackedAttendance = presentCount + absentCount;
    const attendancePercentage = totalTrackedAttendance > 0 
      ? Math.round((presentCount / totalTrackedAttendance) * 100) 
      : 0;

    // Use values from registration / attendance tables if present, otherwise fall back to counted attendees
    const regStats = {
      total: event.registration?.remainingSeats ? (event.registration.approvedCount + event.registration.remainingSeats) : totalCapacity,
      approved: event.registration?.approvedCount ?? approvedCount,
      remaining: event.registration?.remainingSeats ?? remainingSeats
    };

    const attStats = {
      present: event.attendance?.presentCount ?? presentCount,
      absent: event.attendance?.absentCount ?? absentCount,
      percentage: event.attendance 
        ? Math.round((event.attendance.presentCount / Math.max(1, event.attendance.presentCount + event.attendance.absentCount)) * 100)
        : attendancePercentage
    };

    // Format announcements
    const formattedAnnouncements = event.announcements.map((ann) => {
      const timeStr = new Date(ann.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });
      
      // Consider it "new" if created in the last 15 minutes
      const isNew = (Date.now() - new Date(ann.createdAt).getTime()) < 15 * 60 * 1000;

      return {
        id: ann.id,
        message: ann.message,
        time: timeStr,
        isNew: isNew
      };
    });

    return NextResponse.json({
      success: true,
      event: {
        id: event.id,
        title: event.title,
        status: event.status,
        description: event.description,
        shortDescription: event.shortDescription,
        objectives: event.objectives,
        speakerDetails: event.speakerDetails,
        rules: event.rules,
        location: event.location,
        venueInfo: event.venueInfo,
        startTime: event.date.toISOString(),
        endTime: event.endDate ? event.endDate.toISOString() : new Date(event.date.getTime() + 2 * 3600 * 1000).toISOString()
      },
      announcements: formattedAnnouncements,
      stats: {
        registrations: regStats,
        attendance: attStats
      }
    });

  } catch (error) {
    console.error("Error in live event API:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
