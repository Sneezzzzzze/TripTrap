import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

export async function GET(req) {
  try {
    // 1. ดึง key ของไฟล์จาก Query Parameters
    const { searchParams } = new URL(req.url);
    // รับค่าจาก "key" ที่ส่งมาใน params ของ Axios
    const key = searchParams.get('key'); 

    if (!key) {
      return new Response(JSON.stringify({ error: "Missing file key" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. สร้าง GetObjectCommand เพื่อดึงไฟล์
    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
      Key: key, 
    });

    // 3. สร้าง Signed URL สำหรับการดาวน์โหลด/ดู
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); 

    // 4. ส่ง Signed URL กลับไป
    return new Response(JSON.stringify({ url: signedUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error generating signed URL for download:", err);
    return new Response(JSON.stringify({ error: "Failed to create signed URL for download" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const { fileName, fileType } = await req.json();

    const key = `ProfilePicture/${Date.now()}`;

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return new Response(JSON.stringify({ url: signedUrl, key }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create signed URL" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
