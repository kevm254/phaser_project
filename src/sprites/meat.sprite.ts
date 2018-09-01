const Sprite = Phaser.GameObjects.Sprite;

export default class Meat extends Sprite {
    scene;
    number;
    sound;

    constructor(config) {
        super(config.scene, config.x, config.y, 'atlas', 'meat');

        config.scene.physics.world.enable(this);

        this.scene = config.scene;
        this.number = config.number;
        this.sound = this.scene.sound.add('meatSFX');
        this.sound.setVolume(.2);
        this.scene.add.existing(this);
    }

    pickup() {
        this.sound.play();
        let health = this.scene.registry.get('health_current');

        if(health < this.scene.registry.get('health_max')) {
            this.scene.registry.set('health_current', health + 1);
        }
        this.scene.registry.set(`${this.scene.registry.get('load')}_Meat_${this.number}`, 'picked');
        this.scene.events.emit('healthChange');
        this.destroy();
    }
}