
// import Qualities from "../../ui/qualities";
import InfoCard from "../../ui/infoCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import CommentsList from "../../ui/commentsList";
import NewCommentForm from "../../ui/newCommentForm";
import { CommentsProvider } from "../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUsersById } from "../../../store/usersReducer";
// import { useEffect, useState } from "react";
// import api from "../../../api/index";

const UserPage = ({ userId }) => {
    const user = useSelector(getUsersById(userId));
    // useEffect(() => {
    //     api.users.getById(userId).then((data) => {
    //         setUser(data);
    //     });
    //     getComments();
    // }, []);
    // // const history = useHistory();
    // function getComments() {
    //     return api.comments.fetchCommentsForUser(userId).then((data) => {
    //         setComments(data);
    //     });
    // }
    // function deleteComment(commentId) {
    //     api.comments.remove(commentId);
    //     getComments();
    // }
    return (
        <>
            {user &&
            <>
                <div className="col-md-4 mb-3">
                    <InfoCard user={user} userId={userId} />
                    <QualitiesCard qualities={user.qualities} />
                    <MeetingsCard countMeeting={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <CommentsProvider>
                        <NewCommentForm />
                        <CommentsList />
                    </CommentsProvider>
                </div>
            </>}
        </>
    );
};

export default UserPage;
