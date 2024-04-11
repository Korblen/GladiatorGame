import { Character } from './character.js';

export class Wizard extends Character {
    constructor(name, isPlayer) {
        super(name, 10, 2, 200, isPlayer); // hp, dmg, mana, isPlayer
        this.specialAttackManaCost = 25;
    }
    specialManaCost() {
        return this.specialAttackManaCost;
    }
    special(target) {
        if (this.mana >= this.specialManaCost()) {
            console.log(`${this.name} lance Fireball sur ${target.name}, infligeant 7 dégâts.`);
            target.takeDamage(7);
            this.mana -= 25;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour lancer Fireball.`);
        }
    }
}
