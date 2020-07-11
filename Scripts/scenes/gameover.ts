module scenes {
    export class GameOverScene extends objects.Scene {
        // Variables
        private gameOverLabel: objects.Label;
        private scoreLabel:objects.Label;     
        private background: objects.Background;      
        private replayButton: objects.Button;
        private homeButton: objects.Button;
        public score: number;
        private win: boolean;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        // Method
        public Start():void {
            // Initialize our variables
            this.background = new objects.Background(this.assetManager);
            this.win = PlayScene.prototype.win;  //get the win value from PlayScene
            this.score = PlayScene.prototype.score; ////get the score value from PlayScene
            
            //if win or fail, the game over page will update for different situation           
            if (this.win == true ){
                this.gameOverLabel = new objects.Label(
                    "Good Job!  You are good to Level2", "40px", "Consolas", "#FFFFFF", 220, 240, true);
                this.scoreLabel = new objects.Label(
                    "Your score: " + this.score, "40px", "Consolas", "#FFFFFF", 250, 340, true);
              
            } else{
                this.gameOverLabel = new objects.Label(
                    "You gave up! Try it again?", "40px", "Consolas", "#FFFFFF", 320, 240, true);
                this.scoreLabel = new objects.Label(
                    "Your score: "  + this.score, "40px", "Consolas", "#FFFFFF", 250, 340, true);            

            }


           
            this.replayButton = new objects.Button(this.assetManager, "replayButton", 350, 440, 0.25);
            this.homeButton = new objects.Button(this.assetManager, "homeButton", 200, 445, 0.12);
            this.Main();
        }

        public Update():void {}

        public Main():void {
            this.addChild(this.background)
            this.addChild(this.gameOverLabel);
            this.addChild(this.replayButton);
            this.addChild(this.homeButton);
            this.addChild(this.scoreLabel);


            this.homeButton.on("click", this.homeButtonClick);
            this.replayButton.on("click", this.replayButtonClick);
        }

        private replayButtonClick():void {
            objects.Game.currentScene = config.Scene.GAME;
        }
        private homeButtonClick():void {
            objects.Game.currentScene = config.Scene.START;
        }
    }
}