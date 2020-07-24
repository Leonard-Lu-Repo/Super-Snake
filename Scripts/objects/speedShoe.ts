module objects{
    export class SpeedShoe extends objects.GameObject {
        // Variables
        private  gridX: number;
        private  gridY: number;
        private  coords: Array<number>;
        public shoeCollision:boolean=false;
    
        // Constructor
        constructor(assetManager:createjs.LoadQueue,imgString:string) {
            super(assetManager,imgString);
            this.Start();
        }
    
        public Start():void {
            this.setShoeLocation();
        }
    
        public Update():void { 
        }
       
       public Move():void{
    
       }
       public ResetShoeLocation():void {
        this.setShoeLocation();
       }
        //To set new location of shoe
        private setShoeLocation():void{
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
            this.coords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.coords[0];
            this.y = this.coords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        }
    }
}
