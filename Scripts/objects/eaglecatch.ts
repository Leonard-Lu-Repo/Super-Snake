module objects {
    export class Catch extends objects.GameObject {

        private caught:boolean=false;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager,"eaglecatchsnake");
            this.Start();
        }

        public Start():void {
            
        }

        public Update():void { 
            if (this.caught) {
                this.x += 1;
                this.y -= 5;
            }
        }

        public Catch(xPos:number, yPos:number) {
            this.x = xPos;
            this.y = yPos;
            this.caught = true;          
        }

        public Dispear() {
            this.x = -500;
            this.y = -500;
            this.caught = false;
        }
    }
}