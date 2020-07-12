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
            var _this = _super.call(this, assetManager, "bomb") || this;
            _this.Start();
            return _this;
        }
        Bomb.prototype.setCollision = function (newState) {
            this.conllision = newState;
        };
        Bomb.prototype.Start = function () {
            this.setBombLocation();
            this.startTimer();
        };
        Bomb.prototype.Update = function () {
            if (this.conllision) {
                this.stopTimer();
            }
        };
        Bomb.prototype.Move = function () {
        };
        //Use a timer to locate snake's head
        Bomb.prototype.startTimer = function () {
            var _this = this;
            this.timer = setInterval(function () {
                _this.setBombLocation();
            }, 8000);
        };
        Bomb.prototype.stopTimer = function () {
            clearInterval(this.timer);
        };
        //To set new location of mouse
        Bomb.prototype.setBombLocation = function () {
            this.gridX = Math.round(Math.random() * 32);
            this.gridY = Math.round(Math.random() * 23);
            this.coordinates = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.coordinates[0];
            this.y = this.coordinates[1];
        };
        return Bomb;
    }(objects.GameObject));
    objects.Bomb = Bomb;
})(objects || (objects = {}));
//# sourceMappingURL=bomb.js.map