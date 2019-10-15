import React from "react";
import { Formik, FormikActions } from "formik";
import { Login } from "../types/Login";
import { postLogin } from "../../../services/auth";
import LoginFormFields from "./LoginFormFields";

interface LoginFormProps {
    setMessage: (value: string) => void;
}

const initialValues = { login: "", password: "" };

const requiredFields = ["login", "password"];

const validate = (values: Login) => {
    let errors = {};
    requiredFields.forEach(field => {
        if (values[field] === initialValues[field]) {
            errors[field] = "This field is required";
        }
    });
    return errors;
};

const LoginForm = (props: LoginFormProps) => {
    const { setMessage } = props;

    const onSubmit = async (values: Login) => {
        try {
            await postLogin(values);
            setMessage("Login successful");
        } catch (e) {
            setMessage("Login failed");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            render={formProps => <LoginFormFields formProps={formProps} />}
        />
    );
};

export default LoginForm;
