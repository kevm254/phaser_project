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
var Fireball = /** @class */ (function (_super) {
    __extends(Fireball, _super);
    function Fireball(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'fireball') || this;
        config.scene.physics.world.enable(_this);
        _this.scene = config.scene;
        _this.damage = 1;
        _this.sound = _this.scene.sound.add('fireballSFX');
        _this.sound.setVolume(.2);
        _this.sound.play();
        _this.wallSound = _this.scene.sound.add('fireballWallSFX');
        _this.wallSound.setVolume(.2);
        _this.enemySound = _this.scene.sound.add('fireballEnemySFX');
        _this.enemySound.setVolume(.2);
        _this.scene.add.existing(_this);
        _this.scene.physics.moveTo(_this, _this.scene.crosshair.x, _this.scene.crosshair.y);
        _this.particles = _this.scene.add.particles('atlas', 'whiteParticle');
        _this.emitter = _this.particles.createEmitter();
        _this.emitter.setPosition(_this.x, _this.y);
        _this.emitter.setSpeed(19);
        _this.emitter.setBlendMode(Phaser.BlendModes.ADD);
        return _this;
    }
    Fireball.prototype.update = function () {
        this.emitter.setPosition(this.x, this.y);
    };
    Fireball.prototype.wallCollide = function () {
        this.emitter.explode(64, this.x, this.y);
        this.wallSound.play();
        this.destroy();
    };
    Fireball.prototype.fireballCollide = function () {
        this.emitter.explode(64, this.x, this.y);
        this.wallSound.play();
        this.destroy();
    };
    Fireball.prototype.enemyCollide = function (enemy) {
        this.emitter.explode(32, this.x, this.y);
        this.enemySound.play();
        enemy.damage(this.damage);
        this.destroy();
    };
    return Fireball;
}(Phaser.GameObjects.Sprite));
export default Fireball;
