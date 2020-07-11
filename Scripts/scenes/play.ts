module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private background: objects.Background;        
        private levelLabel: objects.Label;
        private scoreLabel:objects.Label; 

        private nextButton: objects.Button;
        private backButton: objects.Button;
        
        private snake:objects.Snake;
        public mouse :objects.Mouse;

        private level:number=1;         
        public score:number;
        private targetScore: number;
        public win: boolean;
        public step ; 
       // public collision:boolean;


        
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            console.log("Play scene start");
            // Initialize our variables
            PlayScene.prototype.score = 0;
            PlayScene.prototype.win = false;
            this.targetScore = 3;
            this.levelLabel = new objects.Label( "Level "+this.level, "40px", "Consolas", "#000000", 100, 50, true);
            this.scoreLabel=new objects.Label(PlayScene.prototype.score+"/"+ this.targetScore , "40px", "Consolas", "#000000", 600, 50, true)
            this.background = new objects.Background(this.assetManager);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 890, 650, 1.0);
            this.backButton = new objects.Button(this.assetManager, "backButton", 10, 650, 1.0);
            this.snake = new objects.Snake(this.assetManager);            
            this.mouse =  new objects.Mouse(this.assetManager); 
            this.step = 30;           
         
            console.log("Initial Score is "+ PlayScene.prototype.score);
          
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
            //always add background first
            this.addChild(this.background); 
            
            //add labels
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);

            // add objects
            this.addChild(this.snake);
            this.addChild(this.mouse);

            //add buttons
            this.addChild(this.nextButton);
            this.addChild(this.backButton);

            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);         
            
        }

        public checkEatMouse(): void {  
            console.log("checking eat mouse");  
            console.log("snake x: " + this.snake.x + "   mouse x: " + this.mouse.x);   
            console.log("snake y: " + this.snake.y +"    mouse y: " + this.mouse.y);   
         
            if (Math.abs(this.snake.x - this.mouse.x) <= this.step  &&
                 Math.abs(this.snake.y - this.mouse.y) <= this.step ) {
                    
                    //update score
                    PlayScene.prototype.score ++;
                    console.log("After checkEatMouse, Score is "+PlayScene.prototype.score);
                    this.scoreLabel.text = "Score: " + PlayScene.prototype.score +"/ "+ this.targetScore;
                
                    if (PlayScene.prototype.score >= this.targetScore ){
                        //update win status
                        PlayScene.prototype.win = true;
                        console.log("Level1 finish, go to level 2 or game over");
                       
                        //Game Scene change to Game Over
                        objects.Game.currentScene = config.Scene.OVER;
                    }
                    
                    //regenerate a new mouse                 
                    this.mouse.Reset(); 
            }

        }
        private nextButtonClick():void {
            PlayScene.prototype.win = false;           
            objects.Game.currentScene = config.Scene.OVER;            
          //  GameOverScene.updateResult(PlayScene.prototype.timeSpend, false);
        }

        private backButtonClick():void {
            objects.Game.currentScene = config.Scene.START;
        }

       

    }
}