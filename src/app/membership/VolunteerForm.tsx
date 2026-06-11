"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitVolunteerApplication } from "@/lib/actions/volunteer";
import { FadeUp } from "@/components/animations/FadeUp";
import { 
  Loader2, Check, AlertCircle, ArrowLeft, ArrowRight, User, 
  Settings, CheckSquare, HelpCircle, Heart, Calendar 
} from "lucide-react";

const availableDomains = [
  { id: "Technical Team", name: "Technical Team" },
  { id: "Event Management Team", name: "Event Management Team" },
  { id: "Design Team", name: "Design Team" },
  { id: "Social Media Team", name: "Social Media Team" },
  { id: "Media Production Team", name: "Media Production Team" },
  { id: "Photography & Videography Team", name: "Photography & Videography Team" },
  { id: "Content Writing Team", name: "Content Writing Team" },
  { id: "Sponsorship & Outreach Team", name: "Sponsorship & Outreach Team" },
  { id: "Registration & Coordination Team", name: "Registration & Coordination Team" },
];

const presetSkills = [
  "Canva", "Photoshop", "Video Editing", "Public Speaking",
  "Graphic Design", "Programming", "Photography", "Content Writing", "Event Management"
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

export default function VolunteerForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    mobileNumber: "",
    yearOfStudy: "",
    branch: "",
    isAcmMember: "",
    hasVolunteered: "",
    pastEvents: "",
    relevantExp: "",
    isAvailable: "",
    hoursPerWeek: "",
    whyVolunteer: "",
    fitReason: "",
    teamExperience: "",
    confirmCorrect: false,
    understandSelection: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: "confirmCorrect" | "understandSelection") => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleRadioChange = (name: "isAcmMember" | "hasVolunteered" | "isAvailable", value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDomainChange = (domain: string) => {
    setSelectedDomains(prev => {
      if (prev.includes(domain)) {
        return prev.filter(d => d !== domain);
      } else {
        if (prev.length >= 2) {
          setError("You can select up to 2 domain preferences.");
          return prev;
        }
        setError(null);
        return [...prev, domain];
      }
    });
  };

  const togglePresetSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && customSkill.trim()) {
      e.preventDefault();
      const trimmed = customSkill.trim();
      if (!selectedSkills.includes(trimmed)) {
        setSelectedSkills(prev => [...prev, trimmed]);
      }
      setCustomSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const validateStep = (stepNum: number) => {
    if (stepNum === 1) {
      if (!formData.fullName.trim()) return "Full name is required.";
      if (!formData.studentId.trim()) return "Student ID / Enrollment Number is required.";
      if (!formData.email.trim()) return "Email address is required.";
      if (!formData.email.includes("@")) return "Please enter a valid email address.";
      if (!formData.mobileNumber.trim()) return "Mobile number is required.";
      if (!formData.yearOfStudy) return "Please select your Year of Study.";
      if (!formData.branch) return "Please select your Branch / Department.";
    }
    if (stepNum === 2) {
      if (!formData.isAcmMember) return "Please specify if you are an ACM Member.";
      if (!formData.hasVolunteered) return "Please specify if you have volunteered before.";
      if (formData.hasVolunteered === "Yes" && !formData.pastEvents.trim()) {
        return "Please mention the event(s) you volunteered in.";
      }
      if (selectedDomains.length === 0) return "Please select at least 1 domain preference.";
      if (selectedDomains.length > 2) return "You can select up to 2 domain preferences.";
    }
    if (stepNum === 3) {
      if (selectedSkills.length === 0 && !formData.relevantExp.trim()) {
        return "Please select at least one skill or describe your experience.";
      }
      if (!formData.isAvailable) return "Please specify your availability on event days.";
      if (!formData.hoursPerWeek) return "Please select your weekly hours commitment.";
    }
    if (stepNum === 4) {
      if (!formData.whyVolunteer.trim()) return "Please explain why you want to volunteer.";
      if (!formData.fitReason.trim()) return "Please explain why you are a good fit.";
      if (!formData.teamExperience.trim()) return "Please describe your teamwork experience.";
      if (!formData.confirmCorrect || !formData.understandSelection) {
        return "You must accept all declarations to submit.";
      }
    }
    return null;
  };

  const handleNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setError(null);
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateStep(4);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("studentId", formData.studentId);
    data.append("email", formData.email);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("yearOfStudy", formData.yearOfStudy);
    data.append("branch", formData.branch);
    data.append("isAcmMember", formData.isAcmMember);
    data.append("hasVolunteered", formData.hasVolunteered);
    data.append("pastEvents", formData.pastEvents);
    data.append("relevantExp", formData.relevantExp);
    data.append("isAvailable", formData.isAvailable);
    data.append("hoursPerWeek", formData.hoursPerWeek);
    data.append("whyVolunteer", formData.whyVolunteer);
    data.append("fitReason", formData.fitReason);
    data.append("teamExperience", formData.teamExperience);
    data.append("confirmCorrect", formData.confirmCorrect ? "on" : "off");
    data.append("understandSelection", formData.understandSelection ? "on" : "off");
    
    selectedDomains.forEach(domain => data.append("domains", domain));
    data.set("skills", selectedSkills.join(", "));

    const res = await submitVolunteerApplication(data);

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else {
      setSuccess(true);
      setIsSubmitting(false);
    }
  }

  const stepsData = [
    { num: 1, label: "Personal Details", icon: User },
    { num: 2, label: "ACM & Domains", icon: Settings },
    { num: 3, label: "Skills & Availability", icon: Calendar },
    { num: 4, label: "Motivations", icon: Heart },
  ];

  if (success) {
    return (
      <FadeUp className="max-w-3xl mx-auto text-center py-16 px-6 glass-card rounded-[2.5rem] border border-brand-teal/30 shadow-[0_0_30px_rgba(0,229,192,0.15)] bg-black/30">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/20 border border-brand-teal/30">
          <Check className="h-8 w-8 text-brand-teal-light animate-bounce" />
        </div>
        <h2 className="font-heading text-3xl font-black text-white mb-4">Application Submitted!</h2>
        <p className="text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
          Thank you for applying to volunteer at SVKM's NMIMS Indore ACM Student Chapter. 
          Our leads team will review your application and contact you via email or mobile to coordinate an interview.
        </p>
        <button 
          onClick={() => { 
            setSuccess(false); 
            setStep(1); 
            setSelectedDomains([]); 
            setSelectedSkills([]); 
            setError(null);
            setFormData({
              fullName: "",
              studentId: "",
              email: "",
              mobileNumber: "",
              yearOfStudy: "",
              branch: "",
              isAcmMember: "",
              hasVolunteered: "",
              pastEvents: "",
              relevantExp: "",
              isAvailable: "",
              hoursPerWeek: "",
              whyVolunteer: "",
              fitReason: "",
              teamExperience: "",
              confirmCorrect: false,
              understandSelection: false,
            });
          }}
          className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 cursor-pointer"
        >
          Submit Another Application
        </button>
      </FadeUp>
    );
  }

  return (
    <FadeUp className="max-w-4xl mx-auto">
      <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 md:p-12 space-y-8 bg-black/20 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Step Indicator */}
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="font-heading text-3xl font-black text-white">Volunteer Registration</h2>
              <p className="text-gray-400 mt-1 text-sm">Apply to join the organizing committee departments at college level.</p>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-purple-light bg-brand-purple/10 border border-brand-purple/20 px-3 py-1 rounded-full shrink-0">
              Step {step} of 4: {stepsData[step - 1].label}
            </div>
          </div>

          {/* Stepper bar */}
          <div className="relative flex items-center justify-between w-full mb-12">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/5 -translate-y-1/2 -z-10" />
            <div 
              className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-brand-purple to-brand-teal -translate-y-1/2 -z-10 transition-all duration-500 ease-out" 
              style={{ width: `${((step - 1) / (stepsData.length - 1)) * 100}%` }}
            />

            {stepsData.map((s) => {
              const IconComp = s.icon;
              const isCompleted = step > s.num;
              const isActive = step === s.num;

              return (
                <div key={s.num} className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      // Allow navigating back to already completed steps
                      if (s.num < step) {
                        setDirection(s.num - step);
                        setStep(s.num);
                        setError(null);
                      }
                    }}
                    disabled={s.num > step}
                    className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isCompleted 
                        ? "bg-brand-teal border-brand-teal text-[#030712] cursor-pointer" 
                        : isActive 
                        ? "bg-brand-purple border-brand-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-110" 
                        : "bg-[#0c0f18] border-white/10 text-gray-500 disabled:opacity-50"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : <IconComp className="h-4 w-4" />}
                  </button>
                  <span className={`text-[10px] font-bold uppercase tracking-widest hidden md:block ${
                    isActive ? "text-brand-purple-light" : isCompleted ? "text-brand-teal-light" : "text-gray-500"
                  }`}>
                    {s.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-center gap-3 text-sm font-medium text-red-400"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Wizard Form Wrapper */}
        <form onSubmit={handleSubmit} className="relative z-10 overflow-hidden min-h-[350px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="space-y-8"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-brand-purple-light uppercase tracking-widest border-b border-white/5 pb-2">1. Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name *</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required 
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="studentId" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Student ID / Enrollment Number *</label>
                      <input 
                        type="text" 
                        id="studentId" 
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required 
                        placeholder="70012345678"
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Corporate Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        placeholder="john.doe@nmims.edu.in"
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mobileNumber" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Mobile Number *</label>
                      <input 
                        type="tel" 
                        id="mobileNumber" 
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        required 
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="yearOfStudy" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Year of Study *</label>
                      <select 
                        id="yearOfStudy" 
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-[#0c0f18] px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors appearance-none"
                      >
                        <option value="">Select your year...</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="branch" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Branch / Department *</label>
                      <select 
                        id="branch" 
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-[#0c0f18] px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors appearance-none"
                      >
                        <option value="">Select your branch...</option>
                        <option value="CSE">CSE</option>
                        <option value="AI & DS">AI & DS</option>
                        <option value="IT">IT</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-bold text-brand-purple-light uppercase tracking-widest border-b border-white/5 pb-2">2. ACM Status & Domain Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Are you an ACM Member? *</span>
                      <div className="flex gap-6">
                        {["Yes", "No"].map(val => (
                          <label key={val} className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                            <input 
                              type="radio" 
                              name="isAcmMember" 
                              value={val}
                              checked={formData.isAcmMember === val}
                              onChange={() => handleRadioChange("isAcmMember", val)}
                              required
                              className="h-4 w-4 accent-brand-purple" 
                            />
                            {val}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Have you volunteered in ACM events before? *</span>
                      <div className="flex gap-6">
                        {["Yes", "No"].map(val => (
                          <label key={val} className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                            <input 
                              type="radio" 
                              name="hasVolunteered" 
                              value={val}
                              checked={formData.hasVolunteered === val}
                              onChange={() => handleRadioChange("hasVolunteered", val)}
                              required
                              className="h-4 w-4 accent-brand-purple" 
                            />
                            {val}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.hasVolunteered === "Yes" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        <label htmlFor="pastEvents" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">If yes, mention the event(s)</label>
                        <input 
                          type="text" 
                          id="pastEvents" 
                          name="pastEvents"
                          value={formData.pastEvents}
                          onChange={handleInputChange}
                          placeholder="e.g. CodeSwap Hackathon, Laser Labyrinth room coordinator"
                          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Domain Preferences (Select up to 2) *</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableDomains.map(domain => {
                        const isChecked = selectedDomains.includes(domain.id);
                        return (
                          <div 
                            key={domain.id} 
                            onClick={() => handleDomainChange(domain.id)}
                            className={`glass-card p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all hover:bg-white/5 ${
                              isChecked ? "border-brand-purple bg-brand-purple/10 text-white" : "border-white/5 text-gray-400 hover:text-gray-200"
                            }`}
                          >
                            <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? "border-brand-purple bg-brand-purple text-white" : "border-white/20"
                            }`}>
                              {isChecked && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className="text-sm font-semibold leading-tight">{domain.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-brand-purple-light uppercase tracking-widest border-b border-white/5 pb-2">3. Skills & Availability</h3>
                  
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">What skills can you contribute? (Click presets or type custom) *</span>
                    <div className="flex flex-wrap gap-2">
                      {presetSkills.map(skill => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => togglePresetSkill(skill)}
                            className={`px-4 py-2 rounded-full border text-xs font-bold tracking-wide transition-all cursor-pointer ${
                              isSelected 
                                ? "bg-brand-teal text-[#030712] border-brand-teal shadow-[0_0_15px_rgba(0,229,192,0.3)] hover:bg-brand-teal-light" 
                                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Type a custom skill and press Enter..."
                        value={customSkill}
                        onChange={e => setCustomSkill(e.target.value)}
                        onKeyDown={handleAddCustomSkill}
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors"
                      />
                      <p className="text-[10px] text-gray-500 font-medium ml-1">Press Enter to add custom skills to your roster.</p>
                    </div>

                    {selectedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedSkills.map(skill => (
                          <div key={skill} className="flex items-center gap-2 rounded-lg bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-bold text-white">
                            <span>{skill}</span>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-gray-500 hover:text-red-400 transition-colors font-bold text-sm shrink-0"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="relevantExp" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Briefly describe any relevant experience</label>
                    <textarea 
                      id="relevantExp" 
                      name="relevantExp" 
                      value={formData.relevantExp}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="e.g. Worked as an organizer in school, managed tech accounts, edited video content..."
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Are you available during event days and pre-event meetings? *</span>
                      <div className="flex gap-6">
                        {["Yes", "No"].map(val => (
                          <label key={val} className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                            <input 
                              type="radio" 
                              name="isAvailable" 
                              value={val}
                              checked={formData.isAvailable === val}
                              onChange={() => handleRadioChange("isAvailable", val)}
                              required
                              className="h-4 w-4 accent-brand-purple" 
                            />
                            {val}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="hoursPerWeek" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Hours per week dedicated to ACM activities *</label>
                      <select 
                        id="hoursPerWeek" 
                        name="hoursPerWeek"
                        value={formData.hoursPerWeek}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-[#0c0f18] px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors appearance-none"
                      >
                        <option value="">Select hour commitment...</option>
                        <option value="1–2 Hours">1–2 Hours</option>
                        <option value="3–5 Hours">3–5 Hours</option>
                        <option value="5+ Hours">5+ Hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-bold text-brand-purple-light uppercase tracking-widest border-b border-white/5 pb-2">4. Statements & Confirmation</h3>
                  
                  <div className="space-y-2">
                    <label htmlFor="whyVolunteer" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Why do you want to become an ACM Volunteer? *</label>
                    <textarea 
                      id="whyVolunteer" 
                      name="whyVolunteer" 
                      value={formData.whyVolunteer}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Tell us about your motivation..."
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="fitReason" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">What makes you a good fit for the selected domain? *</label>
                    <textarea 
                      id="fitReason" 
                      name="fitReason" 
                      value={formData.fitReason}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Describe your capabilities in this specific area..."
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="teamExperience" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Have you worked in a team before? Briefly describe your role. *</label>
                    <textarea 
                      id="teamExperience" 
                      name="teamExperience" 
                      value={formData.teamExperience}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Outline your team roles and collaboration stories..."
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-brand-purple transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="flex items-start gap-3 cursor-pointer text-sm font-medium text-gray-400 hover:text-white">
                      <input 
                        type="checkbox" 
                        name="confirmCorrect" 
                        checked={formData.confirmCorrect}
                        onChange={() => handleCheckboxChange("confirmCorrect")}
                        required
                        className="mt-1 h-4 w-4 rounded border-white/20 accent-brand-purple" 
                      />
                      <span>I confirm that all information provided is correct.</span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer text-sm font-medium text-gray-400 hover:text-white">
                      <input 
                        type="checkbox" 
                        name="understandSelection" 
                        checked={formData.understandSelection}
                        onChange={() => handleCheckboxChange("understandSelection")}
                        required
                        className="mt-1 h-4 w-4 rounded border-white/20 accent-brand-purple" 
                      />
                      <span>I understand that volunteer selection will be based on requirements and responses submitted.</span>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto flex items-center justify-center gap-2 rounded-xl bg-brand-purple hover:bg-brand-purple-light px-8 py-4 font-bold text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95 cursor-pointer"
              >
                Next Step <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-purple-light px-8 py-4 font-black tracking-wide text-white transition-all shadow-[0_0_35px_rgba(139,92,246,0.3)] hover:shadow-[0_0_45px_rgba(139,92,246,0.5)] active:scale-99 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </FadeUp>
  );
}
