import React from "react";
import { Route, Switch } from "react-router-dom";
import { UserProvider } from "./components/hooks/useUsers";
import { ProfessionsProvider } from "./components/hooks/useProfessions";
import { QualitiesProvider } from "./components/hooks/useQualities";
import { AuthProvider } from "./components/hooks/useAuth";
import UsersMain from "./layouts/users";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
// import EditForm from "./components/common/form/editForm";
// import UserCard from "./components/userCard";

const App = () => {
    return (
        <>
            <AuthProvider>
                <UserProvider>
                    <NavBar />
                    <Switch>
                        <ProfessionsProvider>
                            <QualitiesProvider>
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    path="/users/:userId?/:edit?"
                                    component={UsersMain}
                                />
                                <Route path="/" exact component={Main} />
                            </QualitiesProvider>
                        </ProfessionsProvider>
                    </Switch>
                </UserProvider>
            </AuthProvider>
        </>
    );
};
export default App;
