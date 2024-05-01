export function formatDateAbbreviation(date: Date | null): string {

    const month = date?.toLocaleString('en-US', { month: 'short' });
    const day = date?.getDate();
    const year = date?.getFullYear();

    return `${month} ${day}, ${year}`;
}