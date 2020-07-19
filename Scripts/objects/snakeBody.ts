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
        }
        public Move():void{
             
        }
        public stopMove():void{
            if(objects.Game.snakeBoundCollision||objects.Game.bombCollision||objects.Game.achieveTargetScore||objects.Game.slefCollison){
                this.Update(this.x,this.y);
                clearTimeout(this.timer);
            }
        }

    }
}