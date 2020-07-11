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
        // public collision:boolean;
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.level = 1;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            console.log("Play scene start");
            // Initialize our variables
            PlayScene.prototype.score = 0;
            PlayScene.prototype.win = false;
            this.targetScore = 3;
            this.levelLabel = new objects.Label("Level " + this.level, "40px", "Consolas", "#000000", 100, 50, true);
            this.scoreLabel = new objects.Label(PlayScene.prototype.score + "/" + this.targetScore, "40px", "Consolas", "#000000", 600, 50, true);
            this.background = new objects.Background(this.assetManager);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 890, 660, 1.0);
            this.backButton = new objects.Button(this.assetManager, "backButton", 0, 660, 1.0);
            this.snake = new objects.Snake(this.assetManager);
            this.mouse = new objects.Mouse(this.assetManager);
            this.bomb = new objects.Bomb(this.assetManager);
            this.step = 30;
            console.log("Initial Score is " + PlayScene.prototype.score);
            PlayScene.prototype.score = 0;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.background.Update();
            this.snake.Update();
            this.mouse.Update();
            this.bomb.Update();
            this.checkEatMouse();
            this.beatByBomb();
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
            //add buttons
            this.addChild(this.nextButton);
            this.addChild(this.backButton);
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);
        };
        PlayScene.prototype.checkEatMouse = function () {
            console.log("checking eat mouse");
            console.log("snake x: " + this.snake.x + "   mouse x: " + this.mouse.x);
            console.log("snake y: " + this.snake.y + "    mouse y: " + this.mouse.y);
            if (Math.abs(this.snake.x - this.mouse.x) <= this.step &&
                Math.abs(this.snake.y - this.mouse.y) <= this.step) {
                //update score
                PlayScene.prototype.score++;
                console.log("After checkEatMouse, Score is " + PlayScene.prototype.score);
                this.scoreLabel.text = "Score: " + PlayScene.prototype.score + "/ " + this.targetScore;
                if (PlayScene.prototype.score >= this.targetScore) {
                    //update win status
                    PlayScene.prototype.win = true;
                    console.log("Level1 finish, go to level 2 or game over");
                    //Game Scene change to Game Over
                    objects.Game.currentScene = config.Scene.OVER;
                }
                //regenerate a new mouse                 
                this.mouse.Reset();
            }
        };
        PlayScene.prototype.beatByBomb = function () {
            console.log("checking beat by Bomb");
            console.log("snake x: " + this.snake.x + "   bomb x: " + this.bomb.x);
            console.log("snake y: " + this.snake.y + "    bomb y: " + this.bomb.y);
            if (Math.abs(this.snake.x - this.bomb.x) <= this.step &&
                Math.abs(this.snake.y - this.bomb.y) <= this.step) {
                //update score
                PlayScene.prototype.score = 0;
                PlayScene.prototype.win = false;
                console.log("After beat by bomb, Score is " + PlayScene.prototype.score);
                this.scoreLabel.text = "Score: " + PlayScene.prototype.score + "/ " + this.targetScore;
                //Game Scene change to Game Over
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        PlayScene.prototype.nextButtonClick = function () {
            PlayScene.prototype.win = false;
            objects.Game.currentScene = config.Scene.OVER;
            //  GameOverScene.updateResult(PlayScene.prototype.timeSpend, false);
        };
        PlayScene.prototype.backButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map