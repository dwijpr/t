Read me Please :(
===

I hope it's not TL;DR

# The Program Design/FlowChart/&Explanation

_Program Design_ -- a process that an organization uses to develop a program.

_FlowChart_ -- a diagram of the sequence of movements or actions of people or things involved in a complex system or activity.

_Explanation_ -- a statement or account that makes something clear. #sorry

# Flow Chart - App

[User] ---> Open the program in a beloved Browser (me, Chromium currently - i need to run ```chromium --password-store=basic``` each run though) ---> play the [Game]!

[Game] -> Nigiri (in Go/Baduk/Weiqi) [Play Go with me](https://online-go.com/player/588586/) / Randomize turn
---> player/AI turn ---> turn based game ---> are there 3 connected pieces? 

`- no  ---> Play till death! (fill all 9 blocks) ---> [End]

`- yes ---> [End]

[End] ---> Restart? ---> backTo: [User]

# Additional Feature: Convos Battle!

tracking each other pieces as persons would...

```
+-----+                     
| | | | -----------------
| |x| | | enable convos |
| | | | -----------------
+-----+ 

+-----+ O : "What? Tengen!";
| | | | X : "Hahaha! Awesome right?";
| |x| | 
| | | | 
+-----+ 

+-----+ O : "What? Tengen!";
| | |o| X : "Hahaha! Awesome right?";
| |x| | O : "Alright... here I go, _San San_!";
| | | | X : "Naaaniii!??!;
+-----+ 

```

[repl.it](https://repl.it/@dwijpr/t) <--- it's awesome, first time using it!
**note** there is some errors: probably not using repl.it

# The Game without AI

[User] ---> Browser
---> Game ---> 'X' and 'O' Take Turn
---> Game check if:
  `---> there are 3 connected dots vertical, horizontal,
    diagonal
  `---> all the blocks is filled!
---> Game Restart menu ---> [User]

## 3 connected dots

### Possibility

```
0 1 2
3 4 5
6 7 8

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
```

### board (table element) index

0 1 2
3 4 5
6 7 8

### X's & O's poses arrays

```
+-----+ xs = [0];  +-----+ xs = [0]; +-----+ xs = [0,8]; +-----+ xs = [0,8];
|x| | |            |x| | | os = [4]; |x| | | os = [4];   |x|o| | os = [4,1];
| | | |            | |o| |           | |o| |             | |o| |
| | | |            | | | |           | | |x|             | | |x|
+-----+            +-----+           +-----+             +-----+

+-----+ xs = [0,8,6];  +-----+ xs = [0,8,6];
|x|o| | os = [4,2];    |x|o| | os = [4,1,7];
| |o| |                | |o| |
|x| |x|                |x|o|x|
+-----+                +-----+

---------------------------------------------------------

wins = [
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
```

### Sorted game records

```
xs = [0, 6, 8];
os = [1, 4, 7];
```
Comparing wins with sorted records after records have at least 3 pieces

# AI

I am not sure about this, but let me try... 

## Using Scoring System [pending]

## AI - Jon

1. Random(available)
2. Random(available)
3. Random(available)
4. Prevent enemy Win, Random(available)
5. Check game, Prevent enemy Win, Random(available)
6. Check game, Prevent enemy Win, Random(available)
7. Check game, Prevent enemy Win, Random(available)
8. Check game, Prevent enemy Win, Random(available)
9. Check game, Prevent enemy Win, Random(available)

----------------------------------------------------------------------

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

<!-- display the social media buttons in your README -->

[![alt text][1.1]][1]
[![alt text][2.1]][2]
[![alt text][3.1]][3]
[![alt text][4.1]][4]
[![alt text][5.1]][5]
[![alt text][6.1]][6]


<!-- links to social media icons -->
<!-- no need to change these -->

<!-- icons with padding -->

[1.1]: http://i.imgur.com/tXSoThF.png (twitter icon with padding)
[2.1]: http://i.imgur.com/P3YfQoD.png (facebook icon with padding)
[3.1]: http://i.imgur.com/yCsTjba.png (google plus icon with padding)
[4.1]: http://i.imgur.com/YckIOms.png (tumblr icon with padding)
[5.1]: http://i.imgur.com/1AGmwO3.png (dribbble icon with padding)
[6.1]: http://i.imgur.com/0o48UoR.png (github icon with padding)

<!-- icons without padding -->

[1.2]: http://i.imgur.com/wWzX9uB.png (twitter icon without padding)
[2.2]: http://i.imgur.com/fep1WsG.png (facebook icon without padding)
[3.2]: http://i.imgur.com/VlgBKQ9.png (google plus icon without padding)
[4.2]: http://i.imgur.com/jDRp47c.png (tumblr icon without padding)
[5.2]: http://i.imgur.com/Vvy3Kru.png (dribbble icon without padding)
[6.2]: http://i.imgur.com/9I6NRUm.png (github icon without padding)


<!-- links to your social media accounts -->
<!-- update these accordingly -->

Your Google+ account is going away on April 2, 2019.

[1]: http://www.twitter.com/lyeyuu
[2]: http://www.facebook.com/yuulye
[3]: https://plus.google.com/102832888196813116163
[4]: http://yuulye.wordpress.com
[5]: http://dribbble.com/carlsednaoui
[6]: http://www.github.com/yuulye

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

//endOfFile readme.md
