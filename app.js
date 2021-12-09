const quoteElement = document.querySelector(".quote")
const authorElement = document.querySelector(".author")
const newQuoteButton = document.querySelector(".new-quote")
const copyButton = document.querySelector(".copy-clipboard")
const tweetButton = document.querySelector(".twitter")
const loader = document.querySelector(".loader")
const quoteContainer = document.querySelector("main")

//Get quotes from API if it is not present in local storage
let apiQuotes = JSON.parse(localStorage.getItem("quotes")) || null
if (apiQuotes == null) {
	getQuotes()
} else {
	showQuote()
}
function showLoader() {
	loader.hidden = false
	quoteContainer.hidden = true
}
function hideLoader() {
	loader.hidden = true
	quoteContainer.hidden = false
}

async function getQuotes() {
	showLoader()
	const apiUrl = "https://type.fit/api/quotes"
	const response = await fetch(apiUrl)
	apiQuotes = await response.json()
	localStorage.setItem("quotes", JSON.stringify(apiQuotes))
	showQuote()
}

function showQuote() {
	let randomIndex = Math.floor(Math.random() * apiQuotes.length)
	quoteElement.innerText = apiQuotes[randomIndex].text
	const author = apiQuotes[randomIndex].author || "Anonymous"
	authorElement.innerText = "—" + author
	hideLoader()
	copyButton.innerText = "Copy to Clipboard"
	copyButton.disabled = false
}

function tweet() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteElement.textContent} ${authorElement.textContent}`
	window.open(twitterUrl, "_blank")
}
window.addEventListener("load", showQuote)
newQuoteButton.addEventListener("click", showQuote)
tweetButton.addEventListener("click", tweet)

copyButton.addEventListener("click", async () => {
	let text = quoteElement.innerText + authorElement.innerText
	await navigator.clipboard.writeText(text)
	copyButton.innerText = "Copied"
	copyButton.disabled = true
})
