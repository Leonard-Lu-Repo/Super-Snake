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
    var Saw = /** @class */ (function (_super) {
        __extends(Saw, _super);
        // Constructor
        function Saw(assetManager) {
            var _this = _super.call(this, assetManager, "saw") || this;
            _this.collision = false;
            _this.Start();
            return _this;
        }
        Saw.prototype.Start = function () {
            this.x = -20;
            this.y = 170;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        };
        Saw.prototype.Update = function () {
            if (this.x < 20) {
                this.x += 1;
            }
            if (this.collision == false && this.x >= 20) {
                this.Move();
            }
            this.stopMove();
        };
        Saw.prototype.Move = function () {
            this.rotation = this.rotation + 20;
            if (this.x == 20 && this.y >= 70) {
                this.y += 2;
            }
            if (this.y >= 620 && this.x >= 20) {
                this.y = 620;
                this.x += 2;
            }
            if (this.x >= 950 && this.y <= 620) {
                this.x = 950;
                this.y = this.y - 2;
            }
            if (this.y <= 70 && this.x <= 950) {
                this.x -= 2;
                this.y = 70;
            }
        };
        Saw.prototype.stopMove = function () {
            if (this.collision) {
                this.x = this.x;
                this.y = this.y;
            }
        };
        Saw.prototype.resetMove = function () {
            this.collision = false;
            this.x = -20;
            this.y = 170;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        };
        return Saw;
    }(objects.GameObject));
    objects.Saw = Saw;
})(objects || (objects = {}));
//# sourceMappingURL=saw.js.map