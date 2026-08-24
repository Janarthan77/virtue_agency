# 🏛️ Virtue IN Agency - Monorepo Architecture

Production-grade event management, luxury brand experiences, and portfolio platform with dedicated **Frontend Website**, **Admin CMS Suite**, and **Node.js + TypeScript Backend**.

---

## 📁 Project Structure

```text
virtue_agency/
├── frontend/
│   ├── website/                    # Next.js 16 (Client-Facing Public Website)
│   │   ├── src/app/                # Pages (Home, About, Services, Portfolio, Contact)
│   │   ├── src/components/         # HeroSlider, ProjectsSection, GallerySection, EventDetailsModal
│   │   └── package.json            # Port 3000
│   │
│   └── admin/                      # Next.js 16 (Admin & CMS Management Suite)
│       ├── src/app/                # Admin Hub (Leads Manager, Projects CMS, Gallery CMS)
│       ├── src/components/         # ProjectFormModal, GalleryFormModal, Cloudflare Uploader
│       └── package.json            # Port 3001
│
├── backend/                        # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── controllers/            # Projects, Gallery, Enquiries, Upload, Email, Stats
│   │   ├── routes/                 # Express REST Endpoints
│   │   ├── services/               # Cloudflare R2 (@aws-sdk/client-s3), Supabase, Resend
│   │   ├── scripts/                # Database seed script
│   │   └── server.ts               # Express entrypoint on Port 5000
│   ├── schema.sql                  # Supabase PostgreSQL Table Schemas & Policies
│   └── package.json
│
├── package.json                    # Monorepo Workspace Configuration
└── README.md
```

---

## 🚀 Quick Start & Development

Install all dependencies across all packages with a single command from root:

```bash
npm install
```

### Start Services

You can run each service independently or concurrently:

| Service | Command | Port | Description |
| :--- | :--- | :--- | :--- |
| **Backend API** | `npm run dev:backend` | `http://localhost:5000` | Node.js Express REST API & Cloudflare R2 / Supabase |
| **Public Website** | `npm run dev:website` | `http://localhost:3000` | Client-facing agency showcase website |
| **Admin CMS** | `npm run dev:admin` | `http://localhost:3001` | Dedicated Admin dashboard, Projects & Gallery CMS |

---

## ☁️ Cloudflare R2 & Supabase Setup

### 1. Database (Supabase PostgreSQL)
1. Open [Supabase Dashboard](https://supabase.com/dashboard) and go to the **SQL Editor**.
2. Copy and execute the contents of [`backend/schema.sql`](file:///c:/Users/Admin/Documents/GitHub/virtue_agency/backend/schema.sql) to create `projects`, `gallery`, and `enquiries` tables with RLS policies.
3. (Optional) Run `npm run seed` to populate initial projects and gallery records.

### 2. Cloudflare R2 Storage (S3-Compatible)
In `backend/.env`, configure your Cloudflare R2 credentials:
```env
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key
CLOUDFLARE_R2_BUCKET_NAME=virtue-agency
CLOUDFLARE_R2_PUBLIC_DOMAIN=https://pub-e796496b65134e82b311969a354b7898.r2.dev
```

---

## 🛠️ Admin CMS Capabilities
- **Projects CMS**: Add, edit, and delete event showcase projects with full metadata (Category, Title, Subtitle, Date, Timings, Venue, Event Overview description, Deliverables tags, Cover photo, and Multi-image gallery slider).
- **Gallery CMS**: Add, edit, and delete photos and videos with masonry grid spanning layout selector.
- **Direct Uploads**: Drag and drop images directly into the admin panel; images are streamed to Cloudflare R2 and only public CDN links are stored in Supabase.
- **Leads & CRM**: Real-time enquiry tracker with status workflow and one-click email composer using Resend.
