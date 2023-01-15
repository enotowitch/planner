export default (day, prop) => {
	let result
	if (localStorage.getItem(day)) {
		prop && (result = JSON.parse(localStorage.getItem(day))[prop])
		!prop && (result = JSON.parse(localStorage.getItem(day)))
	}
	return result
}