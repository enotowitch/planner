export default (date, type) => {
	// returns today if no date param, else returns date
	let resultDate

	// ! NO date
	if (!date) {
		if (type === "day" || !type) {
			// e.g "Jan 22"
			resultDate = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }).match(/(.*?)(?:,)/)[1]
		}
		if (type === "year") {
			// e.g "Jan 22, 2023"
			resultDate = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
		}
	}
	// ! with date
	if (date) {
		if (type === "day" || !type) {
			// e.g "Jan 22"
			resultDate = new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }).match(/(.*?)(?:,)/)[1]
		}
		if (type === "year") {
			// e.g "Jan 22, 2023"
			resultDate = new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
		}
		if (type === "dayNum") {
			// e.g 22
			resultDate = new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }).match(/(\d{1,2})(?:,)/)[1]
		}
		if (type === "yearNum") {
			// e.g 2023
			resultDate = new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }).match(/\d{4}/)[0]
		}
		if (type === "monthName") {
			// e.g "Jan"
			resultDate = new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }).match(/\S+/)[0]
		}
	}

	return resultDate
}