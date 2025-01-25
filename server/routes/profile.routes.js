import express from "express"
import { deleteProfile, getProfile } from "../controllers/profile.controller.js"
import rateLimit from "express-rate-limit"  

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


export {profilerouter}