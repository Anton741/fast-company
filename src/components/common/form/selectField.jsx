const SelectField = ({ data, OnHandleChange, label, name, error, defaultOption, userId }) => {
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
                {defaultOption && <option selected value={defaultOption._id}>{defaultOption.name}</option>}
                {Object.values(data).map((optionName) => {
                    return (
                        <option selected = {optionName._id === userId} value={optionName._id} key={optionName._id}>
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
