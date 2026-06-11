import prisma from "@/lib/prisma";
import RegistrationsClient from "./RegistrationsClient";

async function getRegistrations() {
  try {
    return await prisma.attendee.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (e) {
    // Mock data fallback if DB is offline
    return [
      {
        id: "mock_1",
        ticketId: "ACM-XZ982Y",
        fullName: "John Doe",
        email: "john@example.com",
        mobileNumber: "+91 9876543210",
        collegeName: "NMIMS, Indore",
        registrationStatus: "APPROVED",
        createdAt: new Date().toISOString()
      },
      {
        id: "mock_2",
        ticketId: "ACM-L0P4K1",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        mobileNumber: "+91 9123456789",
        collegeName: "IIT Indore",
        registrationStatus: "PENDING",
        createdAt: new Date().toISOString()
      }
    ] as any[];
  }
}

export default async function AdminRegistrationsPage() {
  const registrations = await getRegistrations();

  return <RegistrationsClient initialData={registrations} />;
}
