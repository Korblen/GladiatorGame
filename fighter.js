import { Character } from './character.js';

export class Fighter extends Character {
    constructor(name, isPlayer) {
        super(name, 12, 4, 40, isPlayer);
        this.specialAttackManaCost = 20;
    }

    specialManaCost() {
        return this.specialAttackManaCost;
    }

    special(target) {
        if (this.mana >= this.specialManaCost()) {
            console.log(`${this.name} utilise Dark Vision sur ${target.name}`);
            target.takeDamage(5);
            this.mana -= 20;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour utiliser Dark Vision.`);
        }
    }
}
