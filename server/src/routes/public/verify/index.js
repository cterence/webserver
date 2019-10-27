import { isAuthenticated } from "../../../middleware/authentication";

const verifyRoutes = router => {
    router.route("/verify").get(isAuthenticated, async (req, res) => {
        return res.status(200).json({ success: true });
    });
};

export default verifyRoutes;
