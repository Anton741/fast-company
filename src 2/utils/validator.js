export default function validator(data, config) {
    const errors = {};
    function validate(validateMethod, fieldDate, config) {
        const reg = /\S+@\S+\.\S+/;
        switch (validateMethod) {
        case "isRequire":
            if (fieldDate.trim() === "") {
                return config.message;
            }
            break;
        case "emailFormat":
            if (!reg.test(fieldDate)) {
                return config.message;
            }
            break;
        case "minLength":
            if (fieldDate.length < 8) {
                return config.message;
            }
            break;
        case "isChoosed":
            if (fieldDate === "Choose...") {
                return config.message;
            }
            break;
        default:
            break;
        }
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
            if (error) {
                errors[fieldName] = error;
                break;
            }
        }
    }
    return errors;
};
