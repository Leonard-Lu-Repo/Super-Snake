module scenes {
    export class StartScene extends objects.Scene {
        // Variables
        private logo: objects.Gamelogo;
        private background:objects.Background;
        private startButton: objects.Button;

        private sound:any;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }
        // Methods
        public Start():void {

           this.sound = createjs.Sound.play("HomeScreenSound");
           this.sound.play();
            // Initialize our objects for this scene
            this.logo = new objects.Gamelogo(this.assetManager,100);
            this.background=new objects.Background(this.assetManager,"background");

            // NOTE: PreloadJS manifest id
            this.startButton = new objects.Button(this.assetManager, "startButton", 350, 500);
            
            this.Main();
        }

        public Update():void {
             this.logo.Update();
        }

        public Main():void {
            // Add items to the scene

            this.addChild(this.background);
            this.addChild(this.logo);
            this.addChild(this.startButton);
            this.startButton.on("click", this.startButtonClick);
        }

        private startButtonClick():void {
            // Change from START to GAME scene
            createjs.Sound.stop();
            objects.Game.currentScene = config.Scene.GAME;

        }
    }
}