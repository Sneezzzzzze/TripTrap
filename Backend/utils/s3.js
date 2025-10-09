// s3.js
import { S3Client } from "@aws-sdk/client-s3";

import dotenv from "dotenv";
dotenv.config();

// สร้าง client S3
export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY,
  //   secretAccessKey: process.env.AWS_SECRET_KEY,
  //   sessionToken: process.env.AWS_SESSION_TOKEN
  // },
});
