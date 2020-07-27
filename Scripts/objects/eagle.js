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
    var Eagle = /** @class */ (function (_super) {
        __extends(Eagle, _super);
        // Constructor
        function Eagle(assetManager) {
            var _this = _super.call(this, assetManager, "eagle") || this;
            _this.offsetX = 0.005;
            _this.offsetY = 0.01;
            _this.Start();
            return _this;
        }
        // Methods
        Eagle.prototype.Start = function () {
            this.Reset();
        };
        Eagle.prototype.Update = function () {
            this.Move();
            this.CheckBound();
            // console.log("eagle move a step: "+this.gridX + ", " + this.gridY);
        };
        Eagle.prototype.Reset = function () {
            this.gridX = 0;
            this.gridY = -10;
            this.offsetX = 0.005;
            this.offsetY = 0.01;
        };
        Eagle.prototype.Move = function () {
            this.gridX += this.offsetX;
            this.gridY += this.offsetY;
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        };
        Eagle.prototype.CheckBound = function () {
            if (this.gridY >= 15) {
                this.offsetY = -0.01;
            }
            if (this.gridX >= 60) {
                this.Reset();
            }
        };
        Eagle.prototype.getGridCoords = function () {
            return new Array(this.gridX, this.gridY);
        };
        return Eagle;
    }(objects.GameObject));
    objects.Eagle = Eagle;
})(objects || (objects = {}));
//# sourceMappingURL=eagle.js.map