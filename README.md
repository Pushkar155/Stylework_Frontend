Stylework Lead Tracker — Frontend

Frontend for the Stylework Junior Full Stack Engineer assignment.

Live Application

https://stylework-frontend-teal.vercel.app

Backend API

https://stylework-backend.onrender.com/api/health

Overview

The Lead Tracker frontend provides a simple interface to:

Create leads

View leads

Search leads

Update lead status

Display creation timestamps

Tech Stack

React

TypeScript

Vite

Tailwind CSS

Ant Design

Redux Toolkit

Axios

Formik

Yup

Lucide React

Vercel

Architecture

React UI
│
▼
Components / Pages
│
▼
Redux Toolkit
│
▼
Async Thunks
│
▼
Axios API Client
│
▼
Render Backend
│
▼
Neon PostgreSQL

Project Structure

src/
├── api/
│ └── axios.ts
├── app/
│ ├── hooks.ts
│ └── store.ts
├── components/
│ ├── common/
│ │ └── CommonSelect.tsx
│ ├── CreateLeadModal.tsx
│ ├── LeadTable.tsx
│ └── SearchBar.tsx
├── constants/
│ └── lead.ts
├── features/
│ └── leads/
│ ├── leadSlice.ts
│ └── leadThunks.ts
├── pages/
│ └── LeadsPage.tsx
├── schemas/
│ └── lead.schema.ts
├── types/
│ └── lead.ts
├── App.tsx
├── index.css
└── main.tsx

Local Setup

1. Install dependencies

npm install

2. Configure environment variables

Create .env:

VITE_API_URL=http://localhost:5000/api

For production:

VITE_API_URL=https://stylework-backend.onrender.com/api

Because this is a Vite application, client-side environment variables must use the VITE\_ prefix.

3. Start the development server

npm run dev

The application normally runs at:

http://localhost:5173

API Integration

The Axios client uses:

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL,
});

Examples:

GET /leads
POST /leads
PATCH /leads/:id/status

The deployed frontend therefore communicates with:

https://stylework-backend.onrender.com/api

State Management

Redux Toolkit manages:

Lead list

Loading state

Create state

Error state

Lead status updates

The main async operations are:

fetchLeads
createLead
updateLeadStatus

Forms and Validation

Formik manages the create-lead form.

Yup validates:

Name

Email

Phone

This provides immediate client-side feedback while the backend performs its own validation for security and data integrity.

Ant Design

Ant Design is used for the lead table and status selection.

The status field uses a reusable CommonSelect component built on top of Ant Design's Select.

Available statuses:

NEW
CONTACTED
QUALIFIED
CONVERTED
LOST

Search

The search input sends the search value to:

GET /api/leads?search=<value>

The backend performs case-insensitive matching against:

Name

Email

Phone

Deployment

The frontend is deployed on Vercel.

Build

npm run build

Environment Variable

Vercel production environment:

VITE_API_URL=https://stylework-backend.onrender.com/api

After changing a VITE environment variable, the application must be redeployed because Vite embeds these values during the build.

Trade-offs

Redux Toolkit

Redux Toolkit is slightly more structure than local component state requires for this small application, but it provides predictable state handling and scales better if the application grows.

Ant Design

Ant Design was selected for the table and reusable select control to provide reliable data-table behavior without implementing table functionality from scratch.

Formik + Yup

Formik handles form state while Yup handles validation. This keeps validation rules separate from UI components.

No routing

The assignment only requires one main screen, so introducing a routing layer would add complexity without a current product requirement.

Future Improvements

Pagination controls

Debounced search

Lead details page

Authentication

Dashboard metrics

Responsive mobile-specific table/card view

Toast notifications

Loading skeletons

Automated frontend tests

Accessibility audit

Assignment Criteria Mapping

Criterion

Implementation

Working Product

React Lead Tracker UI

Code Quality

TypeScript, Redux Toolkit, reusable components

README

This document

AGENT.md

AI usage and engineering decisions documented

Git Commit Trail

Feature-focused commits

Deployment

Vercel

Testing

Frontend testing can be expanded with Vitest/RTL

License

This project was created as part of the Stylework Junior Full Stack Engineer assignment.
