import { ExecuteStatementCommand } from "@aws-sdk/client-rds-data";
// import { 
//     rdsDataClient, 
//     dbConfig,         // ดึง Config มาใช้
//     getFieldValue 
// } from 'rds_service.js';
import { conn } from "../../utils/db.js";


const TABLE_NAME = "wallets"


// Create Wallet
export const createWallet = async (data) => {

    try {
        
        //data
        const {
            userId, //Bank's owner
            account_number,
            bank_name

        } = data;

        // check data
        if (!userId || !account_number || !bank_name) {
            throw new Error("Please provide all required fields.");
        }

        // check user
        const checkSql = `SELECT * FROM users WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [userId]);

        if (!checkRes.rows[0]) {
            throw new Error("User not found.");
        }

        

        // create Wallet
        const sql = `
                    INSERT INTO ${TABLE_NAME}
                    (user_id, account_number, bank_name, created_at, updated_at)
                    VALUES ($1, $2, $3, NOW(), NOW())
                    RETURNING *;
                `;
        
        const walletValues  = [userId,account_number, bank_name];
        const walletRes  = await conn.query(sql, walletValues);
        const wallet = walletRes.rows[0];

        
        return wallet;

    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}



// Get Wallet By Id
export const getWalletById = async (id) => {

    try {

        const sql = `SELECT * FROM  ${TABLE_NAME} WHERE id = $1`;
        const walletRes  = await conn.query(sql, [id]);
        const wallet = walletRes.rows;

      
        return wallet;


    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
 
}



// Get All Wallet get by user_id
export const getWallet = async (UserId) => {

    try {
        const sql = `SELECT * FROM  ${TABLE_NAME} WHERE user_id = $1`;
        const walletRes  = await conn.query(sql, [UserId]);
        const wallets = walletRes.rows;

        return wallets;
    }
    catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}



// Update Wallet
export const updateWallet = async (id, data) => {

    const {
        account_number,
        bank_name,
    } = data;

    try {
        // find wallet
        const checksql = `SELECT * FROM  ${TABLE_NAME} WHERE id = $1`;
        const walletRes  = await conn.query(checksql, [id]);
        const wallet = walletRes.rows;

        if (!wallet) {
            return [];
        }

        // update wallet
       const sql = `
            UPDATE ${TABLE_NAME}
            SET 
                account_number = $1,
                bank_name = $2,
                updated_at = NOW()
            WHERE id = $3
            RETURNING *;
        `;
        const values = [account_number, bank_name, id];
        const res = await conn.query(sql, values);

        return res;


    } catch (error) {
        console.log("Error :", error)
        throw new error(error.message)
    }
}


// Delete Wallet
export const deleteWallet = async (id) => {
    try {
        // find wallet
        const checksql = `SELECT * FROM  ${TABLE_NAME} WHERE id = $1`;
        const walletRes  = await conn.query(checksql, [id]);
        const wallet = walletRes.rows;

        if (!wallet) {
            return [];
        }

        // Delete Wallet
        const sql = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`;
        const res = await conn.query(sql, [id]);

        return res;

    } catch (error) {
        console.log("Error :", error)
        throw new error(error.message)
    }
}