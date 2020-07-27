module objects {
    export class Eagle extends objects.GameObject {
        // Variables
        private  gridX: number;
        private  gridY: number;
        private offsetX: number = 0.005;
        private offsetY: number = 0.01;
        private  newCoords: Array<number>;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "eagle");
            this.Start();
        }
        // Methods
        public Start():void {
            this.Reset();
        }
        public Update():void {
            this.Move();
            this.CheckBound();
           // console.log("eagle move a step: "+this.gridX + ", " + this.gridY);
        }
        public Reset():void {
            this.gridX = 0;
            this.gridY = -10;
            this.offsetX = 0.005;
            this.offsetY = 0.01;
        }
        public Move():void {
            this.gridX += this.offsetX;
            this.gridY += this.offsetY;
            this.newCoords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1];
            // Add coords to global variable usedGridPositions
            objects.Game.usedGridPositions.push(new objects.Position(this.gridX, this.gridY));
        }
        
        public CheckBound():void {
            if (this.gridY >= 15) {
                this.offsetY = -0.01;
            }
            if (this.gridX >= 60 ) {
                this.Reset();
            }

        }

        public getGridCoords():Array<number> {
            return new Array(this.gridX, this.gridY);
        }
        
    }
}