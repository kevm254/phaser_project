var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        _this.initSounds();
        _this.initListeners();
        _this.scene.add.existing(_this);
        return _this;
    }
    Player.prototype.initSounds = function () {
        this.noBlessingSound = this.scene.sound.add('outOfMagicSFX');
        this.noBlessingSound.setVolume(.4);
        this.hurtSound = this.scene.sound.add('playerDamageSFX');
        this.hurtSound.setVolume(.4);
        this.deathSound = this.scene.sound.add('playerDeathSFX');
        this.deathSound.setVolume(.4);
    };
    Player.prototype.initListeners = function () {
        var _this = this;
        this.scene.input.on('pointermove', function (pointer) {
            var mouse = pointer;
            _this.scene.crosshair.setPosition(mouse.x + _this.scene.cameras.main.scrollX, mouse.y + _this.scene.cameras.main.scrollY);
        }, this);
    };
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
    Player.prototype.checkOutOfBounds = function () {
        if (this.canLoad) {
            if (this.x > this.scene.physics.world.bounds.width) {
                this.scene.registry.set('load', this.scene.map.properties.loadRight);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnRight);
                this.canLoad = false;
                this.scene.end('restart');
            }
            else if (this.x < 0) {
                this.scene.registry.set('load', this.scene.map.properties.loadLeft);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnLeft);
                this.canLoad = false;
                this.scene.end('restart');
            }
            else if (this.y > this.scene.physics.world.bounds.height) {
                this.scene.registry.set('load', this.scene.map.properties.loadDown);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnDown);
                this.canLoad = false;
                this.scene.end('restart');
            }
            else if (this.y < 0) {
                this.scene.registry.set('load', this.scene.map.properties.loadUp);
                this.scene.registry.set('spawn', this.scene.map.properties.spawnUp);
                this.canLoad = false;
                this.scene.end('restart');
            }
        }
    };
    Player.prototype.pickup = function (player, object) {
        object.pickup();
    };
    Player.prototype.damage = function (amount) {
        if (!this.damaged && this.alive) {
            this.hurtSound.play();
            this.scene.cameras.main.shake(32);
            this.damaged = true;
            var health = this.scene.registry.get('health_current');
            this.scene.registry.set('health_current', health - amount);
            this.scene.events.emit('healthChange');
            this.setTint(0x8e2f15);
            this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this });
        }
    };
    Player.prototype.gameOver = function () {
        this.scene.add('gameOver');
    };
    Player.prototype.normalize = function () {
        if (this.alive) {
            this.damaged = false;
            this.setTint(0xffffff);
        }
    };
    return Player;
}(Phaser.GameObjects.Sprite));
export default Player;
