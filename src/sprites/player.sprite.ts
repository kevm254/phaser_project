// import Fireball from './fireball.sprite';
import Sprite = Phaser.GameObjects.Sprite;
import BaseSound = Phaser.Sound.HTML5AudioSound;
import HTML5AudioSound = Phaser.Sound.HTML5AudioSound;
import Image = Phaser.GameObjects.Image;
import Level from '../scenes/level.scene';

export default class Player extends Phaser.GameObjects.Sprite {
    body: any;
    // booleans
    alive: boolean;
    damaged: boolean;
    canLoad: boolean;

    input: any;

    noBlessingSound: BaseSound;
    hurtSound: BaseSound;
    deathSound: BaseSound;
    scene;

    constructor(config: any) {
        super(config.scene, config.x, config.y, 'atlas', 'player');

        config.scene.physics.world.enable(this);

        this.scene = config.scene as Level;
        this.body.setDrag(8, 8);
        this.body.setBounce(.5, .5);

        this.alive = true;
        this.damaged = false;
        this.input = this.scene.input.keyboard.createCursorKeys();
        this.canLoad = true;

        this.initSounds();
        this.initListeners();


        this.scene.add.existing(this);
    }

    initSounds() {
        this.noBlessingSound = <HTML5AudioSound>this.scene.sound.add('outOfMagicSFX');
        this.noBlessingSound.setVolume(.4);

        this.hurtSound = <HTML5AudioSound>this.scene.sound.add('playerDamageSFX');
        this.hurtSound.setVolume(.4);

        this.deathSound = <HTML5AudioSound>this.scene.sound.add('playerDeathSFX');
        this.deathSound.setVolume(.4);
    }

    initListeners() {
        this.scene.input.on('pointermove', (pointer) => {
            let mouse = pointer;

            this.scene.crosshair.setPosition(mouse.x + this.scene.cameras.main.scrollX, mouse.y + this.scene.cameras.main.scrollY);
        }, this);
    }

    update() {
        if (this.alive) {
            let healthCurrent = this.scene.registry.get('health_current');

            if(healthCurrent <= 0) {
                this.alive = false;
                this.setTint(0x2a0503);
                this.deathSound.play();
                this.scene.time.addEvent({ delay: 1000, callback: this.gameOver, callbackScope: this });
            }
        }

        // this.scene.physics.overlap(this, this.scene.pickups, this.pickup);

        this.setupMovement();
        this.checkOutOfBounds();
    }

    setupMovement() {
        if (!this.damaged) {
            this.body.setVelocity(0);
        }

        if (this.input.left.isDown) {
            this.body.setVelocityX(-64);
        }
        else if(this.input.right.isDown) {
            this.body.setVelocityX(64);
        }

        if (this.input.up.isDown) {
            this.body.setVelocityY(-64);
        }
        else if(this.input.down.isDown) {
            this.body.setVelocityY(64);
        }
    }

    checkOutOfBounds() {
        if(this.canLoad) {
            if (this.x > this.scene.physics.world.bounds.width) {
                this.scene.registry.set('load', this.scene.map.properties.loadRight);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnRight);
                this.canLoad = false;
                this.scene.end('restart');
            } else if(this.x < 0) {
                this.scene.registry.set('load', this.scene.map.properties.loadLeft);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnLeft);
                this.canLoad = false;
                this.scene.end('restart');
            } else if(this.y > this.scene.physics.world.bounds.height) {
                this.scene.registry.set('load', this.scene.map.properties.loadDown);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnDown);
                this.canLoad = false;
                this.scene.end('restart');
            } else if(this.y < 0) {
                this.scene.registry.set('load', this.scene.map.properties.loadUp);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnUp);
                this.canLoad = false;
                this.scene.end('restart');
            }
        }
    }

    pickup(player, object) {
        object.pickup();
    }

    damage(amount) {
        if(!this.damaged && this.alive) {
            this.hurtSound.play();
            this.scene.cameras.main.shake(32);
            this.damaged = true;
            let health = this.scene.registry.get('health_current');
            this.scene.registry.set('health_current', health - amount);
            this.scene.events.emit('healthChange');
            this.setTint(0x8e2f15);
            this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this });
        }
    }

    gameOver() {
        this.scene.add('gameOver');
    }

    normalize() {
        if (this.alive) {
            this.damaged = false;
            this.setTint(0xffffff);
        }
    }
}
