export default (day, year) => {
	let result
	const DAY = day + " " + year
	if (localStorage.getItem(DAY)) {
		result = JSON.parse(localStorage.getItem(DAY))
	}
	return result
}