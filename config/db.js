import pkg from "pg"
const {Pool}=pkg;
import dotenv from "dotenv";
dotenv.config();

// export const pool=new Pool({
//     user:process.env.DB_USER,
//     host:process.env.DB_HOST_CLOUD,
//     database:process.env.DB_NAME,
//     password:process.env.DB_PASSWORD_CLOUD,
//     port:Number(process.env.DB_PORT),
//     ssl: { rejectUnauthorized: false }, // required for Supabase cloud
//   family: 4
// });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

