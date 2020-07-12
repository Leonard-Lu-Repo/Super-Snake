module objects {
    export class Bomb extends objects.GameObject {
        // Variables
        private  gridX: number;
        public  gridY: number;
        private timer;
        private conllision:boolean
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
            this.gridX=Math.round(Math.random()*32);
            this.gridY=Math.round(Math.random()*23);
            this.coordinates = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.coordinates[0];
            this.y = this.coordinates[1]; 
        }

    }
}