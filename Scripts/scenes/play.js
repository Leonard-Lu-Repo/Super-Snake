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
            _this.bomb = new Array();
            _this.lives = new Array();
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            console.log("Play scene start");
            // Load Level 1
            this.loadLevel(1);
            this.currentLives = 3;
            // Intialize our variables
            objects.Game.usedGridPositions = new Array();
            this.background = new objects.Background(this.assetManager, "background");
            this.thornsWall = new objects.Background(this.assetManager, "thornsWall", 0, 60);
            this.instruction = new objects.Background(this.assetManager, "instruction", 0, 650);
            this.levelLabel = new objects.Label("Level " + this.currentLevel.getLevelNo(), "40px", "Comic", "#FF9A36", 100, 40, true);
            this.scoreLabel = new objects.Label(this.score.toString() + "/" + this.targetScore.toString(), "40px", "Comic", "#FF9A36", 800, 40, true);
            this.lifeLabel = new objects.Label(this.currentLives.toString(), "40px", "Comic", "#FF9A36", 925, 40, true);
            this.lifeIcon = new createjs.Bitmap(this.assetManager.getResult("lifeIcon"));
            this.lifeIcon.regX = this.lifeIcon.getBounds().width * 0.5;
            this.lifeIcon.regY = this.lifeIcon.getBounds().height * 0.5;
            this.lifeIcon.x = 890;
            this.lifeIcon.y = 35;
            this.completeLabel = new objects.Label("Level Complete!", "50px", "Comic", "#FF9A36", 480, 240, true);
            this.snakeHead = new objects.SnakeHead(this.assetManager, "snakeHead");
            this.snakeList[0] = new objects.SnakeBody(this.assetManager, "snakeBody");
            this.mouse = new objects.Mouse(this.assetManager);
            for (var i = 0; i < this.bombNo; i++) {
                this.bomb[i] = new objects.Bomb(this.assetManager);
            }
            for (var j = 0; j < this.lifeNo; j++) {
                this.lives[j] = new objects.Life(this.assetManager, "life");
            }
            this.explosion = new objects.Explosion(this.assetManager);
            this.speedUpShoe = new objects.SpeedShoe(this.assetManager, "speedUpShoe");
            this.speedDownShoe = new objects.SpeedShoe(this.assetManager, "speedDownShoe");
            this.thumbsUp = new createjs.Bitmap(this.assetManager.getResult("thumbsUp"));
            this.thumbsUp.regX = this.thumbsUp.getBounds().width * 0.5;
            this.thumbsUp.regY = this.thumbsUp.getBounds().height * 0.5;
            this.thumbsUp.x = 480;
            this.thumbsUp.y = 400;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.snakeHead.Update();
            if (this.snakeHead.timeToUpdateBodies) {
                this.snakeHead.timeToUpdateBodies = false;
                this.UpdateSnakeBodies();
                this.DetectBombCollision();
                this.DetectEatMouse();
                this.DetectSnakeSelfCollision();
                this.DetectLife();
                this.DetectBoundary();
                if (this.speedUpShoeAppear || this.speedDownShoeAppear) {
                    this.DetectSpeedUpShoe();
                    this.DetectSpeedDownShoe();
                }
            }
            // Check if score is achieved
            if (this.score >= this.targetScore && !this.paused) {
                this.moveToNextLevel();
            }
        };
        PlayScene.prototype.Main = function () {
            //always add background first
            this.addChild(this.background);
            this.addChild(this.thornsWall);
            this.addChild(this.instruction);
            //add labels
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.completeLabel);
            this.completeLabel.visible = false;
            this.addChild(this.thumbsUp);
            this.thumbsUp.visible = false;
            this.addChild(this.lifeLabel);
            this.addChild(this.lifeIcon);
            // add objects
            this.addChild(this.snakeHead);
            this.resetGame();
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
            eatMouse = managers.Collision.AABBCollisionCheck(this.snakeHead, this.mouse);
            if (eatMouse) {
                this.score += 10;
                this.scoreLabel.text = this.score.toString() + "/" + this.targetScore.toString();
                this.mouse.ResetMouseLocation();
                // Add new snake body
                this.snakeList.push(new objects.SnakeBody(this.assetManager, "snakeBody"));
                this.addChild(this.snakeList[this.snakeList.length - 1]);
            }
        };
        PlayScene.prototype.DetectBombCollision = function () {
            var _this = this;
            var bombCollision;
            var snakeCoords = this.snakeHead.getGridCoords();
            var bombTouched;
            for (var i = 0; i < this.bombNo; i++) {
                var bombCoords = this.bomb[i].getGridCoords();
                if (snakeCoords[0] == bombCoords[0] && snakeCoords[1] == bombCoords[1]) {
                    bombCollision = true;
                    bombTouched = i;
                    i = this.bombNo; // End the loop
                }
            }
            if (bombCollision) {
                objects.Game.bombCollision = true;
                this.addChild(this.explosion);
                this.explosion.Explode(this.bomb[bombTouched].x, this.bomb[bombTouched].y);
                this.removeChild(this.bomb[bombTouched]);
                this.snakeHead.stopTimer();
                setTimeout(function () {
                    _this.removeChild(_this.explosion);
                    _this.processHit();
                }, 2000);
            }
        };
        PlayScene.prototype.DetectSpeedUpShoe = function () {
            var _this = this;
            this.speedUpShoe.shoeCollision = managers.Collision.AABBCollisionCheck(this.snakeHead, this.speedUpShoe);
            objects.Game.speedUpShoeCollision = this.speedUpShoe.shoeCollision;
            if (this.speedUpShoe.shoeCollision) {
                this.removeChild(this.speedUpShoe);
                setTimeout(function () {
                    _this.addChild(_this.speedDownShoe);
                }, 10000);
            }
            console.log(objects.Game.speedUpShoeCollision);
            //console.log(this.speedUpShoe.x);
        };
        PlayScene.prototype.DetectSpeedDownShoe = function () {
            var _this = this;
            this.speedDownShoe.shoeCollision = managers.Collision.AABBCollisionCheck(this.snakeHead, this.speedDownShoe);
            objects.Game.speedDownShoeCollision = this.speedDownShoe.shoeCollision;
            if (this.speedDownShoe.shoeCollision) {
                this.removeChild(this.speedDownShoe);
                setTimeout(function () {
                    _this.addChild(_this.speedUpShoe);
                }, 10000);
            }
        };
        PlayScene.prototype.DetectLife = function () {
            if (this.lives.length > 0) {
                var lifeCollision = false;
                var snakeCoords = this.snakeHead.getGridCoords();
                var lifeTouched = void 0;
                for (var i = 0; i < this.lifeNo; i++) {
                    var lifeCoords = this.lives[i].getGridCoords();
                    if (snakeCoords[0] == lifeCoords[0] && snakeCoords[1] == lifeCoords[1]) {
                        lifeCollision = true;
                        lifeTouched = i;
                        i = this.lifeNo; // End the loop
                    }
                }
                if (lifeCollision) {
                    this.removeChild(this.lives[lifeTouched]);
                    this.currentLives++;
                    this.lifeLabel.text = this.currentLives.toString();
                }
            }
        };
        PlayScene.prototype.DetectSnakeSelfCollision = function () {
            var _this = this;
            var selfCollision;
            for (var i = this.snakeList.length - 1; i > 0; i--) {
                if (this.snakeHead.x == this.snakeList[i].x && this.snakeHead.y == this.snakeList[i].y) {
                    selfCollision = true;
                }
            }
            if (selfCollision) {
                console.log("Self collided");
                this.snakeHead.stopTimer();
                setTimeout(function () {
                    _this.processHit();
                }, 2000);
            }
        };
        PlayScene.prototype.DetectBoundary = function () {
            var _this = this;
            var collision;
            var snakeCoords = this.snakeHead.getGridCoords();
            if (snakeCoords[0] > 30 || snakeCoords[0] < 0) {
                collision = true;
            }
            if (snakeCoords[1] > 16 || snakeCoords[1] < 0) {
                collision = true;
            }
            if (collision) {
                this.snakeHead.stopTimer();
                setTimeout(function () {
                    _this.processHit();
                }, 2000);
            }
        };
        PlayScene.prototype.loadLevel = function (levelNo) {
            // Get data of new level
            this.currentLevel = objects.Level.GetLevelData(levelNo);
            // Load new data into variables
            this.targetScore = this.currentLevel.getTargetScore();
            this.bombNo = this.currentLevel.getBombNo();
            this.lifeNo = this.currentLevel.getLifeNo();
            this.speedUpShoeAppear = this.currentLevel.getSpeedUpShoe();
            this.speedDownShoeAppear = this.currentLevel.getSpeedDownShoe();
        };
        PlayScene.prototype.processHit = function () {
            this.currentLives--;
            this.lifeLabel.text = this.currentLives.toString();
            if (this.currentLives <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
                return;
            }
            // If we still have lives, reset the level
            this.clearGameObjects();
            this.resetGame();
        };
        PlayScene.prototype.moveToNextLevel = function () {
            var _this = this;
            // First pause everything and show results
            objects.Game.achieveTargetScore = true;
            this.clearGameObjects();
            this.completeLabel.visible = true;
            this.thumbsUp.visible = true;
            this.paused = true;
            this.snakeHead.stopTimer();
            setTimeout(function () {
                // Load new level data
                _this.loadLevel(_this.currentLevel.getLevelNo() + 1);
                // Reset everything
                _this.resetGame();
                _this.completeLabel.visible = false;
                _this.thumbsUp.visible = false;
                // Unpause
                _this.paused = false;
            }, 2000);
        };
        // Clears all game objects from screen (except for the snake)
        PlayScene.prototype.clearGameObjects = function () {
            this.removeChild(this.mouse);
            this.removeChild(this.speedDownShoe);
            this.removeChild(this.speedUpShoe);
            for (var i = 0; i < this.bombNo; i++) {
                this.removeChild(this.bomb[i]);
            }
            for (var j = 0; j < this.lifeNo; j++) {
                this.removeChild(this.lives[j]);
            }
        };
        // Handles resetting of all game objects at beginning of each level
        PlayScene.prototype.resetGame = function () {
            this.score = 0;
            objects.Game.usedGridPositions = new Array();
            this.scoreLabel.text = this.score.toString() + "/" + this.targetScore.toString();
            this.snakeHead.ResetSnakeStatus();
            if (this.snakeList.length > 1) {
                for (var i = this.snakeList.length - 1; i > 0; i--) { // Avoid removing the head
                    this.removeChild(this.snakeList[i]);
                    this.snakeList.pop();
                }
            }
            this.snakeHead.Move();
            this.snakeHead.startTimer();
            this.addChild(this.mouse);
            if (this.speedUpShoeAppear) {
                this.speedUpShoe.ResetShoeLocation();
                this.addChild(this.speedUpShoe);
            }
            if (this.speedDownShoeAppear) {
                this.speedDownShoe.ResetShoeLocation();
                this.addChild(this.speedDownShoe);
            }
            this.bomb = new Array();
            for (var i = 0; i < this.bombNo; i++) {
                this.bomb[i] = new objects.Bomb(this.assetManager);
                this.addChild(this.bomb[i]);
            }
            this.lives = new Array();
            for (var j = 0; j < this.lifeNo; j++) {
                this.lives[j] = new objects.Life(this.assetManager, "life");
                this.addChild(this.lives[j]);
            }
            this.levelLabel.text = "Level " + this.currentLevel.getLevelNo();
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map