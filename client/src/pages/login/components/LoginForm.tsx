import React, { useState } from "react";
import { Formik } from "formik";
import { Login } from "./types";
import { postLogin } from "../../../services/auth";
import { LoginFormFields } from ".";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

interface LoginFormProps {
    setMessage: (value: string) => void;
}

const initialValues = { login: "", password: "" };

const validate = (values: Login) => {
    let errors: { login?: string; password?: string } = {};
    if (!values.login) {
        errors.login = "This field is required";
    }
    if (!values.password) {
        errors.password = "This field is required";
    }
    return errors;
};

const LoginForm = (props: LoginFormProps) => {
    const { setMessage } = props;
    const [, setCookie] = useCookies(["token"]);
    const [redirect, setRedirect] = useState(false);

    const onSubmit = async (values: Login) => {
        try {
            const response = await postLogin(values);
            setCookie("token", response.token, { httpOnly: false });
            setMessage("Log in successful");
            setTimeout(() => setRedirect(true), 1000);
        } catch (e) {
            setMessage("Log in failed");
        }
    };

    if (redirect) return <Redirect to="/" />;
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
