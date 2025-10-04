// /ActivityService.js
import { ExecuteStatementCommand } from "@aws-sdk/client-rds-data";
// import { 
//     rdsDataClient, 
//     dbConfig,         // ดึง Config มาใช้
//     getFieldValue 
// } from 'rds_service.js';
import { conn } from "../../utils/db.js";

const TABLE_NAME = "activities";

// Create Activity
export const createActivity = async (data) => {

    try {
        
        // data 
        const {
            title,
            description,
            userId,
            location,
            start_date,
            end_date,
            budget,
            wallet_id,
        } = data;

        // เช้ค ข้อมูล
        if(!title || !description || !userId || !location || !start_date || !end_date || !budget || !wallet_id){
            throw new Error("Please provide all required fields");
        }

        // // เช้ค wallet
        // const wallet = await Wallet.findById(wallet_id);

        // if(!wallet){
        //     throw new Error("Wallet not found");
        // }

        // สร้าง activity
        const sql = `
            INSERT INTO ${TABLE_NAME}
            (name, description,  start_date, end_date, location, budget, wallet_id, user_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
            RETURNING *;
        `;

        const activityValues  = [title, description, start_date, end_date, location, budget, wallet_id, userId];
        const activityRes  = await conn.query(sql, activityValues);
        const activity = activityRes.rows[0];
        

        return activity;

        
    } catch (error) {
        
        console.log("Error :", error);
        throw new Error(error.message);
    }

    
}

// Get Activity by User ID กิจกรรมที่สร้าง
export const getActivities = async (user_id) => {

    // หา activity
    const sql = `
        SELECT 
        a.id AS activity_id,
        a.name,
        a.description,
        a.start_date,
        a.end_date,
        a.location,
        a.budget,
        a.wallet_id,
        a.user_id AS creator_id,
        json_agg(
            json_build_object(
                'activity_members', m.id,
                'user_id', m.user_id,
                'username', u.username,
                'fullname', u.first_name || ' ' || u.last_name,
                'role', m.role
            )
        ) AS members
    FROM activities a
    LEFT JOIN activity_members m
        ON a.id = m.activity_id
    LEFT JOIN users u
        ON u.id = m.user_id
    WHERE a.user_id = $1
    GROUP BY a.id;
    `;

    const values   = [user_id];


    try {
        const activityRes  = await conn.query(sql, values);
        const activity = activityRes.rows;
        console.log(activity)
        return activity;



    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Get Activity by User ID กิจกรรมที่เข้าร่วม
export const getJoinedActivities = async (user_id) => {

    // หา activity
    const sql = `
        SELECT 
        a.id AS activity_id,
        a.name,
        a.description,
        a.start_date,
        a.end_date,
        a.location,
        a.budget,
        a.wallet_id,
        a.user_id AS creator_id,
        json_agg(
            json_build_object(
                'member_id', m.id,
                'user_id', m.user_id,
                'username', u.username,
                'fullname', u.first_name || ' ' || u.last_name,
                'role', m.role
            )
        ) AS members
    FROM activities a
    LEFT JOIN activity_members m
        ON a.id = m.activity_id
    LEFT JOIN users u
        ON u.id = m.user_id
    WHERE m.user_id = $1
    GROUP BY a.id;

    `;

    const values   = [user_id];


    try {
        const activityRes  = await conn.query(sql, values);
        const activity = activityRes.rows;
        // console.log(activity)
        return activity;



    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}



// Get Activity by ID
export const getActivityById = async (id) => {

    // หา activity
    const sql = `
        SELECT 
        a.id AS activity_id,
        a.name,
        a.description,
        a.start_date,
        a.end_date,
        a.location,
        a.budget,
        a.wallet_id,
        a.user_id AS creator_id,
        json_agg(
            json_build_object(
                'activity_members', m.id,
                'user_id', m.user_id,
                'username', u.username,
                'fullname', u.first_name || ' ' || u.last_name,
                'role', m.role
            )
        ) AS members
    FROM activities a
    LEFT JOIN activity_members m
        ON a.id = m.activity_id
    LEFT JOIN users u
        ON u.id = m.user_id
    WHERE a.id = $1
    GROUP BY a.id;
    `;
   
    const activityValues  = [id];

    // const parameters = [
    //     { name: "id", value: { stringValue: id.toString() } }
    // ];

    // const params = {
    //     resourceArn: dbConfig.RESOURCE_ARN, 
    //     secretArn: dbConfig.SECRET_ARN,     
    //     database: dbConfig.DATABASE_NAME,   
    //     sql: sql,
    //     parameters: parameters,
    //     includeResultMetadata: true,
    // };

    try {
        const activityRes  = await conn.query(sql, activityValues);
        const activity = activityRes.rows;
        
        return activity;



    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Update Activity
export const updateActivity = async (id, data) => {
    
    const {
        title,
        description,
        start_date,
        end_date,
        location,
        budget,
        wallet_id
    } = data;

    try {

        // เช้ค activity id
        const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            return [];
        }



        // อัพเดต activity
        const sql = `
            UPDATE ${TABLE_NAME}
            SET 
                name = $1,
                description = $2,
                date = $3,
                start_date = $4,
                end_date = $5,
                location = $6,
                budget = $7,
                wallet_id = $8,
                updated_at = NOW()
            WHERE id = $9
            RETURNING *;
        `;
        const values = [title, description, date, start_date, end_date, location, budget, wallet_id, id];
        const res = await conn.query(sql, values);
        return res;


    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Delete Activity
export const deleteActivity = async (id) => {
    
    try {

        // เช้ค activity id
        const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            return [];
        }

        // ลบ activity
        const sql = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`;
        const res = await conn.query(sql, [id]);

        return res;


    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// เพิ่มเพื่อน เข้า activity
export const addMember = async(data) =>{

    try {

        const activityId = data.activity_id;
        const members = data.member;   // [2,3,5]
        const role = "member";

        if (!members || members.length === 0) {
            return [];
        }

        const addedMembers = [];

        for (const userId of members) {

            const checkSql = `SELECT * FROM activity_members WHERE user_id = $1 AND activity_id = $2`;
            const checkRes = await conn.query(checkSql, [userId, activityId]);

            // เพิ่มแค่คนที่ยังไม่ได้อยุ่ใน กลุ่มกิจกรรม
            if (!checkRes.rows[0]) {
                const query = `
                    INSERT INTO activity_members (activity_id, user_id, role, created_at, updated_at)
                    VALUES ($1, $2, $3, NOW(), NOW())
                    RETURNING *;
                `;
                const res = await conn.query(query, [activityId, userId, role]);
                addedMembers.push(res.rows[0]);
            }
        }

        return addedMembers;



    }catch(error){
        console.log("Error :", error);
        throw new Error(error.message);
    }

}


// Delete  Member Activity
export const deleteMember = async (id) => {

    
    try {

        // เช้ค activity id
        const checkSql = `SELECT * FROM activity_members WHERE id = $1`;
        const checkRes = await conn.query(checkSql, [id]);

        if (!checkRes.rows[0]) {
            return [];
        }

        // Delete  Member
        const sql = `DELETE FROM activity_members WHERE id = $1 RETURNING *`;
        const res = await conn.query(sql, [id]);

        return res;


    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}




// // Get Activity by ID
// export const getActivityById = async (id) => {

//     // หา activity
//     const sql = `SELECT id, name, description FROM ${TABLE_NAME} WHERE id = :id`;

//     const parameters = [
//         { name: "id", value: { stringValue: id.toString() } }
//     ];

//     const params = {
//         resourceArn: dbConfig.RESOURCE_ARN, 
//         secretArn: dbConfig.SECRET_ARN,     
//         database: dbConfig.DATABASE_NAME,   
//         sql: sql,
//         parameters: parameters,
//         includeResultMetadata: true,
//     };

//     try {
//         const command = new ExecuteStatementCommand(params);
//         const data = await rdsDataClient.send(command);

//         if (!data.records || data.records.length === 0) {
//            throw new Error("Activity not found");
//         }
        

//         //  Map ข้อมูล
//         const recordRow = data.records[0];
//         const metadata = data.columnMetadata;
//         const activity = {};


//         recordRow.forEach((field, index) => {
//             const columnName = metadata[index].name;
//             activity[columnName] = getFieldValue(field); 
//         });

        
//         return activity;


//     } catch (error) {
//         console.log("Error :", error);
//         throw new Error(error.message);
//     }
// }