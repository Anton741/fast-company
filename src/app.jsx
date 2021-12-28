import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProfessionsProvider } from "./components/hooks/useProfessions";
import { QualitiesProvider } from "./components/hooks/useQualities";
import { AuthProvider } from "./components/hooks/useAuth";
import UsersMain from "./layouts/users";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import ProtectRoutes from "./components/ui/protectRouts";
import LogOut from "./components/ui/logout";
// import EditForm from "./components/common/form/editForm";
// import UserCard from "./components/userCard";

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <ProfessionsProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route path="/logout/" component={LogOut} />
                            <Route path="/login/:type?" component={Login} />
                            <ProtectRoutes
                                path="/users/:userId?/:edit?"
                                component={UsersMain}
                            />
                            <Route path="/" exact component={Main} />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionsProvider>
            </AuthProvider>
        </>
    );
};
export default App;
