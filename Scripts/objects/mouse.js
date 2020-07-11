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
    var Mouse = /** @class */ (function (_super) {
        __extends(Mouse, _super);
        // Constructor
        function Mouse(assetManager) {
            var _this = _super.call(this, "./Assets/mouse.png") || this;
            _this.Start();
            return _this;
        }
        Mouse.prototype.Start = function () {
            this.x = Math.floor(Math.random() * (700 - 50 + 1)) + 50;
            this.y = Math.floor(Math.random() * (600 - 50 + 1)) + 50;
            this.scaleX = 0.10;
            this.scaleY = 0.10;
            this.mouseInterval = 50000; //every 50000ms(50s), the mouse relocate at a new location   
            this.startTimer();
        };
        Mouse.prototype.Update = function () {
        };
        Mouse.prototype.Reset = function () {
            this.stopTimer();
        };
        Mouse.prototype.Move = function () {
            // I need a reference to the "STAGE" createjs object to get mouse position
            this.x = objects.Game.stage.mouseX;
            // This will eventually be replaced with keyboard input
            // Maybe xbox controller....maybe...
        };
        //Use a timer to locate mouse
        Mouse.prototype.startTimer = function () {
            var _this = this;
            this.mouseTimer = setInterval(function () {
                _this.Start();
            }, this.mouseInterval);
        };
        //Clear timer
        Mouse.prototype.stopTimer = function () {
            clearInterval(this.mouseTimer);
        };
        return Mouse;
    }(createjs.Bitmap));
    objects.Mouse = Mouse;
})(objects || (objects = {}));
//# sourceMappingURL=mouse.js.map