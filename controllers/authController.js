const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let assignedRole = 'user';
        let approvedStatus = true;

        if (email.toLowerCase().includes('admin')) {
            assignedRole = 'admin';
            approvedStatus = false;
        }

        const user = new User({ 
            email, 
            password, 
            role: assignedRole,
            isApproved: approvedStatus 
        });

        await user.save();
        
        const message = assignedRole === 'admin' 
            ? "Admin registration pending! Wait for owner approval." 
            : "User registration successful! You can login now.";
            
        res.status(201).json({ message });
    } catch (err) {
        res.status(400).json({ error: "Email already exists" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        if (!user.isApproved) {
            return res.status(403).json({ error: "Your account is pending approval by the owner." });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};