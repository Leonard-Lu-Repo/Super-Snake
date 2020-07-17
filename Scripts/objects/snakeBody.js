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
        };
        SnakeBody.prototype.Update = function (snakeX, snakeY) {
            if (objects.Game.mouseCollision) {
                this.startMove(objects.Game.snakeHeadSpeed + 10);
            }
            this.snakeHeadX = snakeX;
            this.snakeHeadY = snakeY;
            console.log(objects.Game.mouseCollision);
            console.log("snakebodyX " + this.snakeHeadX + " snabodyY " + this.snakeHeadY);
            console.log("gridX: " + objects.Game.snakeHeadPos[0] + " gridY: " + objects.Game.snakeHeadPos[1]);
        };
        SnakeBody.prototype.Move = function () {
        };
        SnakeBody.prototype.startMove = function (speed) {
            var _this = this;
            createjs.Ticker.interval = objects.Game.snakeHeadSpeed;
            this.timer = setTimeout(function () {
                _this.x = _this.snakeHeadX;
                _this.y = _this.snakeHeadY;
                _this.startMove(speed);
            }, speed);
        };
        return SnakeBody;
    }(objects.GameObject));
    objects.SnakeBody = SnakeBody;
})(objects || (objects = {}));
//# sourceMappingURL=snakeBody.js.map