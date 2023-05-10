// import PNGfile from "../models/PNGfile.js";
import { v2 as cloudinary } from "cloudinary";

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

export const uploadPNG = async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // const newFile = new PNGfile({
    //   path: result.secure_url,
    // });
    // const savedFile = await newFile.save();
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json(err);
  }
};
