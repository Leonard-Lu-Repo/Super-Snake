module scenes {
    export class SecondLevel extends objects.Scene {
        // Variables
        private playlabel: objects.Label;
        private background: objects.Background;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        // Method
        public Start():void {
            // Initialize our variables
            this.playlabel = new objects.Label("This is second level!", "60px", "Comic", "#FF9A36", 400, 240, true);
            this.background = new objects.Background(this.assetManager);
            this.Main();
        }

        public Update():void {}

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.playlabel);
        }

       
    }
}