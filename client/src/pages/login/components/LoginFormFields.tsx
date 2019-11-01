import React, { ChangeEvent } from "react";
import { Button, TextInput } from "../../../components";
import { FormikProps } from "formik";
import { Login } from "./types";

interface LoginFormFieldsProps {
    formProps: FormikProps<Login>;
    isLoading: boolean;
}

const LoginFormFields = (props: LoginFormFieldsProps) => {
    const { formProps, isLoading } = props;
    const { values, setFieldValue, submitForm, errors } = formProps;

    return (
        <div
            onKeyDown={e => {
                if (e.key === "Enter") {
                    submitForm();
                }
            }}
        >
            <div style={{ marginBottom: "10px" }}>
                <TextInput
                    type="text"
                    value={values.login}
                    label="Login"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("login", e.target.value)
                    }
                    errorLabel={errors.login}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <TextInput
                    type="password"
                    value={values.password}
                    label="Password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("password", e.target.value)
                    }
                    errorLabel={errors.password}
                />
            </div>
            <div style={{ float: "right" }}>
                <Button
                    label="Connect"
                    onClick={submitForm}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default LoginFormFields;
