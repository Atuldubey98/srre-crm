import * as dotenv from "dotenv";
export const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({
  path: NODE_ENV === "development" ? "../../.env.development" : "../../.env",
});
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = isNaN(Number(process.env.VITE_API_PORT))
  ? 9000
  : Number(process.env.VITE_API_PORT);
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";
export const JWT_SECRET = process.env.JWT_SECRET || "";
