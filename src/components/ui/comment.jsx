import { useState, useEffect } from "react";
import api from "../../api/index";
const CommentCard = ({ comment, deleteComment }) => {
    const imgPath = `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(comment.userId).then((data) => {
            setUser(data);
        });
    }, []);
    function publishedDate() {
        function getNameMounth(number) {
            switch (number) {
            case 0:
                return "Январь";
            case 1:
                return "Февраль";
            case 2:
                return "Март";
            case 3:
                return "Апрель";
            case 4:
                return "Май";
            case 5:
                return "Июнь";
            case 6:
                return "Июль";
            case 7:
                return "Август";
            case 8:
                return "Сентябрь";
            case 9:
                return "Октябрь";
            case 10:
                return "Ноябрь";
            case 11:
                return "Декабрь";
            default:
                break;
            }
        }
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        const date = new Date(Number(comment.created_at));
        const minutesAgo = (Date.now() - date.getTime()) / 60000;
        if (minutesAgo <= 1) {
            return " 1 минуту назад";
        } else if (minutesAgo <= 5) {
            return " 5 минут назад";
        } else if (minutesAgo <= 10) {
            return " 10 минут назад";
        } else if (minutesAgo <= 30) {
            return " 30 минут назад";
        } else if (minutesAgo <= 1440) {
            return ` ${addZero(date.getHours())}:${addZero(date.getMinutes())} `;
        } else if (minutesAgo > 31536000000) {
            return ` ${date.getDay()} ${date.getMonth()}  ${date.getFullYear()}`;
        } else {
            return ` ${addZero(date.getDate())} ${getNameMounth(date.getMonth())} `;
        }
    }
    publishedDate();
    return (
        <>
            {user && (
                <div className="bg-light card-body  mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start ">
                                <img
                                    src={imgPath}
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
                                                    {publishedDate()}
                                                </span>
                                            </p>
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() =>
                                                    deleteComment(comment._id)
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
            )}
        </>
    );
};

export default CommentCard;
