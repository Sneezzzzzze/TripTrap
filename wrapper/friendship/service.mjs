import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { conn } from "./db.mjs";
import { s3 } from "./s3.mjs";

const TABLE_NAME = "friendships";

// Create (Send friend request)
export const createFriendship = async (data) => {
    try {
        const { requester_id, receiver_id } = data;

        if (!requester_id || !receiver_id) {
            throw new Error("Please provide requester_id and receiver_id");
        }

        // check requester
        const requesterSql = `SELECT id FROM users WHERE id = $1 LIMIT 1`;
        const requesterRes = await conn.query(requesterSql, [requester_id]);
        if (!requesterRes.rows[0]) {
            throw new Error("Requester not found.");
        }

        // check receiver
        const receiverSql = `SELECT id FROM users WHERE id = $1 LIMIT 1`;
        const receiverRes = await conn.query(receiverSql, [receiver_id]);
        if (!receiverRes.rows[0]) {
            throw new Error("Receiver not found.");
        }

        // (ขอ request ซ้ำไม่ได้)
        const duplicateSql = `
            SELECT id FROM ${TABLE_NAME} 
            WHERE (requester_id = $1 AND receiver_id = $2) 
              OR (requester_id = $2 AND receiver_id = $1)
            LIMIT 1
        `;
        const duplicateRes = await conn.query(duplicateSql, [
            requester_id,
            receiver_id,
        ]);

        if (duplicateRes.rows[0]) {
            throw new Error("Friendship request already exists.");
        }

        const sql = `
            INSERT INTO ${TABLE_NAME} (requester_id, receiver_id, status)
            VALUES ($1, $2, 'Pending')
            RETURNING *;
        `;
        const values = [requester_id, receiver_id];
        const result = await conn.query(sql, values);

        if (!result.rows[0]) {
            throw new Error("Failed to create friendship request.");
        }

        return result.rows[0];
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Get all friends of a user
export const getAllFriends = async (userId) => {
    try {
        const sql = `
            SELECT *
            FROM ${TABLE_NAME}
            WHERE status = 'Accepted' 
              AND (requester_id = $1 OR receiver_id = $1)
        `;
        const result = await conn.query(sql, [userId]);

        return result.rows;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Get pending friend requests sent by user เราส่งคำขอไปหาใครบ้าง
export const getSentRequests = async (userId) => {
    try {
        if (!userId) throw new Error("Please provide userId");

        const sql = `
            SELECT *
            FROM ${TABLE_NAME}
            WHERE requester_id = $1
              AND status = 'Pending'
        `;
        const result = await conn.query(sql, [userId]);

        if (!result.rows.length) {
            throw new Error("No pending sent friend requests found.");
        }

        return result.rows;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Get pending friend requests received by user ใครส่งคำขอมาให้เราบ้าง
export const getReceivedRequests = async (userId) => {
    try {
        if (!userId) throw new Error("Please provide userId");

        const sql = `
            SELECT *
            FROM ${TABLE_NAME}
            WHERE receiver_id = $1
              AND status = 'Pending'
        `;
        const result = await conn.query(sql, [userId]);

        if (!result.rows.length) {
            throw new Error("No pending received friend requests found.");
        }

        return result.rows;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};


// Update (Accept or Reject)
export const updateFriendshipStatus = async (id, status) => {
    try {
        const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            throw new Error("Friendship not found.");
        }

        const updateSql = `
            UPDATE ${TABLE_NAME}
            SET status = $1
            WHERE id = $2
            RETURNING *;
        `;
        const result = await conn.query(updateSql, [status, id]);

        if (!result.rows[0]) {
            throw new Error("Failed to update friendship status.");
        }

        return result.rows[0];
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};


// Delete (Cancel request or Unfriend)
export const deleteFriendship = async (id) => {
    try {
        const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            throw new Error("Friendship not found.");
        }

        const deleteSql = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`;
        const result = await conn.query(deleteSql, [id]);

        if (!result.rows[0]) {
            throw new Error("Failed to delete friendship.");
        }

        return result.rows[0]

    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Get all friendships by user & status
// export const getFriendships = async (userId, status = null) => {
//     try {
//         const whereClause = {
//             $or: [{ requester_id: userId }, { receiver_id: userId }],
//         };
//         if (status) whereClause.status = status;

//         const friendships = await Friendship.findAll({ where: whereClause });

//         if (!friendships) {
//             throw new Error("No friendships found.");
//         }

//         return friendships;
//     } catch (error) {
//         console.log("Error:", error);
//         throw new Error(error.message);
//     }
// };

