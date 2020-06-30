module objects {
    export class Gamelogo extends createjs.Bitmap {
        // Variables
        private speedY:number = 2;
        // Constructor
        constructor(assetManager:createjs.LoadQueue, x:number)
        {
            super(assetManager.getResult("gameLogo"));
            console.log("Creating the gamelogo");
            this.x=x;
            this.Start();
        }
        // Functions
        public Start():void {
            
        }
        public Update():void {
            this.Move();
            this.CheckBound();
        }
      
        public Move():void{
            this.y += this.speedY;
        }

        // Collision Detection
        public CheckBound():void {
            if(this.y >= 100) {
                this.y=100;
            }
        }
    }
}