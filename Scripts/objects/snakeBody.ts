module objects{
    export class SnakeBody extends objects.GameObject{
        public snakeHeadX:number;
        public snakeHeadY:number;
        private newCoords: Array<number>;
        public timer;

        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString); 
            this.Start();
        }

        public Start():void{
            this.snakeHeadX=objects.Game.snakeHeadGridPos[0]-1;
            this.snakeHeadY=objects.Game.snakeHeadGridPos[1];
            this.Move(this.snakeHeadX,this.snakeHeadY);
            this.startTimer(objects.Game.snakeHeadSpeed+10);
        }
        public Update():void{
            console.log(objects.Game.snakeBoundCollision);
            console.log("snakebodyX "+this.snakeHeadX+" snabodyY "+this.snakeHeadY);   
            console.log("gridX: "+objects.Game.snakeHeadGridPos[0]+" gridY: "+objects.Game.snakeHeadGridPos[1]);
        }
        public Move(snakeX:number,snakeY:number):void{
             this.newCoords=this.getGridPosition(snakeX, snakeY);
             this.x = this.newCoords[0];
             this.y = this.newCoords[1]; 
        }
        public startTimer(speed:number):void{
            createjs.Ticker.interval=objects.Game.snakeHeadSpeed;
            this.timer=setTimeout(()=>{
                this.snakeHeadX=objects.Game.snakeHeadGridPos[0];
                this.snakeHeadY=objects.Game.snakeHeadGridPos[1];
                this.Move(this.snakeHeadX,this.snakeHeadY);
                this.startTimer(speed);
            },speed);                                  
        }
    }
}