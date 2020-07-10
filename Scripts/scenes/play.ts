module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private levelLabel: objects.Label;
        private snake:objects.Snake;
        private background: objects.Background;
        private count:number=1;
        private score:number=0;
        private scoreLabel:objects.Label;
       
public mouse;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            console.log("Play scene start");
            // Inintialize our variables
            this.levelLabel = new objects.Label( "Level "+this.count, "40px", "Consolas", "#000000", 100, 80, true);
            this.scoreLabel=new objects.Label(this.score+"" , "40px", "Consolas", "#000000", 800, 80, true)
            this.background = new objects.Background(this.assetManager);
            this.snake = new objects.Snake(this.assetManager);
            this.snake = new objects.Snake(this.assetManager);
            this.mouse = new createjs.Shape();
            this.mouse.graphics.beginFill("#000")
                .drawCircle(200, 200, 20);
           
            this.Main();
        }

        public Update():void {
            this.background.Update();
            this.snake.Update();
        }

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.snake);
            this.addChild(this.mouse);
            // Register for click events
            
        }
    }
}