const Sprite = Phaser.GameObjects.Sprite;

export default class Potion extends Sprite {
    scene;
    number;
    sound;

    constructor(config) {
        super(config.scene, config.x, config.y, 'atlas', 'potion');

        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        this.number = config.number;
        this.sound = this.scene.sound.add('potionSFX');
        this.sound.setVoluem(.2);
        this.scene.add.existing(this);
    }

    pickup() {
        this.sound.play();

        let blessing = this.scene.registry.get('blessing_current');
        if (blessing < this.scene.registry.get('blessing_max')) {
            this.scene.registry.set('blessing_current', blessing + 5);
        }

        blessing = this.scene.registry.get('blessing_current');

        if(blessing > this.scene.registry.get('blessing_max')) {
            this.scene.registry.set('blessing_current', this.scene.registry.get('blessing_max'));
        }

        this.scene.registry.set(`${this.scene.registry.get('load')}_Potion_${this.number}`, 'picked');
        this.scene.events.emit('magicChange');
        this.destroy();
    }


}