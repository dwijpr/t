<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Board {
    function __construct($row, $col) {
        $this->row = $row;
        $this->col = $col;
        $this->total = 0;
        $this->places = [];
        for ($i = 0; $i < $row; $i++) {
            $this->places[$i] = [];
            for ($j = 0; $j < $col; $j++) {
                $this->places[$i][$j] = false;
            }
        }
    }

    function findNextEmpty() {
        for ($i = 0; $i < $this->row; $i++) {
            for ($j = 0; $j < $this->col; $j++) {
                if (!$this->places[$i][$j]) return [$i, $j];
            }
        }
        return false;
    }

    function count() {
        return $this->total;
    }

    function finished() {
        $pieces = [
            'x' => [],
            'o' => [],
        ];
        for ($i = 0; $i < $this->row; $i++) {
            for ($j = 0; $j < $this->col; $j++) {
                if ($this->places[$i][$j]) {
                    $piece = $this->places[$i][$j];
                    $pieces[$piece][] = [$i, $j];
                }
            }
        }
        if ($this->count() > 5) {
            dd($pieces);
        }
        return false;
    }

    function add($piece, $i, $j) {
        $win = $piecePlace[$piece]->add($i, $j);
        $this->places[$i][$j] = $piece;
        $this->total++;
    }

    function show() {
        $output = '';
        for ($i = 0; $i < $this->row; $i++) {
            for ($j = 0; $j < $this->col; $j++) {
                $output = $output.(
                    @$this->places[$i][$j]?:'_'
                );
            }
            $output .= "\n";
        }
        return $output;
    }
}

class GenerateDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gd';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $row = $col = 3;

        for ($i = 0; $i < $row; $i++) {
            for ($j = 0; $j < $col; $j++) {
                $player = true;
                $pieces = ['o', 'x'];
                $board = new Board($row, $col);
                $boardI = $i;
                $boardJ = $j;
                while (!$board->finished()) {
                    dump('player: '.($player?'true':'false'));
                    $win = $board->add(
                        $pieces[$player?1:0]
                        , $boardI, $boardJ
                    );
                    if ($win) break;
                    dump($board->show());
                    $boardPos = $board->findNextEmpty();
                    dump($boardPos);
                    if (!$boardPos) break;
                    $boardI = $boardPos[0];
                    $boardJ = $boardPos[1];
                    $player = !$player;
                    $this->ask('?');
                }
            }
        }
        dd('Hi');
    }
}
