import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

const Welcome = () => {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/login">
                    <Button
                        style={{ margin: "10px 10px 0 0" }}
                        onClick={() => {}}
                        label="Login"
                    />
                </Link>
                <Link to="/signup">
                    <Button
                        style={{ margin: "10px 10px 0 0" }}
                        onClick={() => {}}
                        label="Sign up"
                        outlined
                    />
                </Link>
            </div>
            <div
                style={{
                    display: "flex",
                    paddingTop: "30px",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <h1
                    style={{
                        marginBottom: 0,
                        paddingBottom: 0,
                        justifyContent: "center",
                        display: "flex"
                    }}
                >
                    Bienvenue
                </h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "30px"
                    }}
                >
                    Sur le site interweb de Térence Chateigné
                </div>
            </div>
        </div>
    );
};

export default Welcome;
