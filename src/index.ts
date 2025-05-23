import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "@config/data-source";
import path from "path";
import helmet from "helmet";

dotenv.config();
AppDataSource.initialize();

const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
// Logging middleware192
app.use(
  cors({
    origin: ["http://localhost:5174", "http://192.168.100.18:5174"], // Allow only your React app in development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if you're using authentication
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", cors({}), express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to the vote API");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
