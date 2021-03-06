const TextField = ({ fieldType, value, fieldName, fieldLable, onHandleChange, error }) => {
    function getClasses() {
        return error ? "form-control is-invalid" : "form-control ";
    }
    const handleChange = ({ target }) => {
        onHandleChange({ name: target.name, value: target.value });
    };
    console.log(error);
    return (
        <div className="mb-4">
            <label htmlFor={`#${fieldName}`} className ="form-label">{fieldLable}</label>
            {fieldType === "textarea" && <textarea
                name={fieldName}
                value={value}
                aria-describedby="addon-wrapping"
                id={fieldName}
                placeholder={value}
                onChange={handleChange}
                className={getClasses()}
            ></textarea> }
            {fieldType !== "textarea" && <input
                type={fieldType}
                name={fieldName}
                value={value}
                aria-describedby="addon-wrapping"
                id={fieldName}
                placeholder={value}
                onChange={handleChange}
                className={getClasses()}
            ></input>}
            {error && (
                <div className="invalid-feedback" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextField;
