module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private background: objects.Background;        
        private levelLabel: objects.Label;
        private scoreLabel:objects.Label; 
        private completeLabel: objects.Label;
        private snake:objects.SnakeHead;
        private snakeList:objects.SnakeBody[]=new Array();
        private count:number=1;
        private score:number=0;
        private bomb:objects.Bomb;
        private mouse :objects.Mouse;
        private explosion:objects.Explosion;
        private thumbsUp:createjs.Bitmap;
        private level:number=1;         
        private targetScore: number = 30;
        private paused:boolean; // Whether the game is paused or not
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            console.log("Play scene start");
            // Inintialize our variables
            this.levelLabel = new objects.Label( "Level "+this.count, "40px", "Comic", "#FF9A36", 100, 80, true);
            this.scoreLabel=new objects.Label(this.score+"" , "40px", "Comic", "#FF9A36", 800, 80, true)
            this.completeLabel = new objects.Label("Level Complete!", "50px", "Comic", "#FF9A36", 480, 240, true);
            this.background = new objects.Background(this.assetManager);
            this.snake=new objects.SnakeHead(this.assetManager,"snakeHead");
            this.snakeList[0]=new objects.SnakeBody(this.assetManager,"snakeBody");
            this.mouse=new objects.Mouse(this.assetManager);
            this.bomb=new objects.Bomb(this.assetManager);
            this.explosion = new objects.Explosion(this.assetManager);
            this.thumbsUp = new createjs.Bitmap(this.assetManager.getResult("thumbsUp"));
            this.Main();
        }

        public Update():void {
            this.snake.Update();
            this.bomb.Update();
            this.DetectEatMouse();
            this.DetectBombCollision();
            this.snakeList[0].Update(objects.Game.snakeHeadPos[0],objects.Game.snakeHeadPos[1]);
            for(let i=1;i<this.snakeList.length;i++){
                this.snakeList[i].Update(this.snakeList[i-1].x,this.snakeList[i-1].y);
            }
            this.moveToNextLevel();
            this.Main();
           
            console.log(this.snakeList.length);
        }
      
        public Main():void {
            //always add background first
            this.addChild(this.background); 
            
            //add labels
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);

            // add objects
            this.addChild(this.snake);
            //this.addChild(this.snakeList[0]);
            if(this.mouse.mouseCollision){
                for(let i=0;i<this.snakeList.length;i++){
                    this.addChild(this.snakeList[i]);
                } 
            }
            this.addChild(this.mouse);
            this.addChild(this.bomb);

            this.paused = false;
        }
        public DetectEatMouse():void{
            let eatMouse:boolean;
            eatMouse=managers.Collision.AABBCollisionCheck(this.snake,this.mouse);
            if(eatMouse){
                this.score+=10;
                this.scoreLabel.text = this.score.toString();
                this.mouse.mouseCollision=true;
                this.snakeList.push(new objects.SnakeBody(this.assetManager,"snakeBody"));
                this.mouse.ResetMouseLocation();
            }
        }

        public DetectBombCollision():void{
            let bombCollision:boolean;
            bombCollision=managers.Collision.AABBCollisionCheck(this.snake,this.bomb);
            if(bombCollision){
                objects.Game.bombCollision=true;
                this.addChild(this.explosion);
                this.explosion.Explode(this.bomb.x, this.bomb.y);
                this.removeChild(this.bomb);
                this.snake.stopTimer();
                setTimeout(function(){
                    objects.Game.currentScene = config.Scene.OVER;
                }, 3000);
            }
        }
        private moveToNextLevel():void {
            // Change to next level
            if(this.score >= this.targetScore && !this.paused){
                objects.Game.achieveTargetScore=true;
                this.removeChild(this.mouse);
                this.addChild(this.completeLabel);
                this.thumbsUp.regX = this.thumbsUp.getBounds().width * 0.5;
                this.thumbsUp.regY = this.thumbsUp.getBounds().height * 0.5;
                this.thumbsUp.x = 480;
                this.thumbsUp.y = 400;
                this.addChild(this.thumbsUp);
                this.paused = true;
                this.snake.stopTimer();
                setTimeout(function(){
                    objects.Game.currentScene = config.Scene.SECONDLEVEL;
                    this.paused = false;
                },3000);
            }
        }
    }
}