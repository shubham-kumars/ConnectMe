import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "dns";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./lib/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// Server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is up and running on PORT: ${PORT}`);
});
