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
    var GameOverScene = /** @class */ (function (_super) {
        __extends(GameOverScene, _super);
        // Constructor
        function GameOverScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Method
        GameOverScene.prototype.Start = function () {
            // Initialize our variables
            this.gameOverLabel = new objects.Label("Game Over!", "60px", "Comic", "#FF9A36", 470, 240, true);
            this.background = new objects.Background(this.assetManager, "background");
            this.mainButton = new objects.Button(this.assetManager, "mainButton", 400, 340);
            this.replayButton = new objects.Button(this.assetManager, "replayButton", 400, 500);
            this.Main();
        }; //end of Start()
        GameOverScene.prototype.Update = function () { };
        GameOverScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.gameOverLabel);
            this.addChild(this.mainButton);
            this.addChild(this.replayButton);
            this.mainButton.on("click", this.mainButtonClick);
            this.replayButton.on("click", this.replayButtonClick);
        };
        GameOverScene.prototype.mainButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        GameOverScene.prototype.replayButtonClick = function () {
            objects.Game.currentScene = config.Scene.GAME;
        };
        return GameOverScene;
    }(objects.Scene)); //end of GameOverScene class
    scenes.GameOverScene = GameOverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map