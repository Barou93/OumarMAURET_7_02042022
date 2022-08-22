export const dateParse = (num) => {
    let params = {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };
    let subscribeDate = Date.parse(num);
    let date = new Date(subscribeDate).toLocaleDateString('utc', params);
    return date.toString();
}

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};