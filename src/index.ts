import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";

import AgendaRoute from "@routes/AgendaRoute";
import PinCodeRoute from "@routes/PinCodeRoute";
import AuthRoute from "@routes/AuthRoute";
import SelectionRoute from "@routes/SelectionRoute";
import VoteRoute from "@routes/VoteRoute";

import { AppDataSource } from "@config/data-source";
import { setIO } from "@config/Socket";

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

// Set the io instance for global use
setIO(io); 

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

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// WebSocket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.use("/api/agenda", AgendaRoute);
app.use("/api/pinCode", PinCodeRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/selection", SelectionRoute);
app.use("/api/vote", VoteRoute);

// Root
app.get("/api", (req, res) => {
  res.send("Hello from utycc welcome backend!");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
