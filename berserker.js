import { Character } from './character.js';

export class Berzerker extends Character {
    constructor(name, isPlayer) {
        super(name, 15, 4, 0, isPlayer);
        this.specialAttackManaCost = 0; // Notez que le Berzerker commence sans mana.
        this.dodgeChance = 0.3;
    }

    specialManaCost() {
        return this.specialAttackManaCost;
    }

    special() {
        console.log(`${this.name} utilise Rage.`);
        this.dmg += 2; // L'attaque du Berzerker augmente de 1.
        this.hp -= 1; // Le Berzerker perd 1 point de vie en utilisant Rage.
        console.log(`${this.name} augmente son attaque de 2 points mais perd 1 point de vie.`);
    }
}
