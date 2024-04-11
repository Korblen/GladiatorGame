export class Character {
    constructor(name, hp, dmg) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }

    attack(target) {
        target.takeDamage(this.dmg);
        console.log(`${this.name} attaque ${target.name} et inflige ${this.dmg} points de dégâts.`);
    }

    takeDamage(dmg) {
        this.hp -= dmg;
        console.log(`${this.name} reçoit ${dmg} points de dégâts. Points de vie restants: ${this.hp}`);
        if (this.hp <= 0) {
            console.log(`${this.name} est vaincu.`);
        }
    }

    isAlive() {
        return this.hp > 0;
    }
}