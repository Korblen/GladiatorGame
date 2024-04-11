import { Character } from './character.js';

export class Assassin extends Character {
    constructor(name) {
        super(name, 6, 6, 20);
    }

    shadowHit(target) {
        if (this.mana >= 20) {
            console.log(`${this.name} utilise Shadow Hit sur ${target.name}`);
            target.takeDamage(7); // L'Assassin inflige 7 points de dégâts.
            this.mana -= 20;
            // Implémenter la logique pour que l'Assassin ne prenne pas de dégâts au prochain tour.
        } else {
            console.log(`${this.name} n'a pas assez de mana pour utiliser Shadow Hit.`);
        }
    }
}
