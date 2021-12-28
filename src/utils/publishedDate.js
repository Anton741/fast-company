export function publishedDate(commentDate) {
    function getNameMounth(number) {
        switch (number) {
        case 0:
            return "Январь";
        case 1:
            return "Февраль";
        case 2:
            return "Март";
        case 3:
            return "Апрель";
        case 4:
            return "Май";
        case 5:
            return "Июнь";
        case 6:
            return "Июль";
        case 7:
            return "Август";
        case 8:
            return "Сентябрь";
        case 9:
            return "Октябрь";
        case 10:
            return "Ноябрь";
        case 11:
            return "Декабрь";
        default:
            break;
        }
    }
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    const date = new Date(commentDate);
    const minutesAgo = (Date.now() - date.getTime()) / 60000;
    if (minutesAgo <= 1) {
        return " 1 минуту назад";
    } else if (minutesAgo <= 5) {
        return " 5 минут назад";
    } else if (minutesAgo <= 10) {
        return " 10 минут назад";
    } else if (minutesAgo <= 30) {
        return " 30 минут назад";
    } else if (minutesAgo <= 1440) {
        return ` ${addZero(date.getHours())}:${addZero(date.getMinutes())} `;
    } else if (minutesAgo > 31536000000) {
        return ` ${date.getDay()} ${date.getMonth()}  ${date.getFullYear()}`;
    } else {
        return ` ${addZero(date.getDate())} ${getNameMounth(date.getMonth())} `;
    }
}
