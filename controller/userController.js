const pool = require('../db')

//Create a User
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, cpassword, phonenumber, country, state, city, address, employeetype } = req.body;
        const newUser = await pool.query("INSERT INTO users (username,email,password, cpassword, phonenumber, country, state, city, address,employeetype) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *", [username, email, password, cpassword, phonenumber, country, state, city, address, employeetype])
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}

//Get all Users

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);

    } catch (err) {
        console.error(err.message)
    }
}
// Get One User
exports.getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const oneUser = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(oneUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}

// Update a User
exports.updateOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { employeetype, username, password, cpassword, phonenumber, country, state, city, address } = req.body;
        const updatedUser = await pool.query("UPDATE users SET employeetype = $1, username = $2, password = $3, cpassword = $4, phonenumber = $5, country = $6, state = $7, city = $8, address = $9 WHERE id = $10",
            [employeetype, username, password, cpassword, phonenumber, country, state, city, address, id]
        );
        res.json("User has been updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a User
exports.deleteOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json("User has been deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}