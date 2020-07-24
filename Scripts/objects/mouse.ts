module objects {

    export class Mouse extends objects.GameObject {
        // Variables
        private  gridX: number;
        private  gridY: number;
        private  newCoords: Array<number>;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager,"mouse");
            this.Start();
        }

        public Start():void {
            this.setMouseLocation();
        }

        public Update():void { 
        }
       
       public Move():void{

       }
       public ResetMouseLocation():void {
        this.setMouseLocation();
       }
        //To set new location of mouse
        private setMouseLocation():void{
            let locationOk:boolean = false;
            while (!locationOk) {
                this.gridX=Math.round(Math.random()*28+1);
                this.gridY=Math.round(Math.random()*14+1);
                locationOk = true;
                // Mouse cannot be in same position as other objects
                if (objects.Game.usedGridPositions.length > 0) {
                    for (let i=0; i < objects.Game.usedGridPositions.length; i++) {
                        if (this.gridX == objects.Game.usedGridPositions[i].x && this.gridY == objects.Game.usedGridPositions[i].y) {
                            locationOk = false;
                        }
                    }
                }
            }
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        }
    }
}