"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  Search,
  RefreshCw,
  Clock,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Server,
  FileText,
  Plus,
  Inbox,
  LogOut,
  ChevronLeft,
  ChevronDown,
  Check,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  fetchEnquiries,
  fetchDashboardStats,
  fetchSystemStatus,
  updateEnquiryStatus,
  deleteEnquiry,
  sendEmailViaResend,
  submitEnquiry,
  EnquiryItem,
  DashboardStats,
  SystemStatus,
} from "@/lib/api";
import { isAuthenticated, getCurrentAdmin, logoutAdmin, AdminUser } from "@/lib/auth";

const statusConfig: Record<
  EnquiryItem["status"],
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  new: {
    label: "New Lead",
    bg: "bg-blue-50/90 hover:bg-blue-100/90",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  in_review: {
    label: "In Review",
    bg: "bg-amber-50/90 hover:bg-amber-100/90",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-purple-50/90 hover:bg-purple-100/90",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  mail_sent: {
    label: "Mail Sent",
    bg: "bg-emerald-50/90 hover:bg-emerald-100/90",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  archived: {
    label: "Archived",
    bg: "bg-slate-100 hover:bg-slate-200/80",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
};

const mailTemplates = [
  {
    id: "proposal",
    name: "Consultation Proposal & Quote",
    subject: "Tailored Proposal & Budget Deck - Virtue IN Agency",
    getMessage: (item: EnquiryItem) =>
      `Dear ${item.name},\n\nThank you for reaching out to Virtue IN Agency regarding your upcoming ${item.event_type || "event"}.\n\nBased on your specifications for ${item.company || "your company"} at ${item.venue || "the venue"} (Budget: ${item.budget || "customized"}), we have prepared a tailored event production roadmap.\n\nOur proposal covers 360-degree event production including staging, acoustics, VIP hospitality, and guest choreography.\n\nPlease find our preliminary deck and let us know your preferred time this week for a walkthrough call.`,
  },
  {
    id: "meeting",
    name: "Strategy Alignment Meeting",
    subject: "Invitation: Event Strategy & Production Call - Virtue IN",
    getMessage: (item: EnquiryItem) =>
      `Dear ${item.name},\n\nWe would love to schedule a 20-minute strategy call with our Lead Event Director to discuss creative concepts and logistical execution for your ${item.event_type || "event"}.\n\nPlease reply with a time slot that suits you best (or call us directly at +91 74010 30000). Looking forward to creating something extraordinary together.`,
  },
  {
    id: "followup",
    name: "Enquiry Follow-Up",
    subject: "Follow-up regarding your event enquiry - Virtue IN Agency",
    getMessage: (item: EnquiryItem) =>
      `Hi ${item.name},\n\nJust checking in to see if you have any questions regarding our event production services for ${item.company || "your event"}.\n\nWe'd be delighted to answer any questions or customize the package to fit your exact budget and timeline.`,
  },
  {
    id: "custom",
    name: "Custom Message",
    subject: "Regarding your inquiry - Virtue IN Agency",
    getMessage: (item: EnquiryItem) => `Dear ${item.name},\n\n`,
  },
];

// ── CUSTOM STATUS DROPDOWN COMPONENT ──
function StatusDropdown({
  currentStatus,
  onStatusChange,
}: {
  currentStatus: EnquiryItem["status"];
  onStatusChange: (status: EnquiryItem["status"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const current = statusConfig[currentStatus] || statusConfig.new;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${current.bg} ${current.text} ${current.border}`}
      >
        <span className={`w-2 h-2 rounded-full ${current.dot}`} />
        <span>{current.label}</span>
        <ChevronDown size={13} className={`opacity-60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-200/90 rounded-xl shadow-lg p-1.5 z-30 space-y-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {(Object.keys(statusConfig) as EnquiryItem["status"][]).map((st) => {
              const info = statusConfig[st];
              const isSelected = st === currentStatus;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    onStatusChange(st);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${info.dot}`} />
                    <span>{info.label}</span>
                  </span>
                  {isSelected && <Check size={14} className="text-slate-700" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPortal() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data states
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  // Mail Modal State
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("proposal");
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [mailFeedback, setMailFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Notes state for selected enquiry
  const [adminNotes, setAdminNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Live time
  const [currentTime, setCurrentTime] = useState("");

  // Check auth
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
    } else {
      setCurrentUser(getCurrentAdmin());
      setAuthChecked(true);
    }
  }, [router]);

  // Update live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [enqRes, statsRes] = await Promise.all([
        fetchEnquiries({ status: statusFilter, search: searchQuery }),
        fetchDashboardStats(),
      ]);

      if (enqRes.success) {
        setEnquiries(enqRes.enquiries);
      }
      if (statsRes.success && statsRes.stats) {
        setStats(statsRes.stats);
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    if (authChecked) {
      loadData();
    }
  }, [authChecked, loadData]);

  // Logout handler
  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  // Open Enquiry Details
  const openEnquiryDetails = (enquiry: EnquiryItem) => {
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.notes || "");
  };

  // Status Change
  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryItem["status"]) => {
    const res = await updateEnquiryStatus(enquiryId, { status: newStatus });
    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      fetchDashboardStats().then((s) => s.success && s.stats && setStats(s.stats));
    }
  };

  // Save Notes
  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsSavingNotes(true);
    const res = await updateEnquiryStatus(selectedEnquiry.id, { notes: adminNotes });
    if (res.success) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, notes: adminNotes } : null));
      setEnquiries((prev) =>
        prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, notes: adminNotes } : e))
      );
    }
    setIsSavingNotes(false);
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry from database?")) return;
    const res = await deleteEnquiry(id);
    if (res.success) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      loadData();
    }
  };

  // Open Mail Composer
  const openMailComposer = (enquiry: EnquiryItem, templateId = "proposal") => {
    setSelectedEnquiry(enquiry);
    setSelectedTemplate(templateId);
    const tpl = mailTemplates.find((t) => t.id === templateId) || mailTemplates[0];
    setMailSubject(tpl.subject);
    setMailMessage(tpl.getMessage(enquiry));
    setMailFeedback(null);
    setMailModalOpen(true);
  };

  // Switch template
  const handleTemplateSelect = (templateId: string) => {
    if (!selectedEnquiry) return;
    setSelectedTemplate(templateId);
    const tpl = mailTemplates.find((t) => t.id === templateId);
    if (tpl) {
      setMailSubject(tpl.subject);
      setMailMessage(tpl.getMessage(selectedEnquiry));
    }
  };

  // Send Email via Resend
  const handleSendEmail = async () => {
    if (!selectedEnquiry || !mailMessage) return;
    setIsSendingMail(true);
    setMailFeedback(null);

    try {
      const res = await sendEmailViaResend({
        enquiryId: selectedEnquiry.id,
        toEmail: selectedEnquiry.email,
        subject: mailSubject,
        message: mailMessage,
        templateType: selectedTemplate,
      });

      if (res.success) {
        setMailFeedback({
          success: true,
          message: `Email dispatched successfully via Resend to ${selectedEnquiry.email}!`,
        });

        if (res.mailRecord) {
          const updatedHistory = [...(selectedEnquiry.mail_history || []), res.mailRecord];
          const updatedEnquiry: EnquiryItem = {
            ...selectedEnquiry,
            status: selectedEnquiry.status === "new" ? "mail_sent" : selectedEnquiry.status,
            mail_history: updatedHistory,
          };
          setSelectedEnquiry(updatedEnquiry);
          setEnquiries((prev) =>
            prev.map((e) => (e.id === selectedEnquiry.id ? updatedEnquiry : e))
          );
        }
        fetchDashboardStats().then((s) => s.success && s.stats && setStats(s.stats));
      } else {
        setMailFeedback({
          success: false,
          message: res.error || "Failed to send email via Resend.",
        });
      }
    } catch (err: unknown) {
      setMailFeedback({
        success: false,
        message: err instanceof Error ? err.message : "Network error during email dispatch.",
      });
    } finally {
      setIsSendingMail(false);
    }
  };

  // Add dummy test enquiry to Supabase DB
  const handleCreateTestLead = async () => {
    const sampleNames = ["Karthik Varma", "Pooja Sundaram", "Arun Natarajan", "Deepika Iyer"];
    const sampleEvents = ["Corporate Annual Summit", "Product Launch & Gala", "MICE Conference", "Entertainment"];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];

    await submitEnquiry({
      name: randomName,
      email: `${randomName.toLowerCase().replace(" ", ".")}@example.com`,
      country_code: "+91",
      phone: "9840130000",
      company: `${randomName.split(" ")[0]} Ventures`,
      venue: "Taj Connemara, Chennai",
      event_type: randomEvent,
      team_size: "101 – 200",
      budget: "₹5L – ₹10L",
      preferred_date: new Date(Date.now() + 86400000 * 30).toISOString().split("T")[0],
      source: "Admin Direct",
    });

    loadData();
  };

  if (!authChecked) {
    return (
      <div className="h-screen w-screen bg-slate-50 flex items-center justify-center">
        <RefreshCw className="animate-spin text-slate-600" size={24} />
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden bg-[#F8FAFC] text-slate-800 flex flex-row font-sans select-none antialiased">

      {/* ══ 1. STREAMLINED CLEAN WHITE SIDEBAR ═════════════════ */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } h-full bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 shrink-0 z-30 shadow-sm relative`}
      >
        {/* Brand & Top Header */}
        <div>
          {/* Logo Bar */}
          <div className="h-16 px-4 border-b border-slate-200/80 flex items-center justify-between bg-white">
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  V
                </div>
                <div>
                  <span className="font-bold text-sm tracking-tight text-slate-900 uppercase block leading-tight">
                    V-RTUE <span className="text-amber-600 font-semibold">IN.</span>
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Admin Suite
                  </span>
                </div>
              </div>
            ) : (
              <div className="mx-auto w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
                V
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <ChevronLeft size={16} className={sidebarCollapsed ? "rotate-180" : ""} />
            </button>
          </div>

          {/* Core Navigation */}
          <div className="p-3.5 space-y-3">
            <div>
              {!sidebarCollapsed && (
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Workspace
                </p>
              )}
              
              <div className="space-y-1">
                {/* Single Focused Enquiries Tab */}
                <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white shadow-sm">
                  <Inbox size={18} className="text-amber-400 shrink-0" />
                  {!sidebarCollapsed && <span className="truncate flex-1 text-left">Enquiries &amp; Leads</span>}
                  {!sidebarCollapsed && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white">
                      {enquiries.length}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats Summary in Sidebar */}
            {!sidebarCollapsed && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Metrics</p>
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>New Leads:</span>
                  <span className="font-semibold text-blue-600">{stats?.new ?? enquiries.filter(e => e.status === "new").length}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Emails Dispatched:</span>
                  <span className="font-semibold text-emerald-600">{stats?.totalEmailsSent ?? 0}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Active Deals:</span>
                  <span className="font-semibold text-amber-600">{(stats?.contacted ?? 0) + (stats?.inReview ?? 0)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Bottom: Status Widget & Profile */}
        <div className="p-3.5 border-t border-slate-200/80 space-y-2.5 bg-slate-50/50">
          
          {/* Mini Server Health Indicator */}
          {!sidebarCollapsed && (
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 font-normal">
                  <Server size={13} className="text-blue-500" /> Supabase DB
                </span>
                <span className="text-emerald-700 font-semibold text-xs">Live Sync</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 font-normal">
                  <Mail size={13} className="text-amber-500" /> Resend Email
                </span>
                <span className="text-emerald-700 font-semibold text-xs">Active</span>
              </div>
            </div>
          )}

          {/* Website Link */}
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors group"
          >
            <ExternalLink size={15} className="shrink-0 group-hover:text-amber-600 transition-colors" />
            {!sidebarCollapsed && <span className="truncate font-medium text-xs">View Live Website</span>}
          </Link>

          {/* Admin User Card & Logout */}
          <div
            className={`flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!sidebarCollapsed && (
              <div className="min-w-0 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  LP
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-900 truncate">{currentUser?.name || "Lead Producer"}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email || "admin@virtuein.agency"}</p>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ══ 2. RIGHT MAIN WORKSPACE (FULL-WIDTH ENQUIRIES DASHBOARD) ══ */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">

        {/* Top App Bar */}
        <header className="h-16 px-6 border-b border-slate-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between shrink-0 z-20 shadow-2xs">
          
          {/* Section Title */}
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
            <h2 className="text-base font-semibold text-slate-900 capitalize truncate">
              Enquiries &amp; Lead Management
            </h2>
          </div>

          {/* Right Status & Actions */}
          <div className="flex items-center gap-3">
            {/* Live Clock */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
              <Clock size={14} className="text-amber-600" />
              <span>{currentTime} IST</span>
            </div>

            {/* Quick Refresh */}
            <button
              onClick={loadData}
              disabled={loading}
              title="Refresh Data"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-amber-600" : ""} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            {/* Add Test Lead */}
            <button
              onClick={handleCreateTestLead}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus size={14} className="text-amber-400" />
              <span>Add Test Lead</span>
            </button>
          </div>
        </header>

        {/* Dynamic Single-Screen View */}
        <main className="flex-1 p-5 flex flex-col min-h-0 overflow-hidden gap-3.5">

          {/* Row 1: Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 shrink-0">
            {[
              { label: "Total Enquiries", value: stats?.total ?? enquiries.length, icon: FileText, color: "#0F172A", bgIcon: "bg-slate-100 text-slate-800" },
              { label: "New Leads", value: stats?.new ?? enquiries.filter((e) => e.status === "new").length, icon: Sparkles, color: "#2563EB", bgIcon: "bg-blue-50 text-blue-600" },
              { label: "Resend Emails Sent", value: stats?.totalEmailsSent ?? 0, icon: Send, color: "#059669", bgIcon: "bg-emerald-50 text-emerald-600" },
              { label: "Active Deals", value: (stats?.contacted ?? 0) + (stats?.inReview ?? 0), icon: Users, color: "#D97706", bgIcon: "bg-amber-50 text-amber-600" },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200/90 rounded-xl px-5 py-3.5 flex items-center justify-between relative overflow-hidden shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2.5px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
                  />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bgIcon}`}>
                    <Icon size={18} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Search & Status Filter Bar */}
          <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 shadow-2xs">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { key: "all", label: "All" },
                { key: "new", label: "New Leads" },
                { key: "in_review", label: "In Review" },
                { key: "contacted", label: "Contacted" },
                { key: "mail_sent", label: "Mail Sent" },
                { key: "archived", label: "Archived" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    statusFilter === tab.key
                      ? "bg-slate-900 text-white shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client name, email, venue..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Row 3: Internal Scroll Table (With comfortable increased font sizes) */}
          <div className="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs flex flex-col">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <RefreshCw size={26} className="animate-spin text-slate-600 mb-2.5" />
                <p className="text-slate-500 text-sm">Fetching live enquiries from Supabase Database...</p>
              </div>
            ) : enquiries.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <Inbox size={38} className="text-slate-300 mb-2.5" />
                <h3 className="text-sm font-semibold text-slate-700 mb-1">No enquiries found</h3>
                <p className="text-slate-500 text-xs max-w-xs mb-3.5">
                  {searchQuery || statusFilter !== "all"
                    ? "Try resetting your search query or status filter."
                    : "Submit an enquiry on the /contact form or click 'Add Test Lead'."}
                </p>
                <button
                  onClick={handleCreateTestLead}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs shadow hover:bg-slate-800 cursor-pointer"
                >
                  <Plus size={14} className="text-amber-400" /> Add Test Lead
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-slate-200 bg-slate-50/95 text-xs font-semibold uppercase tracking-wider text-slate-500 shadow-2xs backdrop-blur-sm">
                      <th className="py-3.5 px-5">Client &amp; Contact</th>
                      <th className="py-3.5 px-5">Event Specifications</th>
                      <th className="py-3.5 px-5">Budget &amp; Date</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5">Resend History</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm bg-white">
                    {enquiries.map((item) => {
                      const mailCount = item.mail_history?.length || 0;

                      return (
                        <tr
                          key={item.id}
                          onClick={() => openEnquiryDetails(item)}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                        >
                          {/* Client & Company */}
                          <td className="py-3.5 px-5">
                            <div className="font-semibold text-slate-900 text-sm group-hover:text-amber-600 transition-colors flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-semibold text-slate-700 text-xs shrink-0">
                                {item.name.charAt(0)}
                              </div>
                              <span className="truncate">{item.name}</span>
                            </div>
                            <div className="text-slate-600 text-xs flex items-center gap-1.5 mt-1 ml-9.5 truncate font-normal">
                              <Building2 size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate">{item.company}</span>
                            </div>
                            <div className="text-slate-400 text-xs mt-0.5 ml-9.5 truncate">
                              {item.email} • {item.country_code || "+91"} {item.phone}
                            </div>
                          </td>

                          {/* Event Specifications */}
                          <td className="py-3.5 px-5">
                            <span className="font-medium text-slate-800 text-sm block truncate max-w-[200px]">
                              {item.event_type}
                            </span>
                            <span className="text-slate-500 text-xs flex items-center gap-1.5 mt-1 truncate max-w-[200px]">
                              <MapPin size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate">{item.venue}</span>
                            </span>
                          </td>

                          {/* Budget & Date */}
                          <td className="py-3.5 px-5">
                            <span className="font-semibold text-amber-700 text-sm block">
                              {item.budget || "Flexible"}
                            </span>
                            <span className="text-slate-500 text-xs flex items-center gap-1.5 mt-1">
                              <Calendar size={12} className="text-slate-400 shrink-0" />
                              <span>{item.preferred_date || "Flexible"}</span>
                            </span>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-5" onClick={(e) => e.stopPropagation()}>
                            <StatusDropdown
                              currentStatus={item.status}
                              onStatusChange={(newSt) => handleStatusChange(item.id, newSt)}
                            />
                          </td>

                          {/* Mail Count */}
                          <td className="py-3.5 px-5">
                            {mailCount > 0 ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-xs">
                                <Send size={11} /> {mailCount} Sent
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs">0 mails</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => openMailComposer(item)}
                                title="Send Email via Resend"
                                className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                              >
                                <Mail size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => openEnquiryDetails(item)}
                                title="View Details"
                                className="p-2 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-all cursor-pointer"
                              >
                                <ChevronRight size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteEnquiry(item.id)}
                                title="Delete Enquiry"
                                className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* ══ ENQUIRY DETAILS & RESEND MAIL DRAWER ══════════════ */}
      <AnimatePresence>
        {selectedEnquiry && !mailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50/80 shrink-0">
                <div className="flex items-center gap-2.5">
                  <StatusDropdown
                    currentStatus={selectedEnquiry.status}
                    onStatusChange={(newSt) => handleStatusChange(selectedEnquiry.id, newSt)}
                  />
                  <span className="text-slate-500 text-xs font-normal">
                    {new Date(selectedEnquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto space-y-4.5 custom-scrollbar">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedEnquiry.name}</h2>
                    <p className="text-sm font-semibold text-amber-700">{selectedEnquiry.company}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-600 font-normal">
                      <span>📧 {selectedEnquiry.email}</span>
                      <span>📞 {selectedEnquiry.country_code || "+91"} {selectedEnquiry.phone}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openMailComposer(selectedEnquiry)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    <Mail size={14} className="text-amber-400" /> Send Mail via Resend
                  </button>
                </div>

                {/* Event Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3">
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Event Type</p>
                    <p className="text-sm font-medium text-slate-800 mt-1 truncate">{selectedEnquiry.event_type}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3">
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Venue</p>
                    <p className="text-sm font-medium text-slate-800 mt-1 truncate">{selectedEnquiry.venue}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3">
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Budget</p>
                    <p className="text-sm font-semibold text-amber-700 mt-1">{selectedEnquiry.budget || "Flexible"}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3">
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Guests</p>
                    <p className="text-sm font-medium text-slate-800 mt-1">{selectedEnquiry.team_size || "N/A"}</p>
                  </div>
                </div>

                {/* Resend Mail History Log */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail size={13} className="text-amber-600" /> Resend Email History
                  </h4>
                  {selectedEnquiry.mail_history && selectedEnquiry.mail_history.length > 0 ? (
                    <div className="space-y-2">
                      {selectedEnquiry.mail_history.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 flex items-start justify-between text-xs"
                        >
                          <div>
                            <p className="font-medium text-slate-800 text-xs">{m.subject}</p>
                            <p className="text-slate-400 text-xs mt-1">
                              {new Date(m.sent_at).toLocaleString()}
                            </p>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Sent
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3 text-center text-xs text-slate-400">
                      No outgoing emails dispatched to this client yet.
                    </div>
                  )}
                </div>

                {/* Admin Internal Notes */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                    Internal Admin Notes
                  </h4>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes about this client..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-normal"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-medium text-xs transition-colors cursor-pointer"
                    >
                      {isSavingNotes ? "Saving..." : "Save Notes"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══ RESEND EMAIL COMPOSER MODAL ════════════════════════ */}
      <AnimatePresence>
        {mailModalOpen && selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMailModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl z-10 max-h-[92vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50/80 shrink-0">
                <div className="flex items-center gap-2.5">
                  <Mail size={17} className="text-amber-600" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Send Email via Resend</h3>
                    <p className="text-xs text-slate-500">
                      To: <span className="text-slate-800 font-medium">{selectedEnquiry.email}</span> ({selectedEnquiry.name})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMailModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
                {mailFeedback && (
                  <div
                    className={`p-3.5 rounded-lg text-xs flex items-start gap-2.5 border ${
                      mailFeedback.success
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {mailFeedback.success ? (
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={15} className="text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{mailFeedback.success ? "Success" : "Error"}</p>
                      <p className="mt-0.5 text-xs">{mailFeedback.message}</p>
                    </div>
                  </div>
                )}

                {/* Template Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Select Email Template
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {mailTemplates.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleTemplateSelect(tpl.id)}
                        className={`p-3 rounded-lg text-left border text-xs transition-all cursor-pointer ${
                          selectedTemplate === tpl.id
                            ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold shadow-2xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        {tpl.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={mailSubject}
                    onChange={(e) => setMailSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-normal"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Content (Virtue IN Light Template automatically applied)
                  </label>
                  <textarea
                    rows={5}
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-mono leading-relaxed focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                {/* Footer Send */}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-slate-400">
                    Dispatched from <strong className="text-slate-600 font-medium">onboarding@resend.dev</strong>
                  </p>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={isSendingMail}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSendingMail ? (
                      <>
                        <RefreshCw size={13} className="animate-spin text-amber-400" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={13} className="text-amber-400" /> Send Email Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
