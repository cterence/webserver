import { Pool } from "pg";
import appRoot from "app-root-path";
import dotenv from "dotenv";
import path from "path";

appRoot.setPath(path.join(appRoot.path, "../"));
dotenv.config({ path: path.join(appRoot.path, ".env") });

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB
});

export const query = async (text, params) => {
    const start = Date.now();
    const result = await pool.query(text, params);
    console.log("[DB] Executed query: ", text, "in", Date.now() - start, "ms");
    return result;
};

export const getClient = async () => {
    return await pool.connect();
};
