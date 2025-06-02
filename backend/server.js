import express from "express";
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";
import User from "./model/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All Fields Required");
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "Username already taken, try another" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (userDoc) {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return res
      .status(200)
      .json({ user: userDoc, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcryptjs.compareSync(
      password,
      userDoc.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (userDoc) {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return res
      .status(200)
      .json({ user: userDoc, message: "Logged In Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/fetch-user", async(req, res) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({message: "Invalid Token"})
        }
        const userDoc = await User.findById(decoded.id).select("-password")
        if(!userDoc){
            return res.status(400).json({message: "No user found"})
        }
        res.status(200).json({user: userDoc})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

app.post('/api/logout', async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: "Logged Out Successfully"})
})

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
