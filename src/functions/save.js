export default function (lsItemName, arr, stateSetter) {
	localStorage.setItem(lsItemName, JSON.stringify(arr))
	stateSetter && stateSetter(arr)
}