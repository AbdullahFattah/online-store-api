import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT as string),
});

pool.on("error", (error: Error) => {
  console.log(error.message);
});

export default pool;
