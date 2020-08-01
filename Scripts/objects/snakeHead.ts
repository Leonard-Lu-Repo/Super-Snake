module objects {
    export class SnakeHead extends objects.GameObject {
       // Variables
        private direction:managers.Keyboard; 
        private gridPosX=0;
        private gridPosY=0;
        private nextGridPosX=0;
        private nextGridPosY=0;  
        public  snakeSpeed=200; 
        public nextX:number;
        public nextY:number;
        private newCoords: Array<number>;
        private nextCoords:Array<number>;
        private timer;
        public timeToUpdateBodies:boolean = false;
        public imageString:string;

        public setImage(newImage:string):void{
            this.imageString=newImage;
        }
        public getImage():string{
            return this.imageString;
        }
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString);         
            this.direction=new managers.Keyboard();
            this.Start();
        }

        public Start():void {
        }
        public Update():void {   
        }
        
        public Reset():void {
            if(this.gridPosX>30){
                this.gridPosX=30;
                this.stopTimer();
            }
            if(this.gridPosX<1){
                this.gridPosX=1;
                this.stopTimer();
            }
            if(this.gridPosY<0){
                this.gridPosY=0;
                this.stopTimer();
            }
            if(this.gridPosY>16){
                this.gridPosY=16;  
                this.stopTimer();                 
            }
           
        }
       //Use a timer to locate snake's head and speed
        public startTimer():void{
            this.timer=setTimeout(()=>{
                this.Move();
                if(objects.Game.speedUpShoeCollision){
                    this.snakeSpeed=100;
                    setTimeout(()=>{
                        this.snakeSpeed=200;
                    },8000);
                } 
                if(objects.Game.speedDownShoeCollision){
                    this.snakeSpeed=400;
                    setTimeout(()=>{
                        this.snakeSpeed=200;
                    },8000);
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
                this.nextGridPosY=this.gridPosY;
                this.rotation=0;
            }
            if(this.direction.moveRight){
               this.gridPosX++;
               this.nextGridPosX=this.gridPosX+1;
               this.nextGridPosY=this.gridPosY;
               this.rotation=180;
            }
            if(this.direction.moveDown){
                this.gridPosY++;
                this.nextGridPosX=this.gridPosX;
                this.nextGridPosY=this.gridPosY+1;
                this.rotation=-90;
            }
            if(this.direction.moveUp){
                this.gridPosY--;
                this.nextGridPosX=this.gridPosX;
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
            this.snakeSpeed=200;
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