import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";

import AgendaRoute, { setSocketIO } from "@routes/AgendaRoute";
import PinCodeRoute from "@routes/PinCodeRoute";
import AuthRoute from "@routes/AuthRoute";
import SelectionRoute from "@routes/SelectionRoute";
import VoteRoute from "@routes/VoteRoute";

import { AppDataSource } from "@config/data-source";

dotenv.config();
AppDataSource.initialize();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.43.189:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.43.189:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g. uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Set up Socket.IO reference for other modules
setSocketIO(io);

// Routes
app.use("/agenda", AgendaRoute);
app.use("/pinCode", PinCodeRoute);
app.use("/auth", AuthRoute);
app.use("/selection", SelectionRoute);
app.use("/vote", VoteRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Hello from utycc welcome backend!");
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
