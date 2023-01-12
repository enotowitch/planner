import sort from "./functions/sort"

const arrOfObjs = eval(localStorage.getItem("colors"))
arrOfObjs && sort(arrOfObjs)

export default arrOfObjs