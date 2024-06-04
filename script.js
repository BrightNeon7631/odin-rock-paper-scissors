const roundNo = document.querySelector('.results-round-title');
const roundPlayer = document.getElementById('player-select');
const roundComputer = document.getElementById('computer-select');
const roundResult = document.getElementById('round-result');
const playerScoreDiv = document.querySelector('.player-score');
const computerScoreDiv = document.querySelector('.computer-score');
const roundTotalResult = document.getElementById('total-result');

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const playAgain = document.getElementById('reset');

// Variables to keep track of scores and rounds
let rounds = 0;
let playerScore = 0;
let computerScore = 0;

rock.addEventListener('click', game);
paper.addEventListener('click', game);
scissors.addEventListener('click', game);

// The main game function
function game (e) {
    const computerSelection = computerPlay();
    // rock, paper, scissors value comes from the element's id in html
    const playerSelection = e.target.id;
    const item = document.querySelector(`#${playerSelection}`);
    const round = playRound(playerSelection, computerSelection);

    if (playerScore < 5 && computerScore < 5) {
        roundNo.textContent = `ROUND: ${rounds + 1}`;
        // class name is something like .paper-round
        roundPlayer.className = playerSelection + '-round';
        roundComputer.className = computerSelection + '-round';
        roundResult.textContent = round;
    
        if (round.includes('Win!')) {
            item.classList.add('clicked-win');
            playerScoreDiv.textContent = ++playerScore;
            roundResult.className = 'round-result-win';
            rounds++;
        } else if (round.includes('Lose!')) {
            item.classList.add('clicked-lose');
            roundResult.className = 'round-result-lose';
            computerScoreDiv.textContent = ++computerScore;
            rounds++;
        } else {
            item.classList.add('clicked-tie');
            roundResult.className = 'round-result-tie';
            rounds++;
        }
    }
    totalScore();
}

// Runs when one of the players has scored 5 points (won the game)
function totalScore () {
    if (playerScore === 5 && playerScore > computerScore) {
        roundTotalResult.style.display = 'block';
        roundTotalResult.className = 'round-result-win';
        roundTotalResult.textContent = `You Won! Congrats!`;
    } else if (computerScore === 5 && playerScore < computerScore) {
        roundTotalResult.style.display = 'block';
        roundTotalResult.className = 'round-result-lose';
        roundTotalResult.textContent = `You Lost! Better luck next time!`;
    }
}

// Assigns a random value from 0 to 2 and chooses one of the elements based on that
function computerPlay() {
    let randomSelection = Math.floor(Math.random() * 3);
    if (randomSelection === 0) {
        return 'rock';
    } else if (randomSelection === 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === 'rock' && computerSelection === 'paper') {
        return 'You Lose! Paper beats Rock.';
    } else if (playerSelection === 'rock' && computerSelection === 'scissors') {
        return 'You Win! Rock beats Scissors.';
    } else if (playerSelection === computerSelection) {
        return `It's a Tie. You both chose ${playerSelection}.`;
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        return 'You Win! Paper beats Rock.';
    } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
        return 'You Lose! Scissors beat Paper.';
    } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        return 'You Win! Scissors beat Paper.';
    } else if (playerSelection === 'scissors' && computerSelection === 'rock') {
        return 'You Lose! Rock beats Scissors.';
    }
}

const box = document.querySelectorAll('.box');
box.forEach(box => box.addEventListener('transitionend', removeClicked));

// Removes the CSS 'clicked' class
function removeClicked(e) {
    if (e.propertyName !== 'transform') {
        return;
    }
    this.classList.remove('clicked-win');
    this.classList.remove('clicked-lose');
    this.classList.remove('clicked-tie');
}

function removeAllClasses(elem) {
     elem.className = '';
}

// Resets everything after clicking the 'play again' button
playAgain.addEventListener('click', function() {
    rounds = 0;
    playerScore = 0;
    computerScore = 0;

    roundNo.textContent = 'ROUND';
    roundResult.textContent = '';
    removeAllClasses(roundResult);
    roundTotalResult.textContent = '';
    roundTotalResult.style.display = 'none';

    playerScoreDiv.textContent = '0';
    computerScoreDiv.textContent = '0';
    removeAllClasses(roundPlayer);
    removeAllClasses(roundComputer);
})