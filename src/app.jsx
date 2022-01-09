import React from "react";
import { Route, Switch } from "react-router-dom";
// import { AuthProvider } from "./components/hooks/useAuth";
import UsersMain from "./layouts/users";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import ProtectRoutes from "./components/ui/protectRouts";
import LogOut from "./components/ui/logout";
import AppLoader from "./utils/hoc/appLoader";

const App = () => {
    return (
        <>
            <AppLoader>
                {/* <AuthProvider> */}
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
                {/* </AuthProvider> */}
            </AppLoader>
        </>
    );
};
export default App;
