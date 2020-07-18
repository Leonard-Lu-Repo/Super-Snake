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
            this.startMove(objects.Game.snakeHeadSpeed);
        }
        public Update(snakeX:number,snakeY:number):void{
            this.snakeHeadX=snakeX;
            this.snakeHeadY=snakeY;
            this.stopMove();
            console.log(objects.Game.bombCollision);
            console.log(createjs.Ticker.interval);
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
        public stopMove():void{
            if(objects.Game.snakeBoundCollision||objects.Game.bombCollision||objects.Game.achieveTargetScore){
                clearTimeout(this.timer);
            }
        }

    }
}