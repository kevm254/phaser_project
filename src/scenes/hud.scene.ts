import BitmapText = Phaser.GameObjects.BitmapText;
import Text = Phaser.GameObjects.Text;

export default class HUD extends Phaser.Scene {
    health: Text;
    text: Text;
    blessing: Text;
    money: Text;
    alarmed;
    healthAlarm;

    constructor() {
        super({
            key: 'HUD'
        });
    }

    create() {
        this.health = this.add.text(1, 1, `Health: ${this.registry.get('health_current')} / ${this.registry.get('health_max')}`).setScrollFactor(0);
        this.blessing = this.add.text(1, 18, `Blessing: ${this.registry.get('blessing_current')} / ${this.registry.get('blessing_max')}`);
        this.money = this.add.text(1, 37, `Coins: ${this.registry.get('money_current')} / ${this.registry.get('money_max')}`);
        this.money.setOrigin(1, 0);

        this.healthAlarm = this.sound.add('lowHealthSFX');
        this.healthAlarm.setVolume(.2);
        this.healthAlarm.setLoop(true);
        this.alarmed = false;

        const level = this.scene.get('Level');
        level.events.on('coinChange', this.updateCoins, this);
        level.events.on('healthChange', this.updateHealth, this);
        level.events.on('blessingChange', this.updateBlessing, this);

        level.events.on('gameOver', this.gameOver, this);
    }

    updateCoins() {
        this.money.setText(`Money: ${this.registry.get('money_current')} / ${this.registry.get('money_max')}`);
    }

    updateHealth() {
        this.health.setText(`Health: ${this.registry.get('health_current')} / ${this.registry.get('health_max')} `);

        if (this.registry.get('health_current') <= 1 && !this.alarmed) {
            this.alarmed = true;
            this.healthAlarm.play();
        }
    }

    updateBlessing() {}

    gameOver() {}
}