module objects{
    export class SnakeBody extends objects.GameObject{
        public snakeBodyX:number;
        public snakeBodyY:number;
        public timer;

        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString); 
            this.Start();

        }

        public Start():void{
            
        }
        public Update(snakeX:number,snakeY:number):void{
            this.x = snakeX;
            this.y = snakeY;
            //console.log(objects.Game.bombCollision);
            //console.log(createjs.Ticker.interval);
        }
        public Move():void{
             
        }
        /*public startMove(speed:number):void{
            createjs.Ticker.interval=objects.Game.snakeHeadSpeed;
            this.timer=setTimeout(()=>{
                this.x=this.snakeBodyX;
                this.y=this.snakeBodyY;
                this.startMove(speed);
            },speed);                                  
        }*/
        public stopMove():void{
            if(objects.Game.snakeBoundCollision||objects.Game.bombCollision||objects.Game.achieveTargetScore){
                clearTimeout(this.timer);
            }
        }

    }
}