import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

// REGISTER: Create user + Send Email
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists, mate." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const vToken = crypto.randomBytes(32).toString('hex'); // Crypto magic

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: vToken,
      isVerified: false
    });

    const verifyUrl = `http://localhost:5173/verify/${vToken}`;
    const message = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2>Welcome to RideForYou, ${name}!</h2>
        <p>Click the button below to verify your email and start tracking buses.</p>
        <a href="${verifyUrl}" style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; display: inline-block;">Verify Account</a>
      </div>
    `;
    
    await sendEmail(email, "Verify Your RideForYou Account", message);
    res.status(201).json({ message: "Verification email sent! Check your inbox." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// sending the email to verify the email of the user 
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: "Invalid or expired token." });

    user.isVerified = true;
    user.verificationToken = undefined; 
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed." });
  }
};

// Function to let the user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isVerified) return res.status(401).json({ message: "Please verify your email first!" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000 
      });

      res.json({ id: user._id, name: user.name, savedBuses: user.savedBuses });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//To save the user's selected buses
export const saveBus = async (req, res) => {
  try {
    const { busId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user.savedBuses.includes(busId)) {
      user.savedBuses.push(busId);
      await user.save();
    }
    res.json({ message: "Bus saved to your account!", favorites: user.savedBuses });
  } catch (error) {
    res.status(500).json({ message: "Could not save bus." });
  }
};