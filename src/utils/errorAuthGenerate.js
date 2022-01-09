function errorAuthGenerate(error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
        switch (message) {
        case "INVALID_PASSWORD":
            return "Неправидьный логин или пароль";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email существует";
        default:
            return null;
        }
    }
}

export default errorAuthGenerate;
