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
var Preload = /** @class */ (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        return _super.call(this, { key: 'Preload' }) || this;
    }
    Preload.prototype.preload = function () {
        // create background and prepare loading bar
        this.cameras.main.setBackgroundColor(0x2a0503);
    };
    Preload.prototype.loadFullBar = function () {
        var _this = this;
        this.fullBar = this.add.graphics();
        this.fullBar.fillStyle(0xda7a34, 1);
        this.fullBar.fillRect((this.cameras.main.width / 4) - 2, (this.cameras.main.height / 2) - 18, (this.cameras.main.width / 2) + 4, 20);
        this.progress = this.add.graphics();
        this.load.on('progress', function (val) {
            _this.progress.clear();
            _this.progress.fillStyle(0xfff6d3, 1);
            _this.progress.fillRect((_this.cameras.main.width / 4), (_this.cameras.main.height / 2) - 16, (_this.cameras.main.width / 2) * val, 16);
        });
    };
    Preload.prototype.createBackground = function (bgColor) {
        this.cameras.main.setBackgroundColor(bgColor);
    };
    return Preload;
}(Phaser.Scene));
export default Preload;
