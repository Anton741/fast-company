
// import Qualities from "../../ui/qualities";
import InfoCard from "../../ui/infoCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import CommentsList from "../../ui/commentsList";
import NewCommentForm from "../../ui/newCommentForm";
import { useSelector } from "react-redux";
import { getUsersById } from "../../../store/usersReducer";

const UserPage = ({ userId }) => {
    const user = useSelector(getUsersById(userId));
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
                    <NewCommentForm />
                    <CommentsList />
                </div>
            </>}
        </>
    );
};

export default UserPage;
