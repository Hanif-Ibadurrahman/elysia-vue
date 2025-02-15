# 📂 Vue + Elysia.js File Explorer

A web-based file explorer built with **Vue 3 (Composition API)** for the frontend and **Elysia.js (Bun)** for the backend. This project provides a Windows Explorer-like interface to navigate a folder structure stored in a **PostgreSQL** database.

---

## 🚀 Getting Started

### 🏗 Backend (Elysia.js + Bun)

Follow these steps to set up the backend:

```sh
cd backend       # Navigate to the backend folder
bun install      # Install dependencies
bun run db:up    # Start the database (if using Docker)
bun run db:migrate  # Run database migrations
bun run dev      # Start the development server
```

The API server will be available at:
```
http://localhost:3000
```

### 📜 API Documentation (Swagger)
After starting the backend, you can access the **Swagger UI** to explore the API:
```
http://localhost:3000/swagger
```

---

### 🎨 Frontend (Vue 3)

Follow these steps to set up the frontend:

```sh
cd frontend     # Navigate to the frontend folder
yarn install    # Install dependencies
yarn format     # Format the code (optional but recommended)
yarn dev        # Start the development server
```

The frontend will be available at:
```
http://localhost:5173
```
(by default, Vite serves the app on port **5173**)

---

## 🛠 Tech Stack

**Frontend:**
- Vue 3 (Composition API)
- TypeScript
- Vite

**Backend:**
- Bun + Elysia.js
- PostgreSQL

---

## 🌟 Features
✅ File explorer with expandable folder structure  
✅ Recursive subfolder fetching  
✅ API documentation with Swagger  
✅ Lightweight and fast backend using Bun  
✅ Modern Vue 3 Composition API implementation  

---

## 📌 Notes
- Ensure that **PostgreSQL** is running before running the backend.
- Modify the **database configuration** if necessary inside `backend/config.ts`.

Feel free to contribute and improve this project! 🚀

