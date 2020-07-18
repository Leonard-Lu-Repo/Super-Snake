module objects {

    export class Mouse extends objects.GameObject {
        // Variables
        private  gridX: number;
        private  gridY: number;
        newCoords: Array<number>;
        public mouseCollision:boolean=false;
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
            this.gridX=Math.round(Math.random()*30+1);
            this.gridY=Math.round(Math.random()*21+1);
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            objects.Game.currentMouseGridPos = new Array(this.gridX, this.gridY);// Update the global variable
        }
    }
}