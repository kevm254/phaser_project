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
import Meat from './meat.sprite';
import Potion from './potion.sprite';
import Jug from './jug.sprite';
import Heart from './heart.sprite';
var Sprite = Phaser.GameObjects.Sprite;
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'enemy') || this;
        config.scene.physics.world.enable(_this);
        _this.scene = config.scene;
        _this.number = config.number;
        _this.body.setDrag(8, 8);
        _this.body.setBounce(.5, .5);
        _this.health = 4;
        _this.alive = true;
        _this.attack = 1;
        _this.damaged = false;
        _this.canExclaim = true;
        _this.exclaimSound = _this.scene.sound.add('enemyExclaim');
        _this.exclaimSound.setVolume(.2);
        _this.exclamation = _this.scene.add.image(_this.x, _this.y - 10, 'atlas', 'exclamation');
        _this.exclamation.alpha = 0;
        _this.playerDetected = false;
        _this.detectionDistance = 64;
        _this.canDecide = true;
        _this.moveX = 'none';
        _this.moveY = 'none';
        _this.walk = 16;
        _this.run = 32;
        _this.deathSound = _this.scene.sound.add('enemyDeathSFX');
        _this.deathSound.setVolume(.4);
        _this.dropSound = _this.scene.sound.add('itemDropSFX');
        _this.dropSound.setVolume(.2);
        _this.scene.add.existing(_this);
        return _this;
    }
    Enemy.prototype.update = function () {
        if (this.alive) {
            this.exclamation.setPosition(this.x, this.y - 12);
            this.playerDetected = this.detectPlayer();
            if (!this.damaged) {
                if (this.playerDetected) {
                    if (this.canExclaim) {
                        this.canExclaim = false;
                        this.exclaimSound.play();
                        this.exclamation.alpha = 1;
                        this.scene.time.addEvent({ delay: 500, callback: this.hideExclaim, callbackScope: this });
                    }
                    this.detectBehavior();
                }
                else {
                    if (!this.canExclaim) {
                        this.canExclaim = true;
                    }
                    if (this.canDecide) {
                        this.canDecide = false;
                        this.scene.time.addEvent({ delay: 500, callback: this.resetDecide, callbackScope: this });
                        var decisionX = Phaser.Math.RND.integerInRange(1, 4);
                        if (decisionX === 1 || decisionX === 2) {
                            this.moveX = 'none';
                        }
                        else if (decisionX === 3) {
                            this.moveX = 'left';
                        }
                        else if (decisionX === 4) {
                            this.moveX = 'right';
                        }
                        var decisionY = Phaser.Math.RND.integerInRange(1, 4);
                        if (decisionY === 1 || decisionY === 2) {
                            this.moveY = 'none';
                        }
                        else if (decisionY === 3) {
                            this.moveY = 'up';
                        }
                        else if (decisionY === 4) {
                            this.moveY = 'down';
                        }
                    }
                }
                this.movement();
            }
            if (this.health <= 0) {
                this.deathSound.play();
                this.alive = false;
                this.setTint(0x2a0503);
                this.scene.time.addEvent({ delay: 1000, callback: this.eliminate, callbackScope: this });
            }
            // hide if out of bounds
            if (this.x > this.scene.physics.world.bounds.width) {
                this.setAlpha(0);
            }
            else if (this.x < 0) {
                this.setAlpha(0);
            }
            else if (this.y > this.scene.physics.world.bounds.height) {
                this.setAlpha(0);
            }
            else if (this.y < 0) {
                this.setAlpha(0);
            }
            else {
                this.setAlpha(1);
            }
        }
    };
    Enemy.prototype.detectPlayer = function () {
        this.distanceToPlayerX = Math.abs(this.x - this.scene.player.x);
        this.distanceToPlayerY = Math.abs(this.y - this.scene.player.y);
        return (this.distanceToPlayerY <= this.detectionDistance) && (this.distanceToPlayerX <= this.detectionDistance) && this.scene.player.alive && !this.scene.player.damaged;
    };
    Enemy.prototype.detectBehavior = function () {
        if (this.x > this.scene.player.x) {
            this.moveX = 'left';
        }
        else if (this.x < this.scene.player.x) {
            this.moveX = 'right';
        }
        else {
            this.moveX = 'none';
        }
        if (this.y > this.scene.player.y) {
            this.moveY = 'up';
        }
        else if (this.y < this.scene.player.y) {
            this.moveY = 'down';
        }
        else {
            this.moveY = 'none';
        }
    };
    Enemy.prototype.movement = function () {
        var speed;
        if (this.playerDetected) {
            speed = this.run;
        }
        else {
            speed = this.walk;
        }
        if (this.moveX === 'none') {
            this.body.setVelocityX(0);
        }
        else if (this.moveX === 'left') {
            this.body.setVelocityX(-speed);
        }
        else if (this.moveX === 'right') {
            this.body.setVelocityX(speed);
        }
        if (this.moveY === 'none') {
            this.body.setVelocityY(0);
        }
        else if (this.moveY === 'up') {
            this.body.setVelocityY(-speed);
        }
        else if (this.moveY === 'down') {
            this.body.setVelocityY(speed);
        }
    };
    Enemy.prototype.resetDecide = function () {
        this.canDecide = true;
    };
    Enemy.prototype.damage = function (amount) {
        if (!this.damaged) {
            this.health -= amount;
            this.damaged = true;
            this.setTint(0x8e2f15);
            this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this });
        }
    };
    Enemy.prototype.normalize = function () {
        this.damaged = false;
        this.setTint(0xffffff);
    };
    Enemy.prototype.hideExclaim = function () {
        this.exclamation.alpha = 0;
    };
    Enemy.prototype.eliminate = function () {
        this.deathRegister();
        this.exclamation.destroy();
        this.dropLoot();
        this.destroy();
    };
    Enemy.prototype.deathRegister = function () {
        this.setProp(this.getProp('load') + "_Enemies_" + this.number, 'dead');
    };
    Enemy.prototype.dropLoot = function () {
        var decision = Phaser.Math.RND.integerInRange(1, 20);
        if (decision === 1) {
            var heart = new Heart({
                scene: this.scene,
                x: this.x,
                y: this.y,
                number: 0
            });
            this.scene.pickups.add(heart);
            this.dropSound.play();
        }
        else if (decision === 2) {
            var jug = new Jug({
                scene: this.scene,
                x: this.x,
                y: this.y,
                number: 0
            });
            this.scene.pickups.add(jug);
            this.dropSound.play();
        }
        else if (decision > 2 && decision <= 6) {
            var potion = new Potion({
                scene: this.scene,
                x: this.x,
                y: this.y,
                number: 0
            });
            this.scene.pickups.add(potion);
            this.dropSound.play();
        }
        else if (decision > 6 && decision <= 10) {
            var meat = new Meat({
                scene: this.scene,
                x: this.x,
                y: this.y,
                number: 0
            });
            this.scene.pickups.add(meat);
            this.dropSound.play();
        }
    };
    Enemy.prototype.setProp = function (key, val) {
        this.scene.registry.set(key, val);
    };
    Enemy.prototype.getProp = function (val) {
        this.scene.registry.get(val);
    };
    return Enemy;
}(Sprite));
export default Enemy;
