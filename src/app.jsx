import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/hooks/useAuth";
import UsersMain from "./layouts/users";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import ProtectRoutes from "./components/ui/protectRouts";
import LogOut from "./components/ui/logout";
import { loadQualities } from "./store/qualitiesReducer";
import { loadProfessions } from "./store/professionsReducer";
import { useDispatch } from "react-redux";
// import EditForm from "./components/common/form/editForm";
// import UserCard from "./components/userCard";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualities());
        dispatch(loadProfessions());
    }, []);
    return (
        <>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <Route path="/logout/" component={LogOut} />
                    <Route path="/login/:type?" component={Login} />
                    <ProtectRoutes
                        path="/users/:userId?/:edit?"
                        component={UsersMain}
                    />
                    <Route path="/" exact component={Main} />
                </Switch>
            </AuthProvider>
        </>
    );
};
export default App;
