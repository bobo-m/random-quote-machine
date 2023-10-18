import React, {useState, useEffect} from 'react';
import './RandomQuote.css';

function random(min, max){
    const num = Math.floor(Math.random()*(max-min+1) + min);
    return num;
}

function randomColor(){
    const rc = `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
    return rc;
}

export default function RandomQuote(){
    const[data, setQuote] = useState(null);

    useEffect(()=>{
        getQuote();
    },[]);
    
    async function getQuote(){
        try{
            const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",{
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setQuote(getRandomQuote(data));
            const newColor = randomColor();
            document.documentElement.style.setProperty('--color', newColor);
        }catch(error){
            console.error(error);
            console.log('Oops... Something went wrong');
        }
    }
    function getRandomQuote(data){
        return data.quotes[
            Math.floor(Math.random()* data.quotes.length)
        ]
    }
    
    function handleTweet(){
        const tweetText = `${data.quote}  -${data.author}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        return tweetUrl;
    }

    if(!data) return null;

    return(
        <div id="quote-box" className="d-flex flex-column w-100 bg-light p-5 rounded-5">
            <h1 id="text" className="fs-3 text-primary">
                <i className="fa-solid fa-quote-left me-3 fs-1 text-primary"></i>
                {data.quote}
            </h1>
        
            <h1 id="author" className="align-self-end fs-4 text-primary">
            - {data.author}
            </h1>
            <div className="footer mt-4 d-flex justify-content-between align-items-center">
                <div className="share">
                    <a href={handleTweet()} target='_blank' rel='noreferrer' id="tweet-quote" className="bg-primary py-2 px-3 rounded-2">
                        <i className="fa-brands fa-twitter text-light"></i>
                    </a>
                </div>
                <button id="new-quote" className=" btn btn-default bg-primary text-light" onClick={getQuote}>
                    New Quote
                </button>
            </div>
        </div>
    );
}