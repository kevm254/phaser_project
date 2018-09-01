const Sprite = Phaser.GameObjects.Sprite;

export default class DarkFireball extends Sprite {
    scene;
    damage;
    sound;
    wallSound;
    playerSound;
    particles;
    emitter;

    constructor(config) {
        super(config.scene, config.x, config.y, 'atlas', 'darkFireball');
        this.scene = config.scene;

        this.configPhysics(config);
        this.setDamage(1);
        this.setupSound(this.scene);

        this.scene.add.existing(this);
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y);

        this.setupParticles();
    }

    configPhysics(config) {
        config.scene.physics.world.enable(this);
    }

    setDamage(damage) {
        this.damage = damage;

    }

    setupSound(scene) {
        this.sound = scene.sound.add('fireballSFX');
        this.sound.setVolume(.2);
        this.sound.play();

        this.wallSound = scene.sound.add('fireballWallSFX');
        this.wallSound.setVolume(.2);

        this.playerSound = scene.sound.add('fireballEnemySFX');
        this.playerSound.setVolume(.2);
    }

    setupParticles() {
        this.particles = this.scene.add.particles('atlas', 'darkParticle');
        this.emitter = this.particles.createEmitter();
        this.emitter.setPosition(this.x, this.y);
        this.emitter.setSpeed(16);
    }

    update() {
        this.emitter.setPosition(this.x, this.y);
    }

    wallCollide() {
        this.emitter.explode(64, this.x, this.y);
        this.wallSound.play();
        this.destroy();
    }

    fireballCollide() {
        this.emitter.explode(64, this.x, this.y);
        this.wallSound.play();
        this.destroy();
    }

    playerCollide(player) {
        this.emitter.explode(32, this.x, this.y);
        this.playerSound.play();
        player.damage(this.damage);
        this.destroy();
    }
}