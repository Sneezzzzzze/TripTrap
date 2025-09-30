
import { RDSDataClient } from "@aws-sdk/client-rds-data";

const RESOURCE_ARN = process.env.DATABASE_ARN;   
const SECRET_ARN = process.env.SECRET_ARN;       
const DATABASE_NAME = process.env.DATABASE_NAME || "MyDatabase"; 


// สร้าง RDS Data Client 
export const rdsDataClient = new RDSDataClient({}); 


// รวม Configuration
export const dbConfig = {
    RESOURCE_ARN,
    SECRET_ARN,
    DATABASE_NAME,
};


/**
 * Helper: แปลง Field Object ของ Data API เป็นค่าจริง
 */
export const getFieldValue = (field) => {
    if (field.stringValue !== undefined) return field.stringValue;
    if (field.longValue !== undefined) return field.longValue;
    if (field.doubleValue !== undefined) return field.doubleValue;
    if (field.booleanValue !== undefined) return field.booleanValue;
    return null;
};