import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { ButtonProps, ButtonVariant } from "./types";
import PulseLoader from "react-spinners/PulseLoader";

const StyledButton = styled.button<{ to?: string }>`
    cursor: pointer;
    outline: none;
    min-width: 80px;
    min-height: 40px;
    border: 1px solid #3333ff;
    border-radius: 6px;
    padding: 10px;
    background-color: #3333ff;
    font-family: CMU Roman;
    color: white;
    font-size: 14px;
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

const StyledDangerButton = styled(StyledButton)`
    background-color: #ff3333;
    border: solid 1px #ff3333;
    color: #ffffff;
    &:hover {
        border: solid 1px #ff9999;
        background-color: #ff9999;
    }
    &:active {
        border: solid 1px #ff0000;
        background-color: #ff0000;
    }
`;

const Button = (props: ButtonProps) => {
    const { style, variant, onClick, label, to, isLoading, disabled } = props;
    const { OUTLINED, DANGER } = ButtonVariant;
    const StyledComponent =
        (variant === OUTLINED && StyledOutlinedButton) ||
        (variant === DANGER && StyledDangerButton) ||
        StyledButton;

    return (
        <StyledComponent
            onClick={onClick}
            style={style}
            to={to}
            disabled={disabled || isLoading}
        >
            <span>
                {isLoading ? (
                    <PulseLoader
                        css={css`
                            display: flex;
                            justify-content: center;
                            text-align: center;
                        `}
                        sizeUnit={"px"}
                        size={14}
                        color={"#ffffff"}
                    />
                ) : (
                    label
                )}
            </span>
        </StyledComponent>
    );
};

export default Button;
