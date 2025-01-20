import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import bcrypt from 'bcrypt'

dotenv.config()

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    throw new Error("SECRET_KEY environment variable is not set");
}

// Helper function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Register User Controller
const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Input validation
        switch (true) {
            case !email:
                return res.status(400).send({ error: "Email is required" });

            case !password:
                return res.status(400).send({ error: "Password is required" });

            case password.length < 6:
                return res.status(400).send({ error: "Password must be at least 6 characters long" });

            case !username:
                return res.status(400).send({ error: "Username is required" });

            default:
                break;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: `User already exists with email ${email}` });
        }

        // Save new user (password is hashed in the model)
        const newUser = new User({ email, username, password });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);
        const newUserwithoutPass = await User.findById(newUser._id).select('-password')
        res.status(201).send({
            success: `User created with username ${username}`,
            user: newUserwithoutPass,
            token,
        });
    } catch (error) {
        res.status(500).send({ error: "Server error during registration", details: error.message });
    }
};

// Login User Controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).send({ error: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ error: "Invalid email or password" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: "Invalid email or password" });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).send({
            success: "Login successful",
            user: { email: user.email, username: user.username },
            userDetails:user,
            token,
        });
    } catch (error) {
        res.status(500).send({ error: "Server error during login", details: error.message });
    }
};

export { registerUser, loginUser };
