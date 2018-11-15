/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

let cardsToMatch = [], counter = 0;

document.querySelector('.restart').addEventListener('click', function () {
    if (event.target === document.querySelector('.js-fa-repeat')) {
        console.log('click');
        shuffle(cards);
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
    console.log(fragment);
    const deck = document.querySelector('.deck');
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    deck.appendChild(fragment);
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

    if (event.target.nodeName === 'LI') {
        const card = event.target;
        if (card.classList.length === 1) {
            card.classList.add('open');
            card.classList.add('show');
            counter++;
            
            cardsToMatch.push({
                className: card.children[0].classList[1],
                cardEl: card
            });
        }
        console.log('classList', counter);
        if (counter === 2) {
            if (cardsToMatch[0].className === cardsToMatch[1].className) {
                // remove the css classes 'open' and 'show'
                cardsToMatch.forEach(function (cardObj) {
                    cardObj.cardEl.classList.remove('open');
                    cardObj.cardEl.classList.remove('show');
                    cardObj.cardEl.classList.add('match');
                    console.log('classList', cardObj.cardEl.classList);
                });
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
    }
});

shuffle(cards);