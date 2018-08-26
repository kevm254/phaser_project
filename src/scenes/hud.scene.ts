import BitmapText = Phaser.GameObjects.BitmapText;
import Text = Phaser.GameObjects.Text;

export default class HUD extends Phaser.Scene {
    health: Text;
    text: Text;
    blessing: Text;
    money: Text;

    constructor() {
        super({
            key: 'HUD'
        });
    }

    create() {
        this.health = this.add.text(1, 1, `Health: ${this.registry.get('health_current')} / ${this.registry.get('health_max')}`).setScrollFactor(0);
        this.blessing = this.add.text(1, 18, `Blessing: ${this.registry.get('blessing_current')} / ${this.registry.get('blessing_max')}`);
        this.money = this.add.text(1, 37, `Coins: ${this.registry.get('money_current')} / ${this.registry.get('money_max')}`);
    }
}