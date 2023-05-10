import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cartRoutes from "./routes/carts.js";
import listingRoutes from "./routes/createListing.js";
// import pngFileRoutes from "./routes/pngFiles.js";

import { uploadPNG } from "./routes/uploadPNG.js";
// import { createListing } from "./routes/createListing.js";
import { verifyToken } from "./verifyToken.js";
import stripeRoute from "./routes/stripe.js";

import { v2 as cloudinary } from "cloudinary";

const cloud_name = process.env.cloud_name;
const api_key = process.env.api_key;
const api_secret = process.env.api_secret;

/* CONFIGURATIONS for module type */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(cors());
// {
//   origin: ["http://localhost:3000", "https://pod-tee-app.onrender.com"],
// }

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// store files locally
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

/* FILE STORAGE */
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "public/assets");
  // },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/uploadPNG", verifyToken, upload.single("image"), uploadPNG);

/* API ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
// app.use("/pngFile", pngFileRoutes);
app.use("/listings", listingRoutes);
app.use("/carts", cartRoutes);
app.use("/checkout", stripeRoute);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
