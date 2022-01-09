import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadComments, getComments } from "../../store/commentsReducer";
import React, { useEffect } from "react";
import CommentCard from "./comment";

const CommentsList = () => {
    const params = useParams();
    const { userId } = params;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadComments(userId));
    }, [userId]);
    const comments = useSelector(getComments());

    // comments = comments.sort((a, b) => Number(b.created_at) - Number(a.created_at));
    if (!comments) { return <p>loading</p>; }
    return (
        <div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                {comments.map((comment) => (
                    <CommentCard comment={comment} key={comment._id} />
                ))}
            </div>
        </div>
    );
};

export default CommentsList;
