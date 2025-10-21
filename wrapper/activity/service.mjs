import { conn } from "./db.mjs";

const TABLE_NAME = "activities";

// ---------- Services ----------
export const createActivity = async (data) => {
  try {
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

    if (
      !title ||
      !description ||
      !userId ||
      !location ||
      !start_date ||
      !end_date ||
      !budget ||
      !wallet_id
    ) {
      throw new Error("Please provide all required fields");
    }

    const sql = `
      INSERT INTO ${TABLE_NAME}
      (name, description, start_date, end_date, location, budget, wallet_id, user_id, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW(),NOW())
      RETURNING *;
    `;
    const values = [title, description, start_date, end_date, location, budget, wallet_id, userId];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};

export const getActivities = async (user_id) => {
  try {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE user_id = $1`;
    const res = await conn.query(sql, [user_id]);
    return res.rows;
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};

export const getJoinedActivities = async (user_id) => {
  try {
    const sql = `
      SELECT a.* 
      FROM ${TABLE_NAME} a
      JOIN activity_members m ON a.id = m.activity_id
      WHERE m.user_id = $1
    `;
    const res = await conn.query(sql, [user_id]);
    return res.rows;
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};

export const getActivityById = async (id) => {
  try {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE id=$1`;
    const res = await conn.query(sql, [id]);
    return res.rows;
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};

export const updateActivity = async (id, data) => {
  try {
    // เช็ค activity id
    const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
    const checkRes = await conn.query(checkSql, [id]);

    if (!checkRes.rows[0]) {
      return [];
    }

    const { title, description, start_date, end_date, location, budget, wallet_id } = data;
    const sql = `
      UPDATE ${TABLE_NAME}
      SET name=$1, description=$2, start_date=$3, end_date=$4, location=$5, budget=$6, wallet_id=$7, updated_at=NOW()
      WHERE id=$8
      RETURNING *;
    `;
    const values = [title, description, start_date, end_date, location, budget, wallet_id, id];
    const res = await conn.query(sql, values);
    return res.rows;
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};

export const deleteActivity = async (id) => {
  try {
    // เช็ค activity id
    const checkSql = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
    const checkRes = await conn.query(checkSql, [id]);

    if (!checkRes.rows[0]) {
      return [];
    }

    const sql = `DELETE FROM ${TABLE_NAME} WHERE id=$1 RETURNING *`;
    const res = await conn.query(sql, [id]);
    return res.rows;
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};

export const addMember = async (data) => {
  try {
    const activityId = data.activity_id;
    const members = data.member; // [2,3,5]
    const role = "member";

    if (!members || members.length === 0) {
      return [];
    }

    const added = [];
    for (const userId of members) {
      // เช็คว่ามี member อยู่แล้วหรือไม่
      const checkSql = `SELECT * FROM activity_members WHERE user_id = $1 AND activity_id = $2`;
      const checkRes = await conn.query(checkSql, [userId, activityId]);

      // เพิ่มแค่คนที่ยังไม่ได้อยู่ในกลุ่มกิจกรรม
      if (!checkRes.rows[0]) {
        const sql = `
          INSERT INTO activity_members (activity_id, user_id, role, created_at, updated_at)
          VALUES ($1,$2,$3,NOW(),NOW())
          RETURNING *;
        `;
        const res = await conn.query(sql, [activityId, userId, role]);
        added.push(res.rows[0]);
      }
    }
    return added;
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};

export const deleteMember = async (id) => {
  try {
    // เช็ค member id
    const checkSql = `SELECT * FROM activity_members WHERE id = $1`;
    const checkRes = await conn.query(checkSql, [id]);

    if (!checkRes.rows[0]) {
      return [];
    }

    const sql = `DELETE FROM activity_members WHERE id=$1 RETURNING *`;
    const res = await conn.query(sql, [id]);
    return res.rows;
  } catch (error) {
    console.log("Error :", error);
    throw new Error(error.message);
  }
};