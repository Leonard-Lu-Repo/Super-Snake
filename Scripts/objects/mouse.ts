module objects {
    export class Mouse extends createjs.Bitmap {
        // Variables
        public  x: number;
        public  y: number;
        // Constructor
        constructor(imageOrUrl: HTMLImageElement) {
            super( "./Assets/mouse.png");
            this.Start();
        }

        public Start():void {
            this.x = Math.floor(Math.random() * (600 - 50 + 1)) + 50;  
            this.y = Math.floor(Math.random() * (900 - 50 + 1))+ 50; 
            this.scaleX= 0.10;             
            this.scaleY = 0.10;           
        }

        public Update():void {        
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