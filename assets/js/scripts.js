const cards = document.querySelectorAll('.card');
const shuffle = document.querySelector('#shuffleBoard');
const loader = document.querySelector('.loader');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let pair = 0;

function flipCard(){
    if( lockBoard ) return;
    if( this === firstCard ) return;

    this.classList.add( 'flip' );
    if( !hasFlippedCard ){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();

    if( pair === 6){
        setTimeout( () => {
            pair = 0;
            shuffleBoardAll()
        }, 1000);
    }
}
function checkForMath(){
    if( firstCard.dataset.card === secondCard.dataset.card ){
        disableCards();
        pair++;
        return;
    }

    unflipCards();
}
function disableCards(){
    firstCard.removeEventListener( 'click', flipCard );
    secondCard.removeEventListener( 'click', flipCard );

    resetBoard();
}
function unflipCards(){
    lockBoard = true;

    setTimeout( () => {
        firstCard.classList.remove( 'flip' );
        secondCard.classList.remove( 'flip' );

        resetBoard();
    }, 1500);
}
function resetBoard(){
    [ hasFlippedCard, lockBoard ] = [ false, false ];
    [ firstCard, secondCard ] = [ null, null ];
}
function shuffleBoard(){
    cards.forEach( ( card ) => {
        let randomCards = Math.floor( Math.random() * 12 );
        card.style.order = randomCards;
    })
}
function shuffleBoardAll(){
    lockBoard = true;
    loader.style.visibility= 'inherit';
    
    cards.forEach( ( card ) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    })
    
    setTimeout( () => {
        resetBoard();
        shuffleBoard();
        loader.style.visibility= 'hidden';
    }, 1500);
}
cards.forEach( ( card ) => {
    card.addEventListener('click', flipCard);
})
