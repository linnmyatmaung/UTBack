import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Use .ts for development, .js for production
const fileExt = process.env.NODE_ENV === "production" ? "js" : "ts";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  entities: [path.resolve(__dirname, `../entities/**/*.${fileExt}`)],
  migrations: [path.resolve(__dirname, `../migrations/**/*.${fileExt}`)],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error initializing Data Source", err));
