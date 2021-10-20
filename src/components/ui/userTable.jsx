import TableHeader from "../common/table/tableHeader";
import TableBody from "../common/table/tableBody";
import Table from "../common/table/table";
import Bookmarks from "./bookmark";
import Qualities from "./qualities";
import { Link } from "react-router-dom";

const TableUsers = ({
    users,
    sortedUsers,
    currentSort,
    onSort,
    onDelete,
    onAddBookmark,
    ...rest
}) => {
    const columns = {
        name: { iter: "name", name: "Имя", component: user => <Link to = {`/users/${user._id}`} >{user.name}</Link> },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: { iter: "profession.name", name: "Профессия" },
        bookmark: {
            iter: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmarks
                    onAddBookmarks={onAddBookmark}
                    statusBookmark={user.bookmark}
                    user_id={user._id}
                />
            )
        },
        completedMeetings: {
            iter: "completedMeetings",
            name: " Встретился раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    return (
        <>
            <Table>
                <TableHeader
                    onSort={onSort}
                    currentSort={currentSort}
                    columns={columns}
                ></TableHeader>
                <TableBody data={sortedUsers} columns={columns}></TableBody>
            </Table>
        </>
    );
};

export default TableUsers;
