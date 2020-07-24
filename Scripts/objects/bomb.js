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
            this.collision = newState;
        };
        Bomb.prototype.Start = function () {
            this.setBombLocation();
            //this.startTimer();
        };
        Bomb.prototype.Update = function () {
            /*if(this.collision){
                this.stopTimer();
            }*/
        };
        Bomb.prototype.Move = function () {
        };
        // Charlie: For now the bomb isn't moving so I've taken out the timer.
        /*//Use a timer to locate snake's head
        public startTimer():void{
             this.timer= setInterval(() => {
                 this.setBombLocation();
             }, 8000);
         }
         public stopTimer():void{
             clearInterval(this.timer);
         }*/
        //To set new location of bomb
        Bomb.prototype.setBombLocation = function () {
            var locationOk = false;
            while (!locationOk) {
                this.gridX = Math.round(Math.random() * 28 + 1);
                this.gridY = Math.round(Math.random() * 14 + 1);
                locationOk = true;
                // Bomb cannot be in same position as other objects
                if (objects.Game.usedGridPositions.length > 0) {
                    for (var i = 0; i < objects.Game.usedGridPositions.length; i++) {
                        if (this.gridX == objects.Game.usedGridPositions[i].x && this.gridY == objects.Game.usedGridPositions[i].y) {
                            locationOk = false;
                        }
                    }
                }
                // Bomb cannot be in upper-left 'safe area'
                if (this.gridX < 8 && this.gridY < 5) {
                    locationOk = false;
                }
            }
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        };
        Bomb.prototype.getGridCoords = function () {
            return new Array(this.gridX, this.gridY);
        };
        return Bomb;
    }(objects.GameObject));
    objects.Bomb = Bomb;
})(objects || (objects = {}));
//# sourceMappingURL=bomb.js.map