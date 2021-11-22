import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useProfessions } from "../../hooks/useProfessions";
import SearchStatus from "../../ui/search_status";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import { SiparatePage } from "../../../utils/seperatePage";
import _ from "lodash";
import TableUsers from "../../ui/userTable";
import Search from "../../common/form/search";
import { QualitiesProvider } from "../../hooks/useQualities";
// import usersHttpService from "../../../services/users.service";
// import api from "../../../api/index";

const UsersList = () => {
    const { users, setUsers } = useUsers();
    const { professions, getProfession } = useProfessions();

    const deleteUser = (user_id) => {
        console.log(user_id);
        return setUsers(users.filter((element) => element._id !== user_id));
    };

    const AddBookmarks = (user_id) => {
        return setUsers(
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
    // const [proffessions, setProfessions] = useState();
    const [selectedProfession, setSelectedProfession] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "acs" });
    const [searchValue, setSearchValue] = useState("");
    // useEffect(function() {
    //     api.professions.fetchAll().then((data) => setProfessions(data));
    // }, []);
    const handleSearch = (e) => {
        setSelectedProfession();
        setSearchValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchValue);
    };

    const ChangePage = (page) => {
        setCurrentPage(page);
    };
    const filtretedUser = searchValue
        ? users.filter((user) => {
            const re = new RegExp(searchValue.toLowerCase(), "gi");
            return user.name.toLowerCase().match(re);
        })
        : (selectedProfession
            ? users.filter((user) => {
                return getProfession(user.profession).name === selectedProfession;
            })
            : users);
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
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            professions={professions}
                            onFilter={(e) => {
                                setCurrentPage(1);
                                setSelectedProfession(e);
                                setSearchValue();
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
                    <Search
                        onHandleSearch={handleSearch}
                        onHandleSubmit={handleSubmit}
                        Value={searchValue}
                    />
                    <SearchStatus users={filtretedUser}></SearchStatus>
                    {users.length > 0 && (
                        <QualitiesProvider>
                            <TableUsers
                                sortedUsers={sortedUsers}
                                currentSort={sortBy}
                                onSort={handleSort}
                                onDelete={deleteUser}
                                onAddBookmark={AddBookmarks}
                                // {...rest}
                            ></TableUsers>
                        </QualitiesProvider>
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
export default UsersList;
