import CommentCard from "./comment";
import { useComments } from "../hooks/useComments";
const CommentsList = ({ deleteComment }) => {
    const { comments } = useComments();
    // comments = comments.sort((a, b) => Number(b.created_at) - Number(a.created_at));
    return (
        <div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                {comments.map(comment => <CommentCard comment = {comment} key = {comment._id} />) }
            </div>
        </div>
    );
};

export default CommentsList;
