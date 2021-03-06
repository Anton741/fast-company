import { useState, useEffect } from "react";
import { useProfessions } from "../../hooks/useProfessions";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";
import TextField from "./textField";
import SelectField from "./selectField";
import RadioField from "./radioField";
import MultipleSelectField from "./multipleSelectField";
import CheckboxField from "./ckeckboxField";
import validator from "../../../utils/validator";
import randomValue from "../../../utils/randomValue";
import { useHistory } from "react-router";

const RegistrationForm = () => {
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        password: "",
        professions: "Choose...",
        sex: "Female",
        qualities: [],
        lisence: false
    });
    const [errors, setErrors] = useState({});
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    const { singUp } = useAuth();
    const history = useHistory();
    useEffect(
        function() {
            setErrors(validator(inputValue, valitadorConfig));
        },
        [inputValue]
    );
    const valitadorConfig = {
        name: {
            isRequire: {
                message: "Name is nessasary field"
            }
        },
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
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setErrors(validator(inputValue, valitadorConfig));
        const newData = {
            ...inputValue,
            qualities: inputValue.qualities.map((q) => q.value),
            rate: randomValue(),
            completedMeetings: randomValue(),
            photo: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`
        };
        try {
            await singUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    fieldType="name"
                    fieldName="name"
                    fieldLable="?????????????? ???????? ??????"
                    onHandleChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    fieldType="email"
                    fieldName="email"
                    fieldLable="?????????????? email"
                    onHandleChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    fieldType="password"
                    fieldName="password"
                    fieldLable="?????????????? ????????????"
                    onHandleChange={handleChange}
                    error={errors.password}
                />
                {professions && (
                    <SelectField
                        data={professions}
                        OnHandleChange={handleChange}
                        name="professions"
                        label="???????????????? ??????????????????"
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
                    value={inputValue.sex}
                    name="sex"
                    label="??????"
                    onHandleChange={handleChange}
                />
                {qualities && (
                    <MultipleSelectField
                        name="qualities"
                        label="???????? ????????????????"
                        options={qualities}
                        handleChange={handleChange}
                    />
                )}
                <CheckboxField
                    name="lisence"
                    onHandleChange={handleChange}
                    value={inputValue.lisence}
                >
                    ?????????????????????? <a>???????????????????????? </a> ????????????????????{" "}
                </CheckboxField>
                <button type="submit" className="btn btn-primary w-100">
                    Log up
                </button>
            </form>
        </>
    );
};
export default RegistrationForm;
