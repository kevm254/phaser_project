import 'phaser';

import PreloadScene from './scenes/preload.scene';
import Level from './scenes/level.scene';
import HUD from './scenes/hud.scene';

const gameConfig: GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#0072bc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        PreloadScene,
        Level,
        HUD
    ]
};

new Phaser.Game(gameConfig);

