"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitVolunteerApplication(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const studentId = formData.get("studentId") as string;
  const email = formData.get("email") as string;
  const mobileNumber = formData.get("mobileNumber") as string;
  const yearOfStudy = formData.get("yearOfStudy") as string;
  const branch = formData.get("branch") as string;
  const isAcmMember = formData.get("isAcmMember") === "Yes";
  const hasVolunteered = formData.get("hasVolunteered") === "Yes";
  const pastEvents = formData.get("pastEvents") as string;
  
  // domains are sent as multiple checkboxes. Let's retrieve all values matching "domains"
  const domains = formData.getAll("domains") as string[];
  
  // skills can be comma-separated or checkboxes
  const skillsInput = formData.get("skills") as string;
  const skills = skillsInput ? skillsInput.split(",").map(s => s.trim()).filter(Boolean) : [];
  
  const relevantExp = formData.get("relevantExp") as string;
  const isAvailable = formData.get("isAvailable") === "Yes";
  const hoursPerWeek = formData.get("hoursPerWeek") as string;
  const whyVolunteer = formData.get("whyVolunteer") as string;
  const fitReason = formData.get("fitReason") as string;
  const teamExperience = formData.get("teamExperience") as string;
  const confirmCorrect = formData.get("confirmCorrect") === "on";
  const understandSelection = formData.get("understandSelection") === "on";

  if (!fullName || !studentId || !email || !mobileNumber || !yearOfStudy || !branch || !whyVolunteer || !fitReason || !teamExperience) {
    return { error: "Please fill in all required fields." };
  }

  if (!confirmCorrect || !understandSelection) {
    return { error: "You must check the declarations to submit." };
  }

  if (domains.length === 0) {
    return { error: "Please select at least 1 domain preference." };
  }

  if (domains.length > 2) {
    return { error: "You can select up to 2 domain preferences." };
  }

  try {
    const application = await prisma.volunteerApplication.create({
      data: {
        fullName,
        studentId,
        email,
        mobileNumber,
        yearOfStudy,
        branch,
        isAcmMember,
        hasVolunteered,
        pastEvents,
        domains,
        skills,
        relevantExp,
        isAvailable,
        hoursPerWeek,
        whyVolunteer,
        fitReason,
        teamExperience,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/dashboard/volunteers");
    return { success: true, applicationId: application.id };
  } catch (error) {
    console.error("Failed to submit volunteer application:", error);
    return { error: "Database error. Failed to submit application." };
  }
}

export async function updateVolunteerStatus(
  id: string, 
  status: "PENDING" | "APPROVED" | "REJECTED" | "INTERVIEW_SCHEDULED", 
  interviewDateStr?: string
) {
  if (!id) return { error: "Application ID is required." };

  try {
    const updateData: any = { status };
    if (status === "INTERVIEW_SCHEDULED" && interviewDateStr) {
      updateData.interviewDate = new Date(interviewDateStr);
    } else if (status !== "INTERVIEW_SCHEDULED") {
      updateData.interviewDate = null;
    }

    await prisma.volunteerApplication.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/dashboard/volunteers");
    return { success: true };
  } catch (error) {
    console.error("Failed to update volunteer status:", error);
    return { error: "Database error. Failed to update application." };
  }
}
