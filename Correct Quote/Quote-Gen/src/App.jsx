import React, { useState, useEffect } from 'react';
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { quotes } from './assets/quote';
import './App.css';

export default function App() {
  const [quote, setQuote] = useState({});
  const [author, setAuthor] = useState('');
  const [colorIndex, setColorIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const colors = [
    '#FF5733', '#C70039', '#900C3F', '#581845', // Reds
    '#FFC300', '#FF5733', '#F7DC6F', '#FFC300', // Yellows
    '#32a852', '#3498db', '#8e44ad', '#f39c12', // Greens and Blues
    '#2c3e50', '#8c7ae6', '#273c75', '#6ab04c'  // Blues and Purples
  ];

  useEffect(() => {
    displayQuote();
  }, []); // Empty dependency array ensures this effect runs only once on initial render

  function getNextColorIndex() {
    return (colorIndex + 1) % colors.length;
  }

  function displayQuote() {
    setIsLoaded(false); // Set loaded to false when displaying new quote
    const randomNumber = Math.floor(Math.random() * quotes.length);
    setTimeout(() => { // Add a delay to make the transition effect visible
      setQuote(quotes[randomNumber]);
      setAuthor(quotes[randomNumber].author);
      setColorIndex(getNextColorIndex());
      setIsLoaded(true); // Set loaded to true after the delay
    }, 500); // Adjust delay time as needed
  }

  return (
    <div className="Wrapper1" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors[colorIndex] }}>
      <div className={`App ${isLoaded ? 'transition-effect' : ''}`} id="quote-box">
        <h1 style={{ color: colors[colorIndex] }}>Random Quote Generator</h1>
        <h2 id="text" style={{ color: colors[colorIndex], opacity: isLoaded ? 1 : 0 }}>
          <FaQuoteLeft size="30" style={{ marginRight: "10px" }} />
          {quote.quote}
          <FaQuoteRight size="30" style={{ marginLeft: "10px" }} />
        </h2>
        <h3 id='author' style={{ color: colors[colorIndex], opacity: isLoaded ? 1 : 0 }}>- {author}</h3>

        <footer>
          <a
            href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size="30" />
          </a>
          <button onClick={displayQuote}>New Quote</button>
        </footer>
      </div>
    </div>
  );
}
