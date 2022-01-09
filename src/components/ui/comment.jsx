
import { useComments } from "../hooks/useComments";
import { publishedDate } from "../../utils/publishedDate";
import { useSelector } from "react-redux";
import { getUsersById } from "../../store/usersReducer";

const CommentCard = ({ comment }) => {
    const user = useSelector(getUsersById(comment.userId));
    const { removeComment } = useComments();
    return (
        <>
            <div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={user.photo}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name} -
                                            <span className="small">
                                                {publishedDate(comment.created_at)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() =>
                                                removeComment(comment._id)
                                            }
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentCard;
