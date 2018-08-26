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
var HUD = /** @class */ (function (_super) {
    __extends(HUD, _super);
    function HUD() {
        return _super.call(this, {
            key: 'HUD'
        }) || this;
    }
    HUD.prototype.create = function () {
        this.health = this.add.text(1, 1, "Health: " + this.registry.get('health_current') + " / " + this.registry.get('health_max')).setScrollFactor(0);
        this.blessing = this.add.text(1, 18, "Blessing: " + this.registry.get('blessing_current') + " / " + this.registry.get('blessing_max'));
        this.money = this.add.text(1, 37, "Coins: " + this.registry.get('money_current') + " / " + this.registry.get('money_max'));
    };
    return HUD;
}(Phaser.Scene));
export default HUD;
