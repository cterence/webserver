import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";

interface TextInputProps {
    label?: string;
    placeholder?: string;
    errorLabel?: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelDiv = styled.div`
    font-size: 14px;
    color: #1a1aff;
`;

const ErrorLabelDiv = styled.div`
    font-size: 12px;
    color: #ff3333;
`;

const StyledTextInput = styled.input`
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    padding-bottom: 4px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #cccccc;
    width: 100%;
    outline: none;
`;

const TextInput = (props: TextInputProps) => {
    const { type, value, onChange, placeholder, label, errorLabel } = props;
    return (
        <div>
            <LabelDiv>{label}</LabelDiv>
            <StyledTextInput
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {errorLabel && <ErrorLabelDiv>{errorLabel}</ErrorLabelDiv>}
        </div>
    );
};

export default TextInput;
