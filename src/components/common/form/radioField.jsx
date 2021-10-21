const RadioField = ({ options, label, name, onHandleChange, value }) => {
    const handleChange = ({ target }) => {
        onHandleChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={`#${name}`} className="form-label">
                {label}
            </label>
            {options.map((option) => {
                return (
                    <div className="form-check" key={option.name}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + "-" + option.value}
                            value={option.value}
                            onChange={handleChange}
                            checked={option.value === value}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`#${option.name + "-" + option.value}`}
                        >
                            {option.value}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};

export default RadioField;
