module objects {
    export class Background extends createjs.Bitmap {
        // Variables
        private speedY:number = 2;
        // Constructor
        constructor(assetManager:createjs.LoadQueue)
        {
            super(assetManager.getResult("background"));
            console.log("Creating the background");
            

            this.Start();
        }
        // Functions
        public Start():void {
            
        }
        public Update():void {
           /*  this.Move();
            this.CheckBound(); */
        }
      
       /*  public Move():void{
            this.y += this.speedY;
        }

        // Collision Detection
        public CheckBound():void {
            if(this.y >= 100) {
                this.y=100;
            }
        } */
    }
}