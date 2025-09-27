
// import { Client } from "pg";

// const client = new Client({
//   host: "your-db-endpoint.rds.amazonaws.com",
//   port: 5432,
//   user: "your-username",
//   password: "your-password",
//   database: "your-database-name"
// });


// async function Connection() {
//   try {
//     await client.connect();
//     console.log("Connected to RDS PostgreSQL");

//     const res = await client.query("SELECT NOW()");
//     console.log("Server time:", res.rows[0]);

//     await client.end();
//   } catch (err) {
//     console.error("Connection error", err);
//   }
// }

// Connection();
