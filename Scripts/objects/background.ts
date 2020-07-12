module objects {
    export class Background extends createjs.Bitmap {
        // Variables
        // Constructor
        constructor(assetManager:createjs.LoadQueue)
        {
            super(assetManager.getResult("backgroud"));
            console.log("Creating the background");
            

            this.Start();
        }
        // Functions
        public Start():void {
            
        }
        public Update():void {
          
        }
    }
}