export default function setCookie(name, value) {
	document.cookie = `${name}=&${value}&`
}