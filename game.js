export class Game {
    constructor(characters) {
        this.characters = characters.filter(character => character.isAlive());
        this.turnLeft = 10;
    }

    startTurn() {
        console.log(`C'est le tour ${11 - this.turnLeft}`);

        this.characters.forEach(character => {
            if (character.isAlive()) {
                // Choisis une cible au hasard parmi les personnages vivants autres que l'attaquant
                const targets = this.characters.filter(target => target.isAlive() && target !== character);
                const target = targets[Math.floor(Math.random() * targets.length)];

                // Décide aléatoirement de l'attaque à utiliser (normal ou spécial)
                const useSpecial = Math.random() < 0.5;

                if (useSpecial && character.mana >= character.specialManaCost) {
                    console.log(`${character.name} choisit d'utiliser son attaque spéciale sur ${target.name}`);
                    character.specialAttack(target);
                } else {
                    console.log(`${character.name} choisit d'attaquer ${target.name}`);
                    character.dealDamage(target);
                }
            }
        });

        // Filtrer les personnages encore en vie après les attaques
        this.characters = this.characters.filter(character => character.isAlive());

        this.skipTurn();
    }

    skipTurn() {
        this.turnLeft--;
        if (this.turnLeft === 0 || this.characters.length <= 1) {
            this.endGame();
        }
    }

    endGame() {
        if (this.characters.length === 1) {
            const winner = this.characters[0];
            winner.status = 'winner';
            console.log(`${winner.name} a gagné le jeu !`);
        } else {
            console.log("Le jeu est terminé sans vainqueur clair.");
        }
    }

    startGame() {
        while (this.turnLeft > 0 && this.characters.length > 1) {
            this.startTurn();
        }
    }
}
