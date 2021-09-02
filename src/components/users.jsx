import User from "./user";
import SearchStatus from "./search_status";
import Pagination from "./pagination";
import { SiparatePage } from "../utils/seperatePage";
import { useState } from "react";

const Users = ({ onDelete, onAddBookmark, users }) => {
    const count = users.length;
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const usersOnPage = SiparatePage(users, pageSize, currentPage);

    const ChangePage = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <SearchStatus users={users}></SearchStatus>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Избранное</th>
                            <th scope="col">Встретился раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersOnPage.map((user) => {
                            return (
                                <User
                                    key = {user._id}
                                    onDelete={onDelete}
                                    statusBookmark={user.bookmark}
                                    onAddBookmark={onAddBookmark}
                                    {...user}
                                ></User>
                            );
                        })}
                    </tbody>
                </table>
            )}
            <Pagination
                pageSize={pageSize}
                itemCount={count}
                onChangePage={ChangePage}
                currentPage={currentPage}
            ></Pagination>
        </>
    );
};
export default Users;
