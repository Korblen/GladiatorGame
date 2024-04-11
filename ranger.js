import { Character } from './character.js';

export class Ranger extends Character {
    constructor(name, isPlayer) {
        super(name, 9, 3, 120, isPlayer); // hp, dmg, mana, isPlayer
        this.specialAttackManaCost = 30;
    }
    specialManaCost() {
        return this.specialAttackManaCost;
    }
    special(targets) {
        if (this.mana >= this.specialManaCost()) {
            console.log(`${this.name} lance Arrow Storm.`);
            targets.forEach(target => {
                console.log(`${this.name} inflige 5 dégâts à ${target.name} avec Arrow Storm.`);
                target.takeDamage(5);
            });
            this.mana -= 30;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour lancer Arrow Storm.`);
        }
    }
}
