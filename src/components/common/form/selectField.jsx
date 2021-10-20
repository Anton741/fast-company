const SelectField = ({ data, OnHandleChange, label, name, error, defaultOption }) => {
    function getClasses() {
        return error ? "form-select is-invalid" : "form-control ";
    }
    const handleChange = ({ target }) => {
        OnHandleChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={"#professions"} className="form-label">
                {label}
            </label>
            <select
                className={getClasses()}
                aria-label="Default select example"
                onChange={handleChange}
                name={name}
            >
                <option selected>{defaultOption}</option>
                {Object.values(data).map((optionName) => {
                    return (
                        <option value={optionName._id} key={optionName._id}>
                            {optionName.name}
                        </option>
                    );
                })}
            </select>
            {error && (
                <div className="invalid-feedback" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};
export default SelectField;
