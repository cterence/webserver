import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Header from "../../components/Header";

const LoginPage = () => {
    const [message, setMessage] = useState("");

    return (
        <>
            <Header buttons={[{ onClick: () => {}, label: "Home", to: "/" }]} />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "50px",
                        width: "50vh"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%"
                        }}
                    >
                        <span
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                fontSize: "24px",
                                marginBottom: "30px"
                            }}
                        >
                            Log in
                        </span>
                        <LoginForm setMessage={setMessage} />
                        {message && <div>{message}</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
