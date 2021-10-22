import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TextField from "./textField";
import SelectField from "./selectField";
import RadioField from "./radioField";
import MultipleSelectField from "./multipleSelectField";
import api from "../../../api/index";

const EditForm = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const [inputValue, setInputValue] = useState({
        name: null,
        emai: null,
        qualities: [],
        professions: "Choose...",
        sex: null
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
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    // function handleSubmit(e) {
    //     e.preventDefault();
    // }
    function updateUserInfo(e) {
        e.preventDefault();
        const updatedQualities = Object.values(e.target.qualities).map((q) => {
            return Object.values(qualities).filter(
                (qt) => qt._id === q.value
            )[0];
        });
        const updateProfession = Object.values(professions).filter(newProfession => newProfession._id === e.target.professions.value);
        const newData = {
            name: e.target.name.value,
            email: e.target.email.value,
            qualities: updatedQualities.filter(qualities => qualities != null),
            profession: updateProfession[0],
            sex: e.target.sex.value
        };
        api.users.update(userId, newData);
        history.push(`/users/${userId}`);
    }
    if (user) {
        const userQualities = user.qualities.map((qualitie) => { return { label: qualitie.name, value: qualitie._id }; });
        return (
            <div className="container mt-5">
                <div className="d-flex flex-column">
                    <button type="button" className="btn btn-primary align-self-start" onClick = { () => {
                        history.push(`/users/${userId}`);
                    }}>Назад</button>
                    <div className="row">
                        <div className="col-md-6 offset0md-3 shadow p-4 mx-auto">
                            <form onSubmit={updateUserInfo}>
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
                                    // defaultOption={ { name: user.profession.name, value: user.profession._id } }
                                    />
                                )}
                                <RadioField
                                    options={[
                                        { name: "male", value: "male" },
                                        { name: "female", value: "female" },
                                        { name: "other", value: "other" }
                                    ]}
                                    value={
                                        inputValue.sex != null
                                            ? inputValue.sex
                                            : user.sex
                                    }
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
                                Сохранить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return <h1>Loading...</h1>;
};
export default EditForm;
