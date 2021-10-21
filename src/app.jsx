import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersMain from "./components/layouts/users";
import NavBar from "./components/ui/navBar";
import Login from "./components/layouts/login";
// import EditForm from "./components/common/form/editForm";
// import UserCard from "./components/userCard";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={UsersMain} />
                <Route path="/" exact render={() => <h1>Welcome!!!</h1>} />
            </Switch>
        </>
    );
};
export default App;
