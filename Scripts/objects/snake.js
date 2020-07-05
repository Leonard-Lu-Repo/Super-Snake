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
            _this.gridPosX = 1;
            _this.gridPosY = 2;
            // 0 = up; 1 = right; 2 = down; 3 = left
            // Charlie comment: add List containing all bodies
            //List<Body> listOfBodies = new List<Body>();
            _this.collision = false;
            _this.direction = new managers.Keyboard();
            _this.Start();
            return _this;
        }
        Snake.prototype.Start = function () {
            this.Move();
            this.startTimer();
        };
        Snake.prototype.Update = function () {
            this.CheckBound();
            if (this.collision) {
                this.Reset();
            }
        };
        Snake.prototype.Reset = function () {
            this.stopTimer();
        };
        Snake.prototype.startTimer = function () {
            var _this = this;
            this.timer = setInterval(function () {
                _this.Move();
            }, 800);
        };
        Snake.prototype.stopTimer = function () {
            clearInterval(this.timer);
            //alert("Game over");
        };
        Snake.prototype.Move = function () {
            //according to the keyboard event to decide direction to change snake's move
            if (this.direction.moveLeft) {
                this.gridPosX--;
            }
            if (this.direction.moveRight) {
                this.gridPosX++;
            }
            if (this.direction.moveDown) {
                this.gridPosY++;
            }
            if (this.direction.moveUp) {
                this.gridPosY--;
            }
            //To set new location of snake
            this.newCoords = this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
        };
        Snake.prototype.CheckBound = function () {
            if (this.x + this.width >= 1040 || this.x + this.width <= 50) {
                this.collision = true;
                //alert("Game over");
            }
            if (this.y + this.height >= 726) {
                this.collision = true;
                //alert("Game over");
            }
        };
        Snake.prototype.addBody = function () {
        };
        return Snake;
    }(objects.GameObject));
    objects.Snake = Snake;
    var Body = /** @class */ (function () {
        function Body() {
            this.posX = 1;
            this.posY = 1;
        }
        return Body;
    }());
    objects.Body = Body;
})(objects || (objects = {}));
//# sourceMappingURL=snake.js.map