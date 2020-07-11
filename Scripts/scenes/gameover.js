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
            this.background = new objects.Background(this.assetManager);
            this.win = scenes.PlayScene.prototype.win; //get the win value from PlayScene
            this.score = scenes.PlayScene.prototype.score; ////get the score value from PlayScene
            //if win or fail, the game over page will update for different situation           
            if (this.win == true) {
                this.gameOverLabel = new objects.Label("Good Job!  You are good to Level2", "40px", "Consolas", "#FFFFFF", 220, 240, true);
                this.scoreLabel = new objects.Label("Your score: " + this.score, "40px", "Consolas", "#FFFFFF", 250, 340, true);
            }
            else {
                this.gameOverLabel = new objects.Label("You gave up! Try it again?", "40px", "Consolas", "#FFFFFF", 320, 240, true);
                this.scoreLabel = new objects.Label("Your score: " + this.score, "40px", "Consolas", "#FFFFFF", 250, 340, true);
            }
            this.replayButton = new objects.Button(this.assetManager, "replayButton", 350, 440, 0.25);
            this.homeButton = new objects.Button(this.assetManager, "homeButton", 200, 445, 0.12);
            this.Main();
        };
        GameOverScene.prototype.Update = function () { };
        GameOverScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.gameOverLabel);
            this.addChild(this.replayButton);
            this.addChild(this.homeButton);
            this.addChild(this.scoreLabel);
            this.homeButton.on("click", this.homeButtonClick);
            this.replayButton.on("click", this.replayButtonClick);
        };
        GameOverScene.prototype.replayButtonClick = function () {
            objects.Game.currentScene = config.Scene.GAME;
        };
        GameOverScene.prototype.homeButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        return GameOverScene;
    }(objects.Scene));
    scenes.GameOverScene = GameOverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map