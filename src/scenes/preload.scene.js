export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        // create background and prepare loading bar
        this.cameras.main.setBackgroundColor(0x2a0503);
        this.full
    }

    createBackground(bgColor) {
        this.cameras.main.setBackgroundColor(bgColor);
    }
}
