import { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../common/form/loginForm";
import RegistrationForm from "../common/form/registrationForm";
const Login = ({ professions }) => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "registration" ? "registration" : type);
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset0md-3 shadow p-4 mx-auto">
                    {formType !== "registration"
                        ? (<><h3 className="mb-4">Login</h3>
                            <LoginForm /> <p onClick = {() => setFormType("registration")}>Create new account</p></>)
                        : (<><h3 className="mb-4">Registration</h3>
                            <RegistrationForm /> <p onClick = {() => setFormType("login")}>Already have account?</p></>)}
                </div>
            </div>
        </div>
    );
};

export default Login;
