export const dateFromNow = (fromDate) => {
    const DAYS_OF_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const MONTHS_OF_YEAR = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

    let CreatedDate = new Date(fromDate)
    let today = new Date()
    //let minutes = fromDate.getMinutes();
    let hours = CreatedDate.getHours();
    let minutes = CreatedDate.getMinutes();
    let years = CreatedDate.getFullYear();
    let day = CreatedDate.getDay();
    let month = CreatedDate.getMonth();

    let requiredDiffrentDays

    //console.log(minutes)

    const oneDay = 24 * 60 * 60 * 1000; // 24 heures

    const diffDays = Math.round(Math.abs((CreatedDate - today) / oneDay));

    if (hours === 0) {
        //const minutes = Math.round(((Math.abs(fromDate) % 86400000) % 3600000) / 60000);

        return requiredDiffrentDays = minutes <= 1 ? "A l'instant." : `${minutes} minutes. `
    } else {
        requiredDiffrentDays = `${Math.floor(hours)} heures`;
    }

    if (diffDays >= 360) {
        requiredDiffrentDays = `${DAYS_OF_WEEK[CreatedDate]}/${MONTHS_OF_YEAR[CreatedDate]}/${years} ${""}  ${hours} : ${minutes} `;
        //requiredDiffrentDays = Math.floor(diffDays / 360) == 1 ? `${Math.floor(diffDays / 365)} year ago` : `${Math.floor(diffDays / 365)} years ago`
    } else if (diffDays >= 30) {
        //requiredDiffrentDays = Math.floor(diffDays / 30) == 1 ? `${Math.floor(diffDays / 30)} month ago` : `${Math.floor(diffDays / 30)} months ago`
        requiredDiffrentDays = `${day}${" "}${MONTHS_OF_YEAR[month]},${years} ${""}${hours}:${minutes}`
    } else if (diffDays < 30) {
        //requiredDiffrentDays = (diffDays == 1 || diffDays == 0) ? `${diffDays} jours` : `${diffDays} jours`
        requiredDiffrentDays = `${day}${" "}${MONTHS_OF_YEAR[month]}, ${" "}${hours}:${minutes}`
    }

    return requiredDiffrentDays;
}



export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};

