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
import Enemy from './enemy.sprite';
import Meat from './meat.sprite';
import Potion from './potion.sprite';
var Slime = /** @class */ (function (_super) {
    __extends(Slime, _super);
    function Slime(config) {
        var _this = _super.call(this, config) || this;
        _this.setFrame('slime');
        _this.number;
        _this.health = 2;
        _this.deathSound = _this.scene.sound.add('slimeDeathSFX');
        _this.deathSound.setVolume(.4);
        _this.detectionDistance = 48;
        _this.walk = 8;
        _this.run = 16;
        return _this;
    }
    Slime.prototype.deathRegister = function () {
        this.scene.registry.set(this.scene.registry.get('load') + "_Slime_" + this.number, 'dead');
    };
    Slime.prototype.dropLoot = function () {
        var decision = Phaser.Math.RND.integerInRange(1, 20);
        if (decision <= 2) {
            var potion = new Potion({
                scene: this.scene,
                x: this.x,
                y: this.y,
                number: 0
            });
            this.scene.pickups.add(potion);
            this.dropSound.play();
        }
        else if (decision > 2 && decision <= 4) {
            var meat = new Meat({
                scene: this.scene,
                x: this.x,
                y: this.y,
                number: 0
            });
            this.scene.pickups.add(meat);
            this.dropSound.play();
        }
    };
    return Slime;
}(Enemy));
export default Slime;
