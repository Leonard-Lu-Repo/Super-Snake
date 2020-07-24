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
    var Life = /** @class */ (function (_super) {
        __extends(Life, _super);
        // Constructor
        function Life(assetManager, imgString) {
            var _this = _super.call(this, assetManager, imgString) || this;
            _this.Start();
            return _this;
        }
        Life.prototype.Start = function () {
            this.setLifeLocation();
        };
        Life.prototype.Update = function () {
        };
        Life.prototype.Move = function () {
        };
        Life.prototype.ResetLifeLocation = function () {
            this.setLifeLocation();
        };
        Life.prototype.setLifeLocation = function () {
            var locationOk = false;
            while (!locationOk) {
                this.gridX = Math.round(Math.random() * 28 + 1);
                this.gridY = Math.round(Math.random() * 14 + 1);
                locationOk = true;
                // Cannot be in same position as other objects
                if (objects.Game.usedGridPositions.length > 0) {
                    for (var i = 0; i < objects.Game.usedGridPositions.length; i++) {
                        if (this.gridX == objects.Game.usedGridPositions[i].x && this.gridY == objects.Game.usedGridPositions[i].y) {
                            locationOk = false;
                        }
                    }
                }
            }
            this.coords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.coords[0];
            this.y = this.coords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        };
        Life.prototype.getGridCoords = function () {
            return new Array(this.gridX, this.gridY);
        };
        return Life;
    }(objects.GameObject));
    objects.Life = Life;
})(objects || (objects = {}));
//# sourceMappingURL=life.js.map