import { Character } from './character.js';

export class Assassin extends Character {
    constructor(name, isPlayer) {
        super(name, 6, 6, 40, isPlayer);
        this.specialAttackManaCost = 20;
        this.dodgeChance = 0.5;
    }

    specialManaCost() {
        return this.specialAttackManaCost;
    }

    special(target) {
        if (this.mana >= this.specialManaCost()) {
            console.log(`${this.name} utilise Shadow Hit sur ${target.name}`);
            target.takeDamage(7);
            target.poisoned = true; // L'Assassin empoisonne l'ennemi
            console.log(target.poisoned);
            this.dodgeChance += 0.2;
            this.hp += 2; // L'Assassin se soigne de 2 points de vie.
            this.dmg += this.dmg*(1/(1.3-this.dodgeChance));
            this.dmg = Math.round(this.dmg);
            console.log(this.dmg);
            this.mana -= 20;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour utiliser Shadow Hit.`);
        }
    }
}
