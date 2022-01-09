import { useState } from "react";
import TextField from "./textField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, singIn } from "../../../store/usersReducer";
const LofinForm = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({ email: "", password: "" });
    const authError = useSelector(getAuthError());
    function handleChange(target) {
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(singIn({ ...inputValue, redirect: "/users" }));
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    fieldType="email"
                    fieldName="email"
                    fieldLable="Введите логин/email"
                    onHandleChange={handleChange}
                />
                <TextField
                    fieldType="password"
                    fieldName="password"
                    fieldLable="Введите пароль"
                    onHandleChange={handleChange}
                />
                {authError && <div >{authError}</div>}
                <button type="submit" className="btn btn-primary w-100">
                    Log in
                </button>
            </form>
        </>
    );
};
export default LofinForm;
