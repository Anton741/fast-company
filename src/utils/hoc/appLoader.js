import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionsLoading, loadProfessions } from "../../store/professionsReducer";
import { getQualitiesLoading, loadQualities } from "../../store/qualitiesReducer";
import { getIsLogging, loadUsers, getLoading } from "../../store/usersReducer";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(getIsLogging());
    const userLoading = useSelector(getLoading());
    const proffessionsLoading = useSelector(getProfessionsLoading());
    const qualitiesLoading = useSelector(getQualitiesLoading());
    useEffect(() => {
        dispatch(loadQualities());
        dispatch(loadProfessions());
        if (loggedIn) {
            dispatch(loadUsers());
        }
    }, [loggedIn]);
    if (userLoading || proffessionsLoading || qualitiesLoading) {
        return "loading...";
    }
    return children;
};

export default AppLoader;
