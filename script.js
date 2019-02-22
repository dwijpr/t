function getClickedElement(e) {
    if (e.path) { // chrome
        return e.path[0];
    }
    if (e.explicitOriginalTarget) { // firefox
        return e.explicitOriginalTarget;
    }
    if (e.target) { // edge, internet explorer
        return e.target;
    }
    console.error("can't find element!");
}

var Game = function (board) {
    var self = this;

    var STATE_INIT	= 0;
    var STATE_PLAYING	= STATE_INIT + 1;

    var state = STATE_INIT;

    var x = "X", o = "O";
    var current = x;

    info.innerHTML = "Hi! Welcome to the game."
	+ "Click a square among 9 to start the game...";

    this.add = function (td) {
	if (td && !td.clicked) {
	    td.clicked = true;
	    td.innerText = current;
	    current = current==x?o:x;
	    info.innerHTML = "player "+current+" turn";
	}
    };
    return this;
};

var game = new Game(board);
console.log(game);

board.onclick = function(e) {game.add(getClickedElement(e))};


/*
var turn = Math.round(Math.random());

var Board = new function() {
    var blocks = board.getElementsByTagName('td');
    this.add = function (i) {
        blocks[i].click();
    };
};

var AI = new function() {
    this.start = function() {
        Board.add(4);
    };
};

if (turn) {
    AI.start();
}
*/
