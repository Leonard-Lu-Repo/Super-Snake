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
            _this.snakeList = new Array();
            _this.score = 0;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            console.log("Play scene start");
            // Load Level 1
            this.loadLevel(1);
            // Intialize our variables
            this.levelLabel = new objects.Label("Level " + this.currentLevel.getLevelNo(), "40px", "Comic", "#FF9A36", 100, 80, true);
            this.scoreLabel = new objects.Label(this.score + "", "40px", "Comic", "#FF9A36", 800, 80, true);
            this.completeLabel = new objects.Label("Level Complete!", "50px", "Comic", "#FF9A36", 480, 240, true);
            this.background = new objects.Background(this.assetManager);
            this.snake = new objects.SnakeHead(this.assetManager, "snakeHead");
            this.snakeList[0] = new objects.SnakeBody(this.assetManager, "snakeBody");
            this.mouse = new objects.Mouse(this.assetManager);
            this.bomb = new objects.Bomb(this.assetManager);
            this.explosion = new objects.Explosion(this.assetManager);
            this.thumbsUp = new createjs.Bitmap(this.assetManager.getResult("thumbsUp"));
            this.thumbsUp.regX = this.thumbsUp.getBounds().width * 0.5;
            this.thumbsUp.regY = this.thumbsUp.getBounds().height * 0.5;
            this.thumbsUp.x = 480;
            this.thumbsUp.y = 400;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.snake.Update();
            this.bomb.Update();
            this.DetectEatMouse();
            this.DetectBombCollision();
            if (this.snake.timeToUpdateBodies) {
                this.snake.timeToUpdateBodies = false;
                this.UpdateSnakeBodies();
            }
            // Check if score is achieved
            if (this.score >= this.targetScore && !this.paused) {
                this.moveToNextLevel();
            }
            console.log(this.snakeList.length);
        };
        PlayScene.prototype.Main = function () {
            //always add background first
            this.addChild(this.background);
            //add labels
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.completeLabel);
            this.completeLabel.visible = false;
            this.addChild(this.thumbsUp);
            this.thumbsUp.visible = false;
            // add objects
            this.addChild(this.snake);
            this.addChild(this.mouse);
            this.addChild(this.bomb);
            this.paused = false;
        };
        PlayScene.prototype.UpdateSnakeBodies = function () {
            for (var i = this.snakeList.length - 1; i > 0; i--) {
                this.snakeList[i].Update(this.snakeList[i - 1].x, this.snakeList[i - 1].y);
            }
            this.snakeList[0].Update(objects.Game.snakeHeadPos[0], objects.Game.snakeHeadPos[1]);
        };
        PlayScene.prototype.DetectEatMouse = function () {
            var eatMouse;
            eatMouse = managers.Collision.AABBCollisionCheck(this.snake, this.mouse);
            if (eatMouse) {
                this.score += 10;
                this.scoreLabel.text = this.score.toString();
                this.mouse.mouseCollision = true;
                this.mouse.ResetMouseLocation();
                // Add new snake body
                this.snakeList.push(new objects.SnakeBody(this.assetManager, "snakeBody"));
                this.addChild(this.snakeList[this.snakeList.length - 1]);
            }
        };
        PlayScene.prototype.DetectBombCollision = function () {
            var bombCollision;
            bombCollision = managers.Collision.AABBCollisionCheck(this.snake, this.bomb);
            if (bombCollision) {
                objects.Game.bombCollision = true;
                this.addChild(this.explosion);
                this.explosion.Explode(this.bomb.x, this.bomb.y);
                this.removeChild(this.bomb);
                this.snake.stopTimer();
                setTimeout(function () {
                    objects.Game.currentScene = config.Scene.OVER;
                }, 3000);
            }
        };
        PlayScene.prototype.loadLevel = function (levelNo) {
            // Get data of new level
            this.currentLevel = objects.Level.GetLevelData(levelNo);
            // Load new data into variables
            this.targetScore = this.currentLevel.getTargetScore();
            // TODO: There will be more data to load later on...
        };
        PlayScene.prototype.moveToNextLevel = function () {
            var _this = this;
            // First pause everything and show results
            objects.Game.achieveTargetScore = true;
            this.removeChild(this.mouse);
            this.completeLabel.visible = true;
            this.thumbsUp.visible = true;
            this.paused = true;
            this.snake.stopTimer();
            setTimeout(function () {
                // Load new level
                _this.loadLevel(_this.currentLevel.getLevelNo() + 1);
                // Reset everything
                _this.score = 0;
                _this.scoreLabel.text = _this.score.toString();
                _this.snake.ResetSnakeStatus();
                for (var i = _this.snakeList.length - 1; i > 0; i--) { // Avoid removing the head
                    _this.removeChild(_this.snakeList[i]);
                    _this.snakeList.pop();
                }
                _this.snake.startTimer(200); // NOTE: Currently hard-coding in 200 for speed
                _this.addChild(_this.mouse);
                _this.levelLabel.text = "Level " + _this.currentLevel.getLevelNo();
                _this.completeLabel.visible = false;
                _this.thumbsUp.visible = false;
                // Unpause
                _this.paused = false;
            }, 3000);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map