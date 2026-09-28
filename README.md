# Visa Status Portal — Canada.ca Inspired Demonstration Website

> **IMPORTANT DISCLAIMER**  
> **DEMO PORTAL — NOT AN OFFICIAL GOVERNMENT OF CANADA WEBSITE**  
> This project is an independent technical demonstration and educational prototype inspired by the visual language, information architecture, spacing system, typography hierarchy, and public-service UX of [Canada.ca](https://www.canada.ca/).  
> It is **NOT** affiliated with, endorsed by, or connected to the Government of Canada, Immigration, Refugees and Citizenship Canada (IRCC), or any Canadian governmental department. It does not issue visas, store real applicant data, or process official immigration claims.

---

## 🏛️ Architecture Overview

The system is designed with a **90% static government information website** + **10% dynamic application-status experience**.

- **NO Admin Panel / CMS:** No admin dashboards, no CRUD editors, no admin logins.
- **Client-Side Service Layer:** Clean separation between UI and data fetching.
- **API-Ready Structure:** `src/services/applicationService.js` can be swapped with `fetch('/api/application-status')` in future backend phases with zero UI code modifications.

```
src/
 ├── data/
 │   └── applications.json          <-- 10 Fictional Demonstration Records
 │
 ├── services/
 │   └── applicationService.js      <-- Data fetching & validation service
 │
 ├── pages/
 │   ├── Home.jsx                   <-- 90% Static Information Homepage
 │   ├── Login.jsx                  <-- "Check your application status" Sign-in form
 │   ├── ApplicationStatus.jsx      <-- Dynamic Status Result View
 │   ├── Services.jsx               <-- Visit, Study, Work, PR Directory
 │   ├── Help.jsx                   <-- FAQs, Biometrics, Glossary, Disclaimer
 │   └── Search.jsx                 <-- Client-side public-service search
 │
 ├── components/
 │   ├── Header.jsx                 <-- Canada.ca header, search, and top disclaimer
 │   ├── Footer.jsx                 <-- Charcoal footer & legal non-affiliation box
 │   ├── Breadcrumbs.jsx            <-- Semantic breadcrumbs
 │   ├── StatusBadge.jsx            <-- Dynamic status badge component
 │   ├── Timeline.jsx               <-- Dynamic progress timeline from application.timeline
 │   ├── ApplicationDetails.jsx     <-- Dynamic key-value government table
 │   ├── ErrorSummary.jsx           <-- Canada.ca "There is a problem" error box
 │   └── DemoModal.jsx              <-- 1-click test record picker
 │
 ├── index.css                      <-- Canada.ca Vanilla CSS Design System
 ├── App.jsx                        <-- React Router routes
 └── main.jsx                       <-- Vite Entry Point
```

---

## 📋 The 10 Predefined Fictional Demonstration Records

| Application # | Applicant Name | Application Type | DOB | Simulated Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEMO-2026-001** | Alex Morgan | Visitor Visa | `01/01/2000` | `Application received` |
| **DEMO-2026-002** | Daniel Carter | Study Permit | `22/08/2001` | `Processing` |
| **DEMO-2026-003** | Sophia Williams | Work Permit | `10/11/1988` | `Biometrics required` |
| **DEMO-2026-004** | Noah Bennett | Visitor Visa | `05/03/1995` | `Biometrics completed` |
| **DEMO-2026-005** | Emma Anderson | Study Permit | `19/07/1991` | `Background verification` |
| **DEMO-2026-006** | Lucas Martin | Permanent Residence | `30/01/1985` | `Additional documents required` |
| **DEMO-2026-007** | Olivia Wilson | Work Permit | `12/09/1993` | `Decision pending` |
| **DEMO-2026-008** | Ethan Brooks | Express Entry | `25/06/1990` | `Application submitted` |
| **DEMO-2026-009** | Mia Thompson | Visitor Visa | `08/12/1997` | `Approved — Demonstration Only` |
| **DEMO-2026-010** | James Parker | Permanent Residence | `14/02/1982` | `Refused — Demonstration Only` |

---

## 🔄 Dynamic Status Verification Flow

1. User visits `/login` ("Check your application status").
2. User enters **Application Number** (e.g. `DEMO-2026-001`) and **Date of Birth** (e.g. `01/01/2000`).
3. User clicks **[ Sign in ]**.
4. UI enters loading state with a subtle spinner and text: `"Checking application status..."`.
5. UI invokes `applicationService.getApplicationStatus(applicationNumber, dateOfBirth)`.
6. **Error Handling:**
   - If application number does not exist: Displays Canada.ca Error Summary: `"There is a problem"` &bull; `"We could not find a matching demonstration application."`
   - If DOB does not match: Displays `"There is a problem"` &bull; `"The information entered does not match our demonstration records."`
7. **Success State:**
   - Dynamically navigates to `/application-status/:applicationNumber`.
   - `<StatusBadge status={application.status} />` formats badge color based on state.
   - `<Timeline timeline={application.timeline} />` maps stages dynamically (✓ Completed, ● Current, ○ Pending, ! Action required).
   - `<ApplicationDetails application={application} />` renders tabular data.
   - "What this status means" explanation and actionable alerts are displayed.
   - User can click **"Check another application"** to return to the sign-in form.

---

## 🎨 Design & Visual Standards

- **Color Palette:**
  - Primary Background: `#FFFFFF`
  - Text: `#333333`
  - Canada.ca Red: `#D52B1E` / Dark Red: `#A62A1E`
  - Link Blue: `#005EA8` (Hover: `#004B87`)
  - Neutral Gray: `#F5F5F5` / Border Gray: `#D6D6D6`
  - Alert Tokens: Success (`#278400`), Warning (`#EE7100` / `#F5C242`), Danger (`#D3080C`)
- **Typography:** `"Noto Sans", Arial, sans-serif`
- **Max Width:** 1200px container, desktop sidebar navigation, responsive layout tested down to 375px.

---

## 🚀 Running Locally & Deploying

### Run Dev Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Build for Production (Static Bundle)
```bash
npm run build
```
Creates a static distribution in `dist/` ready to host on **GitHub Pages**, **Vercel**, or **Netlify**.
- **Netlify:** `public/_redirects` is included for SPA routing.
- **Vercel:** `vercel.json` is configured for single-page rewrites.
