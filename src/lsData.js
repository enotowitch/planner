import sort from "./functions/sort"

export default function lsData(dataName) {
	const arrOfObjs = eval(localStorage.getItem(dataName))
	arrOfObjs && sort(arrOfObjs)

	return arrOfObjs
}