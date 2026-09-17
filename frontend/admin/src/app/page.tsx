"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Mail,
  Send,
  Search,
  RefreshCw,
  Clock,
  Building2,
  MapPin,
  Calendar,
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
  Settings,
  Globe,
  Save,
  CalendarDays,
  Mic,
  ClipboardCheck,
  Building,
  Palette,
  Music,
  Hammer,
  Store,
  Megaphone,
  Activity,
  PenTool,
  Radio,
  Camera,
  Video,
  Award,
  Shield,
  Zap,
  Quote,
  Star,
} from "lucide-react";
import {
  fetchEnquiries,
  fetchProjects,
  fetchGallery,
  fetchServices,
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
  DEFAULT_ADMIN_SERVICES,
  DEFAULT_ADMIN_SETTINGS,
  fetchCompanySettings,
  fetchDashboardStats,
  updateEnquiryStatus,
  deleteEnquiry,
  createProject,
  updateProject,
  deleteProject,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  createService,
  updateService,
  deleteService,
  updateCompanySettings,
  sendEmailViaResend,
  submitEnquiry,
  EnquiryItem,
  ProjectItem,
  GalleryItem,
  ServiceItem,
  ReviewItem,
  CompanySettings,
  DashboardStats,
} from "@/lib/api";
import { isAuthenticated, getCurrentAdmin, logoutAdmin, AdminUser } from "@/lib/auth";
import ProjectFormModal from "@/components/ProjectFormModal";
import GalleryFormModal from "@/components/GalleryFormModal";
import ServiceFormModal from "@/components/ServiceFormModal";
import ReviewFormModal from "@/components/ReviewFormModal";

// Helper map to dynamically render Lucide icon by string name
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  CalendarDays,
  Settings,
  Mic,
  ClipboardCheck,
  MapPin,
  Building,
  Palette,
  Music,
  Hammer,
  Store,
  Megaphone,
  Activity,
  Globe,
  PenTool,
  Radio,
  Sparkles,
  Camera,
  Video,
  Award,
  Shield,
  Zap,
  Users,
  Layers,
};

function DynamicIcon({ name, size = 18, style, className }: { name?: string; size?: number; style?: React.CSSProperties; className?: string }) {
  const IconComp = (name && ICON_MAP[name]) ? ICON_MAP[name] : Sparkles;
  return <IconComp size={size} style={style} className={className} />;
}

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

const getInitials = (name?: string) => {
  if (!name) return "VI";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function AdminPortal() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<"enquiries" | "projects" | "services" | "gallery" | "reviews" | "contact">("enquiries");

  // Data states
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_ADMIN_SERVICES);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(DEFAULT_ADMIN_SETTINGS);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>("all");

  // Modals state
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);

  // Mail Modal State
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("proposal");
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [mailFeedback, setMailFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Settings Save State
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsFeedback, setSettingsFeedback] = useState<{ success: boolean; message: string } | null>(null);

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
      const [enqRes, projRes, galRes, servRes, revRes, settRes, statsRes] = await Promise.all([
        fetchEnquiries({ status: statusFilter, search: searchQuery }),
        fetchProjects({ category: categoryFilter, search: searchQuery }),
        fetchGallery(),
        fetchServices({ search: searchQuery }),
        fetchReviews({ status: reviewStatusFilter, search: searchQuery }),
        fetchCompanySettings(),
        fetchDashboardStats(),
      ]);

      if (enqRes.success) setEnquiries(enqRes.enquiries || []);
      if (projRes.success && projRes.projects) {
        setProjects(projRes.projects);
      }
      if (galRes.success) setGallery(galRes.items || []);

      if (servRes && servRes.services && servRes.services.length > 0) {
        setServices(servRes.services);
      } else {
        setServices(DEFAULT_ADMIN_SERVICES);
      }
      if (revRes && revRes.success && revRes.reviews) {
        setReviews(revRes.reviews);
      }
      if (settRes && settRes.settings) {
        setCompanySettings(settRes.settings);
      } else {
        setCompanySettings(DEFAULT_ADMIN_SETTINGS);
      }
      if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, reviewStatusFilter, searchQuery]);

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

  // ── Services CMS Handlers ──
  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceModalOpen(true);
  };

  const handleOpenEditService = (s: ServiceItem) => {
    setEditingService(s);
    setServiceModalOpen(true);
  };

  const handleSaveService = async (serviceData: ServiceItem) => {
    if (editingService?.id) {
      const res = await updateService(editingService.id, serviceData);
      if (res.success && res.service) {
        setServices((prev) => prev.map((s) => (s.id === editingService.id ? res.service! : s)));
      }
    } else {
      const res = await createService(serviceData);
      if (res.success && res.service) {
        setServices((prev) => [...prev, res.service!]);
      }
    }
    loadData();
  };

  const handleDeleteService = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const res = await deleteService(id);
    if (res.success) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      loadData();
    }
  };

  // ── Client Reviews & Feedback Handlers ──
  const handleOpenAddReview = () => {
    setEditingReview(null);
    setReviewModalOpen(true);
  };

  const handleOpenEditReview = (r: ReviewItem) => {
    setEditingReview(r);
    setReviewModalOpen(true);
  };

  const handleSaveReview = async (reviewData: ReviewItem) => {
    if (editingReview?.id) {
      const res = await updateReview(editingReview.id, reviewData);
      if (res.success && res.review) {
        setReviews((prev) => prev.map((r) => (r.id === editingReview.id ? res.review! : r)));
      }
    } else {
      const res = await createReview(reviewData);
      if (res.success && res.review) {
        setReviews((prev) => [res.review!, ...prev]);
      }
    }
    loadData();
  };

  const handleDeleteReview = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this client review?")) return;
    const res = await deleteReview(id);
    if (res.success) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      loadData();
    }
  };

  const handleToggleReviewStatus = async (item: ReviewItem) => {
    if (!item.id) return;
    const nextStatus = item.status === "approved" ? "hidden" : "approved";
    const res = await updateReview(item.id, { status: nextStatus });
    if (res.success) {
      setReviews((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, status: nextStatus } : r))
      );
    }
  };

  // ── Contact & Company Settings Handlers ──
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    setSettingsFeedback(null);
    try {
      const res = await updateCompanySettings(companySettings);
      if (res.success) {
        setSettingsFeedback({
          success: true,
          message: "Company contact & settings updated successfully! Live website reflects all changes.",
        });
        if (res.settings) setCompanySettings(res.settings);
      } else {
        setSettingsFeedback({
          success: false,
          message: res.error || "Failed to update settings.",
        });
      }
    } catch (err: unknown) {
      setSettingsFeedback({
        success: false,
        message: err instanceof Error ? err.message : "Network error updating settings",
      });
    } finally {
      setIsSavingSettings(false);
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
      
      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ══ 1. UNIFIED ADMIN SIDEBAR (Desktop Docked + Mobile Slide-over) ══════════════════════════ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:static lg:z-30 h-full bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 shadow-2xl lg:shadow-sm shrink-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"} w-72 max-w-[85vw]`}
      >
        <div>
          {/* Brand Bar */}
          <div className={`h-16 border-b border-slate-200/80 flex items-center bg-white shrink-0 ${
            (sidebarCollapsed && !mobileSidebarOpen) ? "px-2 justify-center" : "px-4 justify-between"
          }`}>
            {(sidebarCollapsed && !mobileSidebarOpen) ? (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center font-bold text-base shadow-sm group relative transition-all cursor-pointer"
                title="Expand Sidebar"
              >
                <span className="group-hover:hidden">V</span>
                <ChevronRight size={18} className="hidden group-hover:block text-amber-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-900 text-[10px] font-black flex items-center justify-center shadow-xs">
                  <ChevronRight size={10} strokeWidth={3} />
                </span>
              </button>
            ) : (
              <>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                    V
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-sm tracking-tight text-slate-900 uppercase block leading-tight truncate">
                      V-RTUE <span className="text-amber-600 font-semibold">IN.</span>
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Admin Suite
                    </span>
                  </div>
                </div>

                {/* Desktop Collapse Toggle */}
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="hidden lg:flex w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Mobile Close Button */}
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Close Menu"
                >
                  <X size={18} />
                </button>
              </>
            )}
          </div>

          {/* Core Navigation Items */}
          <div className={`${(sidebarCollapsed && !mobileSidebarOpen) ? "p-2 space-y-2" : "p-3.5 space-y-1.5"}`}>
            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Workspace Modules
              </p>
            )}

            {[
              { id: "enquiries" as const, label: "Leads & Enquiries", icon: Inbox, badge: enquiries.length, badgeColor: "bg-slate-200/60 text-slate-700" },
              { id: "projects" as const, label: "Projects CMS", icon: Sparkles, badge: projects.length, badgeColor: "bg-slate-200/60 text-slate-700" },
              { id: "services" as const, label: "Services CMS", icon: Layers, badge: services.length, badgeColor: "bg-slate-200/60 text-slate-700" },
              { id: "gallery" as const, label: "Gallery CMS", icon: ImageIcon, badge: gallery.length, badgeColor: "bg-slate-200/60 text-slate-700" },
              { id: "reviews" as const, label: "Client Feedback", icon: Star, badge: reviews.length, badgeColor: "bg-amber-100 text-amber-800" },
              { id: "contact" as const, label: "Contact & Info", icon: Phone, badge: "Live", badgeColor: "bg-emerald-100 text-emerald-800" },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isCollapsed = sidebarCollapsed && !mobileSidebarOpen;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  title={isCollapsed ? `${item.label} (${item.badge})` : undefined}
                  className={`relative flex items-center transition-all cursor-pointer ${
                    isCollapsed
                      ? "w-11 h-11 mx-auto justify-center rounded-xl p-0"
                      : "w-full gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold"
                  } ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    size={isCollapsed ? 20 : 18}
                    className={`shrink-0 ${isActive ? "text-amber-400" : "text-slate-500"}`}
                  />

                  {!isCollapsed && (
                    <>
                      <span className="truncate flex-1 text-left">{item.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </>
                  )}

                  {/* Collapsed notification dot / mini badge */}
                  {isCollapsed && item.badge && item.badge !== 0 && (
                    <span
                      className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs ${
                        isActive ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {typeof item.badge === "number" ? item.badge : "●"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom */}
        <div className={`border-t border-slate-200/80 bg-slate-50/50 ${
          (sidebarCollapsed && !mobileSidebarOpen) ? "p-2 space-y-3" : "p-3.5 space-y-2.5"
        }`}>
          {(!sidebarCollapsed || mobileSidebarOpen) && (
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
            title={(sidebarCollapsed && !mobileSidebarOpen) ? "View Live Website" : undefined}
            className={`flex items-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors group ${
              (sidebarCollapsed && !mobileSidebarOpen)
                ? "w-11 h-11 mx-auto justify-center p-0"
                : "w-full gap-2.5 px-3 py-2 text-xs"
            }`}
          >
            <ExternalLink size={(sidebarCollapsed && !mobileSidebarOpen) ? 18 : 15} className="shrink-0 group-hover:text-amber-600 transition-colors" />
            {(!sidebarCollapsed || mobileSidebarOpen) && <span className="truncate font-medium text-xs">View Live Website</span>}
          </Link>

          {(sidebarCollapsed && !mobileSidebarOpen) ? (
            <div className="flex flex-col items-center gap-2 pt-1">
              <div
                className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs cursor-default"
                title={`${companySettings.contact_person || currentUser?.name || "Lead Producer"}\n${companySettings.email || currentUser?.email || "admin@virtuein.agency"}`}
              >
                {getInitials(companySettings.contact_person || currentUser?.name || "Lead Producer")}
              </div>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="w-10 h-10 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center cursor-pointer"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs justify-between">
              <div className="min-w-0 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {getInitials(companySettings.contact_person || currentUser?.name || "Lead Producer")}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {companySettings.contact_person || currentUser?.name || "Lead Producer"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {companySettings.email || currentUser?.email || "admin@virtuein.agency"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ══ 2. RIGHT WORKSPACE CONTENT ════════════════════════ */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        
        {/* Top Header */}
        <header className="h-16 px-3.5 sm:px-6 border-b border-slate-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between shrink-0 z-20 shadow-2xs gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
              title="Open Navigation"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>

            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0 hidden sm:block" />
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 capitalize truncate">
              {activeTab === "enquiries" && "Enquiries & Lead Management"}
              {activeTab === "projects" && "Projects & Event Showcase CMS"}
              {activeTab === "services" && "Services & Capabilities CMS"}
              {activeTab === "gallery" && "Gallery Media & Photo CMS"}
              {activeTab === "reviews" && "Client Reviews & Feedback CMS"}
              {activeTab === "contact" && "Company Contact & Website Settings"}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
              <Clock size={14} className="text-amber-600" />
              <span>{currentTime} IST</span>
            </div>

            <button
              onClick={loadData}
              disabled={loading}
              title="Refresh Data"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-amber-600" : ""} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            {activeTab === "enquiries" && (
              <button
                onClick={handleCreateTestLead}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span className="hidden sm:inline">Add Test Lead</span>
                <span className="sm:hidden">Test</span>
              </button>
            )}

            {activeTab === "projects" && (
              <button
                onClick={handleOpenAddProject}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span className="hidden sm:inline">Add Project</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}

            {activeTab === "services" && (
              <button
                onClick={handleOpenAddService}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span className="hidden sm:inline">Add Service</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}

            {activeTab === "gallery" && (
              <button
                onClick={handleOpenAddGallery}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span className="hidden sm:inline">Add Photo</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}

            {activeTab === "reviews" && (
              <button
                onClick={handleOpenAddReview}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span className="hidden sm:inline">Add Review</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}

            {activeTab === "contact" && (
              <button
                onClick={() => handleSaveSettings()}
                disabled={isSavingSettings}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                {isSavingSettings ? <RefreshCw size={13} className="animate-spin" /> : <Save size={14} className="text-amber-400" />}
                <span className="hidden sm:inline">Save Contact Settings</span>
                <span className="sm:hidden">Save</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <main className="flex-1 p-3 sm:p-5 flex flex-col min-h-0 overflow-hidden gap-2.5 sm:gap-3.5">
          
          {/* Row 1: Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 shrink-0">
            {[
              { label: "Total Enquiries", value: stats?.total ?? enquiries.length, icon: FileText, color: "#0F172A", bgIcon: "bg-slate-100 text-slate-800" },
              { label: "Live Projects", value: stats?.totalProjects ?? projects.length, icon: Sparkles, color: "#D97706", bgIcon: "bg-amber-50 text-amber-600" },
              { label: "Services CMS", value: stats?.totalServices ?? services.length, icon: Layers, color: "#059669", bgIcon: "bg-emerald-50 text-emerald-600" },
              { label: "Gallery Photos", value: stats?.totalGalleryItems ?? gallery.length, icon: ImageIcon, color: "#2563EB", bgIcon: "bg-blue-50 text-blue-600" },
              { label: "Client Reviews", value: reviews.length, icon: Star, color: "#F59E0B", bgIcon: "bg-amber-50 text-amber-600" },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200/90 rounded-xl p-3 sm:px-5 sm:py-3.5 flex items-center justify-between relative overflow-hidden shadow-2xs"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2.5px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
                  />
                  <div>
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500 truncate max-w-[120px] sm:max-w-none">{card.label}</p>
                    <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">{card.value}</p>
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bgIcon}`}>
                    <Icon size={16} />
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
                    <table className="w-full min-w-[720px] text-left border-collapse">
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
                                {item.source && (item.source.toLowerCase().includes("review") || item.source.toLowerCase().includes("feedback")) && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 shrink-0">
                                    Feedback
                                  </span>
                                )}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
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
                              {p.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin size={12} className="text-slate-400 shrink-0" />
                                  <span className="truncate">{p.location}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Building2 size={12} className="text-slate-400 shrink-0" />
                                <span>{p.client || p.category || "Corporate"}</span>
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
              TAB 3: SERVICES & CAPABILITIES CMS
          ══════════════════════════════════════════════════════ */}
          {activeTab === "services" && (
            <>
              <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Live Agency Services ({services.length})
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Live Sync
                  </span>
                </div>

                <div className="relative w-full sm:w-80">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services by title or description..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl p-5 overflow-y-auto shadow-2xs custom-scrollbar">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <RefreshCw size={26} className="animate-spin text-slate-600 mb-2.5" />
                    <p className="text-slate-500 text-sm">Loading services from Supabase...</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <Layers size={38} className="text-slate-300 mb-2.5" />
                    <h3 className="text-sm font-semibold text-slate-700 mb-1">No services found</h3>
                    <button
                      onClick={handleOpenAddService}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs shadow hover:bg-slate-800 cursor-pointer"
                    >
                      <Plus size={14} className="text-amber-400" /> Add New Service
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {services.map((s, idx) => (
                      <div
                        key={s.id || idx}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group relative overflow-hidden"
                      >
                        {/* Top Accent Line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[3px]"
                          style={{ background: s.accent_color || "#FFB800" }}
                        />

                        <div>
                          {/* Image preview thumbnail */}
                          {s.image && (
                            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3.5 bg-slate-200">
                              <Image
                                src={s.image}
                                alt={s.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                          )}

                          {/* Header row: Icon & Number */}
                          <div className="flex items-center justify-between gap-3 mb-3.5">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs shrink-0"
                              style={{
                                background: `${s.accent_color || "#FFB800"}20`,
                                border: `1px solid ${s.accent_color || "#FFB800"}40`,
                                color: s.accent_color === "#FFFFFF" ? "#0F172A" : (s.accent_color || "#FFB800"),
                              }}
                            >
                              <DynamicIcon name={s.icon} size={18} />
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-black tracking-wider px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
                                {s.num || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)}
                              </span>
                              {s.is_active ? (
                                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active & Live" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-slate-300" title="Draft / Inactive" />
                              )}
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="font-bold text-slate-900 text-sm leading-snug mb-1.5 line-clamp-2">
                            {s.title}
                          </h4>

                          {/* Description */}
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                            {s.description}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between mt-auto">
                          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-emerald-600" /> Website /services
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditService(s)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
                              title="Edit Service"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteService(s.id!)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-2xs cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 size={13} />
                            </button>
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
              TAB 4: GALLERY MEDIA & PHOTO CMS
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
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

          {/* ══════════════════════════════════════════════════════
              TAB 5: CLIENT REVIEWS & FEEDBACK CMS
          ══════════════════════════════════════════════════════ */}
          {activeTab === "reviews" && (
            <>
              {/* Filter bar + Search */}
              <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 shadow-2xs">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {[
                    { key: "all", label: "All Reviews" },
                    { key: "approved", label: "Approved (Live)" },
                    { key: "pending", label: "Pending Review" },
                    { key: "hidden", label: "Hidden" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setReviewStatusFilter(tab.key)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        reviewStatusFilter === tab.key
                          ? "bg-slate-900 text-white shadow-2xs font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-72">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by client, event, text..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleOpenAddReview}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer shrink-0 shadow"
                  >
                    <Plus size={14} className="text-amber-400" />
                    <span className="hidden sm:inline">Add Review</span>
                  </button>
                </div>
              </div>

              {/* Reviews Cards List Container */}
              <div className="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl p-4 overflow-y-auto shadow-2xs custom-scrollbar">
                {reviews.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-3">
                      <Quote size={28} />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Client Reviews Found</h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-4">
                      When visitors submit feedback via the website modal, reviews will appear here for approval and database synchronization.
                    </p>
                    <button
                      onClick={handleOpenAddReview}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow hover:bg-slate-800 cursor-pointer"
                    >
                      <Plus size={14} className="text-amber-400" />
                      <span>Add Manual Review</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {reviews.map((r) => {
                      const isApproved = r.status === "approved" || !r.status;
                      const isPending = r.status === "pending";
                      const isHidden = r.status === "hidden";

                      return (
                        <div
                          key={r.id}
                          className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all"
                        >
                          <div>
                            {/* Card Top: Avatar, Name, Status Badge */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-xs"
                                  style={{ backgroundColor: r.avatar_color || "#2563EB" }}
                                >
                                  {r.name ? r.name.charAt(0).toUpperCase() : "V"}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-slate-900 text-sm truncate">
                                    {r.name}
                                  </h4>
                                  <p className="text-xs text-slate-500 truncate">
                                    {r.role || "Corporate Client"}
                                  </p>
                                </div>
                              </div>

                              {/* Status Badge */}
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shrink-0 border ${
                                  isApproved
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : isPending
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-slate-100 text-slate-600 border-slate-200"
                                }`}
                              >
                                {isApproved ? "Live" : isPending ? "Pending" : "Hidden"}
                              </span>
                            </div>

                            {/* Stars Rating & Category */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, idx) => (
                                  <Star
                                    key={idx}
                                    size={13}
                                    className={
                                      idx < (r.rating || 5)
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-slate-300"
                                    }
                                  />
                                ))}
                                <span className="text-xs font-bold text-slate-700 ml-1">
                                  {r.rating || 5}.0
                                </span>
                              </div>

                              <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 capitalize">
                                {r.category || "corporate"}
                              </span>
                            </div>

                            {/* Quote Text */}
                            <p className="text-xs text-slate-700 leading-relaxed italic mb-4 line-clamp-4">
                              &ldquo;{r.text}&rdquo;
                            </p>

                            {/* Contact Details (if submitted) */}
                            {(r.email || r.phone) && (
                              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-600 space-y-0.5 mb-4">
                                {r.email && (
                                  <p className="truncate">
                                    <span className="font-semibold text-slate-700">Email:</span> {r.email}
                                  </p>
                                )}
                                {r.phone && (
                                  <p className="truncate">
                                    <span className="font-semibold text-slate-700">Phone:</span> {r.phone}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Card Footer Actions */}
                          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2 mt-auto">
                            {/* Toggle Approved / Hidden */}
                            <button
                              type="button"
                              onClick={() => handleToggleReviewStatus(r)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                                isApproved
                                  ? "bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
                              }`}
                            >
                              {isApproved ? "Hide from Web" : "Approve & Show"}
                            </button>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditReview(r)}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Edit Review"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteReview(r.id!)}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Review"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 6: CONTACT & COMPANY INFORMATION SETTINGS
          ══════════════════════════════════════════════════════ */}
          {activeTab === "contact" && (
            <div className="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl p-3.5 sm:p-6 overflow-y-auto shadow-2xs custom-scrollbar">
              <form onSubmit={handleSaveSettings} className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
                
                {settingsFeedback && (
                  <div
                    className={`p-3.5 sm:p-4 rounded-xl text-xs font-semibold border flex items-center gap-2 ${
                      settingsFeedback.success
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-red-50 text-red-800 border-red-200"
                    }`}
                  >
                    {settingsFeedback.success ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
                    <span>{settingsFeedback.message}</span>
                  </div>
                )}

                {/* Section 1: Official Emails & Phone Numbers */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                    <Mail size={18} className="text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Official Contact &amp; Dispatch Details</h3>
                      <p className="text-xs text-slate-500">
                        Primary communication channels displayed on /contact, footer, and emails
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Primary Contact Email *
                      </label>
                      <input
                        type="email"
                        value={companySettings.email || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                        placeholder="e.g. plan@virtuein.agency"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Displayed on Contact Hero &amp; Navbar</p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Alternate / Producer Email
                      </label>
                      <input
                        type="email"
                        value={companySettings.alternate_email || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, alternate_email: e.target.value })}
                        placeholder="e.g. sathish@virtueinagency.com"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Displayed in Website Footer</p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Primary Phone Number *
                      </label>
                      <input
                        type="text"
                        value={companySettings.phone || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                        placeholder="e.g. +91 74010 30000"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Direct call line on Contact Page &amp; Navbar</p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Alternate Phone / Mobile
                      </label>
                      <input
                        type="text"
                        value={companySettings.alternate_phone || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, alternate_phone: e.target.value })}
                        placeholder="e.g. +91 98843 98514"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Direct line shown in Website Footer</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Physical Office Address */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                    <MapPin size={18} className="text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Physical Office &amp; Headquarters Address</h3>
                      <p className="text-xs text-slate-500">
                        Official address rendered on Website Contact Cards &amp; Footer
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        value={companySettings.address_line1 || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, address_line1: e.target.value })}
                        placeholder="e.g. 28, Judge Jambulingam Road,"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Address Line 2 (Area / Locality)
                      </label>
                      <input
                        type="text"
                        value={companySettings.address_line2 || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, address_line2: e.target.value })}
                        placeholder="e.g. Mylapore, Chennai – 600 004"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 xl:col-span-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        State &amp; Country
                      </label>
                      <input
                        type="text"
                        value={companySettings.city_state_pin || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, city_state_pin: e.target.value })}
                        placeholder="e.g. Tamil Nadu, India"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Contact Person & Operating Hours */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                    <Building2 size={18} className="text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Lead Contact Person &amp; Working Hours</h3>
                      <p className="text-xs text-slate-500">
                        Officer designation and office timings for clients
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Contact Person Name
                      </label>
                      <input
                        type="text"
                        value={companySettings.contact_person || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, contact_person: e.target.value })}
                        placeholder="e.g. SATHISH RINGESAN"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-bold focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Displayed above contact numbers in Footer</p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Working Hours (Mon – Sat)
                      </label>
                      <input
                        type="text"
                        value={companySettings.working_hours_mon_sat || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, working_hours_mon_sat: e.target.value })}
                        placeholder="e.g. Monday – Saturday: 9:00 AM – 7:00 PM IST"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 xl:col-span-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Sunday Working Hours
                      </label>
                      <input
                        type="text"
                        value={companySettings.working_hours_sun || ""}
                        onChange={(e) => setCompanySettings({ ...companySettings, working_hours_sun: e.target.value })}
                        placeholder="e.g. Sunday: By Appointment"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Google Maps Embed URL */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                    <Globe size={18} className="text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Google Maps Embed &amp; Live Preview</h3>
                      <p className="text-xs text-slate-500">
                        Interactive Google Maps embed iframe source on /contact page
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Google Maps Iframe Embed URL
                    </label>
                    <input
                      type="text"
                      value={companySettings.map_embed_url || ""}
                      onChange={(e) => setCompanySettings({ ...companySettings, map_embed_url: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:outline-none"
                    />
                  </div>

                  {companySettings.map_embed_url && (
                    <div className="h-44 w-full rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                      <iframe
                        src={companySettings.map_embed_url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Save Button Bar */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                    <span>All changes saved here immediately synchronize across Website and Database.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs hover:bg-amber-400 transition-all shadow active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
                  >
                    {isSavingSettings ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                    <span>{isSavingSettings ? "Saving Settings..." : "Save Contact Settings"}</span>
                  </button>
                </div>

              </form>
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

      {/* Service Form Modal (Add / Edit) */}
      <ServiceFormModal
        isOpen={serviceModalOpen}
        service={editingService}
        onClose={() => setServiceModalOpen(false)}
        onSave={handleSaveService}
      />

      {/* Gallery Form Modal (Add / Edit) */}
      <GalleryFormModal
        isOpen={galleryModalOpen}
        item={editingGallery}
        onClose={() => setGalleryModalOpen(false)}
        onSave={handleSaveGallery}
      />

      {/* Review Form Modal (Add / Edit) */}
      <ReviewFormModal
        isOpen={reviewModalOpen}
        review={editingReview}
        onClose={() => setReviewModalOpen(false)}
        onSave={handleSaveReview}
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
