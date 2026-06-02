# 🛍️ ShopEase - E-Commerce Platform

A full-stack e-commerce web application built with React, Node.js, Express, and MongoDB.

## 🚀 Live Features

- 🔐 JWT Authentication (Register/Login/Logout)
- 🛒 Shopping Cart with localStorage persistence
- 📦 Product listing with search, filter & sort
- 💳 Order placement and tracking
- ⚙️ Admin Dashboard (manage products & orders)
- 📱 Responsive UI

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Axios, CSS-in-JS

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Auth:** JWT (JSON Web Tokens), bcryptjs

## ⚙️ Installation & Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🔑 Environment Variables

Create a `.env` file in the backend folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=mysecretkey123

## 📸 Screenshots

### Home Page
![Home](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800)

## 👤 Default Admin Account
- Email: admin@shopease.com
- Password: admin123

## 📁 Project Structure

ecommerce-app/
├── backend/
│   ├── config/        # Database connection
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Auth middleware
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── server.js      # Entry point
└── frontend/
└── src/
├── components/ # Navbar
└── pages/      # All pages