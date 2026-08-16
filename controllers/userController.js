const userModel = require('../models/userModels.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
  try {
    // Extract phone and password from request body
    const { phone, password } = req.body;
    
    // Validate input
    if (!phone || !password) {
      return res.status(400).send({
        message: "Phone and password are required",
        success: false
      });
    }
    
    // Find user by phone
    const user = await userModel.findOne({ phone });
   
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false
      });
    }
    
    // Compare passwords
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Phone or Password",
        success: false
      });
    }
    
    // Create safe user object (without password)
    const { name, phone: userPhone, role } = user;
    const safeUser = { name, phone: userPhone, role };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      user: safeUser,
      message: "Login successful",
      success: true,
      token
    });

  } catch (error) {
    res.status(500).send({
      message: "Error in login controller",
      error: error.message,
      success: false
    });
  }
};

const registerController = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.phone || !req.body.password || !req.body.name || !req.body.role) {
      return res.status(400).send({
        message: "All fields (name, phone, password, role) are required",
        success: false
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ phone: req.body.phone });

    if (existingUser) {
      return res.status(200).send({
        message: "User already exists",
        success: false
      });
    }

    // Hash password
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;

    // Create and save new user
    const newUser = new userModel(req.body);
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, phone: newUser.phone },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).send({
      message: "Register successful",
      success: true,
      token,
      user: {
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(500).send({
      message: "Error in register controller",
      error: error.message,
      success: false
    });
  }
};

const authController = async (req, res) => {
  try {
    console.log('Auth controller - userId:', req.body.userId);
    const userId = req.body.userId;
    
    // Find user by ID
    const user = await userModel.findById(userId);
    
    if (!user) {        
      return res.status(200).send({
        message: "User not found",
        success: false
      });
    } 
    
    res.status(200).send({
      message: "User data fetched successfully",
      success: true,
      data: {
        name: user.name,
        phone: user.phone,
        role: user.role,
        id: user._id
      }
    });
  } catch (error) {
    res.status(500).send({        
      message: "Error in auth controller",        
      error: error.message,        
      success: false    
    });
  }   
};

module.exports = {
  loginController,
  registerController,
  authController
};