import express from "express"
import { deleteProfile, editProfile, getProfile } from "../controllers/profile.controller.js"
import rateLimit from "express-rate-limit"  
import multer from "multer"

const upload = multer({storage:multer.memoryStorage()})
const profilerouter = express.Router()

// Define rate limit
const profileRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `windowMs`
    message: {
      status: 429,
      message: 'Too many requests, please try again later.',
    },
  });

profilerouter.route("/getprofile").get(profileRateLimiter,getProfile)
profilerouter.route("/deleteprofile").delete(profileRateLimiter,deleteProfile)
profilerouter.route("/editprofile").post(profileRateLimiter, upload.single("image") ,editProfile)

export {profilerouter}