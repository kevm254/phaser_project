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
var Meat = /** @class */ (function (_super) {
    __extends(Meat, _super);
    function Meat(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'meat') || this;
        config.scene.physics.world.enable(_this);
        _this.scene = config.scene;
        _this.number = config.number;
        _this.sound = _this.scene.sound.add('meatSFX');
        _this.sound.setVolume(.2);
        _this.scene.add.existing(_this);
        return _this;
    }
    Meat.prototype.pickup = function () {
        this.sound.play();
        var health = this.scene.registry.get('health_current');
        if (health < this.scene.registry.get('health_max')) {
            this.scene.registry.set('health_current', health + 1);
        }
        this.scene.registry.set(this.scene.registry.get('load') + "_Meat_" + this.number, 'picked');
        this.scene.events.emit('healthChange');
        this.destroy();
    };
    return Meat;
}(Sprite));
export default Meat;
