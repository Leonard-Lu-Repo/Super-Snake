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
            _this.gridPosX = 3;
            _this.gridPosY = 0;
            _this.nextGridPosX = 0;
            _this.nextGridPosY = 0;
            _this.snakeSpeed = 200;
            _this.timeToUpdateBodies = false;
            _this.direction = new managers.Keyboard();
            _this.Start();
            return _this;
        }
        SnakeHead.prototype.Start = function () {
            this.blood = new createjs.Bitmap("./Assets/blood.png");
            this.blood.regX = this.blood.getBounds().width * 0.5;
            this.blood.regY = this.blood.getBounds().height * 0.5;
            this.snakeDead = new createjs.Bitmap("./Assets/snakeDead.png");
            this.snakeDead.regX = this.snakeDead.getBounds().width * 0.5;
            this.snakeDead.regY = this.snakeDead.getBounds().height * 0.5;
        };
        SnakeHead.prototype.Update = function () {
        };
        SnakeHead.prototype.Reset = function () {
            if (this.gridPosX > 30) {
                this.gridPosX = 30;
                this.stopTimer();
            }
            if (this.gridPosX < 1) {
                this.gridPosX = 1;
                this.stopTimer();
            }
            if (this.gridPosY < 0) {
                this.gridPosY = 0;
                this.stopTimer();
            }
            if (this.gridPosY > 16) {
                this.gridPosY = 16;
                this.stopTimer();
            }
        };
        //Use a timer to locate snake's head and speed
        SnakeHead.prototype.startTimer = function () {
            var _this = this;
            this.timer = setTimeout(function () {
                _this.Move();
                if (objects.Game.speedUpShoeCollision) {
                    _this.snakeSpeed = 100;
                    setTimeout(function () {
                        _this.snakeSpeed = 200;
                    }, 8000);
                }
                if (objects.Game.speedDownShoeCollision) {
                    _this.snakeSpeed = 400;
                    setTimeout(function () {
                        _this.snakeSpeed = 200;
                    }, 8000);
                }
                _this.startTimer();
            }, this.snakeSpeed);
        };
        SnakeHead.prototype.stopTimer = function () {
            clearTimeout(this.timer);
            this.blood.rotation = this.rotation;
            this.snakeDead.rotation = this.rotation;
        };
        SnakeHead.prototype.Move = function () {
            //according to the keyboard event to decide direction to change snake's move
            if (this.direction.moveLeft) {
                this.gridPosX--;
                this.nextGridPosX = this.gridPosX - 1;
                this.nextGridPosY = this.gridPosY;
                this.rotation = 0;
            }
            if (this.direction.moveRight) {
                this.gridPosX++;
                this.nextGridPosX = this.gridPosX + 1;
                this.nextGridPosY = this.gridPosY;
                this.rotation = 180;
            }
            if (this.direction.moveDown) {
                this.gridPosY++;
                this.nextGridPosX = this.gridPosX;
                this.nextGridPosY = this.gridPosY + 1;
                this.rotation = -90;
            }
            if (this.direction.moveUp) {
                this.gridPosY--;
                this.nextGridPosX = this.gridPosX;
                this.nextGridPosY = this.gridPosY - 1;
                this.rotation = 90;
            }
            //To set new location of snake
            this.newCoords = this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            this.nextCoords = this.getGridPosition(this.nextGridPosX, this.nextGridPosY);
            this.nextX = this.nextCoords[0];
            this.nextY = this.nextCoords[1];
            this.blood.x = this.x;
            this.blood.y = this.y;
            this.snakeDead.x = this.x;
            this.snakeDead.y = this.y;
            objects.Game.snakeHeadPos = new Array(this.x, this.y);
            //Update the other bodies
            this.timeToUpdateBodies = true;
        };
        SnakeHead.prototype.ResetSnakeStatus = function () {
            this.gridPosX = 3;
            this.gridPosY = 0;
            this.snakeSpeed = 200;
            this.direction.moveUp = false;
            this.direction.moveDown = false;
            this.direction.moveLeft = false;
            this.direction.moveRight = true;
            this.direction.moveDirection = "right";
        };
        SnakeHead.prototype.getGridCoords = function () {
            return new Array(this.gridPosX, this.gridPosY);
        };
        return SnakeHead;
    }(objects.GameObject));
    objects.SnakeHead = SnakeHead;
})(objects || (objects = {}));
//# sourceMappingURL=snakeHead.js.map