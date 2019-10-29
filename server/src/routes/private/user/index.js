import { query } from "../../../db/client.js";

const userRoutes = router => {
    router.route("/roles").get(async (req, res) => {
        const result = await query("SELECT * FROM web_roles");
        if (result.rows.length) {
            const roles = result.rows.map(row => {
                const { code, name } = row;
                return { code, name };
            });
            return res.status(200).json({ success: true, roles });
        }
    });
};

export default userRoutes;
