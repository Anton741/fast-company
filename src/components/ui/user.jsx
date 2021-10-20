import Qualities from "./qualities";
import Bookmarks from "./bookmark";

const User = ({
    qualities,
    name,
    profession,
    completedMeetings,
    rate,
    onDelete,
    _id,
    statusBookmark,
    onAddBookmark
}) => {
    const qulitieClass = (classEnd) => {
        return `badge bg-${classEnd} mx-2 fs-6`;
    };
    return (
        <tr>
            <td>{name}</td>
            <Qualities onClass={qulitieClass} qualities={qualities}></Qualities>
            <td>{profession.name}</td>
            <td className="text-center">
                <Bookmarks
                    onAddBookmarks={onAddBookmark}
                    statusBookmark={statusBookmark}
                    user_id={_id}
                ></Bookmarks>
            </td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default User;
