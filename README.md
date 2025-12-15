A production-ready real estate platform with role-based access, agent dashboards, and secure admin controls, built and deployed as a real-world full-stack application.
🔗 Live Demo: https://abrealestates.vercel.app
🔗 Backend API: Hosted on Render

Overview:
AB Real Estates is a full-stack real estate management platform that allows:
Users to browse verified property listings
Agents to manage their own properties and enquiries
Admins to manage users, agents, and property approvals
The project focuses on real production concerns such as authentication, authorization, deployment, and error handling, not just UI.

Key Features

Users :
Browse approved property listings
View detailed property information
Submit property enquiries

Agents:
Secure agent dashboard
Add, edit, and manage own properties
View and manage property enquiries
Filter listings by status, approval, and availability

Admin:
Admin-only dashboard
Approve / reject properties
Manage users and agent roles
View platform-wide enquiries

Authentication & Authorization:
JWT-based authentication
Role-based access control (User / Agent / Admin)
Protected frontend routes
Backend middleware enforcing role permissions
Automatic logout on unauthorized access

TECH STACK
Frontend:
React (Vite)
React Router
TanStack React Query
Tailwind CSS
Axios

Backend:
Node.js
Express.js
MongoDB
JWT Authentication
Cloudinary (image uploads)

Deployment:
Frontend: Vercel
Backend: Render

This is not a tutorial clone.

It demonstrates:
Full-stack thinking
Secure role-based architecture
Production deployment knowledge
Real debugging experience
Clean separation of concerns
