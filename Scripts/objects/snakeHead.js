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
    var SnakeHead = /** @class */ (function (_super) {
        __extends(SnakeHead, _super);
        // Constructor
        function SnakeHead(assetManager, imageString) {
            var _this = _super.call(this, assetManager, imageString) || this;
            // Variables
            _this.gridPosX = 2;
            _this.gridPosY = 2;
            _this.snakeSpeed = 200;
            _this.collision = false;
            _this.direction = new managers.Keyboard();
            _this.Start();
            return _this;
        }
        SnakeHead.prototype.Start = function () {
            this.Move();
            this.startTimer(this.snakeSpeed);
            objects.Game.snakeHeadSpeed = this.snakeSpeed;
        };
        SnakeHead.prototype.Update = function () {
            this.CheckBound();
            this.Reset();
        };
        SnakeHead.prototype.Reset = function () {
            if (this.x + this.halfW > 960) {
                this.x = 960 - this.halfW;
            }
            if (this.x < this.halfW) {
                this.x = Math.abs(this.x);
            }
            if (this.y + this.halfH > 700) {
                this.y = 690 - this.halfH;
            }
            if (this.y < this.halfH) {
                this.y = Math.abs(this.y);
            }
            if (this.collision) {
                this.stopTimer();
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        //Use a timer to locate snake's head
        SnakeHead.prototype.startTimer = function (speed) {
            var _this = this;
            this.timer = setTimeout(function () {
                _this.Move();
                _this.startTimer(speed);
            }, speed);
        };
        SnakeHead.prototype.stopTimer = function () {
            clearInterval(this.timer);
        };
        SnakeHead.prototype.Move = function () {
            //according to the keyboard event to decide direction to change snake's move
            if (this.direction.moveLeft) {
                this.gridPosX--;
                this.rotation = 0;
            }
            if (this.direction.moveRight) {
                this.gridPosX++;
                this.rotation = 180;
            }
            if (this.direction.moveDown) {
                this.gridPosY++;
                this.rotation = -90;
            }
            if (this.direction.moveUp) {
                this.gridPosY--;
                this.rotation = 90;
            }
            //To set new location of snake
            this.newCoords = this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            objects.Game.snakeHeadPos = new Array(this.x, this.y);
        };
        SnakeHead.prototype.CheckBound = function () {
            if (this.x + this.halfW > 960 || this.x < this.halfW) {
                this.collision = true;
            }
            if (this.y + this.halfH > 690 || this.y < this.halfH) {
                this.collision = true;
            }
            objects.Game.snakeBoundCollision = this.collision;
        };
        return SnakeHead;
    }(objects.GameObject));
    objects.SnakeHead = SnakeHead;
})(objects || (objects = {}));
//# sourceMappingURL=snakeHead.js.map