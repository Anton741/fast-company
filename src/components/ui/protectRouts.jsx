import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsLogging } from "../../store/usersReducer";

const ProtectRoutes = ({ component: Component, children, ...rest }) => {
    const isLogging = useSelector(getIsLogging());
    return (<Route {...rest} render = {(props) => {
        if (!isLogging) {
            return <Redirect to ="/login/"/>;
        }
        return Component ? <Component {...props}/> : children;
    }}/>);
};
export default ProtectRoutes;
