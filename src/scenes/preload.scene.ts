import Graphics = Phaser.GameObjects.Graphics;

export default class Preload extends Phaser.Scene {
    fullBar: Graphics;
    progress: Graphics;

    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        // create background and prepare loading bar
        this.cameras.main.setBackgroundColor(0x2a0503);
    }

    loadFullBar() {
        this.fullBar = this.add.graphics();
        this.fullBar.fillStyle(0xda7a34, 1);
        this.fullBar.fillRect((this.cameras.main.width / 4) -2, (this.cameras.main.height / 2) -18, (this.cameras.main.width /2) + 4, 20);
        this.progress = this.add.graphics();

        this.load.on('progress', (val: number) => {
            this.progress.clear();
            this.progress.fillStyle(0xfff6d3, 1);
            this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height /2) -16, (this.cameras.main.width / 2) * val, 16);
        })
    }

    createBackground(bgColor: any) {
        this.cameras.main.setBackgroundColor(bgColor);
    }
}
