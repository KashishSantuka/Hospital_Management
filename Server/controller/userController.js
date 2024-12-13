import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

   

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
      });
    }

   console.log( existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);

    const formattedEmail = email.toLowerCase()

    const newUser = new User({
      username,
      email: formattedEmail,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password, role , token} = req.body;
    

    if (!username || !password ) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });

    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

 

    const tokenCode = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log(tokenCode);

    user.tokens.push({ token: tokenCode });
    await user.save();

  

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};
