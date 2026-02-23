import express from 'express';
import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const SALT_ROUNDS = 10; // bcrypt salt rounds

// LOGIN
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = "SELECT id, password FROM users WHERE username=$1";
        const values = [username];
        const result = await pool.query(query, values);

        if (result.rows[0]) {
            const hashedPassword = result.rows[0].password;

            const isMatch = await bcrypt.compare(password, hashedPassword);
            if (isMatch) {
                const userId = result.rows[0].id;
                res.send({ status: 200, userId });
            } else {
                res.send({ status: 402, message: "Invalid username or password" });
            }
        } else {
            res.send({ status: 402, message: "Invalid username or password" });
        }

    } catch (err) {
        console.error("DB error", err);
        res.send({ status: 500, message: "Server error" });
    }
};

// REGISTER
const register = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = `
            INSERT INTO users(first_name, last_name, email, password, username)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [firstName, lastName, email, hashedPassword, username];
        await pool.query(query, values);

        // Retrieve the new user's ID
        const getUserQuery = "SELECT id FROM users WHERE username=$1";
        const userResult = await pool.query(getUserQuery, [username]);
        const userId = userResult.rows[0].id;

        res.send({ status: 200, message: "Registration success", userId });

    } catch (err) {
        if (err.code === "23505") { // unique constraint violation
            if (err.constraint === "users_email_key") {
                res.send({ status: 401, message: "Email is already taken, try another" });
            } else if (err.constraint === "users_username_key") {
                res.send({ status: 401, message: "Username is already taken, try another" });
            } else {
                res.send({ status: 401, message: "Duplicate value error" });
            }
        } else {
            console.error("DB error", err);
            res.send({ status: 500, message: "Server error" });
        }
    }
};

// ROUTES
router.post("/login", login);
router.post("/register", register); // changed router.use to router.post

export default router;