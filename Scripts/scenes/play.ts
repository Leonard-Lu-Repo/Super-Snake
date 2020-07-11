module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private levelLabel: objects.Label;
        private snake:objects.Snake;
        private background: objects.Background;
        private count:number=1;        
        private scoreLabel:objects.Label;        
        public mouse :objects.Mouse;
        public score:number;
        public win: boolean;
        public step ; 


        
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            console.log("Play scene start");
            // Initialize our variables
            this.score = 0;
            this.levelLabel = new objects.Label( "Level "+this.count, "40px", "Consolas", "#000000", 100, 50, true);
            this.scoreLabel=new objects.Label(this.score+"" , "40px", "Consolas", "#000000", 600, 50, true)
            this.background = new objects.Background(this.assetManager);
            this.snake = new objects.Snake(this.assetManager);            
            this.mouse =  new objects.Mouse(); 
            this.step = 30;
         
            console.log("Initial Score is "+this.score);
           /* this.mouse.graphics.beginFill("#000")
                .drawCircle(200, 200, 20); */

             PlayScene.prototype.score = 0;      
           
            this.Main();
        }

        public Update():void {
            this.background.Update();
            this.snake.Update();
            this.mouse.Update();
            this.checkEatMouse();    
        }

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.snake);
            this.addChild(this.mouse);
            // Register for click events
            
        }

        public checkEatMouse(): void {  
            console.log("checking eat mouse");  
            console.log("snake x: " + this.snake.x + "   mouse x: " + this.mouse.x);   
            console.log("snake y: " + this.snake.y +"    mouse y: " + this.mouse.y);   
         
            if (Math.abs(this.snake.x - this.mouse.x) <= this.step  &&
            Math.abs(this.snake.y - this.mouse.y) <= this.step ) {
                this.score ++;
                console.log("After checkEatMouse, Score is "+this.score);
                this.scoreLabel.text = "Score: " + this.score; 
            }


        }


    }
}