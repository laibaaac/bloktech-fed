// hier haal ik elementen op uit de html

const quoteBtn = document.getElementById('quoteBtn');
const quoteText = document.getElementById('quoteText');
const copyBtn = document.getElementById('copyBtn');
const message = document.getElementById('message');
const offlineMessage = document.getElementById('offlineMessage');

// Event listener voor het klikken op de "Get Quote" knop
quoteBtn.addEventListener('click', getRandomQuote);

// Event listener voor de keys (om te controleren op 'c' of 'C')
document.addEventListener('keydown', handleKeyDown);

// Event listener voor het klikken op de "Copy Quote" knop
copyBtn.addEventListener('click', copyQuoteToClipboard);

// Event listener voor het online gaan van de gebruiker
window.addEventListener('online', handleOnline);

// Event listener voor het offline gaan van de gebruiker
window.addEventListener('offline', handleOffline);


// Functie om een random quote op te halen vanuit de Kanye West API
function getRandomQuote() {
  fetch('https://api.kanye.rest')
    .then(response => response.json())
    .then(data => {
      quoteText.innerText = data.quote;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Functie om de quote naar het klembord te kopiëren
function copyQuoteToClipboard() {
  const quote = quoteText.innerText;
  if (quote.trim() === '') {
    showMessage('Get a quote first!');
    return;
  }

  navigator.clipboard.writeText(quote)
    .then(() => {
      console.log('Quote copied to clipboard:', quote);
      showMessage('Quote copied!');
    })
    .catch(error => {
      console.log('Error copying quote to clipboard:', error);
    });
}

// hier wordt de event gebruikt, als ik op c of C druk dan wordt de functie copyQuoteToClipboard uitgevoerd
function handleKeyDown(event) {
  if (event.key === 'c' || event.key === 'C') {
    copyQuoteToClipboard();
  }
}


// Functie om een bericht weer te geven aan de gebruiker
function showMessage(messageText) {
  message.innerText = messageText;

  message.classList.add('show');

  setTimeout(() => {
    message.classList.remove('show');
  }, 2000);
}

// Functie om te reageren op het online gaan van de gebruiker
function handleOnline() {
  offlineMessage.classList.remove('show');
}

// Functie om te reageren op het offline gaan van de gebruiker
function handleOffline() {
  offlineMessage.classList.add('show');
}



// Functie om te controleren of de gebruiker online of offline is bij het laden van de pagina
function checkOnlineState() {
  if (!navigator.onLine) {
    handleOffline();
  }
}
// Controleren van de online/offline status bij het laden van de pagina
checkOnlineState();
