module scenes {
    export class GameOverScene extends objects.Scene {
        // Variables
        private background: objects.Background;  
        private gameOverLabel: objects.Label;
        private mainButton: objects.Button;
        private replayButton:objects.Button;
        private gameoverSound:any;


        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        // Method
        public Start():void {
            // Initialize our variables
            this.gameOverLabel = new objects.Label(
                "Game Over!", "60px", "Comic", "#FF9A36", 470, 240, true);
            this.background=new objects.Background(this.assetManager,"background");
            this.mainButton = new objects.Button(this.assetManager, "mainButton", 400, 340);
            this.replayButton=new objects.Button(this.assetManager,"replayButton",400,500);
            this.Main();
        } //end of Start()

        public Update():void {}

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.gameOverLabel);
            this.addChild(this.mainButton);
            this.addChild(this.replayButton);
            this.gameoverSound = createjs.Sound.play("GameOverSound");
            this.mainButton.on("click", this.mainButtonClick);
            this.replayButton.on("click",this.replayButtonClick);
        }

        private mainButtonClick():void {
            createjs.Sound.stop();
            objects.Game.currentScene = config.Scene.START;
        }

        private replayButtonClick():void {
            createjs.Sound.stop();
            objects.Game.currentScene = config.Scene.GAME;
        }
    } //end of GameOverScene class
}