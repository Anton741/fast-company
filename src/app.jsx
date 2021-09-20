import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./components/users";
import NavBar from "./components/navBar";
// import UserCard from "./components/userCard";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login" render={() => <h1>Please, log in !!!</h1>} />
                <Route path="/users/:userId?" component = {Users} />
                <Route path="/" exact render={() => <h1>Welcome!!!</h1>} />
            </Switch>
        </>
    );
};
export default App;
