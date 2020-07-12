module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private levelLabel: objects.Label;
        private snake:objects.Snake;
        private background: objects.Background;
        private count:number=1;
        private score:number=0;
        private scoreLabel:objects.Label;
        private mouse:objects.Mouse;
        private bomb:objects.Bomb;
       
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
            this.background = new objects.Background(this.assetManager);
            this.snake = new objects.Snake(this.assetManager);
            this.mouse=new objects.Mouse(this.assetManager);
            this.bomb=new objects.Bomb(this.assetManager);
            this.Main();
        }

        public Update():void {
            this.snake.Update();
            this.bomb.Update();
            this.DetectEatMouse();
            this.DetectBombCollision();
            this.moveToEndScene();
        }

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.levelLabel);
            this.addChild(this.scoreLabel);
            this.addChild(this.snake);
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