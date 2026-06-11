"use client";

import { useState } from "react";
import { updateVolunteerStatus } from "@/lib/actions/volunteer";
import { 
  Users, CheckCircle2, XCircle, Clock, CalendarDays, Mail, Phone, 
  BookOpen, Briefcase, Award, Shield, FileText, Check, X, Calendar, AlertCircle
} from "lucide-react";

const mockApplications = [
  {
    id: "app_1",
    fullName: "Aryan Patel",
    studentId: "70012210045",
    email: "aryan.patel@nmims.edu.in",
    mobileNumber: "9876543210",
    yearOfStudy: "2nd Year",
    branch: "CSE",
    isAcmMember: true,
    hasVolunteered: true,
    pastEvents: "CodeSwap Hackathon organizer",
    domains: ["Technical Team", "Event Management Team"],
    skills: ["Programming", "Canva", "Public Speaking"],
    relevantExp: "Helped host school technical events. Familiar with React and JavaScript.",
    isAvailable: true,
    hoursPerWeek: "3–5 Hours",
    whyVolunteer: "I want to grow my technical network, contribute to the student chapter community, and collaborate with like-minded developers.",
    fitReason: "I have strong coding skills and enjoy managing technical rooms and coordinate workshops.",
    teamExperience: "Worked in a group of 3 for our term project. Took the lead on frontend integrations and managed tasks.",
    status: "PENDING",
    interviewDate: null,
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "app_2",
    fullName: "Riya Sharma",
    studentId: "70012310234",
    email: "riya.sharma@nmims.edu.in",
    mobileNumber: "9123456789",
    yearOfStudy: "1st Year",
    branch: "AI & DS",
    isAcmMember: false,
    hasVolunteered: false,
    pastEvents: "",
    domains: ["Design Team", "Social Media Team"],
    skills: ["Canva", "Photoshop", "Graphic Design"],
    relevantExp: "Managed Instagram accounts for clubs and created flyers using Canva.",
    isAvailable: true,
    hoursPerWeek: "5+ Hours",
    whyVolunteer: "I want to apply my creative design skills in designing awesome visual media for ACM events.",
    fitReason: "Experienced in graphic layouts, posters design, and video editing using Canva/Photoshop.",
    teamExperience: "Part of the high school yearbook committee. Handled layout designs and collaborated on article slots.",
    status: "PENDING",
    interviewDate: null,
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  }
];

export default function VolunteersManagementClient({ initialApplications }: { initialApplications: any[] }) {
  const [applications, setApplications] = useState<any[]>(
    initialApplications.length > 0 ? initialApplications : mockApplications
  );
  const [selectedAppId, setSelectedAppId] = useState<string | null>(
    applications.length > 0 ? applications[0].id : null
  );
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedApp = applications.find(app => app.id === selectedAppId);

  const handleStatusUpdate = async (id: string, status: "APPROVED" | "REJECTED" | "INTERVIEW_SCHEDULED", dateStr?: string) => {
    setIsSubmitting(true);
    setError(null);

    const res = await updateVolunteerStatus(id, status, dateStr);

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else {
      // Update local state
      setApplications(prev => prev.map(app => {
        if (app.id === id) {
          return {
            ...app,
            status,
            interviewDate: status === "INTERVIEW_SCHEDULED" && dateStr ? new Date(dateStr).toISOString() : null
          };
        }
        return app;
      }));
      setInterviewDate("");
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Approved</span>;
      case "REJECTED":
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Rejected</span>;
      case "INTERVIEW_SCHEDULED":
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Interviewed</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Pending</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED": return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "REJECTED": return <XCircle className="h-4 w-4 text-red-400" />;
      case "INTERVIEW_SCHEDULED": return <CalendarDays className="h-4 w-4 text-blue-400" />;
      default: return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const filteredApps = filterStatus === "ALL" 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-4xl font-black text-white mb-2">Volunteer Roster</h1>
          <p className="text-gray-400 font-medium">Manage local chapter recruitments and schedule interviews.</p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-2">
          {["ALL", "PENDING", "INTERVIEW_SCHEDULED", "APPROVED", "REJECTED"].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer border ${
                filterStatus === status 
                  ? "bg-brand-purple border-brand-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {status === "INTERVIEW_SCHEDULED" ? "Interviewed" : status}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-center gap-3 text-sm font-medium text-red-400 animate-pulse">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Applicants List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl border border-white/10 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              Applications ({filteredApps.length})
            </h2>

            {filteredApps.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No applications match this filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredApps.map(app => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedAppId === app.id 
                        ? "border-brand-purple bg-brand-purple/5 shadow-inner" 
                        : "border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-white group-hover:text-brand-purple-light transition-colors">{app.fullName}</h4>
                      <p className="text-xs text-gray-500 font-medium">{app.studentId} • {app.branch} • {app.yearOfStudy}</p>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{app.domains.join(", ")}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                      {getStatusBadge(app.status)}
                      <span className="text-[9px] text-gray-600 font-bold uppercase">{new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Selected Application Details */}
        <div className="lg:col-span-7">
          {selectedApp ? (
            <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 space-y-6 relative overflow-hidden bg-black/10">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <FileText className="h-32 w-32" />
              </div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/5">
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">{selectedApp.fullName}</h2>
                  <p className="text-sm font-semibold text-brand-teal-light uppercase tracking-wider">{selectedApp.yearOfStudy} • {selectedApp.branch} • ID: {selectedApp.studentId}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedApp.status)}
                  {getStatusBadge(selectedApp.status)}
                </div>
              </div>

              {/* Grid: Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="h-4 w-4 text-brand-purple-light shrink-0" />
                    <a href={`mailto:${selectedApp.email}`} className="text-white font-semibold hover:underline">{selectedApp.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone className="h-4 w-4 text-brand-purple-light shrink-0" />
                    <a href={`tel:${selectedApp.mobileNumber}`} className="text-white font-semibold hover:underline">{selectedApp.mobileNumber}</a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">ACM Member Status</span>
                    <span className="text-white font-semibold">{selectedApp.isAcmMember ? "Yes (Global/India Member)" : "No"}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Weekly Dedication</span>
                    <span className="text-white font-semibold">{selectedApp.hoursPerWeek}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Domain Preferences</span>
                    <span className="text-brand-teal-light font-bold">{selectedApp.domains.join(" & ")}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Availability</span>
                    <span className="text-white font-semibold">{selectedApp.isAvailable ? "Available during meetings/sprints" : "Not available during events"}</span>
                  </div>
                </div>
              </div>

              {/* Skills & Experience */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Registered Skills</span>
                  {selectedApp.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white">{skill}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 font-semibold italic">No custom skills specified.</span>
                  )}
                </div>

                {selectedApp.relevantExp && (
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Relevant Experience</span>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedApp.relevantExp}</p>
                  </div>
                )}
              </div>

              {/* Short Answers */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <div>
                  <span className="text-xs font-bold text-brand-purple-light uppercase tracking-widest block mb-1">Why do you want to become an ACM Volunteer?</span>
                  <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.01] border border-white/5 p-4 rounded-xl">{selectedApp.whyVolunteer}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-purple-light uppercase tracking-widest block mb-1">What makes you a good fit for this domain?</span>
                  <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.01] border border-white/5 p-4 rounded-xl">{selectedApp.fitReason}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-purple-light uppercase tracking-widest block mb-1">Have you worked in a team before? describe your role.</span>
                  <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.01] border border-white/5 p-4 rounded-xl">{selectedApp.teamExperience}</p>
                </div>
              </div>

              {/* Interview schedule view if status == INTERVIEW_SCHEDULED */}
              {selectedApp.status === "INTERVIEW_SCHEDULED" && selectedApp.interviewDate && (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 flex items-center gap-4 text-blue-300">
                  <Calendar className="h-6 w-6 shrink-0 animate-pulse" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest block text-blue-400">Scheduled Interview</span>
                    <span className="font-bold text-white text-base">
                      {new Date(selectedApp.interviewDate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="text-xs text-blue-400 block mt-0.5">
                      Time: {new Date(selectedApp.interviewDate).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons Panel */}
              <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    disabled={isSubmitting}
                    onClick={() => handleStatusUpdate(selectedApp.id, "APPROVED")}
                    className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 font-bold text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" /> Approve Member
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={() => handleStatusUpdate(selectedApp.id, "REJECTED")}
                    className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 font-bold text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    <X className="h-4 w-4" /> Reject Applicant
                  </button>
                </div>

                {/* Scheduling Interview Panel */}
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Schedule Interview</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="datetime-local"
                      value={interviewDate}
                      onChange={e => setInterviewDate(e.target.value)}
                      className="flex-grow rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-brand-purple transition-colors text-sm"
                    />
                    <button
                      disabled={isSubmitting || !interviewDate}
                      onClick={() => handleStatusUpdate(selectedApp.id, "INTERVIEW_SCHEDULED", interviewDate)}
                      className="min-h-[44px] sm:min-h-0 px-6 rounded-xl bg-brand-purple hover:bg-brand-purple-light font-bold text-white transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-[2.5rem] border border-white/10 p-12 text-center text-gray-500 bg-white/[0.02]">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-600" />
              <p className="text-lg font-medium">Select an application to view full details and perform administrative actions.</p>
            </div>
          )}
        </div>
      </div>

      {/* Styles for scrollbar within this page */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}} />
    </div>
  );
}
