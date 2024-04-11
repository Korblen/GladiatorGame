export class Character {
    constructor(name, hp, dmg, mana, isPlayer = false) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.mana = mana;
        this.status = 'playing'; // 'playing', 'loser', 'winner'
        this.isPlayer = isPlayer;
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.status = 'loser';
            this.hp = 0;
        }
    }


    dealDamage(target) {
        target.takeDamage(this.dmg);
        if (target.status === 'loser') {
            this.mana += 20;
        }
    }

    isAlive() {
        return this.status === 'playing';
    }
}