const Sprite = Phaser.GameObjects.Sprite;

export default class Heart extends Sprite {
    scene;
    number;
    sound;

    constructor(config) {
        super(config.scene, config.x, config.y, 'atlas', 'heart');
        this.initPhysics(config);

        this.scene = config.scene;
        this.number = config.number;
        this.sound = this.scene.sound.add('heartSFX');
        this.sound.setVolume(.2);
        this.scene.add.existing(this);
    }

    initPhysics(config) {
        config.scene.physics.world.enable(this);

    }

    pickup() {
        this.sound.play();
        let healthCurrent = this.scene.registry.get('health_current');
        let healthMax = this.scene.registry.get('health_max');
        this.setVal('health_current', healthCurrent  + 1);
        this.setVal('health_max', healthMax + 1);
        healthCurrent = this.getVal('health_current');
        healthMax = this.getVal('health_max');
        if (healthCurrent > healthMax) {
            this.setVal('health_current', healthMax);
        }
        this.setVal(`${this.getVal('load')}_Heart_${this.number}`, 'picked');
        this.scene.events.emit('healthChange');
        this.destroy();
    }

    setVal(prop, value) {
        this.scene.registry.set(prop, value);
    }

    getVal(val) {
        this.scene.registry.get(val);
    }
}