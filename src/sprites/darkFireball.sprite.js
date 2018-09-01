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
var Sprite = Phaser.GameObjects.Sprite;
var DarkFireball = /** @class */ (function (_super) {
    __extends(DarkFireball, _super);
    function DarkFireball(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'darkFireball') || this;
        _this.scene = config.scene;
        _this.configPhysics(config);
        _this.setDamage(1);
        _this.setupSound(_this.scene);
        _this.scene.add.existing(_this);
        _this.scene.physics.moveTo(_this, _this.scene.player.x, _this.scene.player.y);
        _this.setupParticles();
        return _this;
    }
    DarkFireball.prototype.configPhysics = function (config) {
        config.scene.physics.world.enable(this);
    };
    DarkFireball.prototype.setDamage = function (damage) {
        this.damage = damage;
    };
    DarkFireball.prototype.setupSound = function (scene) {
        this.sound = scene.sound.add('fireballSFX');
        this.sound.setVolume(.2);
        this.sound.play();
        this.wallSound = scene.sound.add('fireballWallSFX');
        this.wallSound.setVolume(.2);
        this.playerSound = scene.sound.add('fireballEnemySFX');
        this.playerSound.setVolume(.2);
    };
    DarkFireball.prototype.setupParticles = function () {
        this.particles = this.scene.add.particles('atlas', 'darkParticle');
        this.emitter = this.particles.createEmitter();
        this.emitter.setPosition(this.x, this.y);
        this.emitter.setSpeed(16);
    };
    DarkFireball.prototype.update = function () {
        this.emitter.setPosition(this.x, this.y);
    };
    DarkFireball.prototype.wallCollide = function () {
        this.emitter.explode(64, this.x, this.y);
        this.wallSound.play();
        this.destroy();
    };
    DarkFireball.prototype.fireballCollide = function () {
        this.emitter.explode(64, this.x, this.y);
        this.wallSound.play();
        this.destroy();
    };
    DarkFireball.prototype.playerCollide = function (player) {
        this.emitter.explode(32, this.x, this.y);
        this.playerSound.play();
        player.damage(this.damage);
        this.destroy();
    };
    return DarkFireball;
}(Sprite));
export default DarkFireball;
