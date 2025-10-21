import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { conn } from "./db.mjs";
import { s3 } from "./s3.mjs";

dotenv.config();
const TABLE_NAME = "users";
// ลบไฟล์เก่า
const deleteFromS3 = async (key) => {
    if (!key) return;

    await s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key.replace(/^\//, ""), // เอา / หน้า key ออก
        })
    );
};

// upload ไฟล์ใหม่
const uploadToS3 = async (file) => {
    const fileName = Date.now() + "_" + file.originalname;
    const s3Path = `image/${fileName}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: s3Path,
            Body: file.buffer,
            ContentType: file.mimetype,
        })
    );

    return `/${s3Path}`;
};

// register user
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

        // let imagePath = null;

        // if (file) {
        //     imagePath = await uploadToS3(file); // upload ใหม่
        // }

        const sql = `
          INSERT INTO ${TABLE_NAME} (username, first_name, last_name, email, password, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
          RETURNING *;
        `;
        const values = [username, first_name, last_name, email, hashedPassword];
        const result = await conn.query(sql, values);
        const user = result.rows[0];

        if (!user) {
            throw new Error("Failed to create user.");
        }

        return user;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// login user
export const login = async (data) => {
    try {
        const { username, password } = data;

        if (!username || !password) {
            throw new Error("Please provide username and password.");
        }

        const sql = `SELECT * FROM ${TABLE_NAME} WHERE username = $1`;
        const result = await conn.query(sql, [username]);
        const user = result.rows[0];

        if (!user) {
            throw new Error("User not found.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password.");
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.SECRET,
            { expiresIn: "1d" }
        );

        const userReturn = {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image: user.image,
        };

        return { token, user: userReturn };
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.message);
    }
};

export const verifyToken = async (authHeader) => {
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Token not provided.");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET); // ตรวจสอบ token
        return {
            id: decoded.id,
            username: decoded.username,
        };
    } catch (err) {
        throw new Error("Invalid or expired token.");
    }
};


// search users
export const searchUsers = async (keyword) => {
    try {
        if (!keyword) {
            return [];
        }

        const sql = `
            SELECT id, username, first_name, last_name, email, created_at, updated_at
            FROM ${TABLE_NAME}
            WHERE 
                username ILIKE $1 OR
                first_name ILIKE $1 OR
                last_name ILIKE $1
        `;

        const values = [`%${keyword}%`];
        const result = await conn.query(sql, values);

        return result.rows;
    } catch (error) {
        console.error("Search error:", error);
        throw new Error(error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const sql = `SELECT id, username, first_name, last_name, email, created_at, updated_at 
                      FROM ${TABLE_NAME} 
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
    try {
        const { first_name, last_name, image } = data;

        const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            throw new Error("User not found.");
        }

        const existingUser = checkRes.rows[0];

        const updatedFirstName = first_name || existingUser.first_name;
        const updatedLastName = last_name || existingUser.last_name;
        const updatedImage = image || existingUser.image;

        const sql = `
            UPDATE ${TABLE_NAME}
            SET 
                first_name = $1,
                last_name = $2,
                image = $3,
                updated_at = NOW()
            WHERE id = $4
            RETURNING id, username, first_name, last_name, email, image, created_at, updated_at;
        `;

        const values = [updatedFirstName, updatedLastName, updatedImage, id];

        const result = await conn.query(sql, values);
        const user = result.rows[0];

        if (!user) {
            throw new Error("Failed to update user.");
        }

        return user;
    } catch (error) {
        console.error("Error:", error);
        throw new Error(error.message);
    }
};

export const changePassword = async (data, authHeader) => {
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Unauthorized");
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET); // ตรวจสอบ token

        const { old_password, new_password } = data;
        if (!old_password || !new_password) {
            throw new Error("Please provide old and new password.");
        }

        const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const result = await conn.query(sql, [decoded.id]);
        const user = result.rows[0];
        if (!user) {
            throw new Error("User not found.");
        }

        const isMatch = await bcrypt.compare(old_password, user.password);
        if (!isMatch) {
            throw new Error("Old password is incorrect.");
        }

        const hashedNewPassword = await bcrypt.hash(new_password, 10);

        const updateSql = `
            UPDATE ${TABLE_NAME}
            SET password = $1, updated_at = NOW()
            WHERE id = $2
        `;
        await conn.query(updateSql, [hashedNewPassword, decoded.id]);

        return user;
    } catch (error) {
        console.error("Change password error:", error);
        throw new Error(error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            throw new Error("User not found.");
        }

        const sql = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING id`;
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
