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
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        // Constructor
        function Snake(assetManager) {
            var _this = _super.call(this, assetManager, "snake") || this;
            // Variables
            _this.speedX = 2;
            _this.speedY = 2;
            _this.collision = false;
            _this.Start();
            return _this;
        }
        Snake.prototype.Start = function () {
            this.x = 100;
            this.y = 100;
            //this.keyboardListener();
            /* this.scaleX = 0.25;
            this.scaleY = 0.25; */
        };
        Snake.prototype.Update = function () {
            if (this.collision) {
                this.Reset();
            }
            else {
                this.Move();
            }
            this.CheckBound();
        };
        Snake.prototype.Reset = function () {
            this.x = 1045 - this.width;
            //this.y=715-this.height;
        };
        Snake.prototype.Move = function () {
            // I need a reference to the "STAGE" createjs object to get mouse position
            //this.x = objects.Game.stage.mouseX;
            // This will eventually be replaced with keyboard input
            // Maybe xbox controller....maybe...
            this.x += this.speedX;
            //this.y+=this.speedY;
        };
        Snake.prototype.CheckBound = function () {
            if (this.x + this.width >= 1045) {
                this.collision = true;
            }
            if (this.y + this.height >= 715) {
                this.collision = true;
            }
        };
        return Snake;
    }(objects.GameObject));
    objects.Snake = Snake;
})(objects || (objects = {}));
//# sourceMappingURL=snake.js.map