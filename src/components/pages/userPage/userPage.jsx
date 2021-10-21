import { useState } from "react";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";
import api from "../../../api/index";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    api.users.getById(userId).then((data) => {
        setUser(data);
    });
    const history = useHistory();
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h3>Проффесия: {user.profession.name}</h3>
                <Qualities qualities={user.qualities} />
                <p>Всего встреч: {user.completedMeetings}</p>
                <h3>Rate: {user.rate}</h3>
                <button onClick={() => history.push(`/users/${user._id}/edit`)}>
                    Все пользователи
                </button>
            </>
        );
    }
    return <h1>Loading...</h1>;
};

export default UserPage;
