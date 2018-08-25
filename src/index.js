import 'phaser';

import { SimpleScene } from './simple-scene';
import PreloadScene from './scenes/preload.scene';

const gameConfig = {
    width: 1024,
    height: 768,
    backgroundColor: '#0072bc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: PreloadScene
};

new Phaser.Game(gameConfig);

