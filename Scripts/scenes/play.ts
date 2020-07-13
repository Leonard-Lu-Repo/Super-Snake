module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private background: objects.Background;        
        private levelLabel: objects.Label;
        private scoreLabel:objects.Label;
        private snake:objects.Snake;
        private snakeBody:objects.SnakeBody;
        private count:number=1;
        private score:number=0;
        private bomb:objects.Bomb;
        private mouse :objects.Mouse;
        private level:number=1;         
        private targetScore: number=100;
        snakeList =new Array();
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            console.log("Play scene start");
            // Inintialize our variables
            this.levelLabel = new objects.Label( "Level "+this.count, "40px", "Comic", "#FF9A36", 100, 80, true);
            this.scoreLabel=new objects.Label(this.score.toString()+"/"+this.targetScore.toString() , "40px", "Comic", "#FF9A36", 800, 80, true)
            this.background = new objects.Background(this.assetManager);
            this.snake=new objects.Snake(this.assetManager,"snake",2,1);
            this.snakeBody=new objects.SnakeBody(this.assetManager,"snake");
            this.mouse=new objects.Mouse(this.assetManager);
            this.bomb=new objects.Bomb(this.assetManager);           
            this.Main();
            createjs.Ticker.interval=1000;
        }

        public Update():void {
            this.snake.Update();
            this.bomb.Update();
            this.snakeBody.Update();
            this.DetectEatMouse();
            this.DetectBombCollision();
            this.moveToEndScene();
        }
      
        public Main():void {
            //always add background first
            this.addChild(this.background); 
            
            //add labels
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);

            // add objects
            this.addChild(this.snake);
            this.addChild(this.snakeBody);
            this.addChild(this.mouse);
            this.addChild(this.bomb);
        }
        public DetectEatMouse():void{
            let eatMouse:boolean;
            eatMouse=managers.Collision.AABBCollisionCheck(this.snake,this.mouse);
            if(eatMouse){
                this.score+=10;
                this.scoreLabel.text = this.score.toString();
                this.mouse.ResetMouseLocation();
            }
        }

        public DetectBombCollision():void{
            let bombCollision:boolean;
            bombCollision=managers.Collision.AABBCollisionCheck(this.snake,this.bomb);
            if(bombCollision){
                this.snake.stopTimer();
                this.removeChild(this.bomb);
                objects.Game.currentScene = config.Scene.OVER;
            }
        }
        private moveToEndScene():void {
            // Change from PLAY to GAMEOVER scene
            if(this.score==30){
                this.snake.stopTimer();
                setTimeout(function(){
                    objects.Game.currentScene = config.Scene.SECONDLEVEL; 
                },2000);
            }
        }
    }
}