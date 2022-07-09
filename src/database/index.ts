/* eslint-disable no-console */
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pool: any;

if (process.env.NODE_ENV === "dev") {
  pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string),
  });
}
if (process.env.NODE_ENV === "test") {
  pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB_TEST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string),
  });
}

// pool.on("error", (error: Error) => {
//   console.log(error.message);
// });

export default pool;
