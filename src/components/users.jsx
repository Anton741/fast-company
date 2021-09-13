import User from "./user";
import SearchStatus from "./search_status";
import Pagination from "./pagination";
import GroupList from "./groupList";
import { SiparatePage } from "../utils/seperatePage";
import { useState, useEffect } from "react";
import api from "../api/index";

const Users = ({ onDelete, onAddBookmark, users }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [proffessions, setProfessions] = useState();
    const [selectedProfession, setSelectedProfession] = useState();
    useEffect(function() {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const ChangePage = (page) => {
        setCurrentPage(page);
    };
    const filtretedUser = selectedProfession
        ? users.filter((user) => user.profession.name === selectedProfession)
        : users;
    const count = filtretedUser.length;
    const usersOnPage = SiparatePage(filtretedUser, pageSize, currentPage);
    return (
        <div className="d-flex">
            {proffessions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        professions={proffessions}
                        onFilter={(e) => {
                            setCurrentPage(1);
                            setSelectedProfession(e);
                        }}
                        selectedProfession={selectedProfession}
                    ></GroupList>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => setSelectedProfession()}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus users={filtretedUser}></SearchStatus>
                {users.length > 0 && (
                    <table className="table flex-grow-1">
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
                                        key={user._id}
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
                <div className="d-flex justify-content-center mt-auto">
                    <Pagination
                        pageSize={pageSize}
                        itemCount={count}
                        onChangePage={ChangePage}
                        currentPage={currentPage}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};
export default Users;
