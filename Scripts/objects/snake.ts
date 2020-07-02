module objects {
    export class Snake extends objects.GameObject {
        // Variables
        speedX=2;
        speedY=2;
        gridPosX = 5;
        gridPosY = 5;
        currentDirection = 1; // 0 = up; 1 = right; 2 = down; 3 = left
        // Charlie comment: add List containing all bodies
        //List<Body> listOfBodies = new List<Body>();

        private collision:boolean=false;
        public e:KeyboardEvent;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "snake");
            this.Start();
        }

        public Start():void {
            this.Move();
            
            //this.keyboardListener();
            /* this.scaleX = 0.25;
            this.scaleY = 0.25; */

            setInterval(() => {
                this.Move();
            }, 800);
        }
        public Update():void {
            
            if(this.collision){
                this.Reset();
            }
            /*else{
                this.Move();
            }*/
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
            //this.x+=this.speedX;
            //this.y+=this.speedY;

            switch(this.currentDirection) {
                case 0: {
                    this.gridPosY--;
                    break;
                }
                case 1: {
                    this.gridPosX++;
                    break;
                }
                case 2: {
                    this.gridPosY++;
                    break;
                }
                case 3: {
                    this.gridPosX--;
                    break;
                }
            }
            let newCoords: Array<number>;
            newCoords = this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = newCoords[0];
            this.y = newCoords[1];
        }
        public CheckBound():void {
            if(this.x+this.width>=1045){
                this.collision=true;
            }
            if(this.y+this.height>=715){
                this.collision=true;
            }
        }
        
        public addBody() {

        }
    }

    export class Body {
        posX = 1;
        posY = 1;
    }
}