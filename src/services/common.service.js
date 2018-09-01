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
var CommonService = /** @class */ (function (_super) {
    __extends(CommonService, _super);
    function CommonService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonService.createBackground = function (bgColor) {
        // this.cameras.main.setBackgroundColor(bgColor);
    };
    return CommonService;
}(Phaser.Scene));
export default CommonService;
