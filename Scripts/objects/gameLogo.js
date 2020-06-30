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
    var Gamelogo = /** @class */ (function (_super) {
        __extends(Gamelogo, _super);
        // Constructor
        function Gamelogo(assetManager, x) {
            var _this = _super.call(this, assetManager.getResult("gameLogo")) || this;
            // Variables
            _this.speedY = 2;
            console.log("Creating the gamelogo");
            _this.x = x;
            _this.Start();
            return _this;
        }
        // Functions
        Gamelogo.prototype.Start = function () {
        };
        Gamelogo.prototype.Update = function () {
            this.Move();
            this.CheckBound();
        };
        Gamelogo.prototype.Move = function () {
            this.y += this.speedY;
        };
        // Collision Detection
        Gamelogo.prototype.CheckBound = function () {
            if (this.y >= 100) {
                this.y = 100;
            }
        };
        return Gamelogo;
    }(createjs.Bitmap));
    objects.Gamelogo = Gamelogo;
})(objects || (objects = {}));
//# sourceMappingURL=gameLogo.js.map