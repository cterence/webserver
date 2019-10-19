import React from "react";
import styled from "@emotion/styled";

interface ButtonProps {
    style?: React.CSSProperties;
    outlined?: boolean;
    label: string;
    onClick: () => void;
}

const StyledButton = styled.button`
    outline: none;
    min-width: 70px;
    border: 1px solid #3333ff;
    border-radius: 6px;
    padding: 10px;
    background-color: #3333ff;
    color: white;
    font-size: 14px;
    font-family: "Arial";
    &:hover {
        background-color: #9999ff;
        border: 1px solid #9999ff;
    }
    &:active {
        background-color: #000099;
        border: 1px solid #000099;
    }
`;

const StyledOutlinedButton = styled(StyledButton)`
    background-color: #ffffff;
    color: #3333ff;
    &:hover {
        color: #9999ff;
        border: solid 1px #9999ff;
        background-color: #ffffff;
    }
    &:active {
        color: #000099;
        border: solid 1px #000099;
        background-color: #ffffff;
    }
`;

const Button = (props: ButtonProps) => {
    const { style, outlined, onClick, label } = props;
    const StyledComponent = outlined ? StyledOutlinedButton : StyledButton;

    return (
        <StyledComponent onClick={onClick} style={style}>
            {label}
        </StyledComponent>
    );
};

export default Button;
