import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { verifyToken } from "../../services/auth";

const FeaturesPage = () => {
    const [cookies] = useCookies(["token"]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verify = async () => {
            if (cookies.token) {
                const response = await verifyToken();
                setIsAuthenticated(response.success);
            }
        };
        verify();
    }, [cookies.token]);

    if (isAuthenticated) return <div>Coming soon...</div>;
    return <div>You're not authorized to access this</div>;
};

export default FeaturesPage;
