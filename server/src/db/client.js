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
    database: process.env.PG_DB,
});

export const query = async (text, params) => {
    const time = new Date();
    try {
        const result = await pool.query(text, params);
        console.log(
            "[DB]",
            time.toLocaleString("fr-FR"),
            "Executed query:",
            text,
            "in",
            Date.now() - time,
            "ms"
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

export const getClient = async () => {
    return await pool.connect();
};
