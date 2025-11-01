# 📚 Books Inventory API

A simple **Node.js + Express** backend API for managing a **Books Inventory Dashboard**.  
This project includes user authentication, CRUD operations for books, and MongoDB integration.

---

## 🚀 Features

- 🔐 **JWT Authentication** for secure login  
- 📖 **CRUD Operations** for managing books  
- 🧩 **MVC Architecture** (Models, Controllers, Routes)  
- 🧾 Request validation & error handling  
- 🗃️ **MongoDB (Mongoose)** for data persistence  
- 🌐 Ready for **React + Tailwind** frontend integration  

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – MongoDB ODM  
- **bcryptjs** – Password hashing  
- **jsonwebtoken** – JWT-based authentication  
- **dotenv** – Environment variable management  

---

## 📂 Folder Structure

```
books-inventory-api/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── bookController.js  # CRUD operations for books
├── models/
│   ├── userModel.js
│   └── bookModel.js
├── routes/
│   ├── authRoutes.js
│   └── bookRoutes.js
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── errorHandler.js
├── .env                   # Environment variables
├── server.js              # Application entry point
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/jaymani007/books-inventory.git
cd books-inventory
cd server
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create a `.env` File
Create a `.env` file in the root folder and add:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/booksdb
JWT_SECRET=your_jwt_secret_key
```

### 4️⃣ Start the Server
```bash
npm start
```

Server will start on:  
👉 **http://localhost:5000**

---

## 📘 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/login` | User login with static credentials |

### 📚 Books

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a single book by ID |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

---

## 🧠 Example Book Schema

```js
{
  title: String,
  author: String,
  price: Number,
  category: String,
  inStock: Boolean
}
```

---

## 🔐 Example Login Credentials

```json
{
  "username": "admin@gmail.com",
  "password": "password123"
}
```

Use the token received after login for authenticated routes:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧰 Testing

You can use **Postman** or **cURL** to test all endpoints.

---

## 💡 Notes

- Designed with scalability and modularity in mind  
- Works seamlessly with a **React + TailwindCSS** frontend dashboard  
- Includes error handling for invalid requests and token verification  

---


## 🪪 License

This project is licensed under the **MIT License**.
