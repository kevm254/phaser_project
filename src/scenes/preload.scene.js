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
    /* ********************************** */
    // Constructor and Life-Cycle Methods
    /* ********************************** */
    function Preload() {
        return _super.call(this, { key: 'Preload' }) || this;
    }
    Preload.prototype.preload = function () {
        this.createBackground(0x2a0503);
        this.loadFullBar();
    };
    Preload.prototype.create = function () {
        this.initRegistry();
        this.launchScenes();
    };
    /* ********************************** */
    // General Methods
    /* ********************************** */
    Preload.prototype.launchScenes = function () {
        this.scene.launch('HUD');
        this.scene.start('Level');
    };
    Preload.prototype.initRegistry = function () {
        // game registry provides globals
        this.registry.set('newGame', true);
        this.registry.set('health_max', 4);
        this.registry.set('health_current', 4);
        this.registry.set('blessing_max', 20);
        this.registry.set('blessing_current', 20);
        this.registry.set('money_max', 50);
        this.registry.set('money_current', 0);
        this.registry.set('load', 'Level1');
        this.registry.set('spawn', 'spawnCenter');
    };
    Preload.prototype.loadFullBar = function () {
        var _this = this;
        this.loadText = this.add.text(100, 100, '0 %');
        this.fullBar = this.add.graphics();
        this.fullBar.fillStyle(0xda7a34, 1);
        this.fullBar.fillRect((this.cameras.main.width / 4) - 2, (this.cameras.main.height / 4) - 18, (this.cameras.main.width / 2) + 4, 20);
        this.progress = this.add.graphics();
        this.load.on('progress', function (val) {
            _this.loadText.setText(val * 100 + " %");
            _this.progress.clear();
            _this.progress.fillStyle(0xfff6d3, 1);
            _this.progress.fillRect((_this.cameras.main.width / 4), (_this.cameras.main.height / 4) - 16, (_this.cameras.main.width / 2) * val, 16);
        }, this);
        this.load.on('complete', function () {
            _this.progress.destroy();
            _this.fullBar.destroy();
            _this.loadText.destroy();
        }, this);
        this.load.pack('Preload', 'assets/pack.json', 'Preload');
    };
    Preload.prototype.createBackground = function (bgColor) {
        this.cameras.main.setBackgroundColor(bgColor);
    };
    return Preload;
}(Phaser.Scene));
export default Preload;
