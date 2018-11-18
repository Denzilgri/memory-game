/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

let cardsToMatch = [], timerTrigger = true, counter = timerCounter = moves = 0;
let startTime = intervalID = null;
let starRating = 3;


document.querySelector('.restart').addEventListener('click', function () {
    if (event.target === document.querySelector('.js-fa-repeat')) {
        timerCounter = 0;
        timerTrigger = true;
        stopClock();
        shuffle(cards);
        resetTimer();
        resetMoves();
    }
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    createCards(array);
}

// creating HTML for each card and adding them to the dom
function createCards(array) {
    const fragment = document.createDocumentFragment();
    array.forEach(function (card) {
        const listElement = document.createElement('li');
        const el = document.createElement('i');
        el.className = 'fa';
        el.classList.add(card);
        listElement.appendChild(el);
        listElement.className = 'card';
        fragment.appendChild(listElement);
    });

    const deck = document.querySelector('.deck');
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    deck.appendChild(fragment);
}

// function to print the time on th epage
const timer = function() {
    const timeEl = document.querySelector('.timer');
    const difference = new Date().getTime() - startTime;

    const sec = Math.floor((difference % (1000 * 60)) / 1000);
    const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const hr = Math.floor((difference % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));

    timeEl.textContent = (hr < 10 ? '0' + hr : hr) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
};

// function to start the clock
function startClock() {
    intervalID = setInterval(timer, 1000);
}

// function to stop the clock
function stopClock() {
    clearInterval(intervalID);
}

// function to reset timer to zero after hitting reset
function resetTimer() {
    document.querySelector('.timer').textContent = '00:00:00';
}

// count moves
function incrementMoves() {
    moves++;
    document.querySelector('.moves').textContent = moves === 1 ? moves + ' Move' : moves + ' Moves';
}

// count moves
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').textContent = '0 Moves';
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// event listener for cards
document.querySelector('.deck').addEventListener('click', function (event) {

    // check for handling events on cards
    if (event.target.nodeName === 'LI') {
        const card = event.target;
        incrementMoves();
        if (card.classList.length === 1) {
            if (timerCounter === 0 && timerTrigger) {
                timerCounter++;
                startTime = new Date().getTime();
                startClock();
            }
            card.classList.add('open');
            card.classList.add('show');
            counter++;
            
            cardsToMatch.push({
                className: card.children[0].classList[1],
                cardEl: card
            });
        }

        if (counter === 2) {
            // dom manipulation for card match
            if (cardsToMatch[0].className === cardsToMatch[1].className) {
                // remove the css classes 'open' and 'show'
                cardsToMatch.forEach(function (cardObj) {
                    cardObj.cardEl.classList.remove('open');
                    cardObj.cardEl.classList.remove('show');
                    cardObj.cardEl.classList.add('match');
                });
                timerCounter += 2;

                // dom manipulation for card mismatch
            } else {
                cardsToMatch.forEach(function (cardObj) {
                    cardObj.cardEl.classList.add('incorrect');
                    setTimeout(function() {
                        cardObj.cardEl.classList.remove('open');
                        cardObj.cardEl.classList.remove('show');
                        cardObj.cardEl.classList.remove('incorrect');
                    }, 500);
                });
            }
            counter = 0;
            cardsToMatch.length = 0;
        }

        // stop the timer
        if (timerCounter > 16 && timerTrigger) {
            timerTrigger = false;
            stopClock();
            console.log('called', timerCounter);
        }
    }
});

shuffle(cards);