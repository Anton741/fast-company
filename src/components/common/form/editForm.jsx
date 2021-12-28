import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "./textField";
import SelectField from "./selectField";
import RadioField from "./radioField";
import MultipleSelectField from "./multipleSelectField";
import { useProfessions } from "../../hooks/useProfessions";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";

const EditForm = () => {
    const history = useHistory();
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    const { editUser } = useUsers();
    const user = useAuth().currentUser;
    const [inputValue, setInputValue] = useState({
        name: null,
        emai: null,
        qualities: [],
        professions: "Choose...",
        sex: null
    });
    const userQualities = user.qualities.map((qualitieId) => {
        return { label: qualities.filter(q => q._id === qualitieId)[0].name, value: qualitieId };
    });
    function handleChange(target) {
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    function updateUserInfo(e) {
        e.preventDefault();
        console.log(e.target.professions.value);
        const updatedQualities = Object.values(e.target.qualities).map((q) => {
            return q.value;
        });
        const newData = {
            ...user,
            name: e.target.name.value,
            email: e.target.email.value,
            qualities: updatedQualities.filter(qualities => qualities != null),
            professions: e.target.professions.value,
            sex: e.target.sex.value
        };
        editUser(newData);
        history.push(`/users/${user._id}`);
    }
    return (
        <div className="container mt-5">
            <div className="d-flex flex-column">
                <button
                    type="button"
                    className="btn btn-primary align-self-start"
                    onClick={() => {
                        history.push(`/users/${user._id}`);
                    }}
                >
                    Назад
                </button>
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
                            <SelectField
                                data={professions}
                                OnHandleChange={handleChange}
                                name="professions"
                                label="Выберите профессию"
                                defaultOption = {professions.filter(p => p._id === user.professions)[0]}
                            />
                            <RadioField
                                options={[
                                    { name: "male", value: "Male" },
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
                            <MultipleSelectField
                                name="qualities"
                                label="Ваши качества"
                                options={qualities}
                                handleChange={handleChange}
                                defaultV={userQualities}
                            />
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
export default EditForm;
