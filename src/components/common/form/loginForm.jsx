import { useState, useEffect } from "react";
import TextField from "./textField";
import validator from "../../../utils/validator";

const LofinForm = () => {
    const [inputValue, setInputValue] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
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
        console.log(inputValue);
        // setErrors(
        //     validator({ [e.target.name]: e.target.value }, valitadorConfig)
        // );
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validator(inputValue, valitadorConfig));
        console.log("errors", errors);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    fieldType="email"
                    fieldName="email"
                    fieldLable="Enter email"
                    onHandleChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    fieldType="password"
                    fieldName="password"
                    fieldLable="Enter password"
                    onHandleChange={handleChange}
                    error={errors.password}
                />
                <button type="submit" className="btn btn-primary w-100">Log in</button>
            </form>
        </>
    );
};
export default LofinForm;
