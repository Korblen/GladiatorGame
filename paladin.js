import { Character } from './character.js';

export class Paladin extends Character {
    constructor(name) {
        super(name, 16, 3, 160);
    }

    healingLighting(target) {
        if (this.mana >= 40) {
            console.log(`${this.name} utilise Healing Lighting sur ${target.name}`);
            target.takeDamage(4);
            this.hp += 5; // Le Paladin se soigne de 5 points de vie.
            console.log(`${this.name} se soigne de 5 points de vie.`);
            this.mana -= 40;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour utiliser Healing Lighting.`);
        }
    }
}
