/* eslint-disable camelcase */
import { useState } from "react";
import * as yup from "yup";
import { nanoid } from "nanoid";
import TextField from "../common/form/textField";
import { useComments } from "../hooks/useComments";
import { useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";

const NewCommentForm = ({ updateCommentsList }) => {
    const { addComment } = useComments();
    const { currentUser } = useAuth();
    const params = useParams();
    const { userId } = params;
    const [inputValue, setInputValue] = useState({ content: "" });
    const [errors, setErrors] = useState();
    function handleChange(target) {
        setInputValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }
    function createComment() {
        const newComment = {
            _id: nanoid(),
            userId: currentUser._id,
            pageId: userId,
            content: inputValue.content,
            created_at: Date.now()
        };
        validateScheme
            .validate(inputValue)
            .then(function() {
                addComment(newComment);
                setInputValue({ content: "" });
                setErrors({});
            })
            .catch((err) => setErrors({ [err.path]: err.message }));
    }

    const validateScheme = yup.object().shape({
        content: yup.string().required("Введите текст комментария")
    });
    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <TextField
                        fieldType={"textarea"}
                        value={inputValue.content}
                        fieldName={"content"}
                        onHandleChange={handleChange}
                        error={errors ? errors.content : ""}
                    />
                    <button type="submit" className="btn btn-primary w-100" onClick = {createComment}>
                        Опубликовать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewCommentForm;
