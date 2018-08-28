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
import Player from '../sprites/player.sprite';
var Level = /** @class */ (function (_super) {
    __extends(Level, _super);
    function Level() {
        var _this = _super.call(this, {
            key: 'Level'
        }) || this;
        _this.spawnPoints = [];
        return _this;
    }
    Level.prototype.create = function () {
        var load = this.registry.get('load');
        this.cameras.main.setBackgroundColor(0x2a0503);
        this.setupMusic();
        this.map = this.make.tilemap({ key: load + "Map" });
        this.tileset = this.map.addTilesetImage('tiles');
        this.layer = this.map.createStaticLayer('tileLayer', this.tileset, 0, 0);
        // this.layer.setCollisionByProperty({ collide: true });
        this.convertObjects();
        var spawn = this.spawnPoints[this.registry.get('spawn')];
        alert(JSON.stringify(spawn));
        this.player = new Player({
            scene: this,
            x: spawn.x,
            y: spawn.y
        });
        this.newGame();
    };
    Level.prototype.update = function () {
    };
    /* ***************** */
    // General Methods
    /* ***************** */
    Level.prototype.setupMusic = function () {
        var load = this.registry.get('load');
        // this.music = this.sound.add(`${load}Music`);
        this.music = this.sound.add('testMusic');
        this.music.play(null, { loop: true });
    };
    Level.prototype.convertObjects = function () {
        var _this = this;
        var objects = this.map.getObjectLayer('objects');
        var level = this.registry.get('load');
        console.dir(objects);
        objects.objects.forEach(function (object) {
            if (object.type === 'spawn') {
                _this.spawnPoints[object.name] = {
                    x: object.x + 8,
                    y: object.y + 8
                };
            }
        });
    };
    Level.prototype.newGame = function () {
        var _this = this;
        this.registry.set('newGame', false);
        this.text = this.add.text(this.player.x, this.player.y - 32, 'Press Arrow keys to move');
        this.text.setOrigin(.5);
        this.time.addEvent({
            delay: 6000,
            callback: function () {
                _this.text.destroy();
            }
        });
    };
    return Level;
}(Phaser.Scene));
export default Level;
