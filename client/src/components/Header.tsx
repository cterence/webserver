import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { ButtonProps } from "./types";

interface HeaderProps {
    buttons: ButtonProps[];
}

const Header = (props: HeaderProps) => {
    const { buttons } = props;

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {buttons.map(button => {
                if (button.to)
                    return (
                        <div
                            key={button.label}
                            style={{ margin: "10px 10px 0 0" }}
                        >
                            <Link to={button.to}>
                                <Button {...button} />
                            </Link>
                        </div>
                    );
                return (
                    <div key={button.label} style={{ margin: "10px 10px 0 0" }}>
                        <Button {...button} />
                    </div>
                );
            })}
        </div>
    );
};

export default Header;
