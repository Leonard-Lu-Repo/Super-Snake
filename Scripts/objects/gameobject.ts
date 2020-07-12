module objects {
    export abstract class GameObject extends createjs.Bitmap {
        // Useful for collision detection
        public width: number;
        public height: number;
        public halfW: number;  
        public halfH: number;
        public gridWidth:number;           
        public gridHeight:number;
        public numSquareColumns :number;
        public numSquareRows :number;
        public coordinates : Array<number>;
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager.getResult(imageString));

            this.name = imageString;

            this.Init();
        }

        private Init():void {
            // Initialize all the properties of my object
            this.height = this.getBounds().height;
            this.width = this.getBounds().width;
            
            this.halfW = this.width * 0.5;
            this.halfH = this.height * 0.5;

            // Registration points
            this.regX = this.halfW;
            this.regY = this.halfH;
        }

        public Start():void {}
        public Update():void {}
        public Reset():void {}
        public Move():void {}
        public CheckBound():void {}

        public getGridPosition(squareX, squareY):Array<number> {
            
            // TODO: These variables that describe the grid position should probably be somewhere else
            // Size of the grid in pixels
            this.gridWidth = 960;           
            this.gridHeight = 690;
            // Number of squares in the grid, now the stage is filld by 48*35 squares.
            this.numSquareColumns = 32;
            this.numSquareRows = 23;

            // Calculate middle point of square for posX and posY
            let widthOfSquare = this.gridWidth / this.numSquareColumns;//square width : 30
            let heightOfSquare = this.gridHeight / this.numSquareRows;//square height: 30
            let x = (widthOfSquare * (squareX-1)) + (widthOfSquare / 2);
            let y = (heightOfSquare * (squareY-1)) + (heightOfSquare / 2);
            this.coordinates=new Array(x,y);
            return this.coordinates;
        }
    }
}