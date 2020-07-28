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
    var Catch = /** @class */ (function (_super) {
        __extends(Catch, _super);
        // Constructor
        function Catch(assetManager) {
            var _this = _super.call(this, assetManager, "eaglecatchsnake") || this;
            _this.caught = false;
            _this.Start();
            return _this;
        }
        Catch.prototype.Start = function () {
        };
        Catch.prototype.Update = function () {
            if (this.caught) {
                this.x += 1;
                this.y -= 5;
            }
        };
        Catch.prototype.Catch = function (xPos, yPos) {
            this.x = xPos;
            this.y = yPos;
            this.caught = true;
        };
        Catch.prototype.Dispear = function () {
            this.x = -500;
            this.y = -500;
            this.caught = false;
        };
        return Catch;
    }(objects.GameObject));
    objects.Catch = Catch;
})(objects || (objects = {}));
//# sourceMappingURL=eaglecatch.js.map