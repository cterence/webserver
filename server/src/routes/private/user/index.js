import { query } from "../../../db/client.js";
import bcrypt from "bcrypt";
import { issueToken } from "../../../utils/authentication";
import { verifyToken } from "../../../middleware/authentication";

const userRoutes = router => {
    router.route("/login").post(async (req, res) => {
        if (req.body.login && req.body.password) {
            const result = await query(
                "SELECT login, password FROM web_user WHERE login=$1",
                [req.body.login]
            );
            if (result.rowCount) {
                const { login, password } = result.rows[0];
                if (await bcrypt.compare(req.body.password, password)) {
                    const token = await issueToken(login);
                    return res.status(200).json({
                        success: true,
                        token
                    });
                }
                return res.status(403).json({
                    success: false,
                    err: "Wrong password"
                });
            }
            return res.status(403).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(403).json({
            success: false
        });
    });

    router.route("/signup").post(async (req, res) => {
        if (req.body.key && req.body.key === process.env.API_SIGNUP) {
            if (req.body.login && req.body.password) {
                try {
                    const hash = await bcrypt.hash(req.body.password, 10);
                    await query("INSERT INTO web_user VALUES ($1, $2, $3)", [
                        req.body.login,
                        hash,
                        req.body.role.value
                    ]);
                    return res.status(200).json({ success: true });
                } catch (err) {
                    return res.status(400).json({ success: false, err });
                }
            }
            return res.status(400).json({ success: false });
        }
        return res.status(403).json({ success: false });
    });

    router.route("/logout").post((req, res) => {
        if (req.cookies.token) {
            return res
                .clearCookie("token")
                .status(204)
                .send();
        }
        return res
            .status(400)
            .json({ success: false, message: "You weren't logged in" });
    });

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
