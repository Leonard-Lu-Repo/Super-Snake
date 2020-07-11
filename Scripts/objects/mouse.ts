module objects {
    export class Mouse extends objects.GameObject {
        // Variables
        public  x: number;
        public  y: number;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "Mouse");
            this.Start();

        }

        public Start():void {
            this.x = 200;
            this.y = 200;      
 
           
        }
        public Update():void {
         //   this.Move();
            this.CheckBound();
        }
        public Reset():void {}
        public Move():void {
            // I need a reference to the "STAGE" createjs object to get mouse position
            this.x = objects.Game.stage.mouseX;
            // This will eventually be replaced with keyboard input
            // Maybe xbox controller....maybe...
        }
        public CheckBound():void {}
    }
}