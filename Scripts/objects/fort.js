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
    var Fort = /** @class */ (function (_super) {
        __extends(Fort, _super);
        // Constructor
        function Fort(assetManager, x, y) {
            var _this = _super.call(this, assetManager, "fort") || this;
            _this.x = x;
            _this.y = y;
            _this.bullets = new objects.Bullets(assetManager);
            _this.Start();
            return _this;
        }
        Fort.prototype.Start = function () {
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        };
        Fort.prototype.Update = function () {
        };
        Fort.prototype.Move = function () {
        };
        return Fort;
    }(objects.GameObject));
    objects.Fort = Fort;
})(objects || (objects = {}));
//# sourceMappingURL=fort.js.map