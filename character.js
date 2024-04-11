export class Character {
    constructor(name, hp, dmg, mana, isPlayer = false) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.mana = mana;
        this.status = 'playing';
        this.isPlayer = isPlayer;
        this.poisoned = false;
    }

    takeDamage(damage) {
        if (this.constructor.name === 'Monk' && this.shield) {
            this.shield = false;
            console.log(`${this.name} se protège grâce à son bouclier !`);
            return;
        } else if (this.constructor.name === 'Berzerker') {
            this.hp -= 1;
        } else if (this.constructor.name === 'Paladin') {
            this.hp += 2;
        }
        if (this.constructor.name === 'Wizard' && this.mana >= 50) {
            console.log(`${this.name} lance un bouclier magique !`);
            this.mana -= 50;
            return;
        } else if (this.constructor.name === 'Ranger' || this.constructor.name === 'Assassin' || this.constructor.name ==='Berzerker') {
            const chance = Math.random();
            if (chance < this.dodgeChance) {
                console.log(`${this.name} esquive l'attaque !`);
                console.log(this.dodgeChance);
                console.log(chance);
                return;
            }
        }
        this.hp -= damage;
        if (this.hp <= 0) {
            this.status = 'loser';
            this.hp = 0;
        }
    }


    dealDamage(target) {
        if (this.constructor.name === 'Monk') {
            this.mana += 10;
        } else if (this.constructor.name === 'Wizard') {
            this.mana += 30;
        } else if (this.constructor.name === 'Berzerker') {
            this.hp += 3;
        } else if (this.constructor.name === 'Fighter') {
            const chance = Math.random();
            if (chance < 0.3) {
                console.log(`${this.name} S'inspire et gagne de l'attaque !`);
                this.dmg += 2;
            }
        }
        target.takeDamage(this.dmg);
        if (target.status === 'loser') {
            this.mana += 20;
        }
    }

    isAlive() {
        return this.status === 'playing';
    }
}