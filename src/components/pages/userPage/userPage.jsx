import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import Qualities from "../../ui/qualities";
import InfoCard from "../../ui/infoCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import CommentsList from "../../ui/commentsList";
import NewCommentForm from "../../ui/newCommentForm";
import api from "../../../api/index";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
        getComments();
    }, []);
    // const history = useHistory();
    function getComments() {
        return api.comments.fetchCommentsForUser(userId).then((data) => {
            setComments(data);
        });
    }
    function deleteComment(commentId) {
        api.comments.remove(commentId);
        getComments();
    }
    if (user) {
        return (
            <>
                <div className="col-md-4 mb-3">
                    <InfoCard user = {user} userId = {userId} />
                    < QualitiesCard qualities = { user.qualities }/>
                    <MeetingsCard countMeeting = {user.completedMeetings} />
                </div>
                {comments && <div className="col-md-8">
                    <NewCommentForm updateCommentsList = {getComments}/>
                    <CommentsList comments = {comments} deleteComment = {deleteComment}/>
                </div>}

                {/* <h1>{user.name}</h1>
                <h3>Проффесия: {user.profession.name}</h3>
                <Qualities qualities={user.qualities} />
                <p>Всего встреч: {user.completedMeetings}</p>
                <h3>Rate: {user.rate}</h3>
                <button onClick={() => history.push(`/users/${user._id}/edit`)}>
                    Редактировать
                </button> */}
            </>
        );
    }
    return <h1>Loading...</h1>;
};

export default UserPage;
