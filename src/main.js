import { Title_Screen } from './scenes/Title_Screen.js';
import { EndGame } from './scenes/EndGame.js';
import { City } from "./scenes/City.js";
import { House_1 } from './scenes/House_1.js';
import { House_2 } from './scenes/House_2.js';
import { House_3 } from './scenes/House_3.js';
import { House_4 } from './scenes/House_4.js';
import { UI } from './scenes/UI.js';

const config = {
    type: Phaser.AUTO,
    title: "Breaking & Entering: Business Major Simulator",
    description: "steal absolutely everything",
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    physics: {
        default: "arcade",
        arcade: {
            debug: true //remember to turn this off later !!!
        }
    },
    scene: [
        Title_Screen,
        City, House_1, House_2, House_3, House_4,
        UI,
        EndGame
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

const game = new Phaser.Game(config);

game.scene.launch("UI");
game.scene.start("City");

