import { Character } from './character.js';

export class Monk extends Character {
    constructor(name) {
        super(name, 8, 2, 200);
    }

    heal() {
        if (this.mana >= 25) {
            console.log(`${this.name} utilise Heal.`);
            this.hp += 8; // Le Monk se soigne de 8 points de vie.
            console.log(`${this.name} se soigne de 8 points de vie.`);
            this.mana -= 25;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour utiliser Heal.`);
        }
    }
}
