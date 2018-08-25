import 'phaser';

import PreloadScene from './scenes/preload.scene';

const gameConfig: GameConfig = {
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

