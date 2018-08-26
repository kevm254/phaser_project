// import Player from '../sprites/player';
// import Enemy from '../sprites/enemy';
// import Slime from '../sprites/slime';
// import Coins from '../sprites/coins';
// import Meat from '../sprites/meat';
// import Potion from '../sprites/potion';
// import Jug from '../sprites/jug';
// import Heart from '../sprites/heart';
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
var Level = /** @class */ (function (_super) {
    __extends(Level, _super);
    function Level() {
        return _super.call(this, {
            key: 'Level'
        }) || this;
    }
    Level.prototype.create = function () {
        this.cameras.main.setBackgroundColor(0x2a0503);
        var load = this.registry.get('load');
        // this.music = this.sound.add(`${load}Music`);
        // this.music.play();
        this.map = this.make.tilemap({ key: load + "Map" });
        this.tileset = this.map.addTilesetImage('tiles');
        this.layer = this.map.createStaticLayer('tileLayer', this.tileset, 0, 0);
        // this.layer.setCollisionByProperty({ collide: true });
    };
    Level.prototype.update = function () {
    };
    return Level;
}(Phaser.Scene));
export default Level;
