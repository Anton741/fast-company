const CheckboxField = ({ name, value, onHandleChange, children }) => {
    console.log(value);
    const handleChange = ({ target }) => {
        onHandleChange({ name: target.name, value: !value });
    };
    return (
        <div className="form-check mb-4">
            <input
                className="form-check-input"
                type="checkbox"
                value={value}
                id={name}
                checked={value}
                onChange={handleChange}
                name = {name}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
        </div>
    );
};

export default CheckboxField;
