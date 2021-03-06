import React from "react";
import Select from "react-select";

const MultipleSelectField = ({ name, label, options, handleChange, defaultV }) => {
    const onHandleChange = (value) => {
        handleChange({ name: name, value });
    };
    const optionsArray = typeof options === "object"
        ? Object.keys(options).map(option => ({
            label: options[option].name,
            value: options[option]._id
        }))
        : options;
    return (
        <div className="mb-4">
            <label htmlFor={"#professions"} className="form-label">
                {label}
            </label>
            <Select
                isMulti
                defaultValue={defaultV}
                name={name}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={onHandleChange}
            />
        </div>
    );
};

export default MultipleSelectField;
