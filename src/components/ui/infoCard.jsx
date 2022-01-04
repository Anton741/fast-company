import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Profession from "./profession";

const InfoCard = ({ user, userId }) => {
    const history = useHistory();
    const { currentUser } = useAuth();
    // function getImage(url) {
    //     return fetch(url).then(response => response.json()).then(data => data);
    // }
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === userId &&
                (<button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={() => history.push(`/users/${userId}/edit`)}
                >
                    <i className="bi bi-gear"></i>
                </button>)}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.photo}
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1"><Profession id = {user.professions}/></p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
