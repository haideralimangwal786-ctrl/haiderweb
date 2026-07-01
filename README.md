# 🚀 Dynamic Full-Stack Portfolio with Built-in CMS

A premium, highly interactive, and fully responsive personal portfolio built on the **MERN Stack** (MongoDB, Express, React, Node.js). What sets this portfolio apart is its built-in **Admin Content Management System (CMS)**, allowing the owner to update profile details, projects, skills, services, and client reviews on the fly without changing a single line of code!

## ✨ Key Features

- **Modern & Premium UI:** Designed with a glassmorphism aesthetic, soft gradients, and micro-interactions using TailwindCSS and Animate.css.
- **Built-in Admin Panel:** Securely log in using JWT authentication to manage all aspects of the portfolio.
- **Dynamic Content:** Everything from the hero text to projects, services, skills, and social links is fetched from the database.
- **Image Optimization:** Integrated `sharp` for automatic image compression (resizing and converting to WebP) on the backend. High-quality image uploads (up to 20MB) are optimized and stored securely as Base64 in MongoDB.
- **Inbox & Messaging:** A fully functional contact form that saves messages directly to the database, accessible via the admin dashboard.
- **Responsive Design:** Carefully crafted layouts ensuring pixel-perfect views across Mobile, Tablet, and Desktop.

## 🖼️ Screenshots

*(Add your screenshots here by dragging and dropping them into the GitHub editor, or replacing the links below!)*

| Public Portfolio | Admin Dashboard |
|:---:|:---:|
| ![Portfolio Screenshot](https://via.placeholder.com/600x350.png?text=Portfolio+UI+Screenshot) | ![Admin Screenshot](https://via.placeholder.com/600x350.png?text=Admin+Panel+Screenshot) |

## 🛠️ Technology Stack

**Frontend:**
- **React.js** (built with Vite for lightning-fast performance)
- **TailwindCSS** (for styling and responsive layouts)
- **React Router** (for SPA navigation)
- **Lucide React & React Icons** (for modern, scalable icons)
- **Animate.css & Canvas Confetti** (for delightful animations)

**Backend:**
- **Node.js & Express.js** (REST API development)
- **MongoDB & Mongoose** (NoSQL Database for flexible schema management)
- **JSON Web Tokens (JWT)** (Secure authentication for the CMS)
- **Multer & Sharp** (Handling image uploads, resizing, and WebP conversion)

**Deployment:**
- **Vercel:** Frontend hosting (with `vercel.json` configured for React Router support)
- **Render:** Backend hosting (API)

## 📸 Core Modules

1. **Public Portfolio:** Home, About, Skills, Services, Projects, Testimonials, and Contact pages.
2. **Admin Dashboard:**
   - **Profile Settings:** Update hero text, bio, social links, resume, and profile image.
   - **Projects Manager:** Add, edit, or remove portfolio projects, tech stacks, and live/github links.
   - **Services & Skills:** Dynamically add new offerings or technical skills.
   - **Inbox:** Read messages submitted by visitors from the contact page.
   - **Reviews:** Manage client testimonials to build trust.

## ⚙️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/haideralimangwal786-ctrl/haiderweb.git
   cd haiderweb
   ```

2. **Backend Setup:**
   ```bash
   # Install dependencies
   npm install
   
   # Rename backend/.env.example to backend/.env and add your variables
   # MONGO_URI, JWT_SECRET, FRONTEND_URL, PORT
   
   # Start the backend server
   npm run server
   ```

3. **Frontend Setup:**
   ```bash
   # Open a new terminal, navigate to frontend
   cd frontend
   npm install
   
   # Rename frontend/.env.example to frontend/.env and add your variables
   # VITE_API_URL=http://localhost:5000
   
   # Start the frontend dev server
   npm run dev
   ```

## 👨‍💻 Author

Built with ❤️ by **Haider Ali**
