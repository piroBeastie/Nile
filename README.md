🪑 NILE – Modern Furniture E-Commerce Platform

NILE is a full-stack MERN e-commerce application for premium furniture shopping.
It features a clean, minimal UI, secure authentication, cart & order management, and Stripe-powered payments.

Built with production best practices and deployed using Vercel (frontend) and Render (backend).

✨ Features

🛋 Product browsing by category

🛒 Cart management (add / update / remove)

🔐 JWT authentication with HTTP-only cookies

💳 Stripe Checkout integration (test mode)

📦 Order history & tracking

🎨 Minimal, modern UI with Tailwind CSS

⚡ Clean layout with sticky footer & no layout shift

🧰 Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router

Axios

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Stripe API

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🔗 Live Demo

Frontend:
https://nile-theta.vercel.app

Backend API:
https://nile-nq4k.onrender.com

🚀 Getting Started (Local Setup)
1. Clone the repository

git clone https://github.com/your-username/nile.git

cd nile

2. Backend Setup

cd backend
npm install

Create a .env file in backend/ with the following:

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173

NODE_ENV=development

Run backend:

npm run dev

3. Frontend Setup

cd ../frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173

💳 Stripe Test Payment

Use the following Stripe test card:

Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits

🗂 Project Structure

nile/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.jsx
│ └── vercel.json
│
└── README.md

🧠 Key Implementation Details

Authentication uses JWT stored in HTTP-only cookies for security.

Stripe Checkout is used for payments; orders are created only after successful payment.

CORS and cookies are properly configured for cross-origin production use.

SPA routing is handled via vercel.json rewrites.

Layout uses flexbox to ensure footer stays at the bottom on short pages.

🧑‍💻 Author

Nanakjot Singh Chahal
Full-Stack Developer (MERN)

📄 License

This project is for educational and portfolio purposes.
