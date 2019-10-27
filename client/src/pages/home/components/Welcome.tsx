import React from "react";
import { Header } from "../../../components";
import { ButtonProps, ButtonVariant } from "../../../components/types";
import { useCookies } from "react-cookie";

const Welcome = () => {
    const [cookies, , removeCookie] = useCookies(["token"]);

    const headerButtons: ButtonProps[] = cookies.token
        ? [
              {
                  onClick: () => {
                      removeCookie("token");
                  },
                  label: "Log out",
                  variant: ButtonVariant.DANGER
              }
          ]
        : [
              { onClick: () => {}, label: "Log in", to: "/login" },
              {
                  onClick: () => {},
                  label: "Sign up",
                  to: "/signup",
                  variant: ButtonVariant.OUTLINED
              }
          ];

    if (cookies.token) headerButtons.push();

    return (
        <div>
            <Header buttons={headerButtons} />
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
                    Welcome
                </h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "30px"
                    }}
                >
                    To Térence Chateigné's website
                </div>
            </div>
        </div>
    );
};

export default Welcome;
