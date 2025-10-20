import { S3Client } from "@aws-sdk/client-s3";

// s3.js
import dotenv from "dotenv";
dotenv.config();

// สร้าง client S3
export const s3 = new S3Client({
  region: process.env.AWS_REGION,
});