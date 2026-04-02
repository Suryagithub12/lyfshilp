// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "express-async-errors"; // async error handling

// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import externalLinkRoutes from "./routes/externalLinkRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import testSeriesRoutes from "./routes/testSeriesRoutes.js";
import updateRoutes from "./routes/updateRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import olympiadRoutes from "./routes/olympiadRoutes.js";
import workshopRoutes from "./routes/workshopRoutes.js";
import callbackRoutes from "./routes/callbackRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import partnerSchoolRoutes from "./routes/partnerSchoolRoutes.js"
import dailyPdfRoutes from "./routes/dailyPdfRoutes.js";
import careerGuidanceRoutes from "./routes/careerGuidanceRoutes.js";



const app = express();

// --- Middlewares ---
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "compute-pressure=(), picture-in-picture=()"
  );
  next();
});
// ✅ CORS configuration - allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // ✅ Added for Vite alternate port
  "http://localhost:4000",
  "https://lyfshilp.vercel.app",
  "https://lyfshilp-six.vercel.app/",
  "https://lyfshilp.com",
  "https://www.lyfshilp.com", // ✅ added live domain
  process.env.CLIENT_URL, // optional env variable
].filter(Boolean); // remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/external-links", externalLinkRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/testseries", testSeriesRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/user", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/futureX", olympiadRoutes);
app.use("/api/partner-school", partnerSchoolRoutes);
app.use("/api/workshop", workshopRoutes);
app.use("/api/callback", callbackRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/daily-pdf", dailyPdfRoutes);
app.use("/api/career-guidance", careerGuidanceRoutes);


// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Lyfshilp Academy API" });
});

// --- Global Error handler ---
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
  });
});

export default app;
