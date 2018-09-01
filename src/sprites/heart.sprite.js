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
var Heart = /** @class */ (function (_super) {
    __extends(Heart, _super);
    function Heart(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'heart') || this;
        _this.initPhysics(config);
        _this.scene = config.scene;
        _this.number = config.number;
        _this.sound = _this.scene.sound.add('heartSFX');
        _this.sound.setVolume(.2);
        _this.scene.add.existing(_this);
        return _this;
    }
    Heart.prototype.initPhysics = function (config) {
        config.scene.physics.world.enable(this);
    };
    Heart.prototype.pickup = function () {
        this.sound.play();
        var healthCurrent = this.scene.registry.get('health_current');
        var healthMax = this.scene.registry.get('health_max');
        this.setVal('health_current', healthCurrent + 1);
        this.setVal('health_max', healthMax + 1);
        healthCurrent = this.getVal('health_current');
        healthMax = this.getVal('health_max');
        if (healthCurrent > healthMax) {
            this.setVal('health_current', healthMax);
        }
        this.setVal(this.getVal('load') + "_Heart_" + this.number, 'picked');
        this.scene.events.emit('healthChange');
        this.destroy();
    };
    Heart.prototype.setVal = function (prop, value) {
        this.scene.registry.set(prop, value);
    };
    Heart.prototype.getVal = function (val) {
        this.scene.registry.get(val);
    };
    return Heart;
}(Sprite));
export default Heart;
