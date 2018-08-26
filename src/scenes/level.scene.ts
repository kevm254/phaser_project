// import Player from '../sprites/player';
// import Enemy from '../sprites/enemy';
// import Slime from '../sprites/slime';
// import Coins from '../sprites/coins';
// import Meat from '../sprites/meat';
// import Potion from '../sprites/potion';
// import Jug from '../sprites/jug';
// import Heart from '../sprites/heart';

import BaseSound = Phaser.Sound.BaseSound;
import Tilemap = Phaser.Tilemaps.Tilemap;

export default class Level extends Phaser.Scene {
    music: BaseSound;
    map: Tilemap;
    tileset;
    layer;

    constructor() {
        super({
            key: 'Level'
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0x2a0503);

        let load = this.registry.get('load');

        // this.music = this.sound.add(`${load}Music`);
        // this.music.play();

        this.map = this.make.tilemap({ key: `${load}Map`});
        this.tileset = this.map.addTilesetImage('tiles');
        this.layer = this.map.createStaticLayer('tileLayer', this.tileset, 0, 0);
        // this.layer.setCollisionByProperty({ collide: true });

    }

    update() {

    }
}