module objects {
    export class Explosion extends objects.GameObject {

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager,"explosion");
            this.Start();
        }

        public Start():void {
        }

        public Update():void { 
        }

        public Explode(xPos:number, yPos:number) {
            this.x = xPos;
            this.y = yPos;
        }
    }
}