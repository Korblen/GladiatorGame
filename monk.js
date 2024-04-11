import { Character } from './character.js';

export class Monk extends Character {
    constructor(name, isPlayer) {
        super(name, 8, 2, 200, isPlayer);
        this.specialAttackManaCost = 25;
        this.shield = false;
    }
    specialManaCost() {
        return this.specialAttackManaCost;
    }

    special() {
        if (this.mana >= this.specialManaCost()) {
            console.log(`${this.name} utilise Heal.`);
            this.hp = 8; // Le Monk se soigne de 8 points de vie.
            this.shield = true; // Le Monk gagne un bouclier.
            console.log(`${this.name} se soigne de 8 points de vie.`);
            this.mana -= 25;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour utiliser Heal.`);
        }
    }
}
