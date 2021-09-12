var suits = ["S", "D", "C", "H"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var deck;
var dealerAces;
var playerAces;
var dealerAcesReduced;
var playerAcesReduced;
var playerCardsNumber;
var dealerCardsNumber;


//HTML elements
var chipsHTML = document.getElementById("chips");
var dealerCardsHTML = document.getElementById("dealerCards");
var dealerScoreHTML = document.getElementById("dealerScore");
var playerCardsHTML = document.getElementById("playerCards");
var playerScoreHTML = document.getElementById("playerScore");
var hitButtonHTML = document.getElementById("hit-btn");
var standButtonHTML = document.getElementById("stand-btn");

function startGame(){
    if(parseInt(chipsHTML.textContent) - 10 < 0){
        alert("You dont have any chips remaining.");
        return 0;
    } else {
        chipsHTML.textContent = parseInt(chipsHTML.textContent) - 10;
    }
    setupVariables();

    card = deck.shift();
    if(isAce(card.value)){
        dealerAces += 1;
    }
    dealerCardsHTML.textContent += " "+ card.suit+card.value;
    dealerScoreHTML.textContent = card.score + parseInt(dealerScoreHTML.textContent);
}
function createDeck(){
    var deck = [];
	for(var i = 0; i < suits.length; i++){
		for(var j = 0; j < values.length; j++){
            var value = values[j];
            var score;
            if(isAce(value)){
                score = 11;
            }
            else if (value == "J" || value == "Q" || value == "K"){
                score = 10;
            } else {
                score = parseInt(value);
            }
			var card = {value: values[j], suit: suits[i], score: score};
			deck.push(card);
		}
	}
    return deck;
}

function shuffleDeck(){
    for (let i = deck.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function drawCard(){
    card = deck.shift();
    playerCardsNumber += 1;
    if(isAce(card.value)){
        playerAces += 1;
    }
    playerCardsHTML.textContent += " "+ card.suit+card.value;
    playerScoreHTML.textContent = card.score + parseInt(playerScoreHTML.textContent);
    if(parseInt(playerScoreHTML.textContent) > 21 && playerAces > playerAcesReduced){
        playerScoreHTML.textContent = parseInt(playerScoreHTML.textContent) - 10;
        playerAcesReduced += 1;
    }
    if(parseInt(playerScoreHTML.textContent) > 21){
        outcome(21,25);
    }
}

function stand(){
    while(parseInt(dealerScoreHTML.textContent) < 17){
        card = deck.shift();
        if(card.value == "A"){
            dealerAces += 1;
        }
        dealerCardsNumber += 1;
        dealerCardsHTML.textContent += " "+ card.suit+card.value;
        dealerScoreHTML.textContent = card.score + parseInt(dealerScoreHTML.textContent);

        if(parseInt(dealerScoreHTML.textContent) > 21 && dealerAces > dealerAcesReduced){
            dealerScoreHTML.textContent = parseInt(dealerScoreHTML.textContent) - 10;
            dealerAcesReduced += 1;
        }
    }
    outcome(parseInt(dealerScoreHTML.textContent), parseInt(playerScoreHTML.textContent));
}

function outcome(bankScore, playerScore){
    if((playerScore == 21 && playerCardsNumber == 2) && (dealerCardsNumber != 2 || bankScore != 21)){
        chipsHTML.textContent = parseInt(chipsHTML.textContent) + 20
        alert("You have BlackJack!, Congratulations");
    }
    else if((bankScore == 21 && dealerCardsNumber == 2) && (dealerCardsNumber != 2 || playerScore != 21)){
        alert("The Dealer has BlackJack, You lost.");
    }
    else if(bankScore == 21 && dealerCardsNumber == 2 && dealerCardsNumber == 2 && playerScore == 21){
        chipsHTML.textContent = parseInt(chipsHTML.textContent) + 10;
        alert("Both the Dealer and the Player has BlackJack, your chips were refunded.");
    }
    else if(playerScore > 21){
        alert("Bust, the Dealer won.");
    }
    else if(bankScore > 21){
        chipsHTML.textContent = parseInt(chipsHTML.textContent) + 20;
        alert("The Dealer busts, you won!");
    }
    else if(bankScore > playerScore){
        alert("You lost");
    }
    else if(playerScore > bankScore){
        chipsHTML.textContent = parseInt(chipsHTML.textContent) + 20;
        alert("You won!");
    }
    else if(playerScore == bankScore){
        chipsHTML.textContent = parseInt(chipsHTML.textContent) + 10;
        alert("Tie, your chips were refunded");
    }
    tearDown();
    return 0;
}

function setupVariables(){
    hitButtonHTML.disabled = false;
    standButtonHTML.disabled = false;
    dealerCardsHTML.textContent = "";
    dealerScoreHTML.textContent = 0;
    playerCardsHTML.textContent = "";
    playerScoreHTML.textContent = 0;

    dealerAces = 0;
    playerAces = 0;
    dealerAcesReduced = 0;
    playerAcesReduced = 0;
    playerCardsNumber = 0;
    dealerCardsNumber = 1;

    deck = createDeck()
    shuffleDeck(deck)
}


function isAce(card){
    return card == "A";
}

function tearDown(){
    hitButtonHTML.disabled = true;
    standButtonHTML.disabled = true;
}