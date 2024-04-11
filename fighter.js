import { Character } from './character.js';

export class Fighter extends Character {
    constructor(name) {
        super(name, 12, 4, 40);
    }

    darkVision(target) {
        if (this.mana >= 20) {
            console.log(`${this.name} utilise Dark Vision sur ${target.name}`);
            target.takeDamage(5);
            this.mana -= 20;
        } else {
            console.log(`${this.name} n'a pas assez de mana pour utiliser Dark Vision.`);
        }
    }
}
