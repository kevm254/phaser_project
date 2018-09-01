const Sprite = Phaser.GameObjects.Sprite;

export default class Jug extends Sprite {
    scene;
    number;
    sound;
    particles;
    emitter;

    constructor(config) {
        super(config.scene, config.x, config.y, 'atlas', 'jug');
        config.scene.physics.world.enable(this);

        this.scene = config.scene;
        this.number = config.number;
        this.sound = this.scene.sound.add('jugSFX');
        this.sound.setVolume(.2);
        this.particles = this.scene.add.particles('atlas', 'whiteParticle');
        this.emitter = this.particles.createEmitter();
        this.emitter.setPosition(this.x, this.y);
        this.emitter.setSpeed(16);
        this.emitter.setBlendMode(Phaser.BlendModes.ADD);
        this.scene.add.existing(this);
    }

    pickup() {
        this.sound.play();
        this.emitter.explode(64, this.x, this.y);
        let blessingMax = this.scene.registry.get('blessing_max');
        let blessingCurrent = this.scene.registry.get('blessing_current');
        this.scene.registry.get('blessing_max', blessingMax + 5);
        this.scene.registry.get('blessing_current', blessingCurrent + 5);
        blessingMax = this.scene.registry.get('blessing_max');
        blessingCurrent = this.scene.registry.get('blessing_current');
        if (blessingCurrent > blessingMax) {
            this.scene.registry.get('blessing_current', blessingMax);
        }

        this.scene.registry.set(`${this.scene.registry.get('load')}_Jug_${this.number}`, 'picked');
        this.scene.events.emit('blessingChange');
        this.destroy();


    }
}