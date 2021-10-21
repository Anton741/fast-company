import React, { useState, useEffect } from "react";
import SearchStatus from "./search_status";
import Pagination from "./pagination";
import GroupList from "./groupList";
import { SiparatePage } from "../utils/seperatePage";
import api from "../api/index";
import _ from "lodash";
import TableUsers from "./userTable";
import UserCard from "./userCard";
import { Route, Switch, useParams } from "react-router";

const Users = () => {
    const [users, delUser] = useState();

    useEffect(function() {
        api.users.fetchAll().then((data) => {
            delUser(data);
        });
    }, []);

    const deleteUser = (user_id) => {
        return delUser(users.filter((element) => element._id !== user_id));
    };

    const AddBookmarks = (user_id) => {
        return delUser(
            users.map((user) => {
                if (user._id === user_id) {
                    user.bookmark
                        ? (user.bookmark = false)
                        : (user.bookmark = true);
                }
                return user;
            })
        );
    };
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [proffessions, setProfessions] = useState();
    const [selectedProfession, setSelectedProfession] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    useEffect(function() {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const ChangePage = (page) => {
        setCurrentPage(page);
    };
    const filtretedUser = selectedProfession
        ? users.filter((user) => {
            return user.profession.name === selectedProfession;
        })
        : users;
    if (useParams().userId) {
        return (
            <Switch>
                <Route path="/users/:userId" component={() => <UserCard />} />;
            </Switch>
        );
    }
    if (users) {
        const count = filtretedUser.length;
        const usersOnPage = SiparatePage(filtretedUser, pageSize, currentPage);
        const sortedUsers = _.orderBy(
            usersOnPage,
            [sortBy.iter],
            [sortBy.order]
        );
        const handleSort = (item) => {
            setSortBy(item);
        };
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
                        <TableUsers
                            sortedUsers={sortedUsers}
                            currentSort={sortBy}
                            onSort={handleSort}
                            onDelete={deleteUser}
                            onAddBookmark={AddBookmarks}
                            // {...rest}
                        ></TableUsers>
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
    }
    return "loading...";
};
export default Users;
