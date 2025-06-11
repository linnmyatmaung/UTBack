# 🎉 UTYCC Welcome Voting Backend

A robust RESTful API for managing voting, agendas, and user authentication for UTYCC events. Built with **Node.js**, **Express**, **TypeORM**, **MySQL**, and **Socket.IO** for real-time updates.

---

## 📝 About the Project

This backend powers the UTYCC Welcome Event voting system. It enables secure voting for event participants, real-time agenda updates, and comprehensive admin management. The system is designed for reliability, scalability, and ease of integration with frontend applications.

**Key Capabilities:**

- Secure PIN-based voting for event participants.
- Real-time agenda and voting updates using WebSockets (Socket.IO).
- Admin dashboard for managing users, agendas, and selections.
- File upload support for participant images.
- Robust authentication and authorization using JWT.
- Modular and scalable codebase using TypeScript and TypeORM.

---

## 🚀 Features

- **User Authentication**: Secure login for admins and PIN-based voting users.
- **Voting System**: Vote for male and female selections, with real-time vote counts.
- **Agenda Management**: Create, update, and broadcast event agendas.
- **Admin Management**: Secure admin creation and login.
- **File Uploads**: Upload profile images for selections.
- **Real-Time Updates**: WebSocket support for agenda changes and voting results via **Socket.IO**.
- **Security**: CORS, Helmet, JWT authentication.
- **TypeORM Migrations**: Easy DB schema management.

---

## 🛠️ Tech Stack

- **Node.js** & **Express** — RESTful API server
- **TypeScript** — Type safety and maintainability
- **TypeORM** — Database ORM for MySQL
- **MySQL** — Relational database
- **Socket.IO** — Real-time communication for agenda and voting updates
- **JWT** — Authentication and authorization
- **bcrypt** — Password hashing for admin security
- **Multer** — File uploads (profile images)
- **Helmet** & **CORS** — Security and cross-origin resource sharing
- **dotenv** — Environment variable management

---

## 🗂️ Project Structure

```
UTBack/
│
├── src/
│   ├── config/         # Database & Socket.IO config
│   ├── controllers/    # Express route controllers
│   ├── dto/            # Data transfer objects (DTOs)
│   ├── entities/       # TypeORM entities (Admin, Agenda, PinCode, Selection, VoteLog)
│   ├── middlewares/    # Auth, file upload, etc.
│   ├── migrations/     # TypeORM migrations
│   ├── repositories/   # Custom repository logic
│   ├── routes/         # Express route definitions
│   ├── services/       # Business logic
│   └── index.ts        # App entry point
│
├── uploads/            # Uploaded profile images (gitignored)
├── .env                # Environment variables
├── package.json        # NPM scripts & dependencies
├── tsconfig.json       # TypeScript config
└── README.md           # Project documentation
```

---

## ⚙️ Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/your-username/utycc-welcome.git
cd UTBack
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Configure environment variables**

Create a `.env` file in the root:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRE_MINUTES=60
PORT=5001
```

### 4. **Run database migrations**

```sh
npm run typeorm:run
```

### 5. **Start the development server**

```sh
npm run dev
```

Server runs at: [http://localhost:5001](http://localhost:5001)

---

## 🛣️ API Endpoints

### **Authentication**

- `POST /auth/Plogin` — PIN code login (returns JWT)
- `POST /auth/Alogin` — Admin login (returns JWT)
- `POST /auth/create` — Create new admin

### **Agenda**

- `GET /agenda` — List all agendas
- `GET /agenda/:id` — Get agenda by ID
- `POST /agenda` — Create agendas (admin only)
- `PUT /agenda/:id` — Update agenda (admin only)
- `PUT /agenda/current/:id` — Set current agenda (admin only, emits real-time update via Socket.IO)
- `DELETE /agenda/:id` — Delete agenda (admin only)

### **Selections**

- `POST /selection` — Create selection (admin only, supports image upload)
- `GET /selection` — List all selections (PIN code required)
- `GET /selection/:id` — Get selection by ID (admin only)
- `PUT /selection/:id` — Update selection (admin only)
- `DELETE /selection/:id` — Delete selection (admin only)

### **Voting**

- `POST /vote` — Submit a vote (PIN code required)
- `GET /vote` — Get vote counts (admin only, real-time updates via Socket.IO)

### **Pin Codes**

- `POST /pinCode/:code` — Generate PIN codes (admin only)
- `GET /pinCode/status` — Get PIN code status (PIN code required)

---

## 🛡️ Security

- **JWT Authentication** for all protected routes.
- **Helmet** for HTTP headers security.
- **CORS** configured for frontend origins.
- **Password Hashing** with bcrypt for admin accounts.

---

## 📦 NPM Scripts

| Script                   | Description                  |
| ------------------------ | ---------------------------- |
| `npm run dev`            | Start server with nodemon    |
| `npm run build`          | Compile TypeScript to `dist` |
| `npm start`              | Run built server             |
| `npm run typeorm:run`    | Run DB migrations            |
| `npm run typeorm:create` | Create a new migration       |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Credits

Made with ❤️ for UTYCC Welcome Event.

---

> **Tip:** For more details, see the source code in `src/index.ts` and explore the controllers, services, and routes for each feature.
