AGENT.md — Stylework Lead Tracker

Purpose

This document records how AI tools were used during development of the Stylework Junior Full Stack Engineer assignment.

AI assistance was used as a development aid. The final implementation was reviewed, adapted, tested, and integrated by the developer.

AI Tools Used

ChatGPT

ChatGPT was used for:

Zod validation design

Redux Toolkit structure

React component structure

Tailwind and Ant Design integration

Deployment troubleshooting

Render and Vercel environment-variable troubleshooting

CORS debugging

README and documentation drafting

Testing strategy suggestions

Code review and debugging

Other AI tools

No other AI coding tool was required for the documented implementation.

Representative Prompts

The following are representative examples of the prompts used during development.

Architecture

Design a clean Node.js Express PostgreSQL backend for a Lead Tracker assignment with create lead, list leads, search leads, and update lead status.

Backend Structure

Create a layered Express architecture with routes, controllers, services, repositories, validators, middleware, and PostgreSQL configuration.

Validation

Create Zod validation for lead name, email, phone, and allowed lead statuses.

Frontend

Create a React TypeScript Lead Tracker frontend using Redux Toolkit, Axios, Formik, Yup, Tailwind CSS, and Ant Design.

Deployment

Explain how to deploy the Express backend to Render and connect it to a Neon PostgreSQL database.

Debugging

The Vercel frontend is returning 404 for /api/leads. Help determine whether the Vite API environment variable is configured correctly.

CORS

The frontend reaches the Render API but the browser reports a CORS error. Help configure FRONTEND_URL and Express CORS correctly.

AI-Generated / AI-Assisted Sections

AI assistance was used for initial drafts or implementation guidance for:

Folder structure

API design

PostgreSQL schema

Repository/service/controller patterns

Validation schemas

Redux slice/thunk structure

Axios configuration

Ant Design reusable select component

Deployment configuration

Error-handling patterns

README structure

Documentation wording

AI-generated code was not treated as automatically correct. Code was reviewed and adapted to the actual project structure, package versions, deployment environment, and assignment requirements.

Manually Written / Manually Verified Sections

The developer manually handled or verified:

Project setup

Dependency installation

Repository configuration

Environment variables

Neon database configuration

Render deployment configuration

Vercel deployment configuration

Actual application integration

UI adjustments

API integration

Debugging runtime errors

CORS troubleshooting

Git repository management

Final deployment verification

Assignment-specific decisions

Key Engineering Decisions

1. Separate Frontend and Backend

The project was split into two repositories:

Frontend → Vercel
Backend → Render
Database → Neon PostgreSQL

This separation keeps deployment responsibilities clear and allows each application to be independently deployed.

2. PostgreSQL

PostgreSQL was selected because the data model is relational and small.

The leads table uses a database constraint for valid statuses.

3. Layered Backend

The backend uses:

Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Database

This avoids putting SQL queries and business logic directly inside route handlers.

4. Zod on the Backend

Zod provides runtime validation for incoming HTTP requests.

Backend validation remains necessary even though the frontend also validates forms.

5. Redux Toolkit

Redux Toolkit is used to centralize lead state and asynchronous API operations.

This avoids tightly coupling API requests to individual UI components.

6. Ant Design Table

Ant Design was deliberately used for the lead table as required by the implementation approach.

The status update uses a reusable CommonSelect wrapper around Ant Design's Select.

7. Formik + Yup

Formik handles form state and submission while Yup handles client-side validation.

8. Environment Variables

Frontend:

VITE_API_URL

Backend:

DATABASE_URL
FRONTEND_URL
NODE_ENV

Secrets and database credentials are not committed to source control.

9. CORS

The backend uses the deployed frontend URL as the allowed origin:

https://stylework-frontend-teal.vercel.app

The frontend points to:

https://stylework-backend.onrender.com/api

10. No Authentication

Authentication was intentionally excluded because it is not part of the assignment requirements.

What AI Did Not Decide

AI suggestions were not blindly accepted for:

Product requirements

Deployment credentials

Environment secrets

Final UI behavior

Database credentials

Repository access

Git history

Final code acceptance

The developer made the final engineering decisions.

Verification Process

AI-assisted code was verified by:

Running the application locally.

Checking API responses.

Testing database connectivity.

Checking browser Network requests.

Testing deployed endpoints.

Fixing Vercel environment-variable configuration.

Fixing Render CORS configuration.

Reviewing error responses.

Reviewing the final repository structure.

Lessons / Engineering Notes

Vite exposes frontend environment variables only when they use the VITE\_ prefix.

Vite environment variables are embedded during the build, so changing a Vercel environment variable requires a new deployment.

Render needs the Express server to listen on the provided production port and bind to 0.0.0.0.

CORS configuration must match the browser's frontend origin.

Client-side validation improves UX, but backend validation is still required.

Database constraints should protect important data rules even if application-level validation already exists.

AI Usage Summary

AI was used primarily as:

Planning → Implementation assistance → Debugging → Documentation → Review

The final project combines AI-assisted development with manual implementation, testing, deployment, and verification.
