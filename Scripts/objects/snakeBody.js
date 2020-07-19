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
            this.x = snakeX;
            this.y = snakeY;
        };
        SnakeBody.prototype.Move = function () {
        };
        SnakeBody.prototype.stopMove = function () {
            if (objects.Game.snakeBoundCollision || objects.Game.bombCollision || objects.Game.achieveTargetScore || objects.Game.slefCollison) {
                this.Update(this.x, this.y);
                clearTimeout(this.timer);
            }
        };
        return SnakeBody;
    }(objects.GameObject));
    objects.SnakeBody = SnakeBody;
})(objects || (objects = {}));
//# sourceMappingURL=snakeBody.js.map