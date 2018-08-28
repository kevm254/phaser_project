import Player from '../sprites/player.sprite';
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
    text;
    music: BaseSound;
    map: Tilemap;
    tileset;
    layer;
    player;
    spawnPoints: any[] = [];

    constructor() {
        super({
            key: 'Level'
        });
    }

    create() {
        let load = this.registry.get('load');
        this.cameras.main.setBackgroundColor(0x2a0503);

        this.setupMusic();


        this.map = this.make.tilemap({ key: `${load}Map`});

        this.tileset = this.map.addTilesetImage('tiles');
        this.layer = this.map.createStaticLayer('tileLayer', this.tileset, 0, 0);
        // this.layer.setCollisionByProperty({ collide: true });

        this.convertObjects();

        let spawn = this.spawnPoints[this.registry.get('spawn')];

        alert(JSON.stringify(spawn));

        this.player = new Player({
            scene: this,
            x: spawn.x,
            y: spawn.y
        });

        this.newGame();
    }

    update() {

    }

    /* ***************** */
    // General Methods
    /* ***************** */
    setupMusic() {
        let load = this.registry.get('load');
        // this.music = this.sound.add(`${load}Music`);
        this.music = this.sound.add('testMusic');
        this.music.play(null, { loop: true });

    }

    convertObjects() {
        const objects = this.map.getObjectLayer('objects');
        const level = this.registry.get('load');

        console.dir(objects);

        objects.objects.forEach((object: any) => {
            if (object.type === 'spawn') {
                this.spawnPoints[object.name] = {
                    x: object.x + 8,
                    y: object.y + 8
                }
            }
        });
    }

    newGame() {
        this.registry.set('newGame', false);
        this.text = this.add.text(this.player.x, this.player.y - 32, 'Press Arrow keys to move');
        this.text.setOrigin(.5);

        this.time.addEvent({
            delay: 6000,
            callback: () => {
                this.text.destroy();
            }
        })
    }
}