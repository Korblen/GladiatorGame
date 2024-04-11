import { Character } from './character.js';

export class Game {
    constructor(hero, enemy) {
        this.hero = hero;
        this.enemy = enemy;
        this.currentTurn = 1;
    }

    start() {
        console.log("Le jeu commence !");
        while (this.hero.isAlive() && this.enemy.isAlive()) {
            console.log(`Tour ${this.currentTurn}:`);
            this.hero.attack(this.enemy);
            if (this.enemy.isAlive()) {
                this.enemy.attack(this.hero);
            }
            this.currentTurn++;
        }

        if (this.hero.isAlive()) {
            console.log(`${this.hero.name} a gagné le combat !`);
        } else {
            console.log(`${this.enemy.name} a gagné le combat !`);
        }
    }
}
