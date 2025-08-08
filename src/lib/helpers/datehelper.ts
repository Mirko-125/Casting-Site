export const formatDateString = (dateStr: string): string => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr;
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format. Please use YYYY-MM-DD');
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}