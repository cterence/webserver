import React, { ChangeEvent, useEffect, useState } from "react";
import { TextInput, SelectField } from "../../../components";
import { FormikProps } from "formik";
import { Signup } from "./types";
import Button from "../../../components/Button";
import { OptionProps } from "../../../components/types";
import { getRoles } from "../../../services/user";

interface SignupFormFieldsProps {
    formProps: FormikProps<Signup>;
}

const SignupFormFields = (props: SignupFormFieldsProps) => {
    const { formProps } = props;
    const { values, setFieldValue, submitForm, errors } = formProps;

    const [roles, setRoles] = useState<OptionProps[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await getRoles();
            setRoles(response.roles);
        };
        fetchRoles();
    }, []);

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
                    value={values.confirmPassword}
                    label="Confirm password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("confirmPassword", e.target.value)
                    }
                    errorLabel={errors.confirmPassword}
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
            <div style={{ marginBottom: "10px" }}>
                <SelectField
                    options={roles}
                    value={values.role}
                    label="Role"
                    onChange={value => setFieldValue("role", value)}
                    errorLabel={errors.role}
                />
            </div>
            <div style={{ float: "right" }}>
                <Button label="Register" onClick={submitForm} />
            </div>
        </div>
    );
};

export default SignupFormFields;
