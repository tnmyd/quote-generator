const quoteElement = document.querySelector(".quote")
const authorElement = document.querySelector(".author")
const newQuoteButton = document.querySelector(".new-quote")

//Get quotes from API if it is not present in local storage
let apiQuotes = JSON.parse(localStorage.getItem("quotes")) || null
if (apiQuotes == null) {
	getQuotes()
}

async function getQuotes() {
	const apiUrl = "https://type.fit/api/quotes"
	const response = await fetch(apiUrl)
	apiQuotes = await response.json()
	localStorage.setItem("quotes", JSON.stringify(apiQuotes))
}

function showQuote() {
	let randomIndex = Math.floor(Math.random() * apiQuotes.length)
	quoteElement.innerText = apiQuotes[randomIndex].text
	authorElement.innerText = "—" + apiQuotes[randomIndex].author
}
window.addEventListener("load", showQuote)
newQuoteButton.addEventListener("click", showQuote)
