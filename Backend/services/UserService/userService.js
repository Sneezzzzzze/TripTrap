import bcrypt from "bcryptjs";
import { conn } from "../../utils/db.js";

const TABLE_NAME = "users";
export const createUser = async (data) => {
    try {
        const { username, first_name, last_name, email, password } = data;

        if (!username || !first_name || !last_name || !email || !password) {
            throw new Error("Please provide all required fields.");
        }

        const checkSql = `
          SELECT id 
          FROM ${TABLE_NAME} 
          WHERE username = $1 OR email = $2 
          LIMIT 1
        `;
        const checkRes = await conn.query(checkSql, [username, email]);

        if (checkRes.rows[0]) {
            throw new Error("Username or Email already exists.");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
          INSERT INTO ${TABLE_NAME} (username, first_name, last_name, email, password, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
          RETURNING *;
        `;
        const values = [
            username,
            first_name,
            last_name,
            email,
            hashedPassword,
        ];
        const result = await conn.query(sql, values);

        if (!result.rows[0]) {
            throw new Error("Failed to create user.");
        }

        return result.rows[0];
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const getAllUsers = async () => {
    try {
        const sql = `SELECT id, username, first_name, last_name, email, created_at, updated_at 
                      FROM users`;
        const result = await conn.query(sql);

        // if (result.rows.length === 0) {
        //     throw new Error("No users found.");
        // }

        return result.rows;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const sql = `SELECT id, username, first_name, last_name, email, created_at, updated_at 
                      FROM users 
                      WHERE id = $1`;
        const result = await conn.query(sql, [id]);

        if (!result.rows[0]) {
            throw new Error("User not found.");
        }

        return result.rows[0];
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const updateUser = async (id, data) => {
    const { username, first_name, last_name, email, password } = data;
    try {
        const checkSql = `SELECT * FROM users WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            throw new Error("User not found.");
        }

        const duplicateSql = `
          SELECT id 
          FROM ${TABLE_NAME} 
          WHERE (username = $1 OR email = $2) AND id != $3
          LIMIT 1
        `;
        const duplicateRes = await conn.query(duplicateSql, [
            username,
            email,
            id,
        ]);

        if (duplicateRes.rows[0]) {
            throw new Error("Username or Email already exists.");
        }


        // hash password if provided
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const sql = `
            UPDATE users
            SET 
                username = COALESCE($1, username),
                first_name = COALESCE($2, first_name),
                last_name = COALESCE($3, last_name),
                email = COALESCE($4, email),
                password = COALESCE($5, password),
                updated_at = NOW()
            WHERE id = $6
            RETURNING id, username, first_name, last_name, email, created_at, updated_at;
        `;

        const values = [
            username,
            first_name,
            last_name,
            email,
            hashedPassword,
            id,
        ];

        const result = await conn.query(sql, values);

        if (!result.rows[0]) {
            throw new Error("Failed to update user.");
        }

        return result.rows[0];
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        const checkSql = `SELECT * FROM users WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            throw new Error("User not found.");
        }

        const sql = `DELETE FROM users WHERE id = $1 RETURNING id`;
        const result = await conn.query(sql, [id]);

        if (!result.rows[0]) {
            throw new Error("Failed to delete user.");
        }

        return result.rows[0];
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};
