var Possibility = function(turn, pieces, moves) {
    var wins = [
        // horizontals
        [0,1,2],
        [3,4,5],
        [6,7,8],
        // verticals
        [0,3,6],
        [1,4,7],
        [2,5,8],
        // diagonals
        [0,4,8],
        [2,4,6],
    ];

    var available = [];
    var blocks = board.getElementsByTagName('td');
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        if (block.clicked) {
            continue;
        }
        available.push(block.dataId);
    }

    for (var k in pieces) {
        for (var i = 0; i < pieces[k].length; i++) {
            var piece = pieces[k][i];
            console.log('piece', piece);
        }
    }

    var nodes = {};
    var availableText = '';
    for (var i = 0; i < available.length; i++) {
        availableText += ', ' + available[i];
    }
    console.log(availableText);

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

    if (moves == 0) {
        return {
            "info": "get the node with the biggest poin"
            + " 4:4, 6:4 "
        };
    }
};

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

    this.compare = function(pieces, win) {
        var originalWin = win.slice();
        var count = 0;
        console.log(pieces, win);
        for (var i = 0; i < pieces.length; i++) {
            var piece = pieces[i];
            var index = win.indexOf(piece);
            if (index !== -1) win.splice(index, 1);
        }
        if (win.length == 0) {
            console.log('-----------------------------');
            console.log(' win for ', originalWin);
            return true;
        }
        return false;
    };

    this.process = function (pieces) {
        for (var k in pieces) {
            if (pieces[k].length < 3) continue;
            var wins = [
                // horizontals
                [0,1,2],
                [3,4,5],
                [6,7,8],
                // verticals
                [0,3,6],
                [1,4,7],
                [2,5,8],
                // diagonals
                [0,4,8],
                [2,4,6],
            ];
            for (var i = 0; i < wins.length; i++) {
                if (self.compare(pieces[k], wins[i]))
                    return true;
            }
        }
        return false;
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

function debugPieces(turn, pieces, moves) {
    var posibility = new Possibility(turn, pieces, moves);

    console.log('--------------------------------------');
    console.log('turn', turn, ' # ', moves);
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
    console.log('posibilities: ', posibility);
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

    this.getPieces = function () {
        return pieces;
    };
    this.getMove = function () {
        return moves;
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

        // random between 0 and 1
        //var playerTurn = Math.round(Math.random());
        var playerTurn = 0;

        if (!playerTurn) {
            ai.setChar('X');
            info.innerHTML = ai.name + ' Turn';
            setTimeout(function () {
                ai.move(game);
            }, 1000);
        }
    };

    this.setState = function (state) {
        self.state = state;
        switch (state) {
            case STATE_END:
                restart.style.display = 'block';
                break;
        }
    };

    debugPieces(current, pieces, moves);

    this.add = function (td, isAI, ai) {
        if (isAI) playerTurn = true;
        if (self.state == STATE_END) {
            return;
        }
        if (td && !td.clicked) {
            td.clicked = true;
            td.innerText = current;
            pieces[current].push(td.dataId);
            pieces[current].sort();
            moves++;

            // Winner checking
            if (Check.process(pieces)) {
                info.innerHTML = "Game!";
                self.setState(STATE_END);
                return;
            }
            //all blocks is filled
            if (moves == 9) {
                info.innerHTML = "Death!";
                self.setState(STATE_END);
                return;
            }
            current = current==x?o:x;
            debugPieces(current, pieces, moves);
            info.innerHTML = "player "+current+" turn";

            if (!isAI) {
                ai.setChar(current);
                info.innerHTML = ai.name + " turn";
                setTimeout(function () {
                    ai.move(self);
                }, 1000);
            }
        }
    };
    return this;
};

var game = new Game();

// Dummy AI
// ----------------

var AI = new function () {
    var self = this;
    this.name = "Dummy";

    this.move = function (game) {
        var available = [];
        var blocks = board.getElementsByTagName('td');
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (block.clicked) {
                continue;
            }
            game.add(block, true, self);
            break;
        }
    };

    return self;
};

// Random Class
// -------------------------------

var Random = new function () {
    var self = this;

    this.array = function (items) {
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        console.log("items ", items);
        var count = items.length;
        var rand = Math.floor(Math.random() * count);
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        console.log("random number: ", rand);
        return items[rand];
    };

    return self;
};

var CheckOne = new function () {
    var self = this;

    this.compare = function(pieces, win, available) {
        var originalWin = win.slice();
        var count = 0;
        console.log(pieces, win);
        for (var i = 0; i < pieces.length; i++) {
            var piece = pieces[i];
            var index = win.indexOf(piece);
            if (index !== -1) win.splice(index, 1);
        }
        if (win.length == 1) {
            var last = win[0];
            console.log('-----------------------------');
            console.log(' win ', win);
            console.log(' win for ', originalWin);
            console.log(' last piece ', last);
            var index = available.indexOf(last);
            if (index !== -1)
                return last;
        }
        return -1;
    };

    this.process = function (available, pieces) {
        var wins = [
            // horizontals
            [0,1,2],
            [3,4,5],
            [6,7,8],
            // verticals
            [0,3,6],
            [1,4,7],
            [2,5,8],
            // diagonals
            [0,4,8],
            [2,4,6],
        ];
        for (var i = 0; i < wins.length; i++) {
            var id = self.compare(
                pieces, wins[i], available
            );
            if (id != -1) return id;
        }
        return -1;
    };

    return self;
};

function tryToWin(theChar, available, game) {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    var pieces = game.getPieces();
    var myPieces = pieces[theChar];

    // Available to win
    var id = CheckOne.process(available, myPieces);
    return id;
}

function preventOther(theChar, available, game) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    var pieces = game.getPieces();
    var myPieces = pieces[theChar];
    var enemyChar = theChar=='X'?'O':'X';
    var enemyPieces = pieces[enemyChar];

    // Available to win
    var id = CheckOne.process(available, enemyPieces);

    console.log(
        '-----------------------------------------'
        , 'ID', id
        ,'theChar', theChar
        ,'available', available
        , myPieces, enemyPieces
    );

    if (id == -1)
        id = Random.array(available);
    return id;
}

// Singleton Jon AI
// ----------------

var JonAI = new function () {
    var self = this;
    var p;
    this.name = "Jon AI";

    this.setChar = function (v) {
        p = v;
    };
    this.move = function (game) {
        var available = [];
        var blocks = board.getElementsByTagName('td');
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (block.clicked) {
                continue;
            }
            available.push(block.dataId);
        }
        console.log("+++++++++++++++++++++++++++++++++++");
        console.log(" available: ", available);
        var id = -1;
        var move = game.getMove();
        console.log("+++++++++++++++++++++++++++++++++++");
        console.log(" move: ", move);

        switch (move) {
            case 0:
            case 1:
            case 2:
                id = Random.array(available);
                break;
            case 3:
                id = preventOther(p, available, game);
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                id = tryToWin(p, available, game);
                if (id == -1)
                    id = preventOther(p, available, game);
                break;
        }

        game.add(blocks[id], true, self);
    };

    return self;
};

// random between 0 and 1
//var playerTurn = Math.round(Math.random());
var playerTurn = 0;

var ai = JonAI;
if (!playerTurn) {
    ai.setChar('X');
    info.innerHTML = ai.name + ' Turn';
    setTimeout(function () {
        ai.move(game);
    }, 1000);
}

// Player clicks
// ----------------------------------------------------

board.onclick = function(e) {
    if (playerTurn) {
        game.add(
            getClickedElement(e)
            , false, ai
        );
    }
};
restart.onclick = function() {
    game.restart();
    restart.style.display = 'none';
};
enableConvos.onclick = function() {
    console.log('enabling Convos...');
    convos.innerHTML = '';
    enableConvos = false;
};

