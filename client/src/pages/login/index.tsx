import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const LoginPage = () => {
    const [message, setMessage] = useState("");

    return (
        <>
            <Link to="/">
                <Button
                    style={{ float: "right", margin: "10px" }}
                    onClick={() => {}}
                    label="Home"
                />
            </Link>
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
                            Login
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
