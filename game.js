export class Game {
    constructor(characters) {
        this.characters = characters.filter(character => character.isAlive());
        this.turnLeft = 10;
    }

    startTurn() {
        console.log(`C'est le tour ${11 - this.turnLeft}`);
    
        this.characters.forEach(character => {
            if (character.isAlive()) {
                if (character.poisoned){
                    character.takeDamage(2);
                    console.log(`${character.name} est empoisonné et perd 2 points de vie.`);
                }
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
                // Adapter l'attaque spéciale selon la classe du personnage
                if (character.constructor.name === 'Ranger') {
                    const aliveTargets = this.characters.filter(target => target.isAlive() && target !== character);
                    console.log(`${character.name} choisit d'utiliser son attaque spéciale sur ${aliveTargets.map(t => t.name).join(', ')}`);
                    character.special(aliveTargets);
                }
                else if (character.constructor.name === 'Monk' || character.constructor.name === 'Berzerker') {
                    console.log(`${character.name} choisit d'utiliser son attaque spéciale`);
                    character.special();
                }
                else if (character.mana >= character.specialAttackManaCost) {
                    console.log(`${character.name} choisit d'utiliser son attaque spéciale sur ${target.name}`);
                    character.special(target);
                }
                else {
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
        
        // Évaluer les cibles potentielles en fonction de leur menace et de leur vulnérabilité
        const evaluatedTargets = targets.map(target => {
            const threatLevel = target.dmg; // Le niveau de menace peut être basé sur les dégâts potentiels de la cible
            const vulnerability = target.hp; // La vulnérabilité peut être basée sur les points de vie restants
            return { target, score: vulnerability - threatLevel }; // Un score basé sur la vulnérabilité moins la menace
        });
    
        // Trier les cibles évaluées par score, les cibles les plus vulnérables et moins menaçantes en premier
        evaluatedTargets.sort((a, b) => a.score - b.score);
    
        // Sélectionner la cible la plus intéressante (première de la liste triée)
        const { target } = evaluatedTargets[0];
    
        // Décider aléatoirement d'utiliser l'attaque spéciale ou non
        const useSpecial = Math.random() < 0.5 && character.mana >= character.specialAttackManaCost;
    
        if (useSpecial) {
            // Adapter selon la classe du personnage pour l'attaque spéciale
            handleSpecialAttack(character, target, targets);
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

function handleSpecialAttack(character, target, allTargets) {
    if (character.constructor.name === 'Ranger') {
        // Le Ranger attaque tous les adversaires vivants
        console.log(`${character.name} utilise son attaque spéciale sur tous les adversaires.`);
        character.special(allTargets);
    } else if (character.constructor.name === 'Monk' || character.constructor.name === 'Berzerker') {
        // Le Moine et le Berzerker utilisent leur capacité spéciale sans cible spécifique
        console.log(`${character.name} utilise son attaque spéciale.`);
        character.special();
    } else {
        // Pour les autres classes, utiliser l'attaque spéciale sur la cible sélectionnée
        console.log(`${character.name} utilise son attaque spéciale sur ${target.name}.`);
        character.special(target);
    }
}
