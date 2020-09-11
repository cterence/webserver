import React, { ChangeEvent } from "react";
import Select from "react-select";
import styled from "@emotion/styled";
import { OptionProps } from "./types";

interface SelectFieldProps {
    placeholder?: string;
    errorLabel?: string;
    label: string;
    value: string;
    options: OptionProps[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const LabelDiv = styled.div`
    font-size: 14px;
    color: #1a1aff;
`;

const ErrorLabelDiv = styled.div`
    font-size: 12px;
    color: #ff3333;
`;

const StyledSelectField = styled(Select)`
    width: 100%;
    outline: none;
`;

const SelectField = (props: SelectFieldProps) => {
    const { value, onChange, options, placeholder, label, errorLabel } = props;

    const selectOptions = options.map((option) => ({
        value: option.code,
        label: option.name,
    }));
    return (
        <div>
            <LabelDiv>{label}</LabelDiv>
            <StyledSelectField
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                options={selectOptions}
            />
            {errorLabel && <ErrorLabelDiv>{errorLabel}</ErrorLabelDiv>}
        </div>
    );
};

export default SelectField;
