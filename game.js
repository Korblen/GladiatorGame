export class Game {
    constructor(characters) {
        this.characters = characters.filter(character => character.isAlive());
        this.turnLeft = 10;
    }

    startTurn() {
        console.log(`C'est le tour ${11 - this.turnLeft}`);
    
        this.characters.forEach(character => {
            if (character.isAlive()) {
                if (character.isPlayer) {
                    // Interaction avec le joueur via la console
                    this.playerTurnConsole(character);
                } else {
                    // Logique pour les personnages non-joueurs
                    this.npcTurn(character);
                }
            }
        });
    
        this.characters = this.characters.filter(character => character.isAlive());
        this.skipTurn();
        console.log("Points de vie restants :");
        this.characters.forEach(character => {
            console.log(`${character.name} a ${character.hp} points de vie.`);
        });
    }
    
    playerTurnConsole(character) {
        console.log(`C'est votre tour, ${character.name}.`);
        console.log(`Vos statistiques: PV: ${character.hp}, PM: ${character.mana}`);
        const targets = this.characters.filter(target => target.isAlive() && target !== character);
        let targetIndex = prompt("Choisissez votre cible (entrez un nombre): \n" + targets.map((t, index) => `${index + 1}: ${t.name}`).join('\n'));
        targetIndex = parseInt(targetIndex, 10) - 1;
        const target = targets[targetIndex];
    
        if (!target) {
            console.error("Cible non valide, tour manqué.");
            return;
        }
    
        const action = prompt(`${character.name}, choisissez votre action : \n 1. Attaque classique \n 2. Attaque spéciale`);
    
        switch(action) {
            case '1':
                console.log(`${character.name} choisit d'attaquer ${target.name}`);
                character.dealDamage(target);
                break;
            case '2':
                if (character.mana >= character.specialAttackManaCost) {
                    console.log(`${character.name} choisit d'utiliser son attaque spéciale sur ${target.name}`);
                    character.special(target);
                } else {
                    console.log(`${character.name} n'a pas assez de mana pour l'attaque spéciale. Attaque normale utilisée.`);
                    character.dealDamage(target);
                }
                break;
            default:
                console.error("Action non valide, tour manqué.");
        }
    }
    
    npcTurn(character) {
        const targets = this.characters.filter(target => target.isAlive() && target !== character);
        const target = targets[Math.floor(Math.random() * targets.length)];
        const useSpecial = Math.random() < 0.5;
    
        if (useSpecial && character.mana >= character.specialManaCost) {
            console.log(`${character.name} choisit d'utiliser son attaque spéciale sur ${target.name}`);
            character.specialAttack(target);
        } else {
            console.log(`${character.name} choisit d'attaquer ${target.name}`);
            character.dealDamage(target);
        }
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
