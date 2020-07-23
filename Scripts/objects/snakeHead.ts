module objects {
    export class SnakeHead extends objects.GameObject {
       // Variables
        private direction:managers.Keyboard; 
        private gridPosX=0;
        private gridPosY=0;
        private nextGridPosX=0;
        private nextGridPosY=0;  
        public snakeSpeed=200; 
        public nextX:number;
        public nextY:number;
        private newCoords: Array<number>;
        private nextCoords:Array<number>;
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
            console.log(this.gridPosX);
            
        }
        
        public Reset():void {
            if(this.gridPosX>30){
                this.gridPosX=30
            }
            if(this.gridPosX<1){
                this.gridPosX=1;
            }
            if(this.gridPosY<0){
                this.gridPosY=0;
            }
            if(this.gridPosY>16){
                this.gridPosY=16;                   
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
            clearTimeout(this.timer); 
        }
        public Move():void {
             //according to the keyboard event to decide direction to change snake's move
             if(this.direction.moveLeft){
                this.gridPosX--;
                this.nextGridPosX=this.gridPosX-1;
                this.rotation=0;
            }
            if(this.direction.moveRight){
               this.gridPosX++;
               this.nextGridPosX=this.gridPosX+1;
               this.rotation=180;
            }
            if(this.direction.moveDown){
                this.gridPosY++;
                this.nextGridPosY=this.gridPosY+1;
                this.rotation=-90;
            }
            if(this.direction.moveUp){
                this.gridPosY--;
                this.nextGridPosY=this.gridPosY-1;
                this.rotation=90;
            }
             //To set new location of snake
            this.newCoords=this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1]; 
            this.nextCoords=this.getGridPosition(this.nextGridPosX,this.nextGridPosY);
            this.nextX=this.nextCoords[0];
            this.nextY=this.nextCoords[1];
            objects.Game.snakeHeadPos=new Array(this.x,this.y);
            //Update the other bodies
            this.timeToUpdateBodies = true;
       }
        public CheckBound():void {
            if(this.gridPosX>30||this.gridPosX<0){
                this.collision=true;
            }
            if(this.gridPosY>16||this.gridPosY<0){
                this.collision=true;
            }
            if(this.collision){
                this.stopTimer();
                setTimeout(function(){
                    objects.Game.currentScene = config.Scene.OVER;
                },2000);
            }
            this.Reset();
        }
        public ResetSnakeStatus() {
            this.gridPosX = 1;
            this.gridPosY = 1;
            this.direction.moveUp = false;
            this.direction.moveDown = false;
            this.direction.moveLeft = false;
            this.direction.moveRight = true;
        }
    }
}