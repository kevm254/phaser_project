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
var Potion = /** @class */ (function (_super) {
    __extends(Potion, _super);
    function Potion(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'potion') || this;
        config.scene.physics.world.enable(_this);
        _this.scene = config.scene;
        _this.number = config.number;
        _this.sound = _this.scene.sound.add('potionSFX');
        _this.sound.setVoluem(.2);
        _this.scene.add.existing(_this);
        return _this;
    }
    Potion.prototype.pickup = function () {
        this.sound.play();
        var blessing = this.scene.registry.get('blessing_current');
        if (blessing < this.scene.registry.get('blessing_max')) {
            this.scene.registry.set('blessing_current', blessing + 5);
        }
        blessing = this.scene.registry.get('blessing_current');
        if (blessing > this.scene.registry.get('blessing_max')) {
            this.scene.registry.set('blessing_current', this.scene.registry.get('blessing_max'));
        }
        this.scene.registry.set(this.scene.registry.get('load') + "_Potion_" + this.number, 'picked');
        this.scene.events.emit('magicChange');
        this.destroy();
    };
    return Potion;
}(Sprite));
export default Potion;
