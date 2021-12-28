import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectRoutes = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    return (<Route {...rest} render = {(props) => {
        if (!currentUser) {
            return <Redirect to ="/login/"/>;
        }
        return Component ? <Component {...props}/> : children;
    }}/>);
};
export default ProtectRoutes;
