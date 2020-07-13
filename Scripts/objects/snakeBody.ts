module objects{
    export class SnakeBody extends objects.GameObject{
        public gridX;
        public gridY;
        public snakeHeadX:number;
        public snakeHeadY:number;
        private newCoords: Array<number>;
        
        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString); 

            this.Start();
        }

        public Start():void{
            this.snakeHeadX=Snake.prototype.gridX-1;
            this.snakeHeadY=Snake.prototype.gridY;
            this.Move(this.snakeHeadX,this.snakeHeadY);
        }
        public Update():void{
           setTimeout(()=>{
            this.snakeHeadX=Snake.prototype.gridX;
                this.snakeHeadY=Snake.prototype.gridY;
                this.Move(this.snakeHeadX,this.snakeHeadY); 
           },500);
                       
        }
        public Move(snakeHeadX:number,snakeHeadY:number):void{
             //To set new location of snakeBody
             this.gridX=snakeHeadX;
             this.gridY=snakeHeadY;
             this.newCoords=this.getGridPosition(this.gridX, this.gridY);
             this.x = this.newCoords[0];
             this.y = this.newCoords[1]; 
        }
    }
}