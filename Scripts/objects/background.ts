module objects {
    export class Background extends createjs.Bitmap {
        // Variables
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string, x:number=0,y:number=0)
        {
            super(assetManager.getResult(imageString));
            this.x=x;
            this.y=y;
            this.Start();
        }
        // Functions
        public Start():void {
            
        }
        public Update():void {
          
        }
    }
}