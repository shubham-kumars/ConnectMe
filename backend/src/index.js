import express from "express";
import cors from "cors";
import dns from "dns";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./lib/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const server = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

// it's important that you don't parse the webhook event data, it should be in the raw format
app.use(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook,
);

// Middlewares
server.use(express.json());
server.use(clerkMiddleware());
server.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

// Routes
server.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});


// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
  server.use(express.static(publicDir));

  server.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}


// Server
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is up and running on PORT: ${PORT}`);

  if (process.env.NODE_ENV === "production") job.start();
});
