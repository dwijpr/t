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
var x = "X", o = "O";
var current = x;
board.onclick = function(e) {
    var td = getClickedElement(e);
    console.log(td);
    if (td && !td.clicked) {
        td.clicked = true;
        td.innerText = current;
        current = current==x?o:x;
    }
};

var turn = Math.round(Math.random());
console.log(turn);

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
