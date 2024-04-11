import { Character } from './character.js';

export class Berzerker extends Character {
    constructor(name) {
        super(name, 8, 4, 0); // Notez que le Berzerker commence sans mana.
    }

    rage() {
        console.log(`${this.name} utilise Rage.`);
        this.dmg += 1; // L'attaque du Berzerker augmente de 1.
        this.hp -= 1; // Le Berzerker perd 1 point de vie en utilisant Rage.
        console.log(`${this.name} augmente son attaque de 1 point mais perd 1 point de vie.`);
    }
}
