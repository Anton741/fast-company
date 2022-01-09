import TableHeader from "../common/table/tableHeader";
import TableBody from "../common/table/tableBody";
import Table from "../common/table/table";
import Bookmarks from "./bookmark";
import Qualities from "./qualities";
import Profession from "./profession";
import { Link } from "react-router-dom";
import { deleteUser } from "../../store/usersReducer";
import { useDispatch } from "react-redux";

const TableUsers = ({
    users,
    sortedUsers,
    currentSort,
    onSort,
    onAddBookmark,
    ...rest
}) => {
    const dispatch = useDispatch();
    const columns = {
        name: { iter: "name", name: "Имя", component: user => <Link to = {`/users/${user._id}`} >{user.name}</Link> },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: { iter: "profession.name", name: "Профессия", component: (user) => <Profession id = {user.professions} /> },
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
                    onClick={() => dispatch(deleteUser(user._id))}
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
