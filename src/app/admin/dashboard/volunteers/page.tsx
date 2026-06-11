import prisma from "@/lib/prisma";
import VolunteersManagementClient from "./VolunteersManagementClient";

export const dynamic = "force-dynamic";

export default async function VolunteersPage() {
  let applications: any[] = [];
  
  try {
    applications = await prisma.volunteerApplication.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (e) {
    console.warn("DB offline or failed to fetch volunteers, falling back to mock applications");
  }

  // Serialise dates to plain strings so they can be safely passed to Client Components
  const serialisedApplications = applications.map(app => ({
    ...app,
    createdAt: app.createdAt.toISOString(),
    updatedAt: app.updatedAt.toISOString(),
    interviewDate: app.interviewDate ? app.interviewDate.toISOString() : null,
  }));

  return <VolunteersManagementClient initialApplications={serialisedApplications} />;
}
