export default function getCookie(name) {
	const regExp = new RegExp(`(?:${name}=&)(.*?)(?:&)`) // all between &...&
	return eval(document.cookie.match(regExp)[1])
}