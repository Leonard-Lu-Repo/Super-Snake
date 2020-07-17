module objects{
    export class SnakeBody extends objects.GameObject{
        public snakeHeadX:number;
        public snakeHeadY:number;
        
        public timer;

        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString); 
            this.Start();
        }

        public Start():void{
            
        }
        public Update(snakeX:number,snakeY:number):void{
            if(objects.Game.mouseCollision){
                this.startMove(objects.Game.snakeHeadSpeed+10);
            }
            this.snakeHeadX=snakeX;
            this.snakeHeadY=snakeY;
            console.log(objects.Game.mouseCollision);
            console.log("snakebodyX "+this.snakeHeadX+" snabodyY "+this.snakeHeadY);   
            console.log("gridX: "+objects.Game.snakeHeadPos[0]+" gridY: "+objects.Game.snakeHeadPos[1]);
        }
        public Move():void{
             
        }
        public startMove(speed:number):void{
            createjs.Ticker.interval=objects.Game.snakeHeadSpeed;
            this.timer=setTimeout(()=>{
                this.x=this.snakeHeadX;
                this.y=this.snakeHeadY;
                this.startMove(speed);
            },speed);                                  
        }

    }
}