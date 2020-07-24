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
            var locationOk = false;
            while (!locationOk) {
                this.gridX = Math.round(Math.random() * 28 + 1);
                this.gridY = Math.round(Math.random() * 14 + 1);
                locationOk = true;
                // Mouse cannot be in same position as other objects
                if (objects.Game.usedGridPositions.length > 0) {
                    for (var i = 0; i < objects.Game.usedGridPositions.length; i++) {
                        if (this.gridX == objects.Game.usedGridPositions[i].x && this.gridY == objects.Game.usedGridPositions[i].y) {
                            locationOk = false;
                        }
                    }
                }
            }
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        };
        return Mouse;
    }(objects.GameObject));
    objects.Mouse = Mouse;
})(objects || (objects = {}));
//# sourceMappingURL=mouse.js.map