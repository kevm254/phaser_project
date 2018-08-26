import Graphics = Phaser.GameObjects.Graphics;
import Text = Phaser.GameObjects.Text;

export default class Preload extends Phaser.Scene {
    fullBar: Graphics;
    progress: Graphics;
    loadText: Text;

    /* ********************************** */
    // Constructor and Life-Cycle Methods
    /* ********************************** */
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        // create background and prepare loading bar
        this.createBackground(0x2a0503);
        this.loadFullBar();

    }

    create()  {
        // this.add.text(100, 100, "You got my honey", { fontSize: '32px', fill: '#fff'});
        this.initRegistry();
        this.launchScenes();

    }
    /* ********************************** */
    // General Methods
    /* ********************************** */
    launchScenes() {
        this.scene.launch('HUD');
        this.scene.start('Level');
    }

    initRegistry() {
        // game registry provides globals
        this.registry.set('newGame', true);
        this.registry.set('health_max', 4);
        this.registry.set('health_current', 4);
        this.registry.set('blessing_max', 20);
        this.registry.set('blessing_current', 20);
        this.registry.set('money_max', 50);
        this.registry.set('money_current', 0);
        this.registry.set('load', 'Level1');
        this.registry.set('spawn', 'spawnCenter');

    }

    loadFullBar() {
        this.loadText = this.add.text(100, 100, '0 %');
        this.fullBar = this.add.graphics();
        this.fullBar.fillStyle(0xda7a34, 1);
        this.fullBar.fillRect((this.cameras.main.width / 4) -2, (this.cameras.main.height / 4) -18, (this.cameras.main.width /2) + 4, 20);
        this.progress = this.add.graphics();

        this.load.on('progress', (val: number) => {
            this.loadText.setText(`${val * 100} %`);
            this.progress.clear();
            this.progress.fillStyle(0xfff6d3, 1);
            this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height /4) -16, (this.cameras.main.width / 2) * val, 16);
        }, this);

        this.load.on('complete', () => {
            this.progress.destroy();
            this.fullBar.destroy();
            this.loadText.destroy();
        }, this);

        // this.load.pack('Preload', 'assets/pack.json', 'Preload');
    }


    createBackground(bgColor: any) {
        this.cameras.main.setBackgroundColor(bgColor);
    }
}
