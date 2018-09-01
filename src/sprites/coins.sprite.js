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
var Coins = /** @class */ (function (_super) {
    __extends(Coins, _super);
    function Coins(config) {
        var _this = _super.call(this, config.scene, config.x, config.y, 'atlas', 'coins') || this;
        config.scene.physics.world.enable(_this);
        _this.scene = config.scene;
        _this.number = config.number;
        _this.sound = _this.scene.sound.add('coinSFX');
        _this.sound.setVolume(.4);
        _this.scene.add.existing(_this);
        return _this;
    }
    Coins.prototype.pickup = function () {
        this.sound.play();
        var coins = this.scene.registry.get('coins_current');
        this.scene.registry.set('coins_current', coins + 1);
        this.scene.registry.set(this.scene.registry.get('load') + "_Coins_" + this.number, 'picked');
        this.scene.events.emit('coinChange');
        this.destroy();
    };
    return Coins;
}(Phaser.GameObjects.Sprite));
export default Coins;
