module objects {
    export class Button extends createjs.Bitmap {
        // Variables
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0, scale: number = 1.0) {
            super(assetManager.getResult(imageString));

            // Default position
            this.x = x;
            this.y = y;
            this.scaleX = scale;
            this.scaleY = scale;

            // Set up event handlers
            this.on("mouseover", this.mouseOver);
            this.on("mouseout", this.mouseOut);
        }
        // Methods
        // Event Handlers
        private mouseOver():void {
            this.alpha = 0.7;
        }

        private mouseOut():void {
            this.alpha = 1.0;
        }
    }
}