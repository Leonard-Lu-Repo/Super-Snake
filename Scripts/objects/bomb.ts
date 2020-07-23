module objects {
    export class Bomb extends objects.GameObject {
        // Variables
        private  gridX: number;
        public  gridY: number;
        private timer;
        private conllision:boolean
        newCoords: Array<number>;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager,"bomb");
            this.Start();
        }
        public setCollision(newState:boolean){
            this.conllision=newState;
        }
        public Start():void {
            this.setBombLocation();
            this.startTimer();
        }

        public Update():void { 
            if(this.conllision){
                this.stopTimer();
            }

        }
       
       public Move():void{

       }
       //Use a timer to locate snake's head
       public startTimer():void{
            this.timer= setInterval(() => {
                this.setBombLocation();
            }, 8000);                                  
        }
        public stopTimer():void{
            clearInterval(this.timer); 
        }
        //To set new location of mouse
        private setBombLocation():void{
            do {
                this.gridX=Math.round(Math.random()*28 + 1);
                this.gridY=Math.round(Math.random()*14 + 1);
                // This loop ensures the bomb isn't in the same position as the mouse
            } while (objects.Game.currentMouseGridPos[0] == this.gridX && objects.Game.currentMouseGridPos[1] == this.gridY);
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1]; 
        }

    }
}