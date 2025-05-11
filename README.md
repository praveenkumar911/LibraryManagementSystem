
---

```markdown
# 📚 Library Management System

A full-stack Library Management System built with **Java Spring Boot** (backend) and **React.js** (frontend), using **MySQL** as the database. The system includes **admin login** with JWT authentication and supports **CRUD operations** for books and borrowers. The frontend UI is designed with **Material UI (MUI)**.

---

## ✨ Features

- 🔐 Admin Login (JWT authentication)
- 📖 Book Management (Create, Read, Update, Delete)
- 👥 Borrower Management (Create, Read, Update, Delete)
- ⚙️ Responsive UI with Material UI (MUI)
- 🗃️ Backend API using Spring Boot and Maven
- 🧾 MySQL database integration

---

## 🛠️ Tech Stack

### 🔧 Backend
- Java 17+
- Spring Boot
- Spring Security (JWT Auth)
- Spring Data JPA
- Maven
- MySQL

### 🎨 Frontend
- React.js
- Axios
- React Router
- MUI (Material UI)
- JWT for auth state

---

## 📁 Project Structure

### Backend (`/backend`)
```

src/
├── main/
│   ├── java/com/example/library/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── security/ (JWT config)
│   └── resources/
│       └── application.properties

```

### Frontend (`/frontend`)
```

src/
├── components/
│   ├── BookTable.jsx
│   ├── BorrowerTable.jsx
│   └── LoginForm.jsx
├── pages/
│   ├── Dashboard.jsx
│   └── Login.jsx
├── App.js
└── index.js

````

---

## ⚙️ Setup Instructions

### 📦 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
````

2. Configure your database in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/library_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

3. Run the backend:

   ```bash
   ./mvnw spring-boot:run
   ```

### 💻 Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the React app:

   ```bash
   npm start
   ```


## 🧪 API Endpoints

### Auth

* `POST /api/auth/login`

### Books

* `GET /api/books`
* `POST /api/books`
* `PUT /api/books/{id}`
* `DELETE /api/books/{id}`

### Borrowers

* `GET /api/borrowers`
* `POST /api/borrowers`
* `PUT /api/borrowers/{id}`
* `DELETE /api/borrowers/{id}`


---

## 📄 License

This project is licensed under the MIT License.

```

---

Let me know if any queries
```
