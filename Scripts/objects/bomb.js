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
    var Bomb = /** @class */ (function (_super) {
        __extends(Bomb, _super);
        // Constructor
        function Bomb(assetManager) {
            var _this = _super.call(this, "./Assets/bomb.png") || this;
            _this.Start();
            return _this;
        }
        Bomb.prototype.Start = function () {
            this.x = Math.floor(Math.random() * (700 - 50 + 1)) + 50;
            this.y = Math.floor(Math.random() * (600 - 50 + 1)) + 50;
            this.scaleX = 0.20;
            this.scaleY = 0.20;
            this.interval = 30000; //every 30000ms(30s), the bomb relocate at a new location            
            this.startTimer();
        };
        Bomb.prototype.Update = function () {
        };
        Bomb.prototype.Reset = function () {
            this.stopTimer();
        };
        Bomb.prototype.Move = function () {
            // I need a reference to the "STAGE" createjs object to get mouse position
            this.x = objects.Game.stage.mouseX;
            // This will eventually be replaced with keyboard input
            // Maybe xbox controller....maybe...
        };
        //Use a timer to locate bomb's head
        Bomb.prototype.startTimer = function () {
            var _this = this;
            this.bombTimer = setInterval(function () {
                _this.Start();
            }, this.interval);
        };
        //Clear timer
        Bomb.prototype.stopTimer = function () {
            clearInterval(this.bombTimer);
        };
        return Bomb;
    }(createjs.Bitmap));
    objects.Bomb = Bomb;
})(objects || (objects = {}));
//# sourceMappingURL=bomb.js.map