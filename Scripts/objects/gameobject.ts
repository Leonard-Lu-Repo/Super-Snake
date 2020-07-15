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
        public Move(posx:number=0,posy:number=0):void {}
        public CheckBound():void {}

        public getGridPosition(squareX, squareY):Array<number> {
            
            // TODO: These variables that describe the grid position should probably be somewhere else
            // Size of the grid in pixels
            let gridWidth = 960;           
            let gridHeight = 690;
            // Number of squares in the grid, now the stage is filld by 48*35 squares.
            let numSquareColumns = 32;
            let numSquareRows = 23;


            // Calculate middle point of square for posX and posY
            let widthOfSquare = gridWidth / numSquareColumns;//square width : 30
            let heightOfSquare = gridHeight /numSquareRows;//square height: 30
            let x = (widthOfSquare * (squareX-1)) + (widthOfSquare / 2);
            let y = (heightOfSquare * (squareY-1)) + (heightOfSquare / 2);
            let coordinates=new Array(x,y);
            return coordinates;
        }
    }
}