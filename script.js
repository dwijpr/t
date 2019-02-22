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
    info.innerHTML = "Hi! Welcome to the game."
	+ "<br/>Click a square among 9 to start the game...";
    var blocks = board.getElementsByTagName('td');
    for (var i = 0;i < blocks.length; i++) {
        var td = blocks[i];
        td.dataId = i;
        td.innerHTML = '';
        td.clicked = false;
    }
}

var Check = new function () {
    var self = this;

    this.process = function (pieces) {
    };

    return self;
};

function fConvos(piece, turn) {
    var info = 'hmmm...';
    if (piece == 4) {
        info = 'What? Tengen!'
            + "<br/>"
            + "X: Hahaha! Awesome, right?";
        ;
    } else if (
        piece == 0 || piece == 2
        || piece == 6 || piece == 8
    ) {
        info = "Alright... here I go, <i>San San</i>!"
            + '<br/>'
            + 'X: <b>Naaaaniii!!??!</b>'
        ;
    } else {
    }
    var line = turn + ': ' + info;
    if (!enableConvos) {
        convos.innerHTML = line + '<br/>' ;
    }
}

function debugPieces(turn, pieces) {
    var wins = [
        // horizontals
        [0,1,2],
        [3,4,5],
        [6,7,8],
        // verticals
        [0,3,6],
        [1,4,7],
        [2,5,6],
        // diagonals
        [0,4,8],
        [2,4,6],
    ];

    var nodes = {};

    for (var i = 0; i < wins.length; i++) {
        for (var j = 0; j < wins[i].length; j++) {
            var v = wins[i][j];
            if (nodes[v] == undefined) {
                nodes[v] = 1;
            } else {
                nodes[v] += 1;
            }
        }
    }

    console.log(nodes);

    console.log('--------------------------------------');
    console.log('turn', turn);
    for (var k in pieces) {
        var _pieces = pieces[k];
        var __pieces = '';
        for (var i = 0; i < _pieces.length; i++) {
            var piece = _pieces[i];
            fConvos(piece, turn);
            __pieces += ', '+piece;
        }
        console.log(k, __pieces);
    }
    console.log('--------------------------------------');
}

var Game = function () {
    var self = this;

    var STATE_INIT	    = 0;
    var STATE_PLAYING	= STATE_INIT + 1;
    var STATE_END       = STATE_PLAYING + 1;
    var state = STATE_INIT;

    initBlocks();

    var x = "X", o = "O";
    var current = x;
    var moves = 0;

    var pieces = {
        "X": [],
        "O": [],
    };

    this.restart = function () {
        initBlocks();
        self.setState(STATE_INIT);

        current = x;
        moves = 0;
        pieces = {
            "X": [],
            "O": [],
        };
    };

    this.check = function (pieces) {
        Check.process(pieces);
        return false;
    };

    this.setState = function (state) {
        self.state = state;
        switch (state) {
            case STATE_END:
                restart.style.display = 'block';
                break;
        }
    };

    this.add = function (td) {
        if (self.state == STATE_END) {
            return;
        }
        if (td && !td.clicked) {
            td.clicked = true;
            td.innerText = current;
            pieces[current].push(td.dataId);
            pieces[current].sort();
            moves++;
            if (moves == 9) {
                info.innerHTML = "Death!";
                self.setState(STATE_END);
                return;
            }
            if (pieces[current].length > 2) {
                if (self.check(pieces[current])) {
                    info.innerHTML = "Horay!";
                    return;
                }
            }
            current = current==x?o:x;
            debugPieces(current, pieces);
            info.innerHTML = "player "+current+" turn";
        }
    };
    return this;
};

var game = new Game();

board.onclick = function(e) {
    game.add(getClickedElement(e))
};
restart.onclick = function() {
    game.restart();
};
enableConvos.onclick = function() {
    console.log('enabling Convos...');
    convos.innerHTML = '';
    enableConvos = false;
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
