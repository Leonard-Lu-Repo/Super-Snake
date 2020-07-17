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
            var _this = _super.call(this, assetManager, "mouse") || this;
            _this.mouseCollision = false;
            _this.Start();
            return _this;
        }
        Mouse.prototype.Start = function () {
            this.setMouseLocation();
        };
        Mouse.prototype.Update = function () {
        };
        Mouse.prototype.Move = function () {
        };
        Mouse.prototype.ResetMouseLocation = function () {
            this.setMouseLocation();
        };
        //To set new location of mouse
        Mouse.prototype.setMouseLocation = function () {
            this.gridX = Math.round(Math.random() * 30 + 1);
            this.gridY = Math.round(Math.random() * 21 + 1);
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            objects.Game.currentMouseGridPos = new Array(this.gridX, this.gridY); // Update the global variable
        };
        return Mouse;
    }(objects.GameObject));
    objects.Mouse = Mouse;
})(objects || (objects = {}));
//# sourceMappingURL=mouse.js.map