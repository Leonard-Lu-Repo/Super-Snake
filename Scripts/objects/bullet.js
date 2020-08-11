var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Bullets = /** @class */ (function (_super) {
        __extends(Bullets, _super);
        // Constructor
        function Bullets(assetManager) {
            var _this = _super.call(this, assetManager, "bullet") || this;
            _this.Start();
            return _this;
        }
        Bullets.prototype.Start = function () {
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        };
        Bullets.prototype.Update = function () {
        };
        Bullets.prototype.Move = function () {
        };
        return Bullets;
    }(objects.GameObject));
    objects.Bullets = Bullets;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map