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
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            console.log("Play scene start");
            // Initialize our variables
            this.score = 0;
            this.levelLabel = new objects.Label("Level " + this.count, "40px", "Consolas", "#000000", 100, 80, true);
            this.scoreLabel = new objects.Label(this.score + "", "40px", "Consolas", "#000000", 600, 80, true);
            this.background = new objects.Background(this.assetManager);
            this.snake = new objects.Snake(this.assetManager);
            this.mouse = new createjs.Shape();
            this.step = 30;
            console.log("Initial Score is " + this.score);
            this.mouse.graphics.beginFill("#000")
                .drawCircle(200, 200, 20);
            PlayScene.prototype.score = 0;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.background.Update();
            this.snake.Update();
            this.checkEatMouse();
        };
        PlayScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.snake);
            this.addChild(this.mouse);
            // Register for click events
        };
        PlayScene.prototype.checkEatMouse = function () {
            console.log("checking eat mouse");
            console.log("snake x: " + this.snake.x + "   mouse x: " + this.mouse.x);
            // console.log("mouse x: " + this.mouse.x);  
            //  console.log("abs x difference: " + Math.abs(this.snake.x - this.mouse.x));   
            console.log("snake y: " + this.snake.y + "    mouse y: " + this.mouse.y);
            //   console.log("mouse y: " + this.mouse.y);  
            //   console.log("abs y difference: " + Math.abs(this.snake.y - this.mouse.y));        
            if (Math.abs(this.snake.x - 200) <= this.step &&
                Math.abs(this.snake.y - 200) <= this.step) {
                this.score++;
                console.log("After checkEatMouse, Score is " + this.score);
                this.scoreLabel.text = "Score: " + this.score;
            }
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map