import { useState, useEffect } from "react";
import TextField from "./textField";
import SelectField from "./selectField";
import RadioField from "./radioField";
import MultipleSelectField from "./multipleSelectField";
import validator from "../../../utils/validator";
import api from "../../../api/index";

const RegistrationForm = () => {
    const [inputValue, setInputValue] = useState({ email: "", password: "", professions: "Choose...", sex: "Female", qualities: [] });
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState();
    useEffect(function() {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);
    useEffect(
        function() {
            setErrors(validator(inputValue, valitadorConfig));
        },
        [inputValue]
    );
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
        },
        professions: {
            isChoosed: {
                message: "Choose profession"
            }
        }
    };
    function handleChange(target) {
        console.log(target);
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
                {professions && (
                    <SelectField
                        data={professions}
                        OnHandleChange={handleChange}
                        name="professions"
                        label="Choose professions"
                        error={errors.professions}
                        defaultOption="Choose..."
                    />
                )}
                <RadioField
                    options={[
                        { name: "male", value: "Male" },
                        { name: "female", value: "Female" },
                        { name: "other", value: "Other" }
                    ]}
                    value = {inputValue.sex}
                    name = "sex"
                    lable = "Choose sex"
                    onHandleChange = {handleChange}
                />
                {qualities && <MultipleSelectField name ="qualities" label = "Choose your qualities" options = {qualities} handleChange = {handleChange}/>}
                <button type="submit" className="btn btn-primary w-100">
                    Log up
                </button>
            </form>
        </>
    );
};
export default RegistrationForm;
