import React, { ChangeEvent } from "react";
import TextInput from "../../../components/TextInput";
import { FormikProps } from "formik";
import { Signup } from "../types/Signup";
import Button from "../../../components/Button";

interface SignupFormFieldsProps {
    formProps: FormikProps<Signup>;
}

const SignupFormFields = (props: SignupFormFieldsProps) => {
    const { formProps } = props;
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
            <div style={{ marginBottom: "10px" }}>
                <TextInput
                    type="password"
                    value={values.key}
                    label="Key"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("key", e.target.value)
                    }
                    errorLabel={errors.key}
                />
            </div>
            <div style={{ float: "right" }}>
                <Button label="Connexion" onClick={submitForm} />
            </div>
        </div>
    );
};

export default SignupFormFields;
