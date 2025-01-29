import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";


dotenv.config()

const secretKey = process.env.SECRET_KEY
if (!secretKey) {
    throw new Error("SECRET_KEY environment variable is not set");
}

const getProfile = async (req, res) => {
    try {
        console.log("getProfile called");

        // Step 1: Get the token from the authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            // If the header is missing, return an error
            console.error("Authorization header is missing.");
            return res.status(401).json({ error: "No token provided." });
        }

        // Step 2: Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];
        console.log(token)
        if (!token) {
            // If the token is missing, return an error
            console.error("Bearer token is missing.");
            return res.status(401).json({ error: "Invalid token format." });
        }

        // Step 3: Verify the token
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)

        // Step 4: Retrieve user information based on the decoded token's ID
        const user = await User.findById(decoded.userId);
        if (!user) {
            // If no user is found, return an error
            console.error(`User not found for token with userId: ${decoded.userId}.`);
            return res.status(404).json({ error: "User not found." });
        }

        // Step 5: Send back detailed user profile data
        res.json({
            user
        });

        console.log(`Profile fetched successfully for user ${user.username}.`);
    } catch (error) {
        console.error("Error during profile retrieval:", error);
        if (error.name === "JsonWebTokenError") {
            // Handle invalid JWT errors
            return res.status(401).json({ error: "Invalid token." });
        }
        // Handle unexpected errors
        res.status(500).json({ error: "An error occurred while fetching the profile." });
    }
}

const deleteProfile = async (req, res) => {
    try {
        // Step 1: Get the token from the authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          // If the header is missing, return an error
          return res.status(401).json({ error: "No token provided." });
        }
    
        // Step 2: Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];
        // Step 3: Verify the token
        const decoded = jwt.verify(token, secretKey);
        // Step 4: Find the user by ID from the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
          // If no user is found, return an error
          return res.status(404).json({ error: "User not found." });
        }
    
        // Step 5: Delete the user profile
        await user.deleteOne();
        res.json({ message: "Profile deleted successfully." });
      } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ error: "An error occurred while deleting the profile." });
      }
}

// Edit user profile function
const editProfile = async (req, res) => {
    // username, email, name, location,picture, dob,age

    try {
      console.log("editProfile called");
  
      // Step 1: Get the token from the authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        // If the header is missing, return an error
        console.error("Authorization header is missing.");
        return res.status(401).json({ error: "No token provided." });
      }
  
      // Step 2: Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];
      if (!token) {
        // If the token is missing, return an error
        console.error("Bearer token is missing.");
        return res.status(401).json({ error: "Invalid token format." });
      }
  
      // Step 3: Verify the token
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded)
      // Step 4: Find the user by ID from the decoded token
      const user = await User.findById(decoded.userId);
      if (!user) {
        // If no user is found, return an error
        console.error(`User not found for token with userId: ${decoded.userId}.`);
        return res.status(404).json({ error: "User not found." });
      }
  
      // Step 5: Update the user's profile fields if provided in the request body
      const { username, name,age, email, dob, location } = req.body;
      const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer
  
      if (username) user.username = username;
      if (email) user.email = email;
      if (dob) user.dob = dob;
      if (location) user.location = location;
      if (name) user.name = name;
      if (age) user.age = age;
      if (filebuffer) {
        // Step 6: If an image is provided, upload it to Cloudinary
        const uploadedurl = await upload_on_cloudinary(filebuffer);
        user.picture = uploadedurl;
      }
  
      // Step 7: Save the updated user information
      await user.save();
  
      console.log(`Profile updated successfully for user ${user.username}.`);
      res.json({ message: "Profile updated successfully.", user });
    } catch (error) {
      console.error("Error during profile update:", error);
      if (error.name === "JsonWebTokenError") {
        // Handle invalid JWT errors
        return res.status(401).json({ error: "Invalid token." });
      }
      // Handle unexpected errors
      res.status(500).json({ error: "An error occurred while updating the profile." });
    }
  };


export {getProfile, deleteProfile,editProfile}