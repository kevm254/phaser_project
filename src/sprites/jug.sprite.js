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
var Jug = /** @class */ (function (_super) {
    __extends(Jug, _super);
    function Jug(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'jug') || this;
        config.scene.physics.world.enable(_this);
        _this.scene = config.scene;
        _this.number = config.number;
        _this.sound = _this.scene.sound.add('jugSFX');
        _this.sound.setVolume(.2);
        _this.particles = _this.scene.add.particles('atlas', 'whiteParticle');
        _this.emitter = _this.particles.createEmitter();
        _this.emitter.setPosition(_this.x, _this.y);
        _this.emitter.setSpeed(16);
        _this.emitter.setBlendMode(Phaser.BlendModes.ADD);
        _this.scene.add.existing(_this);
        return _this;
    }
    Jug.prototype.pickup = function () {
        this.sound.play();
        this.emitter.explode(64, this.x, this.y);
        var blessingMax = this.scene.registry.get('blessing_max');
        var blessingCurrent = this.scene.registry.get('blessing_current');
        this.scene.registry.get('blessing_max', blessingMax + 5);
        this.scene.registry.get('blessing_current', blessingCurrent + 5);
        blessingMax = this.scene.registry.get('blessing_max');
        blessingCurrent = this.scene.registry.get('blessing_current');
        if (blessingCurrent > blessingMax) {
            this.scene.registry.get('blessing_current', blessingMax);
        }
        this.scene.registry.set(this.scene.registry.get('load') + "_Jug_" + this.number, 'picked');
        this.scene.events.emit('blessingChange');
        this.destroy();
    };
    return Jug;
}(Sprite));
export default Jug;
