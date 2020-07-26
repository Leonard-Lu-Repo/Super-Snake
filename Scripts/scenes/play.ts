module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private background: objects.Background;  
        private thornsWall:objects.Background;
        private instruction:objects.Background;
        private levelLabel: objects.Label;
        private scoreLabel:objects.Label; 
        private lifeIcon:createjs.Bitmap;
        private lifeLabel:objects.Label;
        private completeLabel: objects.Label;
        private snakeHead:objects.SnakeHead;
        private snakeList:objects.SnakeBody[]=new Array();
        private score:number=0;
        private currentLives:number;
        private bomb:objects.Bomb[]=new Array();
        private mouse :objects.Mouse;
        private speedUpShoe:objects.SpeedShoe;
        private speedDownShoe:objects.SpeedShoe;
        private lives:objects.Life[]=new Array();
        private explosion:objects.Explosion;
        private thumbsUp:createjs.Bitmap;
        private currentLevel:objects.Level;        
        private targetScore:number;
        private bombNo:number;
        private lifeNo:number;
        private speedUpShoeAppear:boolean;
        private speedDownShoeAppear:boolean;
        private speedUpTimer;// store speed up timer
        private speedDownTimer;// store speed down timer
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
            this.currentLives = 3;

            // Intialize our variables
            objects.Game.usedGridPositions = new Array();
            this.background = new objects.Background(this.assetManager,"background");
            this.thornsWall=new objects.Background(this.assetManager,"thornsWall",0,60);
            this.instruction=new objects.Background(this.assetManager,"instruction",0,650);
            this.levelLabel = new objects.Label( "Level "+ this.currentLevel.getLevelNo(), "40px", "Comic", "#FF9A36", 100, 40, true);
            this.scoreLabel=new objects.Label(this.score.toString()+"/"+this.targetScore.toString(), "40px", "Comic", "#FF9A36", 700, 40, true);
            this.lifeLabel = new objects.Label(this.currentLives.toString(), "40px", "Comic", "#FF9A36", 925, 40, true);
            this.lifeIcon = new createjs.Bitmap(this.assetManager.getResult("lifeIcon"));
            this.lifeIcon.regX = this.lifeIcon.getBounds().width * 0.5;
            this.lifeIcon.regY = this.lifeIcon.getBounds().height * 0.5;
            this.lifeIcon.x = 890;
            this.lifeIcon.y = 35;
            this.completeLabel = new objects.Label("Level Complete!", "50px", "Comic", "#FF9A36", 480, 240, true);
            this.snakeHead=new objects.SnakeHead(this.assetManager,"snakeHead");
            this.snakeList[0]=new objects.SnakeBody(this.assetManager,"snakeBody");
            this.mouse=new objects.Mouse(this.assetManager);
            for (let i=0; i<this.bombNo; i++) {
                this.bomb[i] = new objects.Bomb(this.assetManager);
            }
            for (let j=0; j<this.lifeNo; j++) {
                this.lives[j] = new objects.Life(this.assetManager, "life");
            }
            this.explosion = new objects.Explosion(this.assetManager);
            this.speedUpShoe=new objects.SpeedShoe(this.assetManager,"speedUpShoe");
            this.speedDownShoe=new objects.SpeedShoe(this.assetManager,"speedDownShoe");
            this.thumbsUp = new createjs.Bitmap(this.assetManager.getResult("thumbsUp"));
            this.thumbsUp.regX = this.thumbsUp.getBounds().width * 0.5;
            this.thumbsUp.regY = this.thumbsUp.getBounds().height * 0.5;
            this.thumbsUp.x = 480;
            this.thumbsUp.y = 400;
            this.Main();
        }

        public Update():void {
            this.snakeHead.Update();
            this.DetectSnakeSelfCollision();//If this method is under timeToUpdateBodies condition, then it doesn't work
            this.DetectEatMouse();/*If this method is under timeToUpdateBodies condition, then it will cause snake body
                                    appear at top left corner when adding new bodies, because snake head timer has a lower refresh 
                                    frequence than createjs ticker*/
            if(this.snakeHead.timeToUpdateBodies) {
                this.snakeHead.timeToUpdateBodies = false;
                this.UpdateSnakeBodies();
                this.DetectBombCollision();
                this.DetectLife();
                this.DetectBoundary();
                if (this.speedUpShoeAppear || this.speedDownShoeAppear) {
                    this.DetectSpeedUpShoe();
                    this.DetectSpeedDownShoe();
                }
                console.log(this.snakeHead.snakeSpeed);
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
            this.addChild(this.lifeLabel);
            this.addChild(this.lifeIcon);
            // add objects
            this.addChild(this.snakeHead);
            this.resetGame();

            this.paused = false;
        }

        //This method makes snake body follows snake head's movement
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
                
                createjs.Sound.play("SnakeEatMiceSound");
                this.score+=10;
                this.scoreLabel.text = this.score.toString()+"/"+this.targetScore.toString();
                this.mouse.ResetMouseLocation();
                // Add new snake body
                this.snakeList.push(new objects.SnakeBody(this.assetManager,"snakeBody"));//add a new body to snake
                this.addChild(this.snakeList[this.snakeList.length-1]);
            }
        }

        public DetectBombCollision():void{
            let bombCollision:boolean;
            let snakeCoords = this.snakeHead.getGridCoords();
            let bombTouched:number;
            for (let i=0; i<this.bombNo; i++) {
                let bombCoords = this.bomb[i].getGridCoords();
                if (snakeCoords[0] == bombCoords[0] && snakeCoords[1] == bombCoords[1]) {
                    bombCollision = true;
                    bombTouched = i;
                    i = this.bombNo;// End the loop
                }
            }
            if(bombCollision){
                objects.Game.bombCollision=true;
                this.addChild(this.explosion);
                this.explosion.Explode(this.bomb[bombTouched].x, this.bomb[bombTouched].y);
                this.removeChild(this.bomb[bombTouched]);
                this.snakeHead.stopTimer();

                 
                createjs.Sound.play("explosion");       


                setTimeout(()=>{
                    this.removeChild(this.explosion);
                    this.processHit();
                }, 2000);
            }
        }

        public DetectSpeedUpShoe():void{
            this.speedUpShoe.shoeCollision=managers.Collision.AABBCollisionCheck(this.snakeHead,this.speedUpShoe);
            objects.Game.speedUpShoeCollision=this.speedUpShoe.shoeCollision;
            if(this.speedUpShoe.shoeCollision){
                //remove speed up shoe and add speed down shoe after 12s
                this.removeChild(this.speedUpShoe);
                clearTimeout(this.speedDownTimer);
                this.speedUpTimer=setTimeout(()=>{
                    this.speedDownShoe.ResetShoeLocation();
                    this.addChild(this.speedDownShoe);
                },12000);
            }
        }

        public DetectSpeedDownShoe():void{
            this.speedDownShoe.shoeCollision=managers.Collision.AABBCollisionCheck(this.snakeHead,this.speedDownShoe);
            objects.Game.speedDownShoeCollision=this.speedDownShoe.shoeCollision;
            if(this.speedDownShoe.shoeCollision){
                //remove speed down shoe and add speed up shoe after 12s
                clearTimeout(this.speedUpTimer);
                this.removeChild(this.speedDownShoe);
                this.speedDownTimer=setTimeout(()=>{
                    this.speedUpShoe.ResetShoeLocation();
                    this.addChild(this.speedUpShoe);
                },12000);
            }
        }

        public DetectLife():void {
            if (this.lives.length > 0) {
                let lifeCollision:boolean = false;
                let snakeCoords = this.snakeHead.getGridCoords();
                let lifeTouched:number;
                for (let i=0; i<this.lifeNo; i++) {
                    let lifeCoords = this.lives[i].getGridCoords();
                    if (snakeCoords[0] == lifeCoords[0] && snakeCoords[1] == lifeCoords[1]) {
                        lifeCollision = true;
                        lifeTouched = i;
                        i = this.lifeNo;// End the loop
                    }
                }
                if(lifeCollision) {                    
                    createjs.Sound.play("SnakeHitsLife");
                    this.removeChild(this.lives[lifeTouched]);
                    this.currentLives++;
                    this.lifeLabel.text = this.currentLives.toString();
                }
            }
        }

        public DetectSnakeSelfCollision():void{
            let selfCollision:boolean;
            //when snake head's next step is snake body then it slef collision is ture
            for(let i=this.snakeList.length-1;i>0;i--){
                if(this.snakeHead.nextX==this.snakeList[i].x&&this.snakeHead.nextY==this.snakeList[i].y){
                    selfCollision=true;
                }
            }
            if(selfCollision){
                console.log("Self collided");
                this.snakeHead.stopTimer();
                setTimeout(()=>{
                    this.processHit();
                }, 2000);
                console.log(this.currentLives);
            }
        }

        public DetectBoundary():void {
            let collision:boolean;
            let snakeCoords = this.snakeHead.getGridCoords();
            if(snakeCoords[0] > 30 || snakeCoords[0] < 1){
                collision=true;
            }
            if(snakeCoords[1] > 16 || snakeCoords[1] <0){
                collision=true;
            }
            if(collision){
                createjs.Sound.play("SnakeHitWall");
                this.snakeHead.Reset();
                setTimeout(()=>{
                    this.processHit();
                },2000);
            }
        }

        private loadLevel(levelNo):void {
            // Get data of new level
            this.currentLevel = objects.Level.GetLevelData(levelNo);
            // Load new data into variables
            this.targetScore = this.currentLevel.getTargetScore();
            this.bombNo = this.currentLevel.getBombNo();
            this.lifeNo = this.currentLevel.getLifeNo();
            this.speedUpShoeAppear = this.currentLevel.getSpeedUpShoe();
            this.speedDownShoeAppear = this.currentLevel.getSpeedDownShoe();
        }

        private processHit():void {
            this.currentLives--;
            this.lifeLabel.text = this.currentLives.toString();
            if (this.currentLives <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
                return;
            }
            // If we still have lives, reset the level
            this.clearGameObjects();
            this.resetGame();
        }

        private moveToNextLevel():void {
            
            createjs.Sound.play("LevelCompleteSound");
            // First pause everything and show results
            objects.Game.achieveTargetScore=true;
            this.clearGameObjects();

            this.completeLabel.visible = true;
            this.thumbsUp.visible = true;
            this.paused = true;
            this.snakeHead.stopTimer();
            setTimeout(()=>{
                // Load new level data
                this.loadLevel(this.currentLevel.getLevelNo() + 1);
                // Reset everything
                this.resetGame();
                this.completeLabel.visible = false;
                this.thumbsUp.visible = false;
                // Unpause
                this.paused = false;
            },2000);
        }

        // Clears all game objects from screen (except for the snake)
        private clearGameObjects() {
            this.removeChild(this.mouse);

            this.removeChild(this.speedDownShoe);
            this.removeChild(this.speedUpShoe);
            clearTimeout(this.speedDownTimer);
            clearTimeout(this.speedUpTimer);

            for (let i=0; i<this.bombNo; i++) {
                this.removeChild(this.bomb[i]);
            }
            for (let j=0; j<this.lifeNo; j++) {
                this.removeChild(this.lives[j]);
            }
        }

        // Handles resetting of all game objects at beginning of each level
        private resetGame() {
            this.score = 0;
            objects.Game.usedGridPositions = new Array();
            this.scoreLabel.text = this.score.toString()+"/"+this.targetScore.toString();
            this.snakeHead.ResetSnakeStatus();
            if (this.snakeList.length > 1) {
                for (let i = this.snakeList.length-1; i > 0; i--) {// Avoid removing the head
                    this.removeChild(this.snakeList[i]);
                    this.snakeList.pop();
                }
            }
            this.snakeHead.Move();
            this.snakeHead.startTimer();

            this.addChild(this.mouse);

            if (this.speedUpShoeAppear) {
                setTimeout(()=>{
                    this.addChild(this.speedUpShoe);
                },8000);
            }
            if (this.speedDownShoeAppear) {
                setTimeout(()=>{
                    this.addChild(this.speedDownShoe);
                },8000);
            }

            this.bomb = new Array();
            for (let i=0; i<this.bombNo; i++) {
                this.bomb[i] = new objects.Bomb(this.assetManager);
                this.addChild(this.bomb[i]);
            }

            this.lives = new Array();
            for (let j=0; j<this.lifeNo; j++) {
                this.lives[j] = new objects.Life(this.assetManager, "life");
                this.addChild(this.lives[j]);
            }

            this.levelLabel.text = "Level " + this.currentLevel.getLevelNo();
        }
    }
}