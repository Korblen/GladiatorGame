import { Fighter } from './fighter.js';
import { Paladin } from './paladin.js';
import { Monk } from './monk.js';
import { Berzerker } from './berserker.js';
import { Assassin } from './assassin.js';
import { Wizard } from './wizard.js';
import { Ranger } from './ranger.js';
import { Game } from './game.js';


const characterClasses = [Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, Ranger]; // Array des classes

function generateRandomName() {
    const names = ["Arya", "Thorin", "Legolas", "Eowyn", "Gimli", "Frodo", "Gandalf", "Bilbo", "Samwise", "Aragorn"];
    return names[Math.floor(Math.random() * names.length)] + ' ' + Math.floor(Math.random() * 100);
}

function createRandomCharacter(excludeClass) {
    const availableClasses = characterClasses.filter(c => c !== excludeClass);
    const randomClass = availableClasses[Math.floor(Math.random() * availableClasses.length)];
    const name = generateRandomName();
    return new randomClass(name, false); // false pour isPlayer
}

document.addEventListener('DOMContentLoaded', () => {
    const selectionButtons = document.querySelectorAll('#character-selection button');

    selectionButtons.forEach(button => {
        button.addEventListener('click', event => {
            const selectedCharacterType = event.target.getAttribute('data-character');
            startGameWithCharacter(selectedCharacterType);
        });
    });
});

function startGameWithCharacter(selectedCharacterType) {
    let playerCharacterClass;

    switch(selectedCharacterType) {
        case 'Fighter':
            playerCharacterClass = Fighter;
            break;
        case 'Paladin':
            playerCharacterClass = Paladin;
            break;
        case 'Monk':
            playerCharacterClass = Monk;
            break;
        case 'Berzerker':
            playerCharacterClass = Berzerker;
            break;
        case 'Assassin':
            playerCharacterClass = Assassin;
            break;
        case 'Wizard':
            playerCharacterClass = Wizard;
            break;
        case 'Ranger':
            playerCharacterClass = Ranger;
            break;
        default:
            console.error('Personnage non reconnu');
            return;
    }

    const playerCharacter = new playerCharacterClass('Vous', true); // true pour isPlayer
    const characters = [playerCharacter];

    // Générer 4 autres personnages avec des classes et noms aléatoires
    for (let i = 0; i < 4; i++) {
        characters.push(createRandomCharacter(playerCharacterClass));
    }

    const game = new Game(characters);
    game.characters.forEach(character => {
        console.log(`${character.name} est un ${character.constructor.name}`);
    });
    game.startGame();
}
