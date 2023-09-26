import './RandomQuote.css';

function random(min, max){
    const num = Math.floor(Math.random()*(max-min+1) + min);
    return num;
}

function randomColor(){
    const rc = `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
    return rc;
}

async function handleClick(){
    const quotes = await getQuote();
    const quote = quotes[random(0,quotes.length-1)];
    const text = document.getElementById("text");
    const textIcon = text.querySelector("i").outerHTML;
    text.innerHTML = textIcon + `${quote.text}`;
    const author = quote.author.split(',')[0];
    document.getElementById("author").textContent = `- ${author}`;
    const root = document.querySelector(':root');
    root.style.setProperty('--color', randomColor());
}

async function getQuote(){
    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();
    return data;
}

function handleTweet(){
    const quoteText = document.getElementById("text").textContent;
    const quoteAuthor = document.getElementById("author").textContent;
    const tweetText = `${quoteText}  -${quoteAuthor}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
}

export default function RandomQuote(){
    return(
        <div id="quote-box" className="d-flex flex-column w-100 bg-light p-5 rounded-5">
            <h1 id="text" className="fs-3 text-primary">
                <i className="fa-solid fa-quote-left me-3 fs-1 text-primary"></i>
                Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.
            </h1>
        
            <h1 id="author" className="align-self-end fs-4 text-primary">
            - Johann Wolfgang von Goethe
            </h1>
            <div className="footer mt-4 d-flex justify-content-between align-items-center">
                <div className="share">
                    <a onClick={handleTweet}  target="_blank" id="tweet" className="bg-primary py-2 px-3 rounded-2">
                        <i className="fa-brands fa-twitter text-light"></i>
                    </a>
                </div>
                <button id="new-quote" className=" btn btn-default bg-primary text-light" onClick={handleClick}>
                    New Quote
                </button>
            </div>
        </div>
    );
}