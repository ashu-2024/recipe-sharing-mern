# 🍲 Recipe Sharing MERN App

A full-stack MERN application where users can sign up, log in, and share their favorite recipes with others. This project demonstrates complete CRUD functionality, authentication, and modern frontend practices.

---

## 🚀 Features

* 🔐 User Authentication (Signup / Login)
* 🍽️ Create, Read, Update, Delete Recipes
* ❤️ Like / Favorite Recipes
* 🖼️ Image support for recipes
* ⏱️ Recipe details (ingredients, steps, cooking time)
* 💾 Session Storage for authentication handling
* 📦 Local Storage for persistent user data

---

## 🛠️ Tech Stack

**Frontend:**

* React (Vite)
* CSS / Tailwind CSS

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**State Management & Storage:**

* Session Storage
* Local Storage

---

## 📁 Project Structure

```bash
recipe-sharing-mern/
 ├── backend/
 ├── frontend/
 ├── .gitignore
 └── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/recipe-sharing-mern.git
cd recipe-sharing-mern
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside backend:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend/food-blog-app
npm install
npm run dev
```

---

## 🌐 API Endpoints (Sample)

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | /api/auth/signup | Register user   |
| POST   | /api/auth/login  | Login user      |
| GET    | /api/recipes     | Get all recipes |
| POST   | /api/recipes     | Create recipe   |
| PUT    | /api/recipes/:id | Update recipe   |
| DELETE | /api/recipes/:id | Delete recipe   |

---

## 📸 Screenshots

*Add screenshots of your project here (UI, login page, recipe page, etc.)*

---

## 📌 Future Improvements

* 💬 Add comments on recipes
* 🔍 Search and filter functionality
* 🌐 Deployment (Render / Vercel)
* 🎨 Improve UI/UX

---

## 🙌 Author

**Ashutosh**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

