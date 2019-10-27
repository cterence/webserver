import React, { useState } from "react";
import { Formik } from "formik";
import { Signup } from "./types";
import { postSignup } from "../../../services/auth";
import SignupFormFields from "./SignupFormFields";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

interface SignupFormProps {
    setMessage: (value: string) => void;
}

const initialValues = {
    login: "",
    password: "",
    confirmPassword: "",
    role: "",
    key: ""
};

const validate = (values: Signup) => {
    let errors: {
        login?: string;
        password?: string;
        key?: string;
        role?: string;
        confirmPassword?: string;
    } = {};
    if (!values.login) errors.login = "This field is required";

    if (!values.password) errors.password = "This field is required";

    if (!values.confirmPassword)
        errors.confirmPassword = "This field is required";

    if (!values.role) errors.role = "This field is required";

    if (!values.key) errors.key = "This field is required";

    if (values.password && values.confirmPassword)
        if (values.password !== values.confirmPassword)
            errors.confirmPassword = "The passwords do not match";

    return errors;
};

const SignupForm = (props: SignupFormProps) => {
    const { setMessage } = props;
    const [, setCookie] = useCookies(["token"]);
    const [redirect, setRedirect] = useState(false);

    const onSubmit = async (values: Signup) => {
        try {
            const response = await postSignup(values);
            await setCookie("token", response.token);
            setMessage("Signup successful");
            setTimeout(() => setRedirect(true), 1000);
        } catch (e) {
            setMessage("Signup failed");
        }
    };
    if (redirect) return <Redirect to="/" />;
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            render={formProps => <SignupFormFields formProps={formProps} />}
        />
    );
};

export default SignupForm;
