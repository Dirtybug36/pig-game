'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
//we dont need to put # if we use get element by id and it is use for id selectors

//starting conditions
let scores, currentScore, activePlayer, playing; //we need this so that allthe variables can be defined

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const init = function () //to reset the game as a new game
{
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); //we need to call this so that when we reload the page it will display all scores as 0

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //this will allow us to switch the player(this is very important to understand)
  player0El.classList.toggle('player--active'); //this is to change the background
  player1El.classList.toggle('player--active');
  //toggle is a method which adds the element if it is not there and it removes from there if the element is already there
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //display dice
    diceEl.classList.remove('hidden');
    //display which dice to show according to the random number
    //very very important
    diceEl.src = `dice-${dice}.png`;
    // here src has different pic of dice with there name as dice 1,dice 2.... and when the {dice} is used the math.trunc function generates
    //random number upto 6 as given above and random photo is selected

    //check for rolled 1:if true,switch to next player
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice; // the random dice is connected to current score as well as the photo is changed accordingly
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //show the players score
      // current0El.textContent = currentScore; //change later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player"s score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if the player score => 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
      //switch player
    }
  }
});
btnNew.addEventListener('click', init);
