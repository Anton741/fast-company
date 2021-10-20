const Search = ({ onHandleSearch, onHandleSubmit, Value }) => {
    return (
        <form onSubmit = {onHandleSubmit}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" onChange = {(e) => onHandleSearch(e)} value={Value || ""}/>
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2" >Search</button>
            </div>
        </form>);
};
export default Search;
