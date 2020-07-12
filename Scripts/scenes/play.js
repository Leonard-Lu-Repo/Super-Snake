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
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.count = 1;
            _this.score = 0;
            _this.level = 1;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            console.log("Play scene start");
            // Inintialize our variables
            this.levelLabel = new objects.Label("Level " + this.count, "40px", "Comic", "#FF9A36", 100, 80, true);
            this.scoreLabel = new objects.Label(this.score + "", "40px", "Comic", "#FF9A36", 800, 80, true);
            this.background = new objects.Background(this.assetManager);
            this.snake = new objects.Snake(this.assetManager);
            this.mouse = new objects.Mouse(this.assetManager);
            this.bomb = new objects.Bomb(this.assetManager);
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.snake.Update();
            this.bomb.Update();
            this.DetectEatMouse();
            this.DetectBombCollision();
            this.moveToEndScene();
        };
        PlayScene.prototype.Main = function () {
            //always add background first
            this.addChild(this.background);
            //add labels
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            // add objects
            this.addChild(this.snake);
            this.addChild(this.mouse);
            this.addChild(this.bomb);
        };
        PlayScene.prototype.DetectEatMouse = function () {
            var eatMouse;
            eatMouse = managers.Collision.AABBCollisionCheck(this.snake, this.mouse);
            if (eatMouse) {
                this.score += 10;
                this.scoreLabel.text = this.score.toString();
                this.mouse.ResetMouseLocation();
            }
        };
        PlayScene.prototype.DetectBombCollision = function () {
            var bombCollision;
            bombCollision = managers.Collision.AABBCollisionCheck(this.snake, this.bomb);
            if (bombCollision) {
                this.snake.stopTimer();
                this.removeChild(this.bomb);
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        PlayScene.prototype.moveToEndScene = function () {
            // Change from PLAY to GAMEOVER scene
            if (this.score == 30) {
                this.snake.stopTimer();
                setTimeout(function () {
                    objects.Game.currentScene = config.Scene.SECONDLEVEL;
                }, 2000);
            }
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map