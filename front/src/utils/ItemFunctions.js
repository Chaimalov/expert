export function calcDays(date) {
    const days = parseInt(date % 30);
    const months = parseInt((date / 30) % 12);
    const years = parseInt(date / 30 / 12);
    return { days, months, years };
}

export function displayDays(days) {
    const date = calcDays(days);
    if (date.years) return date.years + (date.years > 1 ? " years" : " year");
    if (date.months) {
        if (date.days > 15) date.months++
        return date.months + (date.months > 1 ? " months" : " month");
    }
    return date.days + (date.days > 1 ? " days" : " day");
}