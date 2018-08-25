import 'phaser';
import PreloadScene from './scenes/preload.scene';
var gameConfig = {
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
