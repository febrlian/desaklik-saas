# DesaKlik: Complete Screen Inventory & High-Level Architecture

> **Version:** 1.0
> **Date:** 2026-05-18
> **Scope:** All touchpoints — Landing Page, Owner Panel, Village Admin, Public Pages, Citizen Mobile, Subdistrict Dashboard, Kabupaten Dashboard
> **Design System:** All screens trace back to `design.md` + relevant skills

---

## TABLE OF CONTENTS

1. [Part A: DesaKlik Landing Page](#part-a-desaklik-landing-page)
2. [Part B: DesaKlik Owner Panel (Super Admin)](#part-b-desaklik-owner-panel)
3. [Part C: Village Admin Panel (CRM)](#part-c-village-admin-panel)
4. [Part D: Public Page (Per-Village)](#part-d-public-page-per-village)
5. [Part E: Citizen Mobile App](#part-e-citizen-mobile-app)
6. [Part F: Subdistrict (Kecamatan) Dashboard](#part-f-subdistrict-dashboard)
7. [Part G: Kabupaten Dashboard](#part-g-kabupaten-dashboard)
8. [Part H: Cross-Cutting Architecture](#part-h-cross-cutting-architecture)
9. [Part I: Data Flow & Integration Map](#part-i-data-flow--integration-map)

---

# PART A: DesaKlik Landing Page

> **Skill Reference:** `landing-page.md`
> **Audience:** Prospective customers, investors, government officials, curious citizens
> **URL:** `https://desaklik.id`

---

## A.1 Navigation (Global Header)

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.1.1 Logo** | DesaKlik mark ("D" in primary circle) + wordmark | `design.md` Section 5 |
| **A.1.2 Nav Links** | Fitur \| Demo \| Harga \| Testimoni \| FAQ \| Blog | `design.md` Section 5 |
| **A.1.3 CTA Group** | "Masuk" (ghost) + "Coba Gratis" (primary) | `design.md` Section 5 |
| **A.1.4 Mobile Menu** | Sheet overlay, hamburger trigger | `mobile-app.md` Section 3 |
| **A.1.5 Scroll State** | Background blur + border-bottom on scroll | `motion-animation.md` Section 4 |

---

## A.2 Hero Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.2.1 Badge** | "Platform Desa Digital #1 di Indonesia" | `landing-page.md` Section D |
| **A.2.2 Headline** | "Kelola Desa Lebih Cerdas, Lebih Transparan, Lebih Dekat" | `landing-page.md` Section B |
| **A.2.3 Subheadline** | Value proposition paragraph | `landing-page.md` Section B |
| **A.2.4 CTA Group** | "Coba Gratis 30 Hari" (primary, 48px) + "Lihat Demo" (secondary + Play) | `landing-page.md` Section B |
| **A.2.5 Dashboard Preview** | 600x450px card with perspective tilt, floating elements | `landing-page.md` Section B |
| **A.2.6 Background Decor** | Gradient blob + subtle grid pattern | `landing-page.md` Section B |
| **A.2.7 Entrance Animation** | 9-step timed sequence | `motion-animation.md` Section 3 |

---

## A.3 Social Proof / Trust Bar

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.3.1 Label** | "Dipercaya oleh desa dan lembaga di seluruh Indonesia" | `landing-page.md` Section C |
| **A.3.2 Partner Logos** | Kemendes PDTT, Kemenkop UKM, Perkumpulan Desa Digital, BUMDes Indonesia | `landing-page.md` Section C |
| **A.3.3 Logo Hover** | Grayscale to full color, 200ms | `motion-animation.md` Section 4 |

---

## A.4 Problem Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.4.1 Eyebrow** | "MASALAH YANG DIHADAPI" | `landing-page.md` Section D |
| **A.4.2 Title** | "Mengapa Pelayanan Desa Masih Tertinggal?" | `landing-page.md` Section D |
| **A.4.3 Subtitle** | Problem description paragraph | `landing-page.md` Section D |
| **A.4.4 Pain Point Card 1** | "Surat Menumpuk" — FileStack icon, 5-7 days stat, error border | `landing-page.md` Section D |
| **A.4.5 Pain Point Card 2** | "Data Berantakan" — Database icon, 73% manual stat, warning border | `landing-page.md` Section D |
| **A.4.6 Pain Point Card 3** | "Kurang Transparan" — EyeOff icon, 12% online stat, neutral border | `landing-page.md` Section D |
| **A.4.7 Card Animation** | Fade in + slide up, stagger 100ms | `motion-animation.md` Section 7 |

---

## A.5 Solution Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.5.1 Eyebrow** | "SOLUSI KAMI" | `landing-page.md` Section E |
| **A.5.2 Title** | "Semua dalam Satu Platform" | `landing-page.md` Section E |
| **A.5.3 Feature Card 1** | "Pelayanan Surat Digital" — FileCheck icon | `landing-page.md` Section E |
| **A.5.4 Feature Card 2** | "Data Kependudukan Terpadu" — Users icon | `landing-page.md` Section E |
| **A.5.5 Feature Card 3** | "Peta Wilayah Interaktif" — Map icon | `landing-page.md` Section E |
| **A.5.6 Feature Card 4** | "Transparansi APBDes Real-Time" — Wallet icon | `landing-page.md` Section E |
| **A.5.7 Feature Card 5** | "Pengelolaan BUMDes Modern" — Store icon | `landing-page.md` Section E |
| **A.5.8 Feature Card 6** | "Multi-Desa dalam Satu Platform" — Building2 icon | `landing-page.md` Section E |
| **A.5.9 Card Hover** | Border color shift + translateY(-4px) | `motion-animation.md` Section 4 |

---

## A.6 Product Demo Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.6.1 Eyebrow** | "LIHAT SENDIRI" | `landing-page.md` Section F |
| **A.6.2 Title** | "Dashboard yang Didesain untuk Desa" | `landing-page.md` Section F |
| **A.6.3 Demo Container** | 1200px embedded dashboard or video thumbnail | `landing-page.md` Section F |
| **A.6.4 Interactive Hotspots** | Pulsing dots on dashboard preview with tooltips | `motion-animation.md` Section 9 |
| **A.6.5 Tab Switcher** | Dashboard \| Peta \| Form Surat \| APBDes | `landing-page.md` Section F |
| **A.6.6 Video Play Button** | 72px circle, primary, Play icon | `landing-page.md` Section F |

---

## A.7 Features Deep Dive (Alternating Sections)

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.7.1 Section 1** | "Buat Surat dalam 3 Menit" — Persuratan screenshot, checklist | `landing-page.md` Section G |
| **A.7.2 Section 2** | "Kelola Wilayah Secara Visual" — Peta screenshot | `landing-page.md` Section G |
| **A.7.3 Section 3** | "Warga Pantau Anggaran Real-Time" — APBDes screenshot | `landing-page.md` Section G |
| **A.7.4 Section 4** | "Kembangkan Ekonomi Desa Digital" — BUMDes screenshot | `landing-page.md` Section G |
| **A.7.5 Section 5** | "Warga Ajukan Layanan dari HP" — Citizen portal screenshot | `landing-page.md` Section G |
| **A.7.6 Section 6** | "Satu Platform, Ribuan Desa" — Multi-tenant diagram | `landing-page.md` Section G |
| **A.7.7 Scroll Animation** | Fade in + slide up, IntersectionObserver 20% | `motion-animation.md` Section 3 |

---

## A.8 Testimonials

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.8.1 Eyebrow** | "TESTIMONI" | `landing-page.md` Section H |
| **A.8.2 Title** | "Apa Kata Pengguna DesaKlik?" | `landing-page.md` Section H |
| **A.8.3 Testimonial Card 1** | Kepala Desa quote, avatar, star rating | `landing-page.md` Section H |
| **A.8.4 Testimonial Card 2** | Sekretaris quote, avatar, star rating | `landing-page.md` Section H |
| **A.8.5 Testimonial Card 3** | Warga quote, avatar, star rating | `landing-page.md` Section H |
| **A.8.6 Carousel** | Snap scroll, pagination dots, 5s auto-play | `landing-page.md` Section H |
| **A.8.7 Quote Marks** | 48px decorative, primary-200 | `landing-page.md` Section H |

---

## A.9 Stats / Impact Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.9.1 Background** | --color-primary-500 full width | `landing-page.md` Section I |
| **A.9.2 Title** | "Dampak DesaKlik di Indonesia" | `landing-page.md` Section I |
| **A.9.3 Stat 1** | "500+" Desa Terdaftar | `landing-page.md` Section I |
| **A.9.4 Stat 2** | "2.4M+" Warga Terlayani | `landing-page.md` Section I |
| **A.9.5 Stat 3** | "1.2M+" Surat Diproses | `landing-page.md` Section I |
| **A.9.6 Stat 4** | "98%" Kepuasan Pengguna | `landing-page.md` Section I |
| **A.9.7 Counter Animation** | Count up from 0, 2000ms, --ease-out | `motion-animation.md` Section 7 |
| **A.9.8 CTA** | "Daftarkan Desa Anda" white button | `landing-page.md` Section I |

---

## A.10 Pricing Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.10.1 Eyebrow** | "HARGA" | `landing-page.md` Section J |
| **A.10.2 Title** | "Investasi untuk Masa Depan Desa" | `landing-page.md` Section J |
| **A.10.3 Starter Card** | Gratis, desa <1000 jiwa, 5 features | `landing-page.md` Section J |
| **A.10.4 Pro Card** | Rp 499rb/bulan, featured, scale(1.05), shadow-xl | `landing-page.md` Section J |
| **A.10.5 Enterprise Card** | Custom, kecamatan/kabupaten, 6 features | `landing-page.md` Section J |
| **A.10.6 Feature Lists** | Check icons, strikethrough for unavailable | `landing-page.md` Section J |
| **A.10.7 FAQ Accordion** | 4 questions below pricing cards | `landing-page.md` Section J |

---

## A.11 Final CTA Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.11.1 Background** | --color-primary-500, subtle gradient shift | `landing-page.md` Section K |
| **A.11.2 Title** | "Siap Digitalisasi Desa Anda?" | `landing-page.md` Section K |
| **A.11.3 Subtitle** | Join 500+ desa | `landing-page.md` Section K |
| **A.11.4 CTA Group** | "Coba Gratis 30 Hari" white + "Jadwalkan Demo" ghost white | `landing-page.md` Section K |
| **A.11.5 Trust Text** | "Tidak perlu kartu kredit" | `landing-page.md` Section K |
| **A.11.6 Contact** | WhatsApp number with icon | `landing-page.md` Section K |
| **A.11.7 Pulse Glow** | CTA button glow animation, 2s infinite | `motion-animation.md` Section 9 |

---

## A.12 Footer

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **A.12.1 Background** | --color-neutral-900 | `landing-page.md` Section L |
| **A.12.2 Brand Column** | White logo, tagline, social icons | `landing-page.md` Section L |
| **A.12.3 Produk Column** | Fitur, Harga, Demo, Changelog, Roadmap | `landing-page.md` Section L |
| **A.12.4 Resources Column** | Dokumentasi, API, Blog, Webinar, Komunitas | `landing-page.md` Section L |
| **A.12.5 Company Column** | Tentang, Karir, Press, Kontak, Partner | `landing-page.md` Section L |
| **A.12.6 Bottom Bar** | Copyright 2026, Privacy, Terms, Security, Cookies | `landing-page.md` Section L |

---

# PART B: DesaKlik Owner Panel (Super Admin)

> **Skill Reference:** `admin-dashboard.md` (extended)
> **Audience:** DesaKlik platform owners, system administrators, business team
> **URL:** `https://admin.desaklik.id`
> **Purpose:** Manage the entire DesaKlik SaaS platform — tenants, billing, system health, analytics

---

## B.1 Authentication & Onboarding

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **B.1.1 Owner Login** | Email + password + 2FA | `design.md` Section 5 |
| **B.1.2 2FA Verification** | TOTP code input | `design.md` Section 5 |
| **B.1.3 Password Reset** | Email link flow | `form-builder.md` Section 7 |
| **B.1.4 First Setup Wizard** | Platform name, branding, super admin account | `form-builder.md` Section 5 |

---

## B.2 Dashboard Overview (Owner Home)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **B.2.1 Platform Stats Row** | Total villages, active villages, total citizens, MRR | `data-visualization.md` Section 3 |
| **B.2.2 Revenue Chart** | MRR trend, line chart, 12 months | `data-visualization.md` Section 2 |
| **B.2.3 Village Growth Chart** | New villages per month, bar chart | `data-visualization.md` Section 2 |
| **B.2.4 Churn Rate Gauge** | Percentage, color-coded | `data-visualization.md` Section 2 |
| **B.2.5 Top Performing Villages** | Table: name, citizens, requests, revenue | `admin-dashboard.md` Section 3 |
| **B.2.6 Recent Signups** | List: village name, date, plan, status | `admin-dashboard.md` Section 3 |
| **B.2.7 System Health Status** | API uptime, DB status, CDN status | `data-visualization.md` Section 2 |
| **B.2.8 Alerts & Notifications** | Critical issues, failed payments, support tickets | `admin-dashboard.md` Section 3 |

---

## B.3 Tenant (Village) Management

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **B.3.1 Village List** | Table: name, slug, plan, status, citizens, last active | `admin-dashboard.md` Section 3 |
| **B.3.2 Village Search & Filter** | By name, region, plan, status, date range | `admin-dashboard.md` Section 3 |
| **B.3.3 Village Detail Overview** | Profile card, stats, activity timeline | `admin-dashboard.md` Section 3 |
| **B.3.4 Village Settings** | Plan, billing, features enabled, custom domain | `form-builder.md` Section 6 |
| **B.3.5 Village Impersonation** | "Login as village" button for support | `admin-dashboard.md` Section 5 |
| **B.3.6 Village Suspension** | Suspend/activate, reason, duration | `form-builder.md` Section 4 |
| **B.3.7 Village Data Export** | Full data dump for migration/backup | `admin-dashboard.md` Section 3 |
| **B.3.8 Village Onboarding Tracker** | Step progress: registered to configured to active | `data-visualization.md` Section 2 |

---

## B.4 Billing & Subscription Management

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **B.4.1 Plans & Pricing Editor** | Create/edit plans: name, price, features, limits | `form-builder.md` Section 6 |
| **B.4.2 Plan Feature Matrix** | Table: plans x features, toggle enabled | `admin-dashboard.md` Section 3 |
| **B.4.3 Invoices List** | All tenant invoices, status, amount, date | `admin-dashboard.md` Section 3 |
| **B.4.4 Invoice Detail** | Line items, payment status, PDF download | `admin-dashboard.md` Section 3 |
| **B.4.5 Payment Methods** | Configured gateways (Xendit, Midtrans, etc.) | `form-builder.md` Section 6 |
| **B.4.6 Revenue Report** | Monthly breakdown, tax, discounts, refunds | `data-visualization.md` Section 6 |
| **B.4.7 Failed Payments** | List of failed auto-renewals, retry status | `admin-dashboard.md` Section 3 |
| **B.4.8 Coupons & Promotions** | Create discount codes, usage tracking | `form-builder.md` Section 6 |

---

## B.5 System Administration

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **B.5.1 User Management** | All platform users (owners, support, sales) | `admin-dashboard.md` Section 3 |
| **B.5.2 Role & Permission Editor** | RBAC matrix: roles x permissions | `admin-dashboard.md` Section 3 |
| **B.5.3 API Keys Management** | Generate, revoke, monitor API usage | `admin-dashboard.md` Section 3 |
| **B.5.4 Webhook Logs** | Incoming/outgoing webhooks, status, retries | `admin-dashboard.md` Section 3 |
| **B.5.5 System Settings** | Platform name, email, SMTP, storage, CDN | `form-builder.md` Section 6 |
| **B.5.6 Feature Flags** | Toggle features globally or per-tenant | `admin-dashboard.md` Section 3 |
| **B.5.7 Maintenance Mode** | Enable/disable, custom message, whitelist | `form-builder.md` Section 6 |
| **B.5.8 Audit Log** | All admin actions, immutable, filterable | `admin-dashboard.md` Section 3 |

---

## B.6 Analytics & Reporting

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **B.6.1 Platform Analytics Dashboard** | Combined metrics across all tenants | `data-visualization.md` Section 3 |
| **B.6.2 Usage Analytics** | API calls, storage, bandwidth per tenant | `data-visualization.md` Section 2 |
| **B.6.3 Feature Adoption** | Which features are used by which villages | `data-visualization.md` Section 2 |
| **B.6.4 Geographic Distribution** | Map: village locations across Indonesia | `data-visualization.md` Section 4 |
| **B.6.5 Retention Cohort Analysis** | Cohort table: signup month x retention | `data-visualization.md` Section 2 |
| **B.6.6 Custom Report Builder** | Drag-drop metrics, schedule, export | `data-visualization.md` Section 6 |
| **B.6.7 Real-Time Monitor** | Live connections, active users, queue depth | `data-visualization.md` Section 7 |

---

## B.7 Support & Communication

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **B.7.1 Support Tickets** | All tickets, status, priority, assignee | `admin-dashboard.md` Section 3 |
| **B.7.2 Ticket Detail** | Thread, attachments, internal notes, SLA timer | `admin-dashboard.md` Section 3 |
| **B.7.3 Announcements** | Broadcast to all/some villages | `form-builder.md` Section 6 |
| **B.7.4 Email Templates** | Edit transactional emails, variables | `form-builder.md` Section 6 |
| **B.7.5 In-App Messages** | Banners, modals, tooltips for tenants | `admin-dashboard.md` Section 3 |
| **B.7.6 Feedback Collection** | NPS, feature requests, bug reports | `form-builder.md` Section 6 |

---

# PART C: Village Admin Panel (CRM)

> **Skill Reference:** `admin-dashboard.md`
> **Audience:** Kepala Desa, Sekretaris, Kasi, Operators
> **URL:** `https://[village-slug].desaklik.id/admin`
> **Purpose:** Day-to-day village administration — population, services, documents, budget, organizations

---

## C.1 Authentication

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.1.1 Staff Login** | NIP/Email + password | `design.md` Section 5 |
| **C.1.2 Forgot Password** | Email/SMS reset flow | `form-builder.md` Section 7 |
| **C.1.3 Session Expired** | Re-authenticate modal | `motion-animation.md` Section 6 |

---

## C.2 Dashboard Home

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.2.1 Stats Row** | Total Warga, Surat Menunggu, APBDes Realisasi, Aspirasi Baru | `admin-dashboard.md` Section 3 |
| **C.2.2 Population Pyramid Chart** | Age/gender distribution, bar chart | `data-visualization.md` Section 2 |
| **C.2.3 Service Status Donut** | Pending/Processing/Completed/Rejected | `data-visualization.md` Section 2 |
| **C.2.4 Monthly Service Trend** | Line chart, 12 months | `data-visualization.md` Section 2 |
| **C.2.5 Activity Feed** | Recent actions by staff, timestamped | `admin-dashboard.md` Section 3 |
| **C.2.6 Quick Actions FAB** | + Buat Surat, + Tambah Warga, + Catat Aspirasi | `admin-dashboard.md` Section 3 |
| **C.2.7 Command Palette** | Cmd+K search across all modules | `admin-dashboard.md` Section 5 |
| **C.2.8 Notification Center** | Bell dropdown, recent 10, mark all read | `admin-dashboard.md` Section 3 |

---

## C.3 Persuratan (Letter Management)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.3.1 Surat List** | Table: No, Nomor, Jenis, Pemohon, Tanggal, Status | `admin-dashboard.md` Section 3 |
| **C.3.2 Surat Filter & Search** | By type, status, date, pemohon | `admin-dashboard.md` Section 3 |
| **C.3.3 Buat Surat Baru** | Wizard: Select template to Fill data to Preview to Generate | `form-builder.md` Section 6 |
| **C.3.4 Template Surat Gallery** | Grid: 50+ templates, categorized, preview | `admin-dashboard.md` Section 3 |
| **C.3.5 Template Editor** | Edit template content, variables, header/footer | `form-builder.md` Section 6 |
| **C.3.6 Surat Preview** | PDF preview, zoom, print, download | `admin-dashboard.md` Section 3 |
| **C.3.7 Surat Detail** | Full info, timeline, attachments, approval chain | `admin-dashboard.md` Section 3 |
| **C.3.8 Approval Workflow** | Review to Approve/Reject to Sign (TTE) to Issue | `admin-dashboard.md` Section 3 |
| **C.3.9 Arsip Surat** | Archived letters, search, bulk actions | `admin-dashboard.md` Section 3 |
| **C.3.10 Surat Analytics** | Volume by type, processing time, SLA compliance | `data-visualization.md` Section 2 |

---

## C.4 Kewilayahan (Territory & Maps)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.4.1 Peta Wilayah Full** | Interactive map, all layers, full screen | `data-visualization.md` Section 4 |
| **C.4.2 Peta Fasum** | Public facilities map, filter by type | `data-visualization.md` Section 4 |
| **C.4.3 Batas Desa Editor** | Draw/edit village boundary polygon | `data-visualization.md` Section 4 |
| **C.4.4 RT/RW Boundary Editor** | Draw neighborhood boundaries | `data-visualization.md` Section 4 |
| **C.4.5 Household Geotagging** | Pin households, validate against boundaries | `data-visualization.md` Section 4 |
| **C.4.6 Facility Management** | Add/edit/delete facilities, photos, attributes | `form-builder.md` Section 6 |
| **C.4.7 Thematic Layer Manager** | Toggle poverty, disaster, agricultural layers | `data-visualization.md` Section 4 |
| **C.4.8 Route Planner** | Optimize staff field visit routes | `data-visualization.md` Section 4 |
| **C.4.9 Map Print Export** | PDF/JPG export with legend, scale, north arrow | `data-visualization.md` Section 6 |

---

## C.5 Pemerintahan (Government Administration)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.5.1 Produk Hukum List** | Perdes, SK, Perkades table | `admin-dashboard.md` Section 3 |
| **C.5.2 Produk Hukum Editor** | Create/edit legal documents, versioning | `form-builder.md` Section 6 |
| **C.5.3 Struktur Pemdes Org Chart** | Visual org chart, drag-drop, roles | `data-visualization.md` Section 2 |
| **C.5.4 BPD Management** | Members, meetings, decisions, minutes | `admin-dashboard.md` Section 3 |
| **C.5.5 RT/RW Management** | List, contact info, area, population per unit | `admin-dashboard.md` Section 3 |
| **C.5.6 Meeting Scheduler** | Calendar, invites, room booking, reminders | `admin-dashboard.md` Section 3 |
| **C.5.7 Meeting Minutes** | Notulensi, attendance, action items, approval | `form-builder.md` Section 6 |
| **C.5.8 Voting / Musyawarah** | Digital voting, anonymous option, results | `admin-dashboard.md` Section 3 |
| **C.5.9 Aspirasi Warga** | Citizen submissions, categorization, response tracking | `admin-dashboard.md` Section 3 |
| **C.5.10 Aspirasi Analytics** | Volume by category, response time, satisfaction | `data-visualization.md` Section 2 |

---

## C.6 Publikasi (Publications)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.6.1 Kalender Desa** | Event calendar, CRUD, categories, public/private | `admin-dashboard.md` Section 3 |
| **C.6.2 Berita Editor** | Rich text, images, categories, publish schedule | `form-builder.md` Section 6 |
| **C.6.3 Artikel / Blog** | Long-form content, tags, SEO metadata | `form-builder.md` Section 6 |
| **C.6.4 Dokumentasi Gallery** | Photo albums, videos, event documentation | `admin-dashboard.md` Section 3 |
| **C.6.5 Laporan Generator** | Monthly/quarterly/annual reports, auto-compile | `data-visualization.md` Section 6 |
| **C.6.6 Pengumuman Manager** | Urgent announcements, push notification, SMS | `admin-dashboard.md` Section 3 |
| **C.6.7 Notulensi Rapat Archive** | Searchable, filter by date, type, attendees | `admin-dashboard.md` Section 3 |
| **C.6.8 Social Media Integration** | Auto-post to village Facebook/Instagram | `admin-dashboard.md` Section 3 |

---

## C.7 Kelembagaan (Community Organizations)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.7.1 Organization List** | Pengairan, Karang Taruna, Gapoktan, Gerbangmas, PKK, Rukem | `admin-dashboard.md` Section 3 |
| **C.7.2 Organization Profile** | Members, structure, activities, budget | `admin-dashboard.md` Section 3 |
| **C.7.3 Member Registry** | Add/edit members, roles, contact, household link | `form-builder.md` Section 6 |
| **C.7.4 Activity Tracking** | Events, meetings, achievements per organization | `admin-dashboard.md` Section 3 |
| **C.7.5 Budget per Organization** | Income/expense, reporting, transparency | `data-visualization.md` Section 2 |
| **C.7.6 Tokoh Masyarakat** | Community leaders registry, influence areas | `admin-dashboard.md` Section 3 |
| **C.7.7 Tokoh Agama** | Religious leaders, places of worship management | `admin-dashboard.md` Section 3 |
| **C.7.8 Tokoh Pemuda** | Youth leaders, programs, engagement | `admin-dashboard.md` Section 3 |

---

## C.8 Warga (Citizen & Household Management)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.8.1 Warga Dashboard** | Population stats, demographics, growth trends | `data-visualization.md` Section 3 |
| **C.8.2 Household List** | Table: KK, Kepala Keluarga, Anggota, Alamat, RT/RW | `admin-dashboard.md` Section 3 |
| **C.8.3 Household Tree View** | Hierarchical: Desa to Dusun to RW to RT to KK to Anggota | `admin-dashboard.md` Section 3 |
| **C.8.4 Household Detail Panel** | Slide-in, tabs: Anggota / Dokumen / Riwayat / Peta | `admin-dashboard.md` Section 3 |
| **C.8.5 Individual Citizen Profile** | NIK, biodata, documents, service history | `admin-dashboard.md` Section 3 |
| **C.8.6 Tambah KK / Anggota** | Form wizard, auto-fill from Dukcapil | `form-builder.md` Section 6 |
| **C.8.7 Edit KK / Anggota** | Inline or modal editing, change history | `form-builder.md` Section 4 |
| **C.8.8 Mutasi (Move In/Out)** | Process arrivals, departures, address changes | `form-builder.md` Section 6 |
| **C.8.9 Document Attachment** | KTP, KK, Akta, Ijazah scans, expiry tracking | `admin-dashboard.md` Section 3 |
| **C.8.10 Demographic Analytics** | Age pyramid, education, employment, religion charts | `data-visualization.md` Section 2 |
| **C.8.11 Beneficiary Tracking** | PKH, BPNT, BLT recipients, distribution status | `admin-dashboard.md` Section 3 |
| **C.8.12 Warga Search** | Advanced: name, NIK, address, status, age range | `admin-dashboard.md` Section 3 |

---

## C.9 APBDes & BUMDes (Budget & Enterprise)

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.9.1 APBDes Dashboard** | Total budget, realization, remaining, by category | `data-visualization.md` Section 3 |
| **C.9.2 APBDes Entry** | Input receipts, allocations, transfers | `form-builder.md` Section 6 |
| **C.9.3 APBDes Real-Time Bar** | Horizontal segments, animated, public-facing | `admin-dashboard.md` Section 3 |
| **C.9.4 Category Breakdown** | Pendidikan, Kesehatan, Infrastruktur, etc. | `data-visualization.md` Section 2 |
| **C.9.5 Transaction Log** | All entries, filterable, exportable | `admin-dashboard.md` Section 3 |
| **C.9.6 Budget Approval Workflow** | Draft to Review to Approve to Publish | `admin-dashboard.md` Section 3 |
| **C.9.7 BUMDes Unit List** | All village enterprises, type, revenue, members | `admin-dashboard.md` Section 3 |
| **C.9.8 BUMDes Unit Detail** | Profile, financials, members, products | `admin-dashboard.md` Section 3 |
| **C.9.9 Cooperative Transactions** | Savings, loans, repayments, interest | `form-builder.md` Section 6 |
| **C.9.10 BUMDes Financial Reports** | Balance sheet, P&L, cash flow, auto-generated | `data-visualization.md` Section 6 |
| **C.9.11 Supply Chain** | Products, inventory, orders, market linkage | `admin-dashboard.md` Section 3 |
| **C.9.12 Member Dashboard** | Individual cooperative member view | `admin-dashboard.md` Section 3 |

---

## C.10 Settings & Configuration

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **C.10.1 Village Profile Settings** | Name, address, contact, logo, colors | `form-builder.md` Section 6 |
| **C.10.2 Staff Management** | Add/edit staff, roles, permissions | `admin-dashboard.md` Section 3 |
| **C.10.3 Role Editor** | Custom roles, granular permissions | `admin-dashboard.md` Section 3 |
| **C.10.4 Workflow Configuration** | Custom approval chains per service type | `form-builder.md` Section 6 |
| **C.10.5 Notification Settings** | Email, SMS, WhatsApp templates, triggers | `form-builder.md` Section 6 |
| **C.10.6 Integration Settings** | Dukcapil, BPS, Ministry APIs, webhooks | `form-builder.md` Section 6 |
| **C.10.7 Data Import / Export** | Excel/CSV import, full backup export | `admin-dashboard.md` Section 3 |
| **C.10.8 Public Page Settings** | What to show/hide on public page | `form-builder.md` Section 6 |
| **C.10.9 Audit Log** | All actions by all staff, immutable | `admin-dashboard.md` Section 3 |
| **C.10.10 Billing & Plan** | Current plan, usage, upgrade, invoice history | `admin-dashboard.md` Section 3 |

---

# PART D: Public Page (Per-Village)

> **Skill Reference:** `public-page.md`
> **Audience:** Citizens, potential residents, auditors, neighboring villages
> **URL:** `https://[village-slug].desaklik.id`
> **Purpose:** Village digital identity — transparent, accessible, branded

---

## D.1 Public Header

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.1.1 Village Logo** | Tenant-uploaded logo, 40px height | `public-page.md` Section A |
| **D.1.2 Village Name** | "Desa [Name]" — text-h5 | `public-page.md` Section A |
| **D.1.3 Navigation** | Beranda / Layanan / Transparansi / Berita / Peta / Kontak | `public-page.md` Section A |
| **D.1.4 CTAs** | "Lacak Pengajuan" (ghost) + "Ajukan Layanan" (primary) | `public-page.md` Section A |
| **D.1.5 DesaKlik Badge** | "Powered by DesaKlik" subtle, footer area | `public-page.md` Section A |

---

## D.2 Hero Section

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.2.1 Village Photo** | Full cover, Ken Burns zoom, 20s | `public-page.md` Section B |
| **D.2.2 Overlay Gradient** | Transparent top to dark bottom | `public-page.md` Section B |
| **D.2.3 Village Name** | --text-display, white | `public-page.md` Section B |
| **D.2.4 Welcome Message** | Custom tenant message, white/90% | `public-page.md` Section B |
| **D.2.5 Quick Stats** | Population, monthly services, APBDes total | `public-page.md` Section B |
| **D.2.6 CTA Button** | "Ajukan Layanan Sekarang" white, large | `public-page.md` Section B |

---

## D.3 Quick Services

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.3.1 Section Title** | "Layanan Desa" — text-h2, center | `public-page.md` Section C |
| **D.3.2 Service Card 1** | Surat Kependudukan — Users icon | `public-page.md` Section C |
| **D.3.3 Service Card 2** | Surat Pemerintahan — Landmark icon | `public-page.md` Section C |
| **D.3.4 Service Card 3** | Surat Kesehatan & Sosial — Heart icon | `public-page.md` Section C |
| **D.3.5 Service Card 4** | Aspirasi & Pengaduan — MessageSquare icon | `public-page.md` Section C |
| **D.3.6 Service Card 5** | Perizinan — FileCheck icon | `public-page.md` Section C |
| **D.3.7 Service Card 6** | Informasi Umum — Info icon | `public-page.md` Section C |
| **D.3.8 Card Link** | "Ajukan ->" — text-body-small, primary color | `public-page.md` Section C |

---

## D.4 Transparency Dashboard

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.4.1 Section Title** | "Transparansi Desa" — text-h2 | `public-page.md` Section D |
| **D.4.2 Budget Card** | Realisasi APBDes percentage + progress bar | `public-page.md` Section D |
| **D.4.3 Budget Breakdown** | Category mini bars: Pendidikan, Kesehatan, etc. | `public-page.md` Section D |
| **D.4.4 Recent Activity List** | Latest announcements, news, budget updates | `public-page.md` Section D |
| **D.4.5 Activity Item** | Icon + Title + Date, 56px height | `public-page.md` Section D |
| **D.4.6 "Lihat Semua" Link** | To full transparency page | `public-page.md` Section D |

---

## D.5 Village Profile

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.5.1 About Section** | Village history, vision, mission | `public-page.md` Section E |
| **D.5.2 Stats Grid** | Luas, Dusun, RT/RW, Kepala Desa | `public-page.md` Section E |
| **D.5.3 Kepala Desa Profile** | Avatar 80px, name, period, quote | `public-page.md` Section E |
| **D.5.4 Structure Photo** | Organizational chart or village photo | `public-page.md` Section E |
| **D.5.5 WhatsApp Contact** | Direct chat button | `public-page.md` Section E |

---

## D.6 Services Status

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.6.1 Title** | "Status Layanan Bulan Ini" | `public-page.md` Section F |
| **D.6.2 Status Badges** | Diterima, Diproses, Selesai, Ditolak counts | `public-page.md` Section F |
| **D.6.3 Mini Chart** | 7-day bar chart, 120px height | `public-page.md` Section F |
| **D.6.4 How to Apply Steps** | 4-step visual guide with icons | `public-page.md` Section F |
| **D.6.5 CTA** | "Ajukan Layanan Sekarang" primary, center | `public-page.md` Section F |

---

## D.7 News & Announcements

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.7.1 Title** | "Berita & Pengumuman" + "Lihat Arsip ->" | `public-page.md` Section G |
| **D.7.2 News Card** | Image 16:9, category badge, title, excerpt, date, views | `public-page.md` Section G |
| **D.7.3 Grid** | 3 columns desktop, 1 mobile | `public-page.md` Section G |
| **D.7.4 Image Hover** | Scale 1.05, 300ms | `motion-animation.md` Section 4 |
| **D.7.5 Pagination** | "Muat Lebih Banyak" button | `public-page.md` Section G |

---

## D.8 Facility Map

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.8.1 Title** | "Peta Fasilitas Desa" — text-h2 | `public-page.md` Section H |
| **D.8.2 Map Container** | 500px height, border-radius 12px | `public-page.md` Section H |
| **D.8.3 Filter Tabs** | All / Pendidikan / Kesehatan / Ibadah / Pemerintahan / Pasar | `public-page.md` Section H |
| **D.8.4 Facility List** | Cards beside/below map | `public-page.md` Section H |
| **D.8.5 Legend** | Color-coded pins, compact | `public-page.md` Section H |

---

## D.9 Contact / Office Hours

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.9.1 Title** | "Hubungi Kami" — text-h2 | `public-page.md` Section I |
| **D.9.2 Address** | MapPin icon + full address | `public-page.md` Section I |
| **D.9.3 Hours** | Clock icon + schedule | `public-page.md` Section I |
| **D.9.4 Phone** | Phone icon + number | `public-page.md` Section I |
| **D.9.5 WhatsApp Button** | Primary, "Chat via WhatsApp" | `public-page.md` Section I |
| **D.9.6 Email** | Mail icon + email | `public-page.md` Section I |
| **D.9.7 Staff on Duty** | Avatars + names + roles + online status | `public-page.md` Section I |
| **D.9.8 Small Map** | Office location + "Petunjuk Arah" link | `public-page.md` Section I |

---

## D.10 Footer

| Screen Element | Description | Design Reference |
|----------------|-------------|------------------|
| **D.10.1 Village Brand** | Logo white, name, address | `public-page.md` Section J |
| **D.10.2 Quick Links** | Layanan, Transparansi, Berita, Peta, Kontak | `public-page.md` Section J |
| **D.10.3 DesaKlik Credit** | "Ditenagai oleh DesaKlik" + small logo | `public-page.md` Section J |
| **D.10.4 Copyright** | "Copyright 2026 Desa [Name]" | `public-page.md` Section J |
| **D.10.5 Legal Links** | Kebijakan Privasi / Syarat Penggunaan | `public-page.md` Section J |

---

## D.11 Sub-Pages

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **D.11.1 /layanan** | Full services list with descriptions and CTAs | `public-page.md` Section 5 |
| **D.11.2 /layanan/[id]** | Individual service detail + embedded form | `form-builder.md` Section 3 |
| **D.11.3 /transparansi** | Full transparency dashboard, detailed charts | `data-visualization.md` Section 3 |
| **D.11.4 /berita** | News archive, filterable, searchable | `public-page.md` Section G |
| **D.11.5 /berita/[slug]** | Full article page, rich text, images, share | `public-page.md` Section G |
| **D.11.6 /peta** | Full-screen map, all layers, search | `data-visualization.md` Section 4 |
| **D.11.7 /kontak** | Extended contact page, form, map, staff | `public-page.md` Section I |
| **D.11.8 /lacak** | Status tracking, search by request number/NIK | `citizen-portal.md` Section 4 |

---

# PART E: Citizen Mobile App

> **Skill Reference:** `mobile-app.md` + `citizen-portal.md`
> **Audience:** Citizens (warga) of the village
> **Platform:** PWA / iOS / Android
> **Purpose:** Submit requests, track status, access information, receive notifications

---

## E.1 Onboarding & Authentication

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.1.1 Splash Screen** | DesaKlik logo, village name, loading | `mobile-app.md` Section 7 |
| **E.1.2 Onboarding Slide 1** | "Selamat Datang" — illustration + text | `mobile-app.md` Section 7 |
| **E.1.3 Onboarding Slide 2** | "Ajukan Layanan" — phone + document | `mobile-app.md` Section 7 |
| **E.1.4 Onboarding Slide 3** | "Lacak Real-Time" — status tracking | `mobile-app.md` Section 7 |
| **E.1.5 Onboarding Slide 4** | "Transparansi Desa" — open data | `mobile-app.md` Section 7 |
| **E.1.6 NIK Verification** | Input NIK, verify against Dukcapil | `mobile-app.md` Section 7 |
| **E.1.7 Account Setup** | Phone, email, password | `mobile-app.md` Section 7 |
| **E.1.8 Login** | NIK + password or OTP | `citizen-portal.md` Section 7 |
| **E.1.9 Biometric Setup** | Face ID / fingerprint / PIN fallback | `mobile-app.md` Section 6 |
| **E.1.10 Welcome Complete** | "Anda siap menggunakan DesaKlik" | `mobile-app.md` Section 7 |

---

## E.2 Home Screen

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.2.1 Greeting Header** | "Selamat pagi, [Name]" + date | `mobile-app.md` Section 3 |
| **E.2.2 Notification Bell** | Badge count, tap for dropdown | `mobile-app.md` Section 3 |
| **E.2.3 Quick Stats Scroll** | Horizontal snap scroll, 3-4 stat cards | `mobile-app.md` Section 3 |
| **E.2.4 Pending Actions** | Cards needing citizen action | `mobile-app.md` Section 3 |
| **E.2.5 Swipe Actions** | Right: Approve, Left: Reject | `mobile-app.md` Section 5 |
| **E.2.6 Recent Activity** | 5 latest items, compact list | `mobile-app.md` Section 3 |
| **E.2.7 Shortcuts Grid** | 2x3 grid: Scan QR, Buat Surat, Cek Status, etc. | `mobile-app.md` Section 3 |
| **E.2.8 Bottom Nav** | 5 items: Beranda / Layanan / Ajukan / Peta / Profil | `mobile-app.md` Section 2 |
| **E.2.9 FAB (Ajukan)** | 56px circle, primary, floating | `mobile-app.md` Section 2 |

---

## E.3 Service Request Flow

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.3.1 Service Selection** | 6 category cards, 2-column grid | `citizen-portal.md` Section 3 |
| **E.3.2 Service Detail** | Description, requirements, estimated time | `citizen-portal.md` Section 3 |
| **E.3.3 Form Step 1 (Data)** | NIK (auto-fill), name, address | `form-builder.md` Section 3 |
| **E.3.4 Form Step 2 (Detail)** | Keperluan, jenis surat, lampiran | `form-builder.md` Section 3 |
| **E.3.5 Form Step 3 (Confirm)** | Summary, terms checkbox | `form-builder.md` Section 3 |
| **E.3.6 Form Step 4 (Success)** | Request number, WhatsApp opt-in | `citizen-portal.md` Section 3 |
| **E.3.7 Progress Indicator** | Dots + labels, slide transitions | `form-builder.md` Section 5 |
| **E.3.8 Camera Integration** | Scan KTP, take photos for evidence | `mobile-app.md` Section 6 |
| **E.3.9 Offline Queue** | "Tersimpan, akan dikirim saat online" | `mobile-app.md` Section 4 |

---

## E.4 Status Tracking

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.4.1 Tracking Search** | Input request number or NIK | `citizen-portal.md` Section 4 |
| **E.4.2 Recent Searches** | Pill badges below input | `citizen-portal.md` Section 4 |
| **E.4.3 Result Card** | Left border status color, summary | `citizen-portal.md` Section 4 |
| **E.4.4 Status Timeline** | Vertical, bottom-to-top, dots + lines | `citizen-portal.md` Section 4 |
| **E.4.5 Active Step** | Larger dot, ring animation | `citizen-portal.md` Section 4 |
| **E.4.6 Current Status Badge** | Large, semantic color | `citizen-portal.md` Section 4 |
| **E.4.7 Actions** | "Unduh Surat" / "Ajukan Keberatan" / "Hubungi" | `citizen-portal.md` Section 4 |
| **E.4.8 Push Notification** | Deep link to tracking screen | `mobile-app.md` Section 6 |

---

## E.5 Transparency & Information

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.5.1 Budget Overview** | Donut chart + key numbers | `citizen-portal.md` Section 5 |
| **E.5.2 Budget Breakdown** | Category list with mini bars | `citizen-portal.md` Section 5 |
| **E.5.3 Monthly Trend** | Line chart, 12 months | `data-visualization.md` Section 2 |
| **E.5.4 Document List** | Perdes, SK, Laporan, searchable | `citizen-portal.md` Section 5 |
| **E.5.5 Document Viewer** | PDF viewer, download, share | `citizen-portal.md` Section 5 |
| **E.5.6 News Feed** | Cards with images, pull-to-refresh | `mobile-app.md` Section 5 |
| **E.5.7 News Article** | Full content, images, share buttons | `public-page.md` Section G |
| **E.5.8 Calendar Events** | Village events, tap for detail | `public-page.md` Section D.7 |

---

## E.6 Map & Location

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.6.1 Full-Screen Map** | 100vh - nav, gesture handling | `mobile-app.md` Section 3 |
| **E.6.2 Search Bar** | Floating, 48px, top | `mobile-app.md` Section 3 |
| **E.6.3 Layer Toggle** | Icon button, filter facilities | `mobile-app.md` Section 3 |
| **E.6.4 Locate Me** | GPS button, bottom-right | `mobile-app.md` Section 3 |
| **E.6.5 Bottom Sheet** | Draggable: 20% / 50% / 80% snap | `mobile-app.md` Section 5 |
| **E.6.6 Facility List in Sheet** | Cards with distance | `mobile-app.md` Section 3 |
| **E.6.7 Pin Tap Detail** | Photo, name, type, actions | `data-visualization.md` Section 4 |
| **E.6.8 Directions** | Open Google Maps / Waze | `mobile-app.md` Section 3 |

---

## E.7 Profile & Settings

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.7.1 Profile Header** | Avatar 80px, name, NIK, role badge | `mobile-app.md` Section 3 |
| **E.7.2 Edit Profile** | Photo, name, address, contact | `form-builder.md` Section 3 |
| **E.7.3 My Requests** | All requests, filterable, searchable | `mobile-app.md` Section 3 |
| **E.7.4 My Documents** | KTP, KK, etc., expiry alerts | `mobile-app.md` Section 3 |
| **E.7.5 Notifications** | Toggle: Email, Push, WhatsApp | `mobile-app.md` Section 6 |
| **E.7.6 Language** | Bahasa Indonesia / English | `mobile-app.md` Section 3 |
| **E.7.7 Security** | Biometric, PIN, password change | `mobile-app.md` Section 6 |
| **E.7.8 Help & Support** | FAQ, chat support, call center | `mobile-app.md` Section 3 |
| **E.7.9 About** | App version, terms, privacy | `mobile-app.md` Section 3 |
| **E.7.10 Logout** | Confirmation, clear data option | `mobile-app.md` Section 3 |

---

## E.8 Notifications

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **E.8.1 Notification List** | All notifications, grouped by date | `mobile-app.md` Section 6 |
| **E.8.2 Unread Indicator** | Red dot, badge count | `mobile-app.md` Section 6 |
| **E.8.3 Notification Card** | Icon + Title + Message + Time | `mobile-app.md` Section 6 |
| **E.8.4 Tap Action** | Deep link to relevant screen | `mobile-app.md` Section 6 |
| **E.8.5 Mark All Read** | Button, confirmation | `mobile-app.md` Section 6 |
| **E.8.6 WhatsApp Notifications** | Mirror in-app notifications | `citizen-portal.md` Section 8 |

---

# PART F: Subdistrict (Kecamatan) Dashboard

> **Skill Reference:** `admin-dashboard.md` (extended) + `data-visualization.md`
> **Audience:** Camat, Sekretaris Kecamatan, Kecamatan staff
> **URL:** `https://kecamatan-[slug].desaklik.id` or `https://desaklik.id/kecamatan/[id]`
> **Purpose:** Monitor and coordinate all villages within a subdistrict

---

## F.1 Authentication & Home

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **F.1.1 Kecamatan Login** | NIP + password, 2FA optional | `design.md` Section 5 |
| **F.1.2 Dashboard Overview** | All villages summary, key metrics | `data-visualization.md` Section 3 |
| **F.1.3 Kecamatan Stats Row** | Total desa, total warga, total surat bulan ini, APBDes aggregate | `data-visualization.md` Section 3 |
| **F.1.4 Village Comparison Chart** | Bar chart: villages by population, service volume, budget | `data-visualization.md` Section 2 |
| **F.1.5 Alert Feed** | Critical issues from any village | `admin-dashboard.md` Section 3 |
| **F.1.6 Quick Actions** | Broadcast message, schedule meeting, generate report | `admin-dashboard.md` Section 3 |

---

## F.2 Village Monitoring

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **F.2.1 Village List** | All villages in kecamatan, sortable, filterable | `admin-dashboard.md` Section 3 |
| **F.2.2 Village Card** | Mini dashboard per village: stats, status, last active | `admin-dashboard.md` Section 3 |
| **F.2.3 Village Detail View** | Read-only access to village admin dashboard | `admin-dashboard.md` Section 3 |
| **F.2.4 Village Performance Ranking** | Leaderboard: service speed, transparency, citizen satisfaction | `data-visualization.md` Section 2 |
| **F.2.5 Underperforming Villages** | Filter: low activity, high complaints, budget issues | `admin-dashboard.md` Section 3 |
| **F.2.6 Village Impersonation** | "Lihat sebagai [Village]" for support | `admin-dashboard.md` Section 3 |

---

## F.3 Cross-Village Analytics

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **F.3.1 Population Dashboard** | Aggregate demographics across all villages | `data-visualization.md` Section 3 |
| **F.3.2 Service Volume Trends** | Total requests per month, by type, by village | `data-visualization.md` Section 2 |
| **F.3.3 APBDes Aggregate** | Combined budget, realization, per-village breakdown | `data-visualization.md` Section 2 |
| **F.3.4 BUMDes Network** | All village enterprises, revenue, employment | `data-visualization.md` Section 3 |
| **F.3.5 Complaint Heatmap** | Geographic: where complaints come from | `data-visualization.md` Section 4 |
| **F.3.6 Comparative Report** | Side-by-side village comparison, exportable | `data-visualization.md` Section 6 |
| **F.3.7 Trend Analysis** | Year-over-year growth, predictions | `data-visualization.md` Section 2 |

---

## F.4 Coordination & Communication

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **F.4.1 Broadcast Message** | Send to all villages or selected, email/SMS/WhatsApp | `admin-dashboard.md` Section 3 |
| **F.4.2 Meeting Scheduler** | Cross-village meetings, video conferencing links | `admin-dashboard.md` Section 3 |
| **F.4.3 Task Assignment** | Assign tasks to specific villages, track completion | `admin-dashboard.md` Section 3 |
| **F.4.4 Document Distribution** | Share templates, circulars, regulations | `admin-dashboard.md` Section 3 |
| **F.4.5 Event Calendar** | Kecamatan-level events, village participation | `admin-dashboard.md` Section 3 |
| **F.4.6 Discussion Forum** | Village heads forum, topics, replies | `admin-dashboard.md` Section 3 |

---

## F.5 Reporting & Compliance

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **F.5.1 Monthly Report Generator** | Auto-compile from all village data | `data-visualization.md` Section 6 |
| **F.5.2 Report Template** | Kecamatan format, customizable sections | `data-visualization.md` Section 6 |
| **F.5.3 Report Review** | Preview, edit, approve before submission upward | `admin-dashboard.md` Section 3 |
| **F.5.4 Compliance Tracker** | Which villages have submitted required reports | `admin-dashboard.md` Section 3 |
| **F.5.5 Audit Trail** | All kecamatan actions, immutable | `admin-dashboard.md` Section 3 |
| **F.5.6 Upward Submission** | Submit to Kabupaten, track status | `admin-dashboard.md` Section 3 |

---

## F.6 Settings & Administration

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **F.6.1 Kecamatan Profile** | Name, address, contact, logo | `form-builder.md` Section 6 |
| **F.6.2 Staff Management** | Camat, Sekretaris, staff roles | `admin-dashboard.md` Section 3 |
| **F.6.3 Village Onboarding** | Add new village to kecamatan, setup wizard | `form-builder.md` Section 6 |
| **F.6.4 Permission Settings** | What kecamatan can see/edit per village | `admin-dashboard.md` Section 3 |
| **F.6.5 Integration Settings** | Connect to Kabupaten systems | `form-builder.md` Section 6 |

---

# PART G: Kabupaten Dashboard

> **Skill Reference:** `admin-dashboard.md` (extended) + `data-visualization.md`
> **Audience:** Bupati, Sekretaris Daerah, Dinas terkait, Kabupaten staff
> **URL:** `https://kabupaten-[slug].desaklik.id` or `https://desaklik.id/kabupaten/[id]`
> **Purpose:** Strategic oversight of all subdistricts and villages within a regency

---

## G.1 Authentication & Executive Overview

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **G.1.1 Kabupaten Login** | NIP + password, 2FA required | `design.md` Section 5 |
| **G.1.2 Executive Dashboard** | High-level KPIs, strategic indicators | `data-visualization.md` Section 3 |
| **G.1.3 Regency Stats Row** | Total kecamatan, total desa, total warga, total APBDes | `data-visualization.md` Section 3 |
| **G.1.4 Strategic Indicators** | Poverty rate, literacy, health access, infrastructure coverage | `data-visualization.md` Section 3 |
| **G.1.5 Year-over-Year Growth** | Population, budget, service volume trends | `data-visualization.md` Section 2 |
| **G.1.6 National Comparison** | How this kabupaten ranks nationally | `data-visualization.md` Section 2 |

---

## G.2 Hierarchical Monitoring

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **G.2.1 Kecamatan Overview** | All subdistricts, expandable to villages | `admin-dashboard.md` Section 3 |
| **G.2.2 Hierarchical Tree** | Kabupaten -> Kecamatan -> Desa -> Dusun -> RW -> RT | `admin-dashboard.md` Section 3 |
| **G.2.3 Drill-Down Navigation** | Click kecamatan -> see its villages -> click village -> see details | `data-visualization.md` Section 3 |
| **G.2.4 Performance Matrix** | Table: all villages x key metrics, sortable | `admin-dashboard.md` Section 3 |
| **G.2.5 Color-Coded Map** | Choropleth: kecamatan colored by performance metric | `data-visualization.md` Section 4 |
| **G.2.6 Top/Bottom Performers** | Automatic ranking, spotlight success stories | `data-visualization.md` Section 2 |

---

## G.3 Strategic Analytics

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **G.3.1 Demographic Overview** | Full regency population pyramid, trends | `data-visualization.md` Section 2 |
| **G.3.2 Economic Indicators** | BUMDes revenue, employment, cooperative membership | `data-visualization.md` Section 3 |
| **G.3.3 Service Delivery Analysis** | Average processing time, satisfaction, bottleneck identification | `data-visualization.md` Section 2 |
| **G.3.4 Budget Execution** | APBDes realization across all villages, variance analysis | `data-visualization.md` Section 2 |
| **G.3.5 Development Index** | Custom index: education + health + infrastructure + economy | `data-visualization.md` Section 2 |
| **G.3.6 Predictive Analytics** | Forecast: population growth, budget needs, service demand | `data-visualization.md` Section 2 |
| **G.3.7 Benchmarking** | Compare kecamatan against each other, identify gaps | `data-visualization.md` Section 2 |

---

## G.4 Policy & Planning

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **G.4.1 Policy Dashboard** | Active regulations, compliance status per village | `admin-dashboard.md` Section 3 |
| **G.4.2 Program Tracker** | National programs (PKH, BPNT, BLT) distribution status | `admin-dashboard.md` Section 3 |
| **G.4.3 Infrastructure Planning** | Proposed/ongoing/completed projects, budget, timeline | `data-visualization.md` Section 3 |
| **G.4.4 Budget Planning Tool** | Allocate kabupaten funds to kecamatan, model scenarios | `data-visualization.md` Section 3 |
| **G.4.5 Target Setting** | Set KPIs for kecamatan, track achievement | `admin-dashboard.md` Section 3 |
| **G.4.6 Evaluation Forms** | Score kecamatan performance, standardized rubric | `form-builder.md` Section 6 |

---

## G.5 Communication & Coordination

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **G.5.1 Broadcast to All** | Message to all kecamatan/desa, multi-channel | `admin-dashboard.md` Section 3 |
| **G.5.2 Kecamatan Meeting** | Schedule, video link, minutes, action items | `admin-dashboard.md` Section 3 |
| **G.5.3 Bupati Direct Line** | Direct messaging to all Kepala Desa | `admin-dashboard.md` Section 3 |
| **G.5.4 Circular Distribution** | Official letters, regulations, templates | `admin-dashboard.md` Section 3 |
| **G.5.5 Best Practice Sharing** | Spotlight high-performing villages, share methods | `admin-dashboard.md` Section 3 |
| **G.5.6 Crisis Management** | Emergency alerts, rapid response coordination | `admin-dashboard.md` Section 3 |

---

## G.6 Reporting & Upward Submission

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **G.6.1 Quarterly Report Generator** | Auto-compile from kecamatan data | `data-visualization.md` Section 6 |
| **G.6.2 Report to Governor** | Provincial-level report, specific format | `data-visualization.md` Section 6 |
| **G.6.3 Report to Ministry** | Kemendes format, national indicators | `data-visualization.md` Section 6 |
| **G.6.4 Report Preview** | Rich preview, collaborative editing, approval chain | `admin-dashboard.md` Section 3 |
| **G.6.5 Submission Tracker** | Status: draft -> review -> approved -> submitted -> acknowledged | `admin-dashboard.md` Section 3 |
| **G.6.6 Historical Archive** | All past reports, searchable, comparable | `admin-dashboard.md` Section 3 |
| **G.6.7 Open Data Portal** | Public API, datasets for researchers/journalists | `public-page.md` Section D.11 |

---

## G.7 Settings & Administration

| Screen | Description | Design Reference |
|--------|-------------|------------------|
| **G.7.1 Kabupaten Profile** | Name, address, contact, logo, vision | `form-builder.md` Section 6 |
| **G.7.2 User Management** | Bupati, Sekda, Dinas heads, staff | `admin-dashboard.md` Section 3 |
| **G.7.3 Role Hierarchy** | Kabupaten-level RBAC, department-based | `admin-dashboard.md` Section 3 |
| **G.7.4 Kecamatan Management** | Add/remove kecamatan, assign staff | `admin-dashboard.md` Section 3 |
| **G.7.5 Integration Config** | Connect to Provinsi, Kemendes, BPS, Dukcapil | `form-builder.md` Section 6 |
| **G.7.6 Data Governance** | Retention policies, privacy settings, audit scope | `form-builder.md` Section 6 |
| **G.7.7 System Health** | All connected villages uptime, sync status | `admin-dashboard.md` Section 3 |

---

# PART H: Cross-Cutting Architecture

> **Purpose:** Engineering patterns shared across all touchpoints

---

## H.1 Multi-Tenant Architecture

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.1.1 Tenant Isolation** | Shared DB with tenant_id row-level security | PostgreSQL RLS |
| **H.1.2 Subdomain Routing** | [village].desaklik.id -> tenant context | DNS + reverse proxy |
| **H.1.3 Tenant Config Store** | JSONB per-tenant settings, branding, features | Redis + PostgreSQL |
| **H.1.4 Tenant Onboarding** | Wizard: register -> verify -> configure -> activate | Async job queue |
| **H.1.5 Tenant Quotas** | Storage, users, API calls, SMS per plan | Rate limiter |
| **H.1.6 Tenant Migration** | Upgrade plan, data migration, zero downtime | Blue-green deploy |

---

## H.2 Authentication & Authorization

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.2.1 Identity Provider** | Centralized auth for all touchpoints | Keycloak / Auth0 |
| **H.2.2 JWT Tokens** | Tenant-scoped claims, role, permissions | RS256 |
| **H.2.3 RBAC System** | Granular: resource x action x scope | Casbin |
| **H.2.4 Session Management** | Redis-backed, TTL, refresh rotation | Redis |
| **H.2.5 2FA / MFA** | TOTP, SMS, email for sensitive roles | TOTP lib |
| **H.2.6 Biometric Auth** | Face ID, fingerprint for mobile | Native APIs |
| **H.2.7 Audit Logging** | Immutable, all auth events, SIEM-ready | ClickHouse |

---

## H.3 Real-Time Data Layer

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.3.1 WebSocket Gateway** | Per-tenant connection pool, horizontal scale | Socket.io / WS |
| **H.3.2 Event Bus** | Pub/sub for cross-service communication | NATS / Redis |
| **H.3.3 Change Data Capture** | DB changes -> events -> real-time updates | Debezium |
| **H.3.4 Notification Router** | Email, SMS, WhatsApp, Push, In-app | Apache Kafka |
| **H.3.5 Presence System** | Who's online, typing indicators, last seen | Redis |
| **H.3.6 Sync Protocol** | Offline-first, conflict resolution, CRDT | Custom |

---

## H.4 File & Media Storage

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.4.1 Object Storage** | Documents, images, scans per tenant | MinIO / S3 |
| **H.4.2 CDN Distribution** | Global edge caching for static assets | CloudFlare |
| **H.4.3 Image Processing** | Resize, compress, WebP conversion, blur-up | Sharp / Thumbor |
| **H.4.4 Document Pipeline** | PDF generation, OCR, digital signature | Puppeteer / Tesseract |
| **H.4.5 Virus Scanning** | Upload scanning, quarantine | ClamAV |
| **H.4.6 Retention Policy** | Auto-archive, compliance deletion | Cron + rules |

---

## H.5 Search & Discovery

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.5.1 Full-Text Search** | Citizens, documents, services, news | Elasticsearch |
| **H.5.2 Fuzzy Matching** | Name variations, typos, transliteration | Elasticsearch |
| **H.5.3 Geographic Search** | Near me, within boundary, route-based | PostGIS |
| **H.5.4 Command Palette** | Universal search + actions | Fuse.js + custom |
| **H.5.5 Faceted Search** | Filters, aggregations, drill-down | Elasticsearch |
| **H.5.6 Search Analytics** | Popular queries, zero results, trends | Kibana |

---

## H.6 Integration Layer

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.6.1 Dukcapil API** | NIK/KK verification, population data | REST / SOAP |
| **H.6.2 BPS API** | Statistical data, census, indicators | REST |
| **H.6.3 Kemendes API** | Program data, reporting, compliance | REST |
| **H.6.4 Kemenkop API** | Cooperative registry, Simkopdes | REST |
| **H.6.5 WhatsApp Business API** | Notifications, OTP, status updates | Meta API |
| **H.6.6 Payment Gateway** | Xendit, Midtrans, bank transfer | SDK |
| **H.6.7 GIS Services** | Boundary data, satellite imagery, geocoding | PostGIS / Mapbox |
| **H.6.8 Weather API** | Disaster early warning integration | BMKG API |

---

## H.7 Security & Compliance

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.7.1 TLS / SSL** | All traffic encrypted, HSTS, cert management | Let's Encrypt |
| **H.7.2 WAF** | DDoS protection, SQL injection, XSS | CloudFlare / ModSecurity |
| **H.7.3 Data Encryption** | At-rest AES-256, in-transit TLS 1.3 | Database + app |
| **H.7.4 Data Residency** | All data in Indonesian jurisdiction | ID data centers |
| **H.7.5 Privacy Compliance** | PDP Law alignment, consent management | Legal + tech |
| **H.7.6 Penetration Testing** | Quarterly, BSSN standards, bug bounty | External |
| **H.7.7 Backup & Recovery** | Daily incremental, weekly full, geo-redundant | Borg / Restic |

---

## H.8 Monitoring & Observability

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.8.1 Metrics Collection** | Prometheus, tenant-aware labels | Prometheus |
| **H.8.2 Distributed Tracing** | Jaeger, request flow across services | OpenTelemetry |
| **H.8.3 Log Aggregation** | Structured logs, tenant isolation | Loki / ELK |
| **H.8.4 Alerting** | PagerDuty, Slack, email for critical | Alertmanager |
| **H.8.5 APM** | Application performance, user experience | New Relic / Datadog |
| **H.8.6 Uptime Monitoring** | Synthetic checks, multi-region | Pingdom / UptimeRobot |
| **H.8.7 Error Tracking** | Sentry, tenant context, release correlation | Sentry |

---

## H.9 Deployment & DevOps

| Component | Description | Implementation |
|-----------|-------------|----------------|
| **H.9.1 Container Orchestration** | Kubernetes, per-tenant namespace isolation | K8s |
| **H.9.2 CI/CD Pipeline** | GitHub Actions, automated testing, staging | GitHub |
| **H.9.3 Infrastructure as Code** | Terraform, reproducible environments | Terraform |
| **H.9.4 Blue-Green Deploy** | Zero-downtime, instant rollback | K8s + Istio |
| **H.9.5 Feature Flags** | LaunchDarkly, gradual rollout, kill switch | LaunchDarkly |
| **H.9.6 Database Migrations** | Tenant-aware, backward compatible, rollback | Flyway / Liquibase |
| **H.9.7 Edge Deployment** | CDN edge functions, geo-routing | CloudFlare Workers |

---

# PART I: Data Flow & Integration Map

> **Purpose:** How data moves between systems, villages, and government layers

---

## I.1 Data Flow Diagram (High Level)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CITIZEN (Warga)                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │ Mobile App  │  │ Public Page │  │ WhatsApp    │               │
│  │ (PWA/iOS/   │  │ (Web)       │  │ (Chat)      │               │
│  │  Android)   │  │             │  │             │               │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘               │
│         │                │                │                       │
│         └────────────────┴────────────────┘                       │
│                          │                                          │
│                    ┌─────▼─────┐                                    │
│                    │  API GW   │  ← Rate limit, auth, routing       │
│                    │  (Kong/   │                                    │
│                    │   Envoy)  │                                    │
│                    └─────┬─────┘                                    │
└──────────────────────────┼──────────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────────┐
│                    ┌─────▼─────┐                                    │
│                    │  SERVICE  │  ← Business logic, tenant scope    │
│                    │  LAYER    │                                    │
│                    │  (Node/    │                                    │
│                    │   Go/Rust)│                                    │
│                    └─────┬─────┘                                    │
│         ┌────────────────┼────────────────┐                        │
│         │                │                │                        │
│    ┌────▼────┐     ┌────▼────┐     ┌────▼────┐                   │
│    │Persuratan│     │  Warga  │     │ APBDes  │  ← Domain services │
│    │Service   │     │ Service │     │ Service │                   │
│    └────┬────┘     └────┬────┘     └────┬────┘                   │
│         │                │                │                        │
│    ┌────▼────────────────▼────────────────▼────┐                 │
│    │           EVENT BUS (NATS/Kafka)            │                 │
│    │  • Real-time updates                       │                 │
│    │  • Cross-service sync                      │                 │
│    │  • Notification routing                    │                 │
│    └────┬────────────────┬────────────────┬────┘                 │
│         │                │                │                        │
│    ┌────▼────┐     ┌────▼────┐     ┌────▼────┐                   │
│    │PostgreSQL│     │  Redis  │     │Elasticsearch│               │
│    │(Primary) │     │ (Cache/ │     │  (Search)   │               │
│    │ Tenant   │     │  Queue) │     │             │               │
│    │ isolated │     │         │     │             │               │
│    └──────────┘     └─────────┘     └─────────────┘               │
│                                                                    │
│    ┌──────────┐     ┌──────────┐     ┌──────────┐                 │
│    │  MinIO   │     │ClickHouse│     │  PostGIS │                 │
│    │ (Files)  │     │ (Analytics)│    │  (Maps)  │                 │
│    └──────────┘     └──────────┘     └──────────┘                 │
└────────────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────────┐
│                    ┌─────▼─────┐                                    │
│                    │  INTEGRATION │  ← Government systems          │
│                    │    LAYER     │                                │
│                    └─────┬─────┘                                    │
│         ┌────────────────┼────────────────┐                        │
│         │                │                │                        │
│    ┌────▼────┐     ┌────▼────┐     ┌────▼────┐                   │
│    │ Dukcapil │     │   BPS   │     │ Kemendes │                   │
│    │ (NIK/KK) │     │(Stats)  │     │(Programs)│                   │
│    └──────────┘     └─────────┘     └─────────┘                   │
│                                                                    │
│    ┌──────────┐     ┌──────────┐     ┌──────────┐                 │
│    │ Kemenkop │     │  BMKG   │     │  Provinsi │                 │
│    │(Coops)   │     │(Weather)│     │ (Upstream)│                │
│    └──────────┘     └──────────┘     └──────────┘                 │
└────────────────────────────────────────────────────────────────────┘
```

---

## I.2 Hierarchical Data Flow

```
┌─────────────────────────────────────────┐
│           KABUPATEN DASHBOARD            │
│  ┌─────────────────────────────────────┐ │
│  │ Aggregate reports, policy, budget   │ │
│  │ ↓ Push targets, programs, circulars │ │
│  └─────────────────────────────────────┘ │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│         KECAMATAN DASHBOARD              │
│  ┌─────────────────────────────────────┐ │
│  │ Monitor villages, coordinate, report│ │
│  │ ↓ Assign tasks, broadcast messages  │ │
│  └─────────────────────────────────────┘ │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│         VILLAGE ADMIN PANEL              │
│  ┌─────────────────────────────────────┐ │
│  │ Day-to-day operations, data entry   │ │
│  │ ↓ Serve citizens, manage services   │ │
│  └─────────────────────────────────────┘ │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│         CITIZEN / PUBLIC                 │
│  ┌─────────────────────────────────────┐ │
│  │ Submit requests, track, access info │ │
│  │ ↑ Feedback, complaints, data        │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## I.3 Real-Time Sync Patterns

| Pattern | Trigger | Flow | Latency |
|---------|---------|------|---------|
| **Service Request Created** | Citizen submits | Citizen → API → DB → Event Bus → Staff notification + Real-time badge update | < 1s |
| **Status Updated** | Staff changes status | Staff → API → DB → Event Bus → Citizen push + WhatsApp + Timeline update | < 1s |
| **Budget Entry** | APBDes transaction | Staff → API → DB → Event Bus → Public dashboard update + Chart animation | < 2s |
| **New Citizen Registered** | Data entry | Staff → API → Dukcapil verify → DB → Event Bus → Population stats update | < 5s |
| **Broadcast Message** | Kecamatan/Kabupaten | Admin → API → Event Bus → All village inboxes + Push + SMS | < 10s |
| **Report Generated** | Scheduled/ manual | DB → Analytics engine → PDF → Storage → Notification → Download link | < 30s |
| **Offline Sync** | Citizen reconnected | Mobile queue → API → Conflict resolution → DB → Confirmation | < 5s |

---

## I.4 API Architecture

```
REST API (Primary)
  /api/v1/{tenant}/citizens
  /api/v1/{tenant}/households
  /api/v1/{tenant}/services
  /api/v1/{tenant}/documents
  /api/v1/{tenant}/budget
  /api/v1/{tenant}/maps
  /api/v1/{tenant}/organizations
  /api/v1/{tenant}/publications

GraphQL (Optional, complex queries)
  /graphql
  - Citizen profile with nested data
  - Dashboard aggregated data
  - Custom report queries

WebSocket (Real-time)
  /ws/{tenant}
  - Live notifications
  - Presence
  - Collaborative editing

Webhook (Outgoing)
  - Village events to external systems
  - Payment confirmations
  - Government reporting

Open Data API (Public)
  /api/public/{village}/budget
  /api/public/{village}/population
  /api/public/{village}/facilities
  - Rate limited, anonymized
```

---

## I.5 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router), React Server Components | SSR, SEO, performance |
| **Styling** | Tailwind CSS + shadcn/ui | Design system implementation |
| **Mobile** | React Native / Expo (optional) or PWA | Native app experience |
| **State** | Zustand + TanStack Query | Client + server state |
| **Backend** | Node.js (NestJS) or Go (Gin/Fiber) | API services |
| **Database** | PostgreSQL 16 + PostGIS | Primary data + geospatial |
| **Cache** | Redis 7 | Sessions, queues, real-time |
| **Search** | Elasticsearch 8 | Full-text + faceted search |
| **Analytics** | ClickHouse | OLAP, reporting, aggregations |
| **Files** | MinIO (S3-compatible) | Object storage |
| **Queue** | Apache Kafka or NATS Streaming | Event streaming |
| **Maps** | MapLibre GL + PostGIS | Interactive GIS |
| **Auth** | Keycloak or Auth0 | Identity + SSO |
| **Monitoring** | Prometheus + Grafana + Jaeger | Metrics + tracing |
| **Logs** | Loki or ELK Stack | Centralized logging |
| **CDN** | CloudFlare | Edge caching + security |
| **CI/CD** | GitHub Actions + ArgoCD | Automated deployment |
| **Infra** | Terraform + Kubernetes (EKS/GKE) | IaC + orchestration |

---

## I.6 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         EDGE (CloudFlare)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ CDN Cache   │  │ DDoS Prot.  │  │ WAF Rules   │        │
│  │ Static      │  │ Rate Limit  │  │ Bot Mgmt    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      LOAD BALANCER (ALB/NLB)                 │
│              SSL termination, health checks                  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    KUBERNETES CLUSTER (EKS)                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  API Gateway (Kong/Envoy) — Rate limit, auth, routing│   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ Frontend   │ │ Service    │ │ Worker     │              │
│  │ Pods       │ │ Pods       │ │ Pods       │              │
│  │ (Next.js)  │ │ (Node/Go)  │ │ (Queue)    │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ WebSocket  │ │ Real-time  │ │ Notification│            │
│  │ Pods       │ │ Sync Pods  │ │ Worker Pods │            │
│  └────────────┘ └────────────┘ └────────────┘              │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      DATA LAYER                            │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ PostgreSQL │ │    Redis   │ │Elasticsearch│              │
│  │ (Primary)   │ │  (Cluster) │ │  (Cluster)  │              │
│  │ + Read      │ │            │ │             │              │
│  │   Replicas  │ │            │ │             │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │  ClickHouse│ │   MinIO    │ │   PostGIS   │              │
│  │  (Analytics)│ │  (Object)  │ │  (Spatial)  │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│  ┌────────────┐ ┌────────────┐                              │
│  │    Kafka   │ │   NATS     │                              │
│  │  (Events)  │ │  (Real-time)│                             │
│  └────────────┘ └────────────┘                              │
└─────────────────────────────────────────────────────────────┘
```

---

## I.7 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PERIMETER SECURITY                        │
│  • CloudFlare WAF + DDoS protection                        │
│  • Rate limiting per tenant + per IP                       │
│  • Bot management + CAPTCHA                                │
│  • Geo-blocking (optional)                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    AUTHENTICATION LAYER                      │
│  • OAuth 2.0 / OpenID Connect (Keycloak)                   │
│  • JWT with tenant-scoped claims                           │
│  • RS256 signing, short-lived access tokens                │
│  • Refresh token rotation                                  │
│  • 2FA/TOTP for admin roles                                │
│  • Biometric for mobile (Face ID/Fingerprint)              │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    AUTHORIZATION LAYER                     │
│  • RBAC: Role-Based Access Control (Casbin)                │
│  • ABAC: Attribute-Based for fine-grained                  │
│  • Resource-level permissions                              │
│  • Tenant isolation enforced at DB + app layer             │
│  • Audit log: immutable, tamper-proof                      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    DATA SECURITY                             │
│  • TLS 1.3 everywhere (in transit)                         │
│  • AES-256 encryption (at rest)                            │
│  • Row-Level Security (PostgreSQL RLS)                     │
│  • Field-level encryption for PII (NIK, KK)                │
│  • Backup encryption + geo-redundancy                      │
│  • Data residency: Indonesia only                          │
└─────────────────────────────────────────────────────────────┘
```

---

## I.8 Scalability Strategy

| Tier | Scale Target | Strategy |
|------|-------------|----------|
| **Village (Tenant)** | 1,000 citizens | Single pod, shared resources |
| **Kecamatan** | 20 villages | Dedicated read replicas, cached aggregates |
| **Kabupaten** | 200 villages | Pre-computed analytics, materialized views |
| **Platform** | 10,000 villages | Horizontal pod autoscaling, sharded databases |
| **National** | 74,000+ desa | Multi-region, edge computing, CDN heavy |

---

*End of Complete Screen Inventory & Architecture*
*All screens trace back to `design.md` and relevant skills*
*Version 1.0 | 2026-05-18*
*Total Parts: 9 (A through I)*
*Total Screens/Elements: 400+*
