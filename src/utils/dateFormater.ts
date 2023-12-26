export function formatToDDMMYY(date:Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString().substr(-2);

    return day + '-' + month + '-' + year;
}