export class SimpleScene extends Phaser.Scene {
    preload() {
        this.load.image('cokecan', 'assets/cokecan.png');

    }

    create() {
        this.score = 0;
        this.player = this.physics.add.image(400, 300, 'cokecan');
        this.scoreText = this.add.text(100, 100, `score: ${this.score}`, { fontSize: '32px', fill: '#fff'});
        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.group({
            key: 'cokecan',
            repeat: 10,
            setXY: { x: 12, y: 0, stepX: 40 }
        });

        this.physics.add.overlap(this.player, this.stars, this.collide, null, this);
        this.physics.add.collider(this.player, this.stars);
    }

    collide() {
        this.score += 10;
        this.scoreText.setText(`score: ${this.score}`);
    }



    update() {

        const cursors = this.cursors;
        this.player.setVelocity(0);

        if (cursors.left.isDown) {
            this.player.setVelocityX(-300);
        }
        if(cursors.right.isDown) {
            this.player.setVelocityX(300);
        }
        if(cursors.up.isDown) {
            this.player.setVelocityY(-300);
        }
        if (cursors.down.isDown) {
            this.player.setVelocityY(300);
        }

    }
}