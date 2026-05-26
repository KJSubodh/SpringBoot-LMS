# 📚 Library Management System

> A full-stack Library Management System built with **Spring Boot**, **React**, and **PostgreSQL** — featuring complete CRUD operations, JPA relationships, a borrow/return system, and a modern responsive UI.

---

## 🧠 What is this?

A web application that allows librarians to manage their entire library digitally — books, authors, users, and categories — with a clean UI and a robust REST API backend.

Users can **search** for books, **borrow** them, and **return** them. Librarians can **add**, **update**, and **delete** records across all entities. Everything is tracked in a PostgreSQL database with proper relational mappings.

---

## ✨ Features

- ✅ Full **CRUD** for Books, Users, Authors, and Categories
- ✅ **Borrow / Return** system with real-time availability tracking
- ✅ All **4 JPA Relationships** — One-to-One, One-to-Many, Many-to-One, Many-to-Many
- ✅ **Global Exception Handling** via `@RestControllerAdvice`
- ✅ Consistent API responses via `ResponseStructure` wrapper
- ✅ **Search & Filter** across all entities
- ✅ **Responsive UI** with mobile sidebar support
- ✅ **15+ REST API Endpoints** tested via Postman

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java 17, Spring Boot 4, Spring Data JPA, Hibernate, PostgreSQL |
| **Frontend** | React 18, TailwindCSS, Axios, React Router, Context API |
| **Tools** | Maven, Postman, Git, GitHub, IntelliJ IDEA |

---

## 🏗️ Architecture

```
Controller → Service → DAO → Repository → Database
     ↓            ↓       ↓
  REST API    Business  Data Access
               Logic
```

The backend follows a clean **layered architecture**:

- **Controller** — handles HTTP requests and routing
- **Service** — contains business logic
- **DAO** — data access abstraction layer
- **Repository** — Spring Data JPA interfaces
- **Entity** — JPA-mapped database models

---

## 📁 Project Structure

```
LibraryManagementSystem/
├── LMS-BE/                        # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/pentagon/LibraryManagementSystem/
│   │       ├── Controller/        # REST Controllers
│   │       ├── Service/           # Business Logic
│   │       ├── DAO/               # Data Access Layer
│   │       ├── Repository/        # JPA Repositories
│   │       ├── Entity/            # JPA Entities
│   │       └── DTO/               # Response Wrapper
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── LMS-FE/                        # React Frontend
    ├── src/
    │   ├── pages/                 # AuthorsPage, BooksPage, UsersPage
    │   ├── components/            # Reusable UI components
    │   ├── services/              # Axios API calls
    │   └── context/               # Global state
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven

---

### 🔧 Backend Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/KJSubodh/LibraryManagementSystem.git
   cd LibraryManagementSystem
   ```

2. **Navigate to the backend**
   ```bash
   cd LMS-BE
   ```

3. **Create the PostgreSQL database**
   ```sql
   CREATE DATABASE LMS2;
   ```

4. **Create `application-local.properties`** inside `src/main/resources/`:
   ```properties
   spring.datasource.password=your_postgres_password
   ```
   > ⚠️ This file is git-ignored. Never commit your credentials.

5. **Run the backend**
   ```bash
   mvn spring-boot:run
   ```
   Backend runs at: `http://localhost:8080`

---

### 💻 Frontend Setup

1. **Open a new terminal and navigate to the frontend**
   ```bash
   cd LMS-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Books
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/books` | Get all books |
| `GET` | `/books/{id}` | Get book by ID |
| `POST` | `/books` | Add a new book |
| `PUT` | `/books/{id}` | Update book |
| `PUT` | `/books/{id}/borrow/{userId}` | Borrow a book |
| `PUT` | `/books/{id}/return` | Return a book |
| `GET` | `/books/author/{authorId}` | Get books by author |

### Authors
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/authors` | Get all authors |
| `GET` | `/authors/{id}` | Get author by ID |
| `POST` | `/authors` | Add a new author |

### Users
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users` | Get all users |
| `GET` | `/users/{id}` | Get user by ID |
| `POST` | `/users` | Create a user |
| `PUT` | `/users/{id}` | Update a user |
| `DELETE` | `/users/{id}` | Delete a user |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/categories` | Get all categories |
| `POST` | `/categories` | Add a category |

---

## 🗃️ Database Schema (Entity Relationships)

```
User ──────────── Book ──────────── Author
  (One-to-Many)        (Many-to-One)

Book ──────────── Category
  (Many-to-Many)

User ──────────── Profile
  (One-to-One)
```

---

## 🔒 Environment & Security

Sensitive config is kept out of version control:

- `application-local.properties` — local DB credentials (git-ignored)
- `.env` — environment variables (git-ignored)

For contributors: create your own `application-local.properties` in `LMS-BE/src/main/resources/` with your local PostgreSQL password after cloning.

---

## 🧪 Testing

All endpoints tested via **Postman**. Import the collection *(add link or file here)* to test locally.

---

## 🙌 Author

**Subodh KJ**
- GitHub: [@KJSubodh](https://github.com/KJSubodh)
- LinkedIn: [kj-subodh](https://www.linkedin.com/in/kj-subodh-a8a32926a/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).