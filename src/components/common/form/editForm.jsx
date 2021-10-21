import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "./textField";
import SelectField from "./selectField";
import RadioField from "./radioField";
import MultipleSelectField from "./multipleSelectField";
import api from "../../../api/index";

const EditForm = () => {
    const params = useParams();
    const { userId } = params;
    const [inputValue, setInputValue] = useState({
        name: null,
        emai: "",
        qualities: [],
        professions: "Choose...",
        sex: "Female"
    });
    const [user, setUser] = useState();
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState();
    useEffect(function() {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);
    function handleChange(target) {
        console.log(target);
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
    }
    if (user) {
        const userQualities = user.qualities.map((qualitie) => { return { label: qualitie.name, value: qualitie._id }; });
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset0md-3 shadow p-4 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fieldType="name"
                                fieldName="name"
                                fieldLable="Введите имя"
                                onHandleChange={handleChange}
                                value={
                                    inputValue.name != null
                                        ? inputValue.name
                                        : user.name
                                }
                            />
                            <TextField
                                fieldType="email"
                                fieldName="email"
                                fieldLable="Введите email"
                                onHandleChange={handleChange}
                                value={
                                    inputValue.email != null
                                        ? inputValue.email
                                        : user.email
                                }
                            />
                            {professions && (
                                <SelectField
                                    data={professions}
                                    OnHandleChange={handleChange}
                                    name="professions"
                                    label="Выберите профессию"
                                    defaultOption={user.profession.name}
                                />
                            )}
                            <RadioField
                                options={[
                                    { name: "male", value: "Male" },
                                    { name: "female", value: "Female" },
                                    { name: "other", value: "Other" }
                                ]}
                                value={user.sex}
                                name="sex"
                                label="Пол"
                                onHandleChange={handleChange}
                            />
                            {qualities && (
                                <MultipleSelectField
                                    name="qualities"
                                    label="Ваши качества"
                                    options={qualities}
                                    handleChange={handleChange}
                                    defaultV={userQualities}
                                />
                            )}
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Log up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
    return <h1>Loading...</h1>;
};
export default EditForm;
