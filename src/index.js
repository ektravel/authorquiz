import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Amor Towles',
        imageUrl: 'images/authors/amortowles.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['A Gentelman in Moscow', 'Rules of Civility', 'Eve in Hollywood']
    },
    {
        name: 'Anthony Doerr',
        imageUrl: 'images/authors/anthonydoerr.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['About Grace', 'All The Light We Cannot See', 'Memory Wall']
    },
    {
        name: 'Cheryl Strayed',
        imageUrl: 'images/authors/cherylstrayed.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Brave Enough', 'Wild: From Lost to Found on the Pacific Crest Trail', 'Torch']
    },
    {
        name: 'Jack London',
        imageUrl: 'images/authors/jacklondon.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Valley of the Moon', 'White Fang', 'Jerry of the Islands']
    },
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Tom Sawyer', 'The Prince and the Pauper', 'Life on the Mississippi']
    },
    {
        name: 'Milan Kundera',
        imageUrl: 'images/authors/milankundera.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Immortality', 'The Book of Laughter and Forgetting', 'The Unbearable Lightness of Being']
    }
];

function getTurnData(authors){
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    },[]);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) => 
            title === answer))
    }
}


const state = {
    turnData: getTurnData(authors),
    highlight: ''
};

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct': 'wrong';
    render();
}

function render(){
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, document.getElementById('root'));
    serviceWorker.unregister();   
}
render();


