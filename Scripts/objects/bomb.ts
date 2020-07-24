module objects {
    export class Bomb extends objects.GameObject {
        // Variables
        private gridX: number;
        public gridY: number;
        private timer;
        private collision:boolean
        newCoords: Array<number>;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager,"bomb");
            this.Start();
        }
        public setCollision(newState:boolean){
            this.collision=newState;
        }
        public Start():void {
            this.setBombLocation();
            //this.startTimer();
        }

        public Update():void { 
            /*if(this.collision){
                this.stopTimer();
            }*/
        }
       
       public Move():void{

       }
       // Charlie: For now the bomb isn't moving so I've taken out the timer.
       /*//Use a timer to locate snake's head
       public startTimer():void{
            this.timer= setInterval(() => {
                this.setBombLocation();
            }, 8000);                                  
        }
        public stopTimer():void{
            clearInterval(this.timer); 
        }*/

        //To set new location of bomb
        private setBombLocation():void{
            let locationOk:boolean = false;
            while (!locationOk) {
                this.gridX=Math.round(Math.random()*28 + 1);
                this.gridY=Math.round(Math.random()*14 + 1);
                locationOk = true;
                // Bomb cannot be in same position as other objects
                if (objects.Game.usedGridPositions.length > 0) {
                    for (let i=0; i < objects.Game.usedGridPositions.length; i++) {
                        if (this.gridX == objects.Game.usedGridPositions[i].x && this.gridY == objects.Game.usedGridPositions[i].y) {
                            locationOk = false;
                        }
                    }
                }
                // Bomb cannot be in upper-left 'safe area'
                if (this.gridX < 8 && this.gridY < 5) {
                    locationOk = false;
                }
            }
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        }

        public getGridCoords():Array<number> {
            return new Array(this.gridX,this.gridY);
        }
    }
}