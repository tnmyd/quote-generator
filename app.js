const quoteElement = document.querySelector(".quote")
const authorElement = document.querySelector(".author")
const newQuoteButton = document.querySelector(".new-quote")
const copyButton = document.querySelector(".copy-clipboard")

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
	copyButton.innerText = "Copy to Clipboard"
	copyButton.disabled = false
}
window.addEventListener("load", showQuote)
newQuoteButton.addEventListener("click", showQuote)

copyButton.addEventListener("click", async () => {
	let text = quoteElement.innerText + authorElement.innerText
	await navigator.clipboard.writeText(text)
	copyButton.innerText = "Copied"
	copyButton.disabled = true
})
