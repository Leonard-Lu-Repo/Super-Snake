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
    var Mouse = /** @class */ (function (_super) {
        __extends(Mouse, _super);
        // Constructor
        function Mouse(assetManager) {
            var _this = _super.call(this, assetManager, "Mouse") || this;
            _this.Start();
            return _this;
        }
        Mouse.prototype.Start = function () {
            this.x = 200;
            this.y = 200;
        };
        Mouse.prototype.Update = function () {
            //   this.Move();
            this.CheckBound();
        };
        Mouse.prototype.Reset = function () { };
        Mouse.prototype.Move = function () {
            // I need a reference to the "STAGE" createjs object to get mouse position
            this.x = objects.Game.stage.mouseX;
            // This will eventually be replaced with keyboard input
            // Maybe xbox controller....maybe...
        };
        Mouse.prototype.CheckBound = function () { };
        return Mouse;
    }(objects.GameObject));
    objects.Mouse = Mouse;
})(objects || (objects = {}));
//# sourceMappingURL=mouse.js.map