import React from "react";
import Button from "./components/Button";

const App = () => {
    return (
        <>
            <div>
                <a href="/login">
                    <Button
                        style={{ float: "right", margin: "10px" }}
                        onClick={() => {}}
                        label="Login"
                    />
                </a>
            </div>
            <div>
                <div
                    style={{
                        paddingTop: "30px",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <h1 style={{ marginBottom: 0, paddingBottom: 0, textAlign: "center"}}>
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
                    <div style={{ textAlign: "center", paddingTop: "30px" }}>
                        J'admet qu'il n'y a pour l'instant assez
                        <span style={{ fontSize: "8px" }}>peu</span> de choses
                        ici.
                    </div>
                    <div style={{ textAlign: "center", paddingTop: "30px" }}>
                        Vous pouvez cependant consulter mon
                        <span>
                            {" "}
                            <a
                                style={{ textDecoration: "none" }}
                                href="https://www.tchateigne.fr/resources/CV_Terence_Chateigne.pdf"
                            >
                                CV
                            </a>
                        </span>
                        si cela vous intéresse.
                    </div>
                    <div style={{ textAlign: "center", paddingTop: "30px" }}>
                        Vous pouvez même allez voir mon
                        <a
                            style={{ textDecoration: "none" }}
                            href="https://www.linkedin.com/in/terencechateigne/"
                        >
                            LinkedIn
                        </a>
                        captivant.
                    </div>
                    <div style={{ textAlign: "center", paddingTop: " 100px" }}>
                        Bonne visite.
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
