"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function generateTicketId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ACM-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function registerForEvent(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const eventId = formData.get("eventId") as string;
  const mobileNumber = formData.get("mobileNumber") as string;
  const collegeName = formData.get("collegeName") as string;
  const department = formData.get("department") as string;
  const yearSemester = formData.get("yearSemester") as string;
  const gender = formData.get("gender") as string;
  const city = formData.get("city") as string;
  const skillsInterests = formData.get("skillsInterests") as string;
  const emergencyContact = formData.get("emergencyContact") as string;

  if (!name || !email || !eventId) {
    return { error: "Missing required fields." };
  }

  // Check if event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    return { error: "Event not found." };
  }

  const ticketId = generateTicketId();

  try {
    // We attempt to save it, but catching any errors (e.g. database offline)
    await prisma.$transaction(async (tx) => {
      // Create Attendee
      await tx.attendee.create({
        data: {
          ticketId,
          eventId,
          fullName: name,
          email,
          mobileNumber,
          collegeName,
          department,
          yearSemester,
          gender,
          city,
          skillsInterests,
          emergencyContact,
        },
      });

      // Update Registration count if the model exists, or create it
      await tx.eventRegistration.upsert({
        where: { eventId },
        update: {
          registeredCount: { increment: 1 },
        },
        create: {
          eventId,
          registeredCount: 1,
          approvedCount: 0,
          remainingSeats: 100, // example capacity
        },
      });
    });

    // Set cookie to log the user in instantly
    const cookieStore = await cookies();
    cookieStore.set("acm_event_ticket", ticketId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true, ticketId };
  } catch (error) {
    console.error("Registration error:", error);
    // Since the database might not be connected locally during dev, we can fallback to just setting the cookie for demo purposes
    const cookieStore = await cookies();
    cookieStore.set("acm_event_ticket", ticketId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    // Return a warning but still succeed for the UI flow demonstration
    return { success: true, ticketId, warning: "Database unreachable. Ticket generated locally." };
  }
}

export async function joinEvent(formData: FormData) {
  const ticketId = formData.get("ticketId") as string;

  if (!ticketId) {
    return { error: "Ticket ID is required." };
  }

  try {
    const attendee = await prisma.attendee.findUnique({
      where: { ticketId },
    });

    if (!attendee) {
      return { error: "Invalid Ticket ID." };
    }

    const cookieStore = await cookies();
    cookieStore.set("acm_event_ticket", ticketId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error) {
    console.error("Join error:", error);
    
    // Fallback if database is not reachable: Just accept any ACM- prefixed ticket for demo
    if (ticketId.startsWith("ACM-")) {
      const cookieStore = await cookies();
      cookieStore.set("acm_event_ticket", ticketId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return { success: true, warning: "Database unreachable. Local authentication accepted." };
    }

    return { error: "Database offline and invalid Ticket format." };
  }
}

export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  
  let role = "";
  let isValid = false;

  // Single Super Admin Login as requested
  if (username === "admin" && password === "Admin@123") {
    role = "SUPERADMIN";
    isValid = true;
  }

  if (isValid) {
    const cookieStore = await cookies();
    cookieStore.set("acm_admin_session", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return { success: true };
  }

  return { error: "Invalid Credentials" };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("acm_admin_session");
  redirect("/live");
}

export async function userLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("acm_event_ticket");
  redirect("/live");
}
