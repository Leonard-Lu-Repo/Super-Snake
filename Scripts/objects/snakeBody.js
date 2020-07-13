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
    var SnakeBody = /** @class */ (function (_super) {
        __extends(SnakeBody, _super);
        function SnakeBody(assetManager, imageString) {
            var _this = _super.call(this, assetManager, imageString) || this;
            _this.Start();
            return _this;
        }
        SnakeBody.prototype.Start = function () {
            this.snakeHeadX = objects.Snake.prototype.gridX - 1;
            this.snakeHeadY = objects.Snake.prototype.gridY;
            this.Move(this.snakeHeadX, this.snakeHeadY);
        };
        SnakeBody.prototype.Update = function () {
            var _this = this;
            setTimeout(function () {
                _this.snakeHeadX = objects.Snake.prototype.gridX;
                _this.snakeHeadY = objects.Snake.prototype.gridY;
                _this.Move(_this.snakeHeadX, _this.snakeHeadY);
            }, 500);
        };
        SnakeBody.prototype.Move = function (snakeHeadX, snakeHeadY) {
            //To set new location of snakeBody
            this.gridX = snakeHeadX;
            this.gridY = snakeHeadY;
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
        };
        return SnakeBody;
    }(objects.GameObject));
    objects.SnakeBody = SnakeBody;
})(objects || (objects = {}));
//# sourceMappingURL=snakeBody.js.map