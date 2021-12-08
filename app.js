const quoteElement = document.querySelector(".quote")
const authorElement = document.querySelector(".author")
const newQuoteButton = document.querySelector(".new-quote")
let apiQuotes = null
if (apiQuotes == null) {
	getQuotes()
}
async function getQuotes() {
	const apiUrl = "https://type.fit/api/quotes"
	const response = await fetch(apiUrl)
	apiQuotes = await response.json()
}
newQuoteButton.addEventListener("click", () => {
	console.log(apiQuotes)
	quoteElement.innerText = apiQuotes[0].text
	authorElement.innerText = "—" + apiQuotes[0].author
})
