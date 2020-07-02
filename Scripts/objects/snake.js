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
            _this.gridPosX = 5;
            _this.gridPosY = 5;
            _this.currentDirection = 1; // 0 = up; 1 = right; 2 = down; 3 = left
            // Charlie comment: add List containing all bodies
            //List<Body> listOfBodies = new List<Body>();
            _this.collision = false;
            _this.Start();
            return _this;
        }
        Snake.prototype.Start = function () {
            var _this = this;
            this.Move();
            //this.keyboardListener();
            /* this.scaleX = 0.25;
            this.scaleY = 0.25; */
            setInterval(function () {
                _this.Move();
            }, 800);
        };
        Snake.prototype.Update = function () {
            if (this.collision) {
                this.Reset();
            }
            /*else{
                this.Move();
            }*/
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
            //this.x+=this.speedX;
            //this.y+=this.speedY;
            switch (this.currentDirection) {
                case 0: {
                    this.gridPosY--;
                    break;
                }
                case 1: {
                    this.gridPosX++;
                    break;
                }
                case 2: {
                    this.gridPosY++;
                    break;
                }
                case 3: {
                    this.gridPosX--;
                    break;
                }
            }
            var newCoords;
            newCoords = this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = newCoords[0];
            this.y = newCoords[1];
        };
        Snake.prototype.CheckBound = function () {
            if (this.x + this.width >= 1045) {
                this.collision = true;
            }
            if (this.y + this.height >= 715) {
                this.collision = true;
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