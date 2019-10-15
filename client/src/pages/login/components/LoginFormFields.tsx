import React, { ChangeEvent, useEffect } from "react";
import TextInput from "../../../components/TextInput";
import { FormikProps } from "formik";
import { Login } from "../types/Login";
import Button from "../../../components/Button";

interface LoginFormFieldsProps {
    formProps: FormikProps<Login>;
}

const LoginFormFields = (props: LoginFormFieldsProps) => {
    const { formProps } = props;
    const { values, setFieldValue, submitForm, errors, status } = formProps;

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
                <Button label="Connexion" onClick={submitForm} />
            </div>
        </div>
    );
};

export default LoginFormFields;
