"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  Layers,
  Image as ImageIcon,
  Edit2,
  Eye,
  Cloud,
} from "lucide-react";
import {
  fetchEnquiries,
  fetchProjects,
  fetchGallery,
  fetchDashboardStats,
  updateEnquiryStatus,
  deleteEnquiry,
  createProject,
  updateProject,
  deleteProject,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  sendEmailViaResend,
  submitEnquiry,
  EnquiryItem,
  ProjectItem,
  GalleryItem,
  DashboardStats,
} from "@/lib/api";
import { isAuthenticated, getCurrentAdmin, logoutAdmin, AdminUser } from "@/lib/auth";
import ProjectFormModal from "@/components/ProjectFormModal";
import GalleryFormModal from "@/components/GalleryFormModal";

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
];

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

  // Active Workspace Tab: 'enquiries' | 'projects' | 'gallery'
  const [activeTab, setActiveTab] = useState<"enquiries" | "projects" | "gallery">("enquiries");

  // Data states
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modals state
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);

  // Mail Modal State
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("proposal");
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [mailFeedback, setMailFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Notes state
  const [adminNotes, setAdminNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Live time
  const [currentTime, setCurrentTime] = useState("");

  // Check auth
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setCurrentUser(getCurrentAdmin());
      setAuthChecked(true);
    }
  }, [router]);

  // Live clock
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

  // Load all data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [enqRes, projRes, galRes, statsRes] = await Promise.all([
        fetchEnquiries({ status: statusFilter, search: searchQuery }),
        fetchProjects({ category: categoryFilter, search: searchQuery }),
        fetchGallery(),
        fetchDashboardStats(),
      ]);

      if (enqRes.success) setEnquiries(enqRes.enquiries || []);
      if (projRes.success) setProjects(projRes.projects || []);
      if (galRes.success) setGallery(galRes.items || []);
      if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, searchQuery]);

  useEffect(() => {
    if (authChecked) {
      loadData();
    }
  }, [authChecked, loadData]);

  // Logout handler
  const handleLogout = () => {
    logoutAdmin();
    router.push("/login");
  };

  // ── Project CMS Handlers ──
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (p: ProjectItem) => {
    setEditingProject(p);
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (projectData: ProjectItem) => {
    if (editingProject?.id) {
      const res = await updateProject(editingProject.id, projectData);
      if (res.success && res.project) {
        setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? res.project! : p)));
      }
    } else {
      const res = await createProject(projectData);
      if (res.success && res.project) {
        setProjects((prev) => [res.project!, ...prev]);
      }
    }
    loadData();
  };

  const handleDeleteProject = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      loadData();
    }
  };

  // ── Gallery CMS Handlers ──
  const handleOpenAddGallery = () => {
    setEditingGallery(null);
    setGalleryModalOpen(true);
  };

  const handleOpenEditGallery = (g: GalleryItem) => {
    setEditingGallery(g);
    setGalleryModalOpen(true);
  };

  const handleSaveGallery = async (galleryData: GalleryItem) => {
    if (editingGallery?.id) {
      const res = await updateGalleryItem(editingGallery.id, galleryData);
      if (res.success && res.item) {
        setGallery((prev) => prev.map((g) => (g.id === editingGallery.id ? res.item! : g)));
      }
    } else {
      const res = await createGalleryItem(galleryData);
      if (res.success && res.item) {
        setGallery((prev) => [res.item!, ...prev]);
      }
    }
    loadData();
  };

  const handleDeleteGallery = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    const res = await deleteGalleryItem(id);
    if (res.success) {
      setGallery((prev) => prev.filter((g) => g.id !== id));
      loadData();
    }
  };

  // ── Enquiries Handlers ──
  const openEnquiryDetails = (enquiry: EnquiryItem) => {
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.notes || "");
  };

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryItem["status"]) => {
    const res = await updateEnquiryStatus(enquiryId, { status: newStatus });
    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      loadData();
    }
  };

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

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    const res = await deleteEnquiry(id);
    if (res.success) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      loadData();
    }
  };

  const openMailComposer = (enquiry: EnquiryItem, templateId = "proposal") => {
    setSelectedEnquiry(enquiry);
    setSelectedTemplate(templateId);
    const tpl = mailTemplates.find((t) => t.id === templateId) || mailTemplates[0];
    setMailSubject(tpl.subject);
    setMailMessage(tpl.getMessage(enquiry));
    setMailFeedback(null);
    setMailModalOpen(true);
  };

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
        loadData();
      } else {
        setMailFeedback({
          success: false,
          message: res.error || "Failed to send email.",
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
      
      {/* ══ 1. UNIFIED ADMIN SIDEBAR ══════════════════════════ */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } h-full bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 shrink-0 z-30 shadow-sm relative`}
      >
        <div>
          {/* Brand Bar */}
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

          {/* Core Navigation Items */}
          <div className="p-3.5 space-y-1.5">
            {!sidebarCollapsed && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Workspace Modules
              </p>
            )}

            {/* Tab 1: Enquiries & Leads */}
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "enquiries"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Inbox size={18} className={activeTab === "enquiries" ? "text-amber-400" : "text-slate-500"} />
              {!sidebarCollapsed && <span className="truncate flex-1 text-left">Leads &amp; Enquiries</span>}
              {!sidebarCollapsed && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200/60 text-slate-700">
                  {enquiries.length}
                </span>
              )}
            </button>

            {/* Tab 2: Projects CMS */}
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Sparkles size={18} className={activeTab === "projects" ? "text-amber-400" : "text-slate-500"} />
              {!sidebarCollapsed && <span className="truncate flex-1 text-left">Projects CMS</span>}
              {!sidebarCollapsed && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200/60 text-slate-700">
                  {projects.length}
                </span>
              )}
            </button>

            {/* Tab 3: Gallery CMS */}
            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <ImageIcon size={18} className={activeTab === "gallery" ? "text-amber-400" : "text-slate-500"} />
              {!sidebarCollapsed && <span className="truncate flex-1 text-left">Gallery CMS</span>}
              {!sidebarCollapsed && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200/60 text-slate-700">
                  {gallery.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Bottom */}
        <div className="p-3.5 border-t border-slate-200/80 space-y-2.5 bg-slate-50/50">
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
                  <Cloud size={13} className="text-amber-500" /> Cloudflare R2
                </span>
                <span className="text-emerald-700 font-semibold text-xs">Connected</span>
              </div>
            </div>
          )}

          <Link
            href="http://localhost:3000"
            target="_blank"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors group"
          >
            <ExternalLink size={15} className="shrink-0 group-hover:text-amber-600 transition-colors" />
            {!sidebarCollapsed && <span className="truncate font-medium text-xs">View Live Website</span>}
          </Link>

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

      {/* ══ 2. RIGHT WORKSPACE CONTENT ════════════════════════ */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        
        {/* Top Header */}
        <header className="h-16 px-6 border-b border-slate-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between shrink-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
            <h2 className="text-base font-semibold text-slate-900 capitalize truncate">
              {activeTab === "enquiries" && "Enquiries & Lead Management"}
              {activeTab === "projects" && "Projects & Event Showcase CMS"}
              {activeTab === "gallery" && "Gallery Media & Photo CMS"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
              <Clock size={14} className="text-amber-600" />
              <span>{currentTime} IST</span>
            </div>

            <button
              onClick={loadData}
              disabled={loading}
              title="Refresh Data"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-amber-600" : ""} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            {activeTab === "enquiries" && (
              <button
                onClick={handleCreateTestLead}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span>Add Test Lead</span>
              </button>
            )}

            {activeTab === "projects" && (
              <button
                onClick={handleOpenAddProject}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span>Add Project</span>
              </button>
            )}

            {activeTab === "gallery" && (
              <button
                onClick={handleOpenAddGallery}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span>Add Photo</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <main className="flex-1 p-5 flex flex-col min-h-0 overflow-hidden gap-3.5">
          
          {/* Row 1: Metrics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 shrink-0">
            {[
              { label: "Total Enquiries", value: stats?.total ?? enquiries.length, icon: FileText, color: "#0F172A", bgIcon: "bg-slate-100 text-slate-800" },
              { label: "Live Projects", value: stats?.totalProjects ?? projects.length, icon: Sparkles, color: "#D97706", bgIcon: "bg-amber-50 text-amber-600" },
              { label: "Gallery Photos", value: stats?.totalGalleryItems ?? gallery.length, icon: ImageIcon, color: "#2563EB", bgIcon: "bg-blue-50 text-blue-600" },
              { label: "Resend Emails Sent", value: stats?.totalEmailsSent ?? 0, icon: Send, color: "#059669", bgIcon: "bg-emerald-50 text-emerald-600" },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200/90 rounded-xl px-5 py-3.5 flex items-center justify-between relative overflow-hidden shadow-2xs"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2.5px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
                  />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bgIcon}`}>
                    <Icon size={18} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ══════════════════════════════════════════════════════
              TAB 1: ENQUIRIES & LEADS VIEW
          ══════════════════════════════════════════════════════ */}
          {activeTab === "enquiries" && (
            <>
              <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 shadow-2xs">
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

                <div className="relative w-full sm:w-80">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client name, email, venue..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs flex flex-col">
                {loading ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <RefreshCw size={26} className="animate-spin text-slate-600 mb-2.5" />
                    <p className="text-slate-500 text-sm">Fetching enquiries from Supabase...</p>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <Inbox size={38} className="text-slate-300 mb-2.5" />
                    <h3 className="text-sm font-semibold text-slate-700 mb-1">No enquiries found</h3>
                    <button
                      onClick={handleCreateTestLead}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs shadow hover:bg-slate-800 cursor-pointer"
                    >
                      <Plus size={14} className="text-amber-400" /> Add Test Lead
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 z-10 bg-slate-50/95 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 backdrop-blur-sm">
                        <tr>
                          <th className="py-3.5 px-5">Client &amp; Contact</th>
                          <th className="py-3.5 px-5">Event Specifications</th>
                          <th className="py-3.5 px-5">Budget &amp; Date</th>
                          <th className="py-3.5 px-5">Status</th>
                          <th className="py-3.5 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm bg-white">
                        {enquiries.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() => openEnquiryDetails(item)}
                            className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                          >
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

                            <td className="py-3.5 px-5">
                              <span className="font-medium text-slate-800 text-sm block truncate max-w-[200px]">
                                {item.event_type}
                              </span>
                              <span className="text-slate-500 text-xs flex items-center gap-1.5 mt-1 truncate max-w-[200px]">
                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                <span className="truncate">{item.venue}</span>
                              </span>
                            </td>

                            <td className="py-3.5 px-5">
                              <span className="font-semibold text-amber-700 text-sm block">
                                {item.budget || "Flexible"}
                              </span>
                              <span className="text-slate-500 text-xs flex items-center gap-1.5 mt-1">
                                <Calendar size={12} className="text-slate-400 shrink-0" />
                                <span>{item.preferred_date || "Flexible"}</span>
                              </span>
                            </td>

                            <td className="py-3.5 px-5" onClick={(e) => e.stopPropagation()}>
                              <StatusDropdown
                                currentStatus={item.status}
                                onStatusChange={(newSt) => handleStatusChange(item.id, newSt)}
                              />
                            </td>

                            <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openMailComposer(item)}
                                  className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                                  title="Send Email via Resend"
                                >
                                  <Mail size={15} />
                                </button>
                                <button
                                  onClick={() => handleDeleteEnquiry(item.id)}
                                  className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                  title="Delete Enquiry"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 2: PROJECTS & EVENT SHOWCASE CMS
          ══════════════════════════════════════════════════════ */}
          {activeTab === "projects" && (
            <>
              {/* Category Filter & Search */}
              <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 shadow-2xs">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {["All", "Corporate", "Product Launch", "Entertainment", "Automotive"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        categoryFilter === cat
                          ? "bg-slate-900 text-white shadow-2xs font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-80">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects by title..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Projects Grid */}
              <div className="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl p-5 overflow-y-auto shadow-2xs custom-scrollbar">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <RefreshCw size={26} className="animate-spin text-slate-600 mb-2.5" />
                    <p className="text-slate-500 text-sm">Loading projects from Supabase &amp; Cloudflare R2...</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <Sparkles size={38} className="text-slate-300 mb-2.5" />
                    <h3 className="text-sm font-semibold text-slate-700 mb-1">No projects added yet</h3>
                    <button
                      onClick={handleOpenAddProject}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs shadow hover:bg-slate-800 cursor-pointer"
                    >
                      <Plus size={14} className="text-amber-400" /> Create First Project
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col group"
                      >
                        {/* Cover Image */}
                        <div className="relative h-44 bg-slate-200 overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                            {p.category}
                          </div>
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                            <ImageIcon size={10} />
                            {p.gallery?.length || 1} photos
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">{p.title}</h4>
                            <p className="text-xs text-amber-700 font-semibold line-clamp-1 mb-3">{p.subtitle}</p>

                            <div className="space-y-1.5 text-xs text-slate-500 mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar size={12} className="text-slate-400 shrink-0" />
                                <span>{p.date} {p.month} 2026</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                <span className="truncate">{p.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 size={12} /> Live on Website
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditProject(p)}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
                                title="Edit Project Details"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(p.id!)}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-2xs cursor-pointer"
                                title="Delete Project"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 3: GALLERY MEDIA & PHOTO CMS
          ══════════════════════════════════════════════════════ */}
          {activeTab === "gallery" && (
            <div className="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl p-5 overflow-y-auto shadow-2xs custom-scrollbar flex flex-col">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <RefreshCw size={26} className="animate-spin text-slate-600 mb-2.5" />
                  <p className="text-slate-500 text-sm">Loading gallery photos from Cloudflare R2...</p>
                </div>
              ) : gallery.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <ImageIcon size={38} className="text-slate-300 mb-2.5" />
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">No gallery photos yet</h3>
                  <button
                    onClick={handleOpenAddGallery}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs shadow hover:bg-slate-800 cursor-pointer"
                  >
                    <Plus size={14} className="text-amber-400" /> Upload First Photo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.map((g) => (
                    <div
                      key={g.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="relative aspect-4/3 bg-slate-200 overflow-hidden">
                        <Image
                          src={g.img}
                          alt={g.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase">
                          {g.type}
                        </div>
                      </div>

                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs truncate">{g.title}</h4>
                          <p className="text-[11px] text-amber-700 font-medium truncate mt-0.5">{g.date}</p>
                        </div>

                        <div className="pt-2.5 mt-2 border-t border-slate-200 flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditGallery(g)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Gallery Item"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(g.id!)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* ══ 3. MODALS ════════════════════════════════════════ */}

      {/* Project Form Modal (Add / Edit) */}
      <ProjectFormModal
        isOpen={projectModalOpen}
        project={editingProject}
        onClose={() => setProjectModalOpen(false)}
        onSave={handleSaveProject}
      />

      {/* Gallery Form Modal (Add / Edit) */}
      <GalleryFormModal
        isOpen={galleryModalOpen}
        item={editingGallery}
        onClose={() => setGalleryModalOpen(false)}
        onSave={handleSaveGallery}
      />

      {/* Resend Email Composer Modal */}
      {mailModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                  <Send size={15} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Dispatch Email via Resend</h3>
                  <p className="text-xs text-slate-500">To: {selectedEnquiry.email}</p>
                </div>
              </div>
              <button
                onClick={() => setMailModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
              {mailFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold border ${
                    mailFeedback.success
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  {mailFeedback.message}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Message Body
                </label>
                <textarea
                  rows={8}
                  value={mailMessage}
                  onChange={(e) => setMailMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed font-normal focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setMailModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isSendingMail}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow"
              >
                {isSendingMail ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
