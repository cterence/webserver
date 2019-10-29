import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { verifyToken } from "../../services/auth";
import { Header } from "../../components";

const FeaturesPage = () => {
    const [cookies] = useCookies(["token"]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const verify = async () => {
            setIsAuthenticating(true);
            if (cookies.token) {
                const response = await verifyToken();
                setIsAuthenticated(response.success);
            }
            setIsAuthenticating(false);
        };
        verify();
    }, [cookies.token]);

    const FeaturesHeader = () => (
        <Header buttons={[{ onClick: () => {}, label: "Home", to: "/" }]} />
    );

    if (isAuthenticating) return <></>;
    if (isAuthenticated)
        return (
            <>
                <FeaturesHeader />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    Coming soon...
                </div>
            </>
        );
    return (
        <>
            <FeaturesHeader />
            <div style={{ display: "flex", justifyContent: "center" }}>
                You're not authorized to access this
            </div>
        </>
    );
};

export default FeaturesPage;
