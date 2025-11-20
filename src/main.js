import { Title_Screen } from './scenes/Title_Screen.js';
import { EndGame } from './scenes/EndGame.js';

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
        EndGame
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

new Phaser.Game(config);