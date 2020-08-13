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
            _this.coins = new Array();
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
            this.thornsWall = new objects.Background(this.assetManager, "thornsWall", 0, 0);
            this.instruction = new objects.Background(this.assetManager, "instruction", 0, 650);
            this.levelLabel = new objects.Label("Level " + this.currentLevel.getLevelNo(), "40px", "Comic", "#FF9A36", 100, 40, true);
            this.scoreLabel = new objects.Label(this.score.toString() + "/" + this.targetScore.toString(), "40px", "Comic", "#FF9A36", 700, 40, true);
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
            this.eagle = new objects.Eagle(this.assetManager);
            this.explosion = new objects.Explosion(this.assetManager);
            this.eaglecatch = new objects.Catch(this.assetManager);
            this.thumbsUp = new createjs.Bitmap(this.assetManager.getResult("thumbsUp"));
            this.thumbsUp.regX = this.thumbsUp.getBounds().width * 0.5;
            this.thumbsUp.regY = this.thumbsUp.getBounds().height * 0.5;
            this.thumbsUp.x = 480;
            this.thumbsUp.y = 400;
            this.keyInput = new managers.Keyboard();
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            if (this.currentLevel.getSaw()) {
                this.saw.Update();
            }
            if (this.currentLevel.getFort()) {
                if (this.fort1.bullets.y >= this.fort1.y + 10 || this.fort2.bullets.y >= this.fort2.bullets.y + 10) {
                    this.fort1.bullets.y += 4;
                    this.fort2.bullets.y += 4;
                }
                if (this.fort1.bullets.y > 800 || this.fort2.bullets.y > 800) {
                    this.fort1.bullets.y = this.fort2.bullets.y = this.fort1.y + 10;
                }
                if (this.fort3.bullets.x <= this.fort3.x - 10 || this.fort4.bullets.x <= this.fort4.bullets.x - 10) {
                    this.fort3.bullets.x -= 4;
                    this.fort4.bullets.x -= 4;
                }
                if (this.fort3.bullets.x < -300 || this.fort4.bullets.x < -300) {
                    this.fort3.bullets.x = this.fort4.bullets.x = this.fort3.x - 10;
                }
            }
            this.snakeHead.Update();
            this.eagle.Update();
            this.eaglecatch.Update();
            this.DetectEatMouse(); /*If this method is under timeToUpdateBodies condition, then it will cause snake body
                                    appear at top left corner when adding new bodies, because snake head timer has a lower refresh
                                    frequence than createjs ticker*/
            if (this.snakeHead.timeToUpdateBodies) {
                this.snakeHead.timeToUpdateBodies = false;
                this.UpdateSnakeBodies();
                this.DetectBombCollision();
                this.DetectEagleCollision();
                this.DetectSnakeSelfCollision();
                this.DetectLife();
                this.DetectCoin();
                this.DetectBoundary();
                if (this.currentLevel.getSaw()) {
                    this.DetectSaw();
                }
                if (this.currentLevel.getFort()) {
                    this.DetectBullet();
                }
                if (this.speedUpShoeAppear) {
                    this.DetectSpeedUpShoe();
                    console.log("Speed Up: " + this.speedUpShoe.x + " " + this.speedUpShoe.y);
                    console.log(this.speedUpShoe.shoeCollision);
                }
                if (this.speedDownShoeAppear) {
                    this.DetectSpeedDownShoe();
                    console.log("Speed Down: " + this.speedDownShoe.x + " " + this.speedDownShoe.y);
                    console.log(this.speedUpShoe.shoeCollision);
                }
            }
            // Check if score is achieved
            if (this.score >= this.targetScore && !this.paused) {
                this.moveToNextLevel();
            }
            // Debug keys
            if (this.keyInput.debugX) {
                this.score = this.targetScore;
                this.keyInput.debugX = false;
            }
        };
        PlayScene.prototype.Main = function () {
            this.resetGame();
            this.paused = false;
        };
        //This method makes snake body follows snake head's movement
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
                createjs.Sound.play("SnakeEatMiceSound");
                this.score += 10;
                this.scoreLabel.text = this.score.toString() + "/" + this.targetScore.toString();
                this.mouse.ResetMouseLocation();
                // Add new snake body
                this.snakeList.push(new objects.SnakeBody(this.assetManager, "snakeBody")); //add a new body to snake
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
                createjs.Sound.play("explosion");
                setTimeout(function () {
                    _this.removeChild(_this.explosion);
                    _this.processHit();
                }, 2000);
            }
        };
        PlayScene.prototype.DetectEagleCollision = function () {
            var _this = this;
            var snakeCoords = this.snakeHead.getGridCoords();
            var eagleCoords = this.eagle.getGridCoords();
            var xDistance = snakeCoords[0] - Math.floor(eagleCoords[0]);
            var yDistance = snakeCoords[1] - Math.floor(eagleCoords[1]);
            if (xDistance >= 0 && xDistance <= 2 && yDistance >= 0 && yDistance <= 2) {
                objects.Game.eagleCollision = true;
                this.addChild(this.eaglecatch);
                this.eaglecatch.Catch(this.eagle.x, this.eagle.y);
                this.snakeHead.stopTimer();
                this.eagle.Reset();
                createjs.Sound.play("SnakeHitsEagle"); //need to change sound for eagle catch snake
                this.processHit();
                console.log("Eagle ate the snake");
                setTimeout(function () {
                    _this.eaglecatch.Dispear();
                }, 2000);
            }
        };
        PlayScene.prototype.DetectSpeedUpShoe = function () {
            var _this = this;
            this.speedUpShoe.shoeCollision = managers.Collision.AABBCollisionCheck(this.snakeHead, this.speedUpShoe);
            objects.Game.speedUpShoeCollision = this.speedUpShoe.shoeCollision;
            if (this.speedUpShoe.shoeCollision) {
                //remove speed up shoe and add speed down shoe after 12s
                clearTimeout(this.speedUpTimer);
                this.speedUpShoeAppear = false;
                this.removeChild(this.speedUpShoe);
                setTimeout(function () { _this.speedUpShoe.shoeCollision = false; objects.Game.speedUpShoeCollision = _this.speedUpShoe.shoeCollision; }, 8000);
                this.speedDownShoeAppear = true;
                this.speedDownShoe = new objects.SpeedShoe(this.assetManager, "speedDownShoe");
                this.speedDownShoe.ResetShoeLocation();
                this.speedDownTimer = setTimeout(function () {
                    _this.addChild(_this.speedDownShoe);
                }, 12000);
            }
        };
        PlayScene.prototype.DetectSpeedDownShoe = function () {
            var _this = this;
            this.speedDownShoe.shoeCollision = managers.Collision.AABBCollisionCheck(this.snakeHead, this.speedDownShoe);
            objects.Game.speedDownShoeCollision = this.speedDownShoe.shoeCollision;
            if (this.speedDownShoe.shoeCollision) {
                //remove speed down shoe and add speed up shoe after 12s
                clearTimeout(this.speedDownTimer);
                this.removeChild(this.speedDownShoe);
                this.speedDownShoeAppear = false;
                setTimeout(function () { _this.speedDownShoe.shoeCollision = false; objects.Game.speedDownShoeCollision = _this.speedDownShoe.shoeCollision; }, 8000);
                this.speedUpShoeAppear = true;
                this.speedUpShoe.ResetShoeLocation();
                this.speedUpTimer = setTimeout(function () {
                    _this.addChild(_this.speedUpShoe);
                }, 12000);
            }
        };
        PlayScene.prototype.DetectLife = function () {
            if (this.lives.length > 0) {
                var lifeCollision = false;
                var snakeCoords = this.snakeHead.getGridCoords();
                var lifeTouched = void 0;
                for (var i = 0; i < this.lives.length; i++) {
                    var lifeCoords = this.lives[i].getGridCoords();
                    if (snakeCoords[0] == lifeCoords[0] && snakeCoords[1] == lifeCoords[1]) {
                        lifeCollision = true;
                        lifeTouched = i;
                        i = this.lives.length; // End the loop
                    }
                }
                if (lifeCollision) {
                    createjs.Sound.play("ExtraLife");
                    this.removeChild(this.lives[lifeTouched]);
                    this.lives.splice(lifeTouched, 1);
                    this.currentLives++;
                    this.lifeLabel.text = this.currentLives.toString();
                }
            }
        };
        PlayScene.prototype.DetectCoin = function () {
            var coinCollision = false;
            var snakeCoords = this.snakeHead.getGridCoords();
            var coinTouched;
            for (var i = 0; i < this.coins.length; i++) {
                var coinCoords = this.coins[i].getGridCoords();
                if (snakeCoords[0] == coinCoords[0] && snakeCoords[1] == coinCoords[1]) {
                    coinCollision = true;
                    coinTouched = i;
                    i = this.coins.length; // End the loop
                }
            }
            if (coinCollision) {
                createjs.Sound.stop();
                // SnakeHitCoin
                createjs.Sound.play("SnakeHitCoin");
                // TODO: Add sound
                this.removeChild(this.coins[coinTouched]);
                this.coins.splice(coinTouched, 1);
                this.score += 1;
                this.scoreLabel.text = this.score.toString() + "/" + this.targetScore.toString();
            }
        };
        PlayScene.prototype.DetectSnakeSelfCollision = function () {
            var _this = this;
            var selfCollision;
            //when snake head's next step is snake body then it slef collision is ture
            for (var i = this.snakeList.length - 1; i > 0; i--) {
                if (this.snakeHead.nextX == this.snakeList[i].x && this.snakeHead.nextY == this.snakeList[i].y) {
                    selfCollision = true;
                }
            }
            if (selfCollision) {
                console.log("Self collided");
                this.snakeHead.stopTimer();
                this.addChild(this.snakeHead.snakeDead);
                setTimeout(function () {
                    _this.removeChild(_this.snakeHead.snakeDead);
                    _this.processHit();
                }, 2000);
            }
        };
        PlayScene.prototype.DetectBoundary = function () {
            var _this = this;
            var collision;
            var snakeCoords = this.snakeHead.getGridCoords();
            if (snakeCoords[0] > 30 || snakeCoords[0] < 1) {
                collision = true;
            }
            if (snakeCoords[1] > 16 || snakeCoords[1] < 0) {
                collision = true;
            }
            if (collision) {
                createjs.Sound.play("SnakeHitWall");
                this.snakeHead.Reset();
                this.addChild(this.snakeHead.blood);
                this.addChild(this.snakeHead.snakeDead);
                setTimeout(function () {
                    _this.removeChild(_this.snakeHead.snakeDead);
                    _this.removeChild(_this.snakeHead.blood);
                    _this.processHit();
                }, 2000);
            }
        };
        PlayScene.prototype.DetectSaw = function () {
            var _this = this;
            var collision;
            collision = managers.Collision.squaredRadiusCheck(this.snakeHead, this.saw);
            if (collision) {
                this.snakeHead.stopTimer();
                this.saw.collision = true;
                this.addChild(this.snakeHead.blood);
                this.addChild(this.snakeHead.snakeDead);
                setTimeout(function () {
                    _this.removeChild(_this.snakeHead.snakeDead);
                    _this.removeChild(_this.snakeHead.blood);
                    _this.processHit();
                }, 2000);
            }
        };
        PlayScene.prototype.DetectBullet = function () {
            var _this = this;
            var collision1 = managers.Collision.squaredRadiusCheck(this.snakeHead, this.fort1.bullets);
            var collision2 = managers.Collision.squaredRadiusCheck(this.snakeHead, this.fort2.bullets);
            var collision3 = managers.Collision.squaredRadiusCheck(this.snakeHead, this.fort3.bullets);
            var collision4 = managers.Collision.squaredRadiusCheck(this.snakeHead, this.fort4.bullets);
            if (collision1 || collision2 || collision3 || collision4) {
                this.snakeHead.stopTimer();
                this.addChild(this.snakeHead.blood);
                this.addChild(this.snakeHead.snakeDead);
                setTimeout(function () {
                    _this.removeChild(_this.snakeHead.snakeDead);
                    _this.removeChild(_this.snakeHead.blood);
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
            this.coinNo = this.currentLevel.getCoinNo();
            this.speedUpShoeAppear = this.currentLevel.getSpeedUpShoe();
        };
        PlayScene.prototype.processHit = function () {
            this.currentLives--;
            this.lifeLabel.text = this.currentLives.toString();
            if (this.currentLives <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
                return;
            }
            if (this.currentLevel.getSaw()) {
                this.saw.resetMove();
            }
            // If we still have lives, reset the level
            this.clearGameObjects();
            this.speedUpShoeAppear = this.currentLevel.getSpeedUpShoe();
            this.resetGame();
        };
        PlayScene.prototype.moveToNextLevel = function () {
            var _this = this;
            createjs.Sound.play("LevelCompleteSound");
            // First pause everything and show results
            objects.Game.achieveTargetScore = true;
            this.clearGameObjects();
            this.speedDownShoeAppear = false;
            this.completeLabel.visible = true;
            this.thumbsUp.visible = true;
            this.paused = true;
            this.snakeHead.stopTimer();
            setTimeout(function () {
                if (_this.currentLevel.getLevelNo() < 5) {
                    // Load new level data
                    _this.loadLevel(_this.currentLevel.getLevelNo() + 1);
                    // Reset everything
                    _this.resetGame();
                    _this.completeLabel.visible = false;
                    _this.thumbsUp.visible = false;
                    // Unpause
                    _this.paused = false;
                }
                else {
                    // If finished last level, go to Win Scene
                    objects.Game.currentScene = config.Scene.WIN;
                }
            }, 2000);
        };
        // Clears all game objects from screen (except for the snake)
        PlayScene.prototype.clearGameObjects = function () {
            //this.removeAllChildren();
            this.removeChild(this.mouse);
            this.removeChild(this.speedDownShoe);
            this.removeChild(this.speedUpShoe);
            clearTimeout(this.speedDownTimer);
            clearTimeout(this.speedUpTimer);
            this.removeChild(this.saw);
            for (var i = 0; i < this.bombNo; i++) {
                this.removeChild(this.bomb[i]);
            }
            for (var j = 0; j < this.lifeNo; j++) {
                this.removeChild(this.lives[j]);
            }
            for (var c = 0; c < this.coinNo; c++) {
                this.removeChild(this.coins[c]);
            }
        };
        // Handles resetting of all game objects at beginning of each level
        PlayScene.prototype.resetGame = function () {
            var _this = this;
            this.addChild(this.background);
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
            this.snakeHead.snakeSpeed = 200;
            this.snakeHead.startTimer();
            if (this.currentLevel.getSaw()) {
                this.saw = new objects.Saw(this.assetManager);
                this.addChild(this.saw);
            }
            if (this.currentLevel.getFort()) {
                this.fort1 = new objects.Fort(this.assetManager, 250, 90);
                this.fort1.bullets.x = this.fort1.x;
                this.fort1.bullets.y = this.fort1.y + 10;
                this.fort2 = new objects.Fort(this.assetManager, 700, 90);
                this.fort2.bullets.x = this.fort2.x;
                this.fort2.bullets.y = this.fort2.y + 10;
                this.fort3 = new objects.Fort(this.assetManager, 920, 250);
                this.fort3.rotation = 90;
                this.fort3.bullets.x = this.fort3.x - 10;
                this.fort3.bullets.y = this.fort3.y;
                this.fort4 = new objects.Fort(this.assetManager, 920, 450);
                this.fort4.rotation = 90;
                this.fort4.bullets.x = this.fort4.x - 10;
                this.fort4.bullets.y = this.fort4.y;
                this.addChild(this.fort1);
                this.addChild(this.fort2);
                this.addChild(this.fort3);
                this.addChild(this.fort4);
                this.addChild(this.fort1.bullets);
                this.addChild(this.fort2.bullets);
                this.addChild(this.fort3.bullets);
                this.addChild(this.fort4.bullets);
            }
            this.addChild(this.thornsWall);
            this.addChild(this.instruction);
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.completeLabel);
            this.completeLabel.visible = false;
            this.addChild(this.thumbsUp);
            this.thumbsUp.visible = false;
            this.addChild(this.lifeLabel);
            this.addChild(this.lifeIcon);
            this.addChild(this.snakeHead);
            this.addChild(this.eagle);
            this.addChild(this.mouse);
            if (this.speedUpShoeAppear) {
                this.speedUpShoe = new objects.SpeedShoe(this.assetManager, "speedUpShoe");
                setTimeout(function () {
                    _this.addChild(_this.speedUpShoe);
                }, 8000);
            }
            this.speedDownShoeAppear = false;
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
            this.coins = new Array();
            for (var c = 0; c < this.coinNo; c++) {
                this.coins[c] = new objects.Coin(this.assetManager, "coin");
                this.addChild(this.coins[c]);
            }
            this.levelLabel.text = "Level " + this.currentLevel.getLevelNo();
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map