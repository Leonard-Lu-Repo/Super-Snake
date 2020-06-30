module objects {
    export class Snake extends objects.GameObject {
        // Variables
        speedX=2;
        speedY=2;
        private collision:boolean=false;
        public e:KeyboardEvent;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "snake");
            this.Start();
        }

        public Start():void {
            this.x = 100;
            this.y = 100;
            
            //this.keyboardListener();
            /* this.scaleX = 0.25;
            this.scaleY = 0.25; */
        }
        public Update():void {
            
            if(this.collision){
                this.Reset();
            }
            else{
                this.Move();
            }
            this.CheckBound();
        }
        public Reset():void {
             this.x=1045-this.width;
            //this.y=715-this.height;
        }
       
        public Move():void {
            // I need a reference to the "STAGE" createjs object to get mouse position
            //this.x = objects.Game.stage.mouseX;
            // This will eventually be replaced with keyboard input
            // Maybe xbox controller....maybe...
            this.x+=this.speedX;
            //this.y+=this.speedY;
        }
        public CheckBound():void {
            if(this.x+this.width>=1045){
                this.collision=true;
            }
            if(this.y+this.height>=715){
                this.collision=true;
            }
        }
        
    }
}