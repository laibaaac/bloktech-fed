document.addEventListener('DOMContentLoaded', () => {
    const quoteBtn = document.getElementById('quoteBtn');
    const quoteText = document.getElementById('quoteText');
    const copyBtn = document.getElementById('copyBtn');
    const message = document.getElementById('message');
  
    // Function to fetch the API and display a random quote
    const getRandomQuote = () => {
      fetch('https://api.kanye.rest')
        .then(response => response.json())
        .then(data => {
          quoteText.innerText = data.quote;
        })
        .catch(error => {
          console.log('Error:', error);
        });
    };
  
    // Function to copy the quote text to the clipboard and show the message
    const copyQuoteToClipboard = () => {
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
    };
  
    // Function to show the message and hide it after 2 seconds
    const showMessage = messageText => {
      message.innerText = messageText;
      message.style.display = 'block';
      setTimeout(() => {
        message.style.display = 'none';
      }, 2000);
    };
  
    // Event listener for the button click to get a random quote
    quoteBtn.addEventListener('click', getRandomQuote);
  
    // Event listener for the "C" key press to copy the quote
    document.addEventListener('keydown', event => {
      if (event.key === 'c' || event.key === 'C') {
        copyQuoteToClipboard();
      }
    });
  
    // Event listener for the copy button click to copy the quote
    copyBtn.addEventListener('click', copyQuoteToClipboard);



    });
    
    const loadingState = document.getElementById('loading');
    loadingState.style.display = 'none';

    // Event listener for hash change
    window.addEventListener('hashchange', () => {
        loadingState.style.display = 'block'; // Show the loading state
        setTimeout(() => {
            loadingState.style.display = 'none'; // Hide the loading state after 2 seconds
        }, 2000);
    });

    // Event listener for DOMContentLoaded to hide the loading state
    document.addEventListener('DOMContentLoaded', () => {
        loadingState.style.display = 'none'; // Hide the loading state
    });
