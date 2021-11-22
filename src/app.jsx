import React from "react";
import { Route, Switch } from "react-router-dom";
import { UserProvider } from "./components/hooks/useUsers";
import { ProfessionsProvider } from "./components/hooks/useProfessions";
import UsersMain from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
// import EditForm from "./components/common/form/editForm";
// import UserCard from "./components/userCard";

const App = () => {
    return (
        <>
            <UserProvider>
                <NavBar />
                <Switch>
                    <ProfessionsProvider>
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/users/:userId?/:edit?" component={UsersMain} />
                        <Route path="/" exact render={() => <h1>Welcome!!!</h1>} />
                    </ProfessionsProvider>
                </Switch>
            </UserProvider>
        </>
    );
};
export default App;
