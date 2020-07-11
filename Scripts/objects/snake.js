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
        // Charlie comment: add List containing all bodies
        //List<Body> listOfBodies = new List<Body>();
        // Constructor
        function Snake(assetManager) {
            var _this = _super.call(this, assetManager, "snake") || this;
            // Variables
            _this.gridPosX = 1;
            _this.gridPosY = 2;
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
            if (this.collision) {
                this.Reset();
            }
        };
        Snake.prototype.Reset = function () {
            this.stopTimer();
        };
        //Use a timer to locate snake's head
        Snake.prototype.startTimer = function () {
            var _this = this;
            this.timer = setInterval(function () {
                _this.Move();
            }, 800);
        };
        //Clear timer
        Snake.prototype.stopTimer = function () {
            clearInterval(this.timer);
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
            this.CheckBound();
        };
        //If snake's head touch the stage bound make collision true and game over
        Snake.prototype.CheckBound = function () {
            if (this.x + this.halfW >= 930 || this.x <= this.halfW) {
                this.collision = true;
                console.log("Game over");
                objects.Game.currentScene = config.Scene.OVER;
            }
            if (this.y + this.halfH >= 690 || this.y <= this.halfH) {
                this.collision = true;
                console.log("Game over");
                objects.Game.currentScene = config.Scene.OVER;
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