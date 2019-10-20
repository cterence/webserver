import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const verifyRoutes = router => {
    router.route("/verify").post(async (req, res) => {
        if (req.body.token)
            try {
                jwt.verify(req.body.token, secret);
                return res.status(200).json({ success: true });
            } catch (err) {
                return res
                    .status(403)
                    .json({ success: false, error: err.message });
            }
    });
};

export default verifyRoutes;
