import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import TextField from "./textField";
import validator from "../../../utils/validator";
import { useHistory } from "react-router";

const LofinForm = () => {
    const [inputValue, setInputValue] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const { singIn } = useAuth();
    const history = useHistory();
    useEffect(function() {
        setErrors(validator(inputValue, valitadorConfig));
    }, [inputValue]);
    const valitadorConfig = {
        email: {
            isRequire: {
                message: "Email is nessasary field"
            },
            emailFormat: {
                message: "Enter email like example@mail.ru"
            }
        },
        password: {
            isRequire: {
                message: "Password is nessasary field"
            },
            minLength: {
                message: "Password's length must be not less 8 symbol"
            }
        }
    };
    function handleChange(target) {
        // setErrors(
        //     validator({ [e.target.name]: e.target.value }, valitadorConfig)
        // );
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setErrors(validator(inputValue, valitadorConfig));
        try {
            await singIn(inputValue);
            history.push("/users");
        } catch (error) {
            setErrors(error);
        }
        // Object.keys(errors).length === 0 && history.push("/users");
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    fieldType="email"
                    fieldName="email"
                    fieldLable="Введите логин/email"
                    onHandleChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    fieldType="password"
                    fieldName="password"
                    fieldLable="Введите пароль"
                    onHandleChange={handleChange}
                    error={errors.password}
                />
                <button type="submit" className="btn btn-primary w-100">Log in</button>
            </form>
        </>
    );
};
export default LofinForm;
