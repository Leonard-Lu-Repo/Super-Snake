module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private background: objects.Background;  
        private thornsWall:objects.Background;
        private instruction:objects.Background;
        private levelLabel: objects.Label;
        private scoreLabel:objects.Label; 
        private completeLabel: objects.Label;
        private snakeHead:objects.SnakeHead;
        private snakeList:objects.SnakeBody[]=new Array();
        private score:number=0;
        private bomb:objects.Bomb;
        private mouse :objects.Mouse;
        private speedUpShoe:objects.SpeedShoe;
        private speedDownShoe:objects.SpeedShoe;
        private explosion:objects.Explosion;
        private thumbsUp:createjs.Bitmap;
        private currentLevel:objects.Level;        
        private targetScore: number;
        private paused:boolean; // Whether the game is paused or not
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            console.log("Play scene start");

            // Load Level 1
            this.loadLevel(1);
            
            // Intialize our variables
            this.background = new objects.Background(this.assetManager,"background");
            this.thornsWall=new objects.Background(this.assetManager,"thornsWall",0,60);
            this.instruction=new objects.Background(this.assetManager,"instruction",0,650);
            this.levelLabel = new objects.Label( "Level "+ this.currentLevel.getLevelNo(), "40px", "Comic", "#FF9A36", 100, 40, true);
            this.scoreLabel=new objects.Label(this.score.toString()+"/"+this.targetScore.toString(), "40px", "Comic", "#FF9A36", 800, 40, true)
            this.completeLabel = new objects.Label("Level Complete!", "50px", "Comic", "#FF9A36", 480, 240, true);
            this.snakeHead=new objects.SnakeHead(this.assetManager,"snakeHead");
            this.snakeList[0]=new objects.SnakeBody(this.assetManager,"snakeBody");
            this.mouse=new objects.Mouse(this.assetManager);
            this.bomb=new objects.Bomb(this.assetManager);
            this.explosion = new objects.Explosion(this.assetManager);
            if(this.currentLevel.getLevelNo()>1){
                this.speedUpShoe=new objects.SpeedShoe(this.assetManager,"speedUpShoe");
                this.speedDownShoe=new objects.SpeedShoe(this.assetManager,"speedDownShoe");
            }
            this.thumbsUp = new createjs.Bitmap(this.assetManager.getResult("thumbsUp"));
            this.thumbsUp.regX = this.thumbsUp.getBounds().width * 0.5;
            this.thumbsUp.regY = this.thumbsUp.getBounds().height * 0.5;
            this.thumbsUp.x = 480;
            this.thumbsUp.y = 400;
            this.Main();
        }

        public Update():void {
            this.snakeHead.Update();
            this.bomb.Update();
            this.DetectEatMouse();
            this.DetectBombCollision();
            this.DetectSnakeslefCollision();
            this.DetectSpeedUpShoe();
            this.DetectSpeedDownShoe();
            if(this.snakeHead.timeToUpdateBodies) {
                this.snakeHead.timeToUpdateBodies = false;
                this.UpdateSnakeBodies();
            }
            // Check if score is achieved
            if (this.score >= this.targetScore && !this.paused) {
                this.moveToNextLevel();
            }
        }
      
        public Main():void {
            //always add background first
            this.addChild(this.background); 
            this.addChild(this.thornsWall);
            this.addChild(this.instruction);
            //add labels
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.completeLabel);
            this.completeLabel.visible = false;
            this.addChild(this.thumbsUp);
            this.thumbsUp.visible = false;

            // add objects
            this.addChild(this.snakeHead);
            this.addChild(this.mouse);
            this.addChild(this.bomb);
            this.paused = false;
        }

        public UpdateSnakeBodies():void {
            for(let i=this.snakeList.length-1;i>0;i--){
                this.snakeList[i].Update(this.snakeList[i-1].x,this.snakeList[i-1].y);
            }
            this.snakeList[0].Update(objects.Game.snakeHeadPos[0],objects.Game.snakeHeadPos[1]);
        }

        public DetectEatMouse():void{
            let eatMouse:boolean;
            eatMouse=managers.Collision.AABBCollisionCheck(this.snakeHead,this.mouse);
            if(eatMouse){
                this.score+=10;
                this.scoreLabel.text = this.score.toString()+"/"+this.targetScore.toString();
                this.mouse.ResetMouseLocation();
                // Add new snake body
                this.snakeList.push(new objects.SnakeBody(this.assetManager,"snakeBody"));
                this.addChild(this.snakeList[this.snakeList.length-1]);
            }
        }

        public DetectBombCollision():void{
            let bombCollision:boolean;
            bombCollision=managers.Collision.AABBCollisionCheck(this.snakeHead,this.bomb);
            if(bombCollision){
                objects.Game.bombCollision=true;
                this.addChild(this.explosion);
                this.explosion.Explode(this.bomb.x, this.bomb.y);
                this.removeChild(this.bomb);
                this.snakeHead.stopTimer();
                setTimeout(function(){
                    objects.Game.currentScene = config.Scene.OVER;
                }, 2000);
            }
        }

        public DetectSpeedUpShoe():void{
            this.speedUpShoe.shoeCollision=managers.Collision.AABBCollisionCheck(this.snakeHead,this.speedUpShoe);
            objects.Game.speedUpShoeCollision=this.speedUpShoe.shoeCollision;
            if(this.speedUpShoe.shoeCollision){
                this.removeChild(this.speedUpShoe);
                setTimeout(()=>{
                    this.addChild(this.speedDownShoe);
                },10000);
            }
            console.log(objects.Game.speedUpShoeCollision);
            //console.log(this.speedUpShoe.x);
        }

        public DetectSpeedDownShoe():void{
            this.speedDownShoe.shoeCollision=managers.Collision.AABBCollisionCheck(this.snakeHead,this.speedDownShoe);
            objects.Game.speedDownShoeCollision=this.speedDownShoe.shoeCollision;
            if(this.speedDownShoe.shoeCollision){
                this.removeChild(this.speedDownShoe);
                setTimeout(()=>{
                    this.addChild(this.speedUpShoe);
                },10000);
            }
        }

        public DetectSnakeslefCollision():void{
            let selfCollision:boolean;
            for(let i=this.snakeList.length-1;i>0;i--){
                if(this.snakeHead.nextX==this.snakeList[i].x&&this.snakeHead.nextY==this.snakeList[i].y){
                    selfCollision=true;
                }
            }
            if(selfCollision){
                this.snakeHead.stopTimer();
                setTimeout(function(){
                    objects.Game.currentScene = config.Scene.OVER;
                }, 2000);
            }
        }

        private loadLevel(levelNo):void {
            // Get data of new level
            this.currentLevel = objects.Level.GetLevelData(levelNo);
            // Load new data into variables
            this.targetScore = this.currentLevel.getTargetScore();
            // TODO: There will be more data to load later on...
        }

        private moveToNextLevel():void {
            // First pause everything and show results
            objects.Game.achieveTargetScore=true;
            this.removeChild(this.mouse);
            this.removeChild(this.speedDownShoe);
            this.removeChild(this.speedUpShoe);
            this.completeLabel.visible = true;
            this.thumbsUp.visible = true;
            this.paused = true;
            this.snakeHead.stopTimer();
            setTimeout(()=>{
                // Load new level
                this.loadLevel(this.currentLevel.getLevelNo() + 1);
                // Reset everything
                this.score = 0;
                this.scoreLabel.text = this.score.toString()+"/"+this.targetScore.toString();
                this.snakeHead.ResetSnakeStatus();
                for (let i = this.snakeList.length-1; i > 0; i--) {// Avoid removing the head
                    this.removeChild(this.snakeList[i]);
                    this.snakeList.pop();
                }
                this.snakeHead.startTimer();// NOTE: Currently hard-coding in 200 for speed
                this.addChild(this.mouse);
                this.addChild(this.speedUpShoe);
                this.levelLabel.text = "Level " + this.currentLevel.getLevelNo();
                this.completeLabel.visible = false;
                this.thumbsUp.visible = false;
                // Unpause
                this.paused = false;
            },2000);
        }
    }
}