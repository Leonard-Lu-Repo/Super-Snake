module objects {
    export class SnakeHead extends objects.GameObject {
       // Variables
        private direction:managers.Keyboard; 
        private gridPosX=0;
        private gridPosY=0;
        private nextGridPosX=0;
        private nextGridPosY=0;  
        public snakeSpeed=400; 
        public nextX:number;
        public nextY:number;
        private newCoords: Array<number>;
        private nextCoords:Array<number>;
        private timer;
        private collision:boolean=false;
        public timeToUpdateBodies:boolean = false;
        private eatSpeedUpShoe:boolean;
        private eatSpeedDownShoe:boolean;

        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString);         
            this.direction=new managers.Keyboard();
            this.Start();
        }

        public Start():void {
        }
        public Update():void {
            this.eatSpeedUpShoe=objects.Game.speedUpShoeCollision;
            this.eatSpeedDownShoe=objects.Game.speedDownShoeCollision;       
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
       //Use a timer to locate snake's head and speed
        public startTimer():void{
            this.timer=setTimeout(()=>{
                this.Move();
                if(this.eatSpeedUpShoe){
                    this.snakeSpeed=200;
                } 
                if(this.eatSpeedDownShoe){
                    this.snakeSpeed=800;
                }
                this.startTimer();
            },this.snakeSpeed);                                  
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
        public ResetSnakeStatus() {
            this.gridPosX = 0;
            this.gridPosY = 0;
            this.snakeSpeed=400;
            this.direction.moveUp = false;
            this.direction.moveDown = false;
            this.direction.moveLeft = false;
            this.direction.moveRight = true;
            this.direction.moveDirection="right";
        }

        public getGridCoords():Array<number> {
            return new Array(this.gridPosX,this.gridPosY);
        }
    }
}