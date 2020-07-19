module objects {
    export class SnakeHead extends objects.GameObject {
       // Variables
        gridPosX=2;
        gridPosY=2;  
        public snakeSpeed=300; 
        direction:managers.Keyboard; 
        newCoords: Array<number>;
        public timer;
        public collision:boolean=false;
        public timeToUpdateBodies:boolean = false;
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString);         
            this.direction=new managers.Keyboard();
            this.Start();
        }

        public Start():void {
            this.Move();
            this.startTimer(this.snakeSpeed);
            objects.Game.snakeHeadSpeed=this.snakeSpeed;
        }
        public Update():void {
            this.CheckBound();   
            this.Reset();
        }
        
        public Reset():void {
            if(this.x+this.halfW>960){
                this.x=960-this.halfW;
            }
            if(this.x<this.halfW){
                this.x=Math.abs(this.x);
            }
            if(this.y+this.halfH>700){
                this.y=690-this.halfH;
            }
            if(this.y<this.halfH){
                this.y=Math.abs(this.y);                   
            }
            if(this.collision){
                objects.Game.snakeBoundCollision=this.collision;
                this.stopTimer();
                objects.Game.currentScene = config.Scene.OVER;
            }
        }
       //Use a timer to locate snake's head
        public startTimer(speed:number):void{
            this.timer=setTimeout(()=>{
                this.Move();
                this.startTimer(speed);
            },speed);                                  
        } 
        public stopTimer():void{
            clearInterval(this.timer); 
        }
        public Move():void {
             //according to the keyboard event to decide direction to change snake's move
             if(this.direction.moveLeft){
                this.gridPosX--;
                this.rotation=0;
            }
            if(this.direction.moveRight){
               this.gridPosX++;
               this.rotation=180;
            }
            if(this.direction.moveDown){
                this.gridPosY++;
                this.rotation=-90;
            }
            if(this.direction.moveUp){
                this.gridPosY--;
                this.rotation=90;
            }
             //To set new location of snake
            this.newCoords=this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1]; 
            objects.Game.snakeHeadPos=new Array(this.x,this.y);
            //Update the other bodies
            this.timeToUpdateBodies = true;
       }
        public CheckBound():void {
            if(this.x+this.halfW>960||this.x<this.halfW){
                    this.collision=true;
            }
            if(this.y+this.halfH>690||this.y<this.halfH){
                    this.collision=true;
            }
        }
        public ResetSnakeStatus() {
            this.gridPosX = 2;
            this.gridPosY = 2;
            this.direction.moveUp = false;
            this.direction.moveDown = false;
            this.direction.moveLeft = false;
            this.direction.moveRight = true;
        }
    }
}