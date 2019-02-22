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

function initBlocks() {
    var blocks = board.getElementsByTagName('td');
    for (var i = 0;i < blocks.length; i++) {
        var td = blocks[i];
        td.dataId = i;
    }
}

var Game = function () {
    var self = this;

    var STATE_INIT	    = 0;
    var STATE_PLAYING	= STATE_INIT + 1;
    var STATE_END       = STATE_PLAYING + 1;

    this.state = STATE_INIT;
    initBlocks();

    var x = "X", o = "O";
    var current = x;

    info.innerHTML = "Hi! Welcome to the game."
	+ "Click a square among 9 to start the game...";

    var pieces = {
        "X": [],
        "O": [],
    };

    this.check = function (pieces) {
        var wins = {
            0: [
                [0,1,2],
                [0,3,6],
                [0,4,8],
            ],
            1: [[1,4,7]],
            2: [
                [2,5,6],
                [2,4,6],
            ],
            3: [[3,4,5]],
            6: [[6,7,8]],
        };
        var _wins = wins[pieces[0]];
        console.log(pieces, _wins);
        if (_wins != undefined)
        for (var i = 0; i < _wins.length; i++) {
            var count = 0;
            for (var j = 0; j < _wins[i].length; j++) {
                var index = pieces.indexOf(_wins[i][j]);
                console.log('index', index);
                if (index > -1) count++;
                if (count == 3) {
                    console.log('win', _wins[i], pieces);
                    self.state = STATE_END;
                    return true;
                }
            }
        }
        return false;
    };

    this.add = function (td) {
        if (self.state == STATE_END) return;
        if (td && !td.clicked) {
            td.clicked = true;
            td.innerText = current;
            pieces[current].push(td.dataId);
            pieces[current].sort();
            if (pieces[current].length > 2) {
                if (self.check(pieces[current])) {
                    info.innerHTML = "Horay!";
                    return;
                }
            }
            current = current==x?o:x;
            info.innerHTML = "player "+current+" turn";
        }
    };
    return this;
};

var game = new Game();
console.log(game);

board.onclick = function(e) {
    game.add(getClickedElement(e))
};


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
