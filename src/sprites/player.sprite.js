var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'player') || this;
        config.scene.physics.world.enable(_this);
        _this.scene = config.scene;
        _this.body.setDrag(8, 8);
        _this.body.setBounce(.5, .5);
        _this.alive = true;
        _this.damaged = false;
        _this.input = _this.scene.input.keyboard.createCursorKeys();
        _this.canLoad = true;
        _this.noBlessingSound = _this.scene.sound.add('outOfMagicSFX');
        _this.noBlessingSound.setVolume(.4);
        _this.hurtSound = _this.scene.sound.add('playerDamageSFX');
        _this.hurtSound.setVolume(.4);
        _this.deathSound = _this.scene.sound.add('playerDeathSFX');
        _this.deathSound.setVolume(.4);
        _this.scene.input.on('pointermove', function (pointer) {
            var mouse = pointer;
            // this.scene.crosshair.setPosition(mouse.x + this.scene.cameras.main.scrollX, mouse.y + this.scene.cameras.main.scrollY);
        }, _this);
        return _this;
    }
    Player.prototype.update = function () {
        if (this.alive) {
            var healthCurrent = this.scene.registry.get('health_current');
            if (healthCurrent <= 0) {
                this.alive = false;
                this.setTint(0x2a0503);
                this.deathSound.play();
                this.scene.time.addEvent({ delay: 1000, callback: this.gameOver, callbackScope: this });
            }
        }
        // this.scene.physics.overlap(this, this.scene.pickups, this.pickup);
        this.setupMovement();
        this.checkOutOfBounds();
    };
    Player.prototype.setupMovement = function () {
        if (!this.damaged) {
            this.body.setVelocity(0);
        }
        if (this.input.left.isDown) {
            this.body.setVelocityX(-64);
        }
        else if (this.input.right.isDown) {
            this.body.setVelocityX(64);
        }
        if (this.input.up.isDown) {
            this.body.setVelocityY(-64);
        }
        else if (this.input.down.isDown) {
            this.body.setVelocityY(64);
        }
    };
    Player.prototype.checkOutOfBounds = function () { };
    Player.prototype.gameOver = function () { };
    return Player;
}(Phaser.GameObjects.Sprite));
export default Player;
