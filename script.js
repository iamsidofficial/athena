const spinner = document.querySelector('#js-spinner');

const newQuoteButton = document.querySelector('#js-new-quote');

newQuoteButton.addEventListener('click', getQuote);



async function getQuote() {
 try {
 		spinner.classList.remove('hidden');

    newQuoteButton.disabled = true;
 
    const response = await fetch(endpoint)
    // If the response is not 200 OK...
    if (!response.ok) {
      // ...throw an error. This causes control flow
      // to skip to the `catch` block below.
      throw Error(response.statusText)
    }

    const json = await response.json();
    displayQuote(json.content);
    displayAuthor(json.author);
  } catch (err) {
    console.log(err)
    alert('Failed to fetch new quote');
  }
  
		finally {
    // enable the quote button
    newQuoteButton.disabled = false;
    // add the "hidden" class back again
    spinner.classList.add('hidden');
  }
}
function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');

  quoteText.textContent ='"' + quote + '"';
}

function displayAuthor(author) {
  const quoteAuthor = document.querySelector('#js-quote-author');
  quoteAuthor.textContent ='- ' + author;
}
const endpoint = 'https://api.quotable.io/random';

getQuote();


