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
            this.snakeHeadX = objects.Game.snakeHeadGridPos[0] - 1;
            this.snakeHeadY = objects.Game.snakeHeadGridPos[1];
            this.Move(this.snakeHeadX, this.snakeHeadY);
            this.startTimer(objects.Game.snakeHeadSpeed + 10);
        };
        SnakeBody.prototype.Update = function () {
            console.log(objects.Game.snakeBoundCollision);
            console.log("snakebodyX " + this.snakeHeadX + " snabodyY " + this.snakeHeadY);
            console.log("gridX: " + objects.Game.snakeHeadGridPos[0] + " gridY: " + objects.Game.snakeHeadGridPos[1]);
        };
        SnakeBody.prototype.Move = function (snakeX, snakeY) {
            this.newCoords = this.getGridPosition(snakeX, snakeY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
        };
        SnakeBody.prototype.startTimer = function (speed) {
            var _this = this;
            createjs.Ticker.interval = objects.Game.snakeHeadSpeed;
            this.timer = setTimeout(function () {
                _this.snakeHeadX = objects.Game.snakeHeadGridPos[0];
                _this.snakeHeadY = objects.Game.snakeHeadGridPos[1];
                _this.Move(_this.snakeHeadX, _this.snakeHeadY);
                _this.startTimer(speed);
            }, speed);
        };
        return SnakeBody;
    }(objects.GameObject));
    objects.SnakeBody = SnakeBody;
})(objects || (objects = {}));
//# sourceMappingURL=snakeBody.js.map