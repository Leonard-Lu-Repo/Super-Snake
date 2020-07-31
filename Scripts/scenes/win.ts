module scenes {
    export class WinScene extends objects.Scene {
        // Variables
        private background: objects.Background;
        private congratsLabel: objects.Label;
        private subLabel: objects.Label;
        private mainButton:objects.Button;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start():void {
            // Initialize variables
            this.congratsLabel = new objects.Label("Congratulations!", "60px", "Comic", "FF9A36", 480, 240, true);
            this.subLabel = new objects.Label("You completed all 5 levels!", "35px", "Comic", "FF9A36", 480, 280, true);
            this.background = new objects.Background(this.assetManager, "background");
            this.mainButton = new objects.Button(this.assetManager, "mainButton", 400, 340);
            this.Main();
        }

        public Update(): void {}

        public Main(): void {
            this.addChild(this.background);
            this.addChild(this.congratsLabel);
            this.addChild(this.subLabel);
            this.addChild(this.mainButton);
            // TODO: Insert win sound
            this.mainButton.on("click", this.mainButtonClick);
        }

        private mainButtonClick():void {
            createjs.Sound.stop();
            objects.Game.currentScene = config.Scene.START;
        }
    }
}