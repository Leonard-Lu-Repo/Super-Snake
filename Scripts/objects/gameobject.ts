module objects {
    export abstract class GameObject extends createjs.Bitmap {
        // Useful for collision detection
        public width: number;
        public height: number;
        public halfW: number;  
        public halfH: number;
       
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager.getResult(imageString));

            this.name = imageString;

            this.Init();
        }

        private Init():void {
            // Initialize all the properties of my object
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
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
            let gridWidth = 1200;
            let gridHeight = 750;
            
            // Top-left position of the grid on-screen
           /*  let gridTopLeftX = 40;
            let gridTopLeftY = 0; */
            let gridTopLeftX = 0;
            let gridTopLeftY = 0;
            // Number of squares in the grid
            /* let numSquareRows = 30;
            let numSquareColumns = 30; */
            let numSquareRows = gridWidth/this.width;
            let numSquareColumns = gridHeight/this.height;

            // Calculate middle point of square for posX and posY
            let widthOfSquare = gridWidth / numSquareColumns;
            let heightOfSquare = gridHeight / numSquareRows;
            let x = (widthOfSquare * (squareX-1)) + (widthOfSquare / 2) + gridTopLeftX;
            let y = (heightOfSquare * (squareY-1)) + (heightOfSquare / 2) + gridTopLeftY;
          /*   let x = (widthOfSquare * (squareX-1));
            let y = (heightOfSquare * (squareY-1))  + gridTopLeftY; */
            let coordinates = new Array(x, y);
            return coordinates;
        }
    }
}