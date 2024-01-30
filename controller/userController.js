const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');

// Create a User
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, active } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query(
            "INSERT INTO users (username, email, password_hash, active) VALUES($1, $2, $3, $4) RETURNING id, username, email, password_hash, active",
            [username, email, hashedPassword, active]
        );

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};


// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query("SELECT id, username, email, password_hash FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password_hash);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            userId: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email
        }, 'qwertyuioplkjhgfdsazxcvbnm', { expiresIn: '1h' });

        const userDetails = {
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email,
        };

        res.json({ token, userDetails });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

// Middleware to verify JWT token
 const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'qwertyuioplkjhgfdsazxcvbnm');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Route to get user details
exports.getUserDetails = (req, res) => {
    const userDetails = {
        id: req.user.userId,
        username: req.user.username,
        email: req.user.email,
    };
    res.json(userDetails);
};

// Get all Users
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT id, username, email, password_hash, active FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

// Get One User
exports.getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const oneUser = await pool.query("SELECT id, username, email, password_hash, active FROM users WHERE id = $1", [id]);

        if (oneUser.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(oneUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

// Update a User
exports.updateOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, active } = req.body;

        const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await pool.query(
            "UPDATE users SET username = $1, password_hash = $2, active = $3 WHERE id = $4 RETURNING id, username, email, active",
            [username, password, active, id]
        );

        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a User
exports.deleteOneUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await pool.query("DELETE FROM users WHERE id = $1", [id]);

        res.json({ message: "User has been deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

// Middleware to verify JWT token
exports.verifyToken = verifyToken;
