// /ActivityService.js

import { conn } from "../../utils/db.js";

import dotenv from "dotenv";
dotenv.config();

const TABLE_NAME = "payments";


//Create Payment
export const createPayment = async (data) => {

    console.log("Create Payment with data :", data);

    //data
    const{
        userId, //Slip's Owner
        activityId,
        amount,
        paidAt,
        slipUrl,
        note
    } = data;

    try {
        
        //check data
        if (!userId, !activityId, !amount, !paidAt, !slipUrl, !note) {
            throw new Error("Please provide all required fields.");
        }

        // check user
        const checkSql = `SELECT * FROM users WHERE id = $1`
        const checkRes = await conn.query(checkSql, [userId]);

        if (!checkRes.rows) {
            throw new Error("User not found.");
        }

        //insert payment
        const sql = `
                INSERT INTO ${TABLE_NAME}
                (user_id, activity_id, amount, paid_at, slip_url, note, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
                RETURNING *;
                `;

        const paymentValues = [userId, activityId, amount, paidAt, slipUrl, note];
        const paymentRes = await conn.query(sql, paymentValues);
        const payment = paymentRes.rows[0];

        return payment;

    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}

//Get Payment By id
export const getPaymentById = async (id) => {
    
    try {
        const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const paymentRes  = await conn.query(sql, [id]);
        const payment = paymentRes.rows;

        return payment;

    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}

// Get All Payments by activity_id
export const getPaymentByActivityID = async (ActivityId) => {
    try {
        const sql = `SELECT * FROM ${TABLE_NAME} WHERE activity_id = $1`;
        const paymentRes  = await conn.query(sql, [ActivityId]);
        const payments = paymentRes.rows;

        return payments;
    }
    catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}

// Get All Payments by activity_id and user_id
export const getPaymentByActivityUserID = async (UserID, ActivityId) => {
    try {
        const sql = `SELECT * FROM ${TABLE_NAME} WHERE user_id = $1 AND activity_id = $2`;
        const paymentRes  = await conn.query(sql, [UserID, ActivityId]);
        const payments = paymentRes.rows;

        return payments;
    }
    catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Calculate Paid Money Of 1 Activity 
export const calculateMoney = async ( ActivityId) => {
    try {
        const sql = `SELECT SUM(amount) FROM ${TABLE_NAME} WHERE activity_id = $1`;
        const sumPaymentRes  = await conn.query(sql, [ActivityId]);
        const sumPayments = sumPaymentRes.rows;

        console.log(sumPayments)

        const result = sumPayments[0].sum

        console.log(sumPayments[0].sum)

        return result;
    }
    catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Update Payment
export const updatePayment = async (id, data) => {

    //data
    const{
        amount,
        paidAt,
        slipUrl,
        note
    } = data;

    try {
        // find payment
        const checksql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes  = await conn.query(checksql, [id]);
        const checkPayment = checkRes.rows;

        if (checkPayment.length === 0) {
            return [];
        }

        // update payment
        const sql = `
            UPDATE ${TABLE_NAME}
            SET 
                amount = $1,
                paid_at = $2,
                slip_url = $3,
                note = $4,
                updated_at = NOW()
            WHERE id = $5
            RETURNING *;
        `;

        const paymentValues = [amount, paidAt, slipUrl, note, id];
        const paymentRes = await conn.query(sql, paymentValues);

        return paymentRes;

    } catch (err) {
        console.log("Error :", err)
        throw new Error(err.message)
    }
}

// Delete Payment
export const deletePayment = async (id) => {
    try {
        // checl payment
        const checksql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes = await conn.query(checksql, [id]);
        const checkPayment = checkRes.rows;

        if (checkPayment.length === 0) {
            return [];
        }

        // Delete payment
        const sql = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`;
        const res = await conn.query(sql, [id]);

        return res;

    } catch (error) {
        console.log("Error :", error)
        throw new error(error.message)
    }
}
