export function formatDate(date, dateStyle = 'medium', locales = 'es') {
	const dateToFormat = new Date(date);
	const options = { dateStyle, timeStyle: 'short'};
	const formatter = new Intl.DateTimeFormat(locales, options);
	const parts = formatter.formatToParts(dateToFormat);
	return parts.map(p => p.value).join('');
}
