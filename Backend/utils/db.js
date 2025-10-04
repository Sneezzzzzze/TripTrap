
// db.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();


export const conn = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 25060,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

// ฟังก์ชัน query รับ sql และ parameter มาจากไฟล์ service ต่างๆอีกที
export async function query(sql, params) {

  const res = await conn.query(sql, params);
  return res.rows;

}

// เช็คการเชื่อมต่อ
async function testConn() {
  try {
    const res = await conn.query("SELECT NOW()");
    console.log("Connected! Server time:", res.rows[0].now);

  } catch (err) {
    console.error("Connection error:", err);
  }
}

testConn();