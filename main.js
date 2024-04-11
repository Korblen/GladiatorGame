import { Fighter } from './fighter.js';
import { Paladin } from './paladin.js';
import { Monk } from './monk.js';
import { Berzerker } from './berserker.js';
import { Assassin } from './assassin.js';
import { Game } from './game.js';

const characters = [
    new Fighter('Grace'),
    new Paladin('Ulder'),
    new Monk('Moana'),
    new Berzerker('Draven'),
    new Assassin('Carl')
];

const game = new Game(characters);
game.startGame();
