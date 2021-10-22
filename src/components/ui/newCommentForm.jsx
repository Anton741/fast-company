import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as yup from "yup";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import api from "../../api/index";

const NewCommentForm = ({ updateCommentsList }) => {
    const params = useParams();
    const { userId } = params;
    const [users, setUsers] = useState();
    const [inputValue, setInputValue] = useState({
        userName: "",
        content: ""
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);
    function handleChange(target) {
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    function updateComment() {
        const newData = {
            userId: inputValue.userName,
            pageId: userId,
            content: inputValue.content
        };
        validateScheme.validate(inputValue)
            .then(function() {
                api.comments.add(newData);
                updateCommentsList();
                setInputValue({
                    userName: "",
                    content: ""
                });
                setErrors({});
            })
            .catch((err) => setErrors({ [err.path]: err.message }));
    }
    const validateScheme = yup.object().shape({
        content: yup.string().required("Введите текст комментария"),
        userName: yup.string().required("Выбирите автора комментария")
    });
    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    {users && (
                        <>
                            <SelectField
                                data={users}
                                name={"userName"}
                                OnHandleChange={handleChange}
                                defaultOption= {"Выберите профессию"}
                                userId = {inputValue.userName}
                                error={errors.userName}
                            />
                        </>
                    )}
                    <TextField
                        fieldType={"textarea"}
                        value={inputValue.content}
                        fieldName={"content"}
                        onHandleChange={handleChange}
                        error={errors.content}
                    />
                    <button type="submit" className="btn btn-primary w-100" onClick = {updateComment}>
                        Опубликовать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewCommentForm;
