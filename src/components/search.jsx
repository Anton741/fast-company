// import { useState } from "react";

const Search = ({ setUser, users, setSearchValue, searchValue }) => {
    const onHandleSearch = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value);
        const re = new RegExp(e.target.value.toLowerCase(), "gi");
        const searchResult = users.filter(user => {
            return user.name.toLowerCase().match(re);
        });
        setUser(searchResult);
    };
    const onHandleSubmit = (e) => {
        e.preventDefault();
        console.log(searchValue);
        // const re = new RegExp(searchValue.toLowerCase(), "gi");
        // const searchResult = users.filter(user => {
        //     return user.name.toLowerCase().match(re);
        // });
        // setUser(searchResult);
    };
    return (
        <form onSubmit = {onHandleSubmit}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" onChange = {onHandleSearch} value={searchValue || ""}/>
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2" >Search</button>
            </div>
        </form>);
};
export default Search;
