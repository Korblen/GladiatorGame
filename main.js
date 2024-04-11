import { Character } from './character.js';
import { Game } from './game.js';

const hero = new Character('Héros', 100, 15);
const enemy = new Character('Ennemi', 80, 10);

const game = new Game(hero, enemy);
game.start();