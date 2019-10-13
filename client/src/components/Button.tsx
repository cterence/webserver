import React from "react";
import styled from "@emotion/styled";

interface ButtonProps {
    style?: React.CSSProperties;
    label: string;
    onClick: () => void;
}

const StyledButton = styled.button`
    outline: none;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 10px;
    background-color: #3333ff;
    color: white;
    font-size: 14px;
    font-family: "Arial";
    &:hover {
        background-color: #9999ff;
        background-color: #9999ff;
    }
    &:active {
        background-color: #000099;
        background-color: #000099;
    }
`;

const Button = (props: ButtonProps) => {
    const { style, onClick, label } = props;

    return (
        <StyledButton onClick={onClick} style={style}>
            {label}
        </StyledButton>
    );
};

export default Button;
