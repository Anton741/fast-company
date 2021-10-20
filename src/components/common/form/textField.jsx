const TextField = ({ fieldType, value, fieldName, fieldLable, onHandleChange, error }) => {
    function getClasses() {
        return error ? "form-control is-invalid" : "form-control ";
    }
    const handleChange = ({ target }) => {
        onHandleChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={`#${fieldName}`} className ="form-label">{fieldLable}</label>
            <input
                type={fieldType}
                name={fieldName}
                value={value}
                aria-describedby="addon-wrapping"
                id={fieldName}
                placeholder={value}
                onChange={handleChange}
                className={getClasses()}
            ></input>
            {error && (
                <div className="invalid-feedback" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextField;
