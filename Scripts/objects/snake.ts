module objects {
    export class Snake extends objects.GameObject {
        // Variables
        gridPosX = 1;
        gridPosY = 2;
        direction:managers.Keyboard; 
        newCoords: Array<number>;
        public timer;
        // 0 = up; 1 = right; 2 = down; 3 = left
        // Charlie comment: add List containing all bodies
        //List<Body> listOfBodies = new List<Body>();

        private collision:boolean=false;
        public e:KeyboardEvent;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "snake");
            this.direction=new managers.Keyboard();
            this.Start();
        }

        public Start():void {
            this.Move();
            this.startTimer();
            
        }
        public Update():void {
            this.CheckBound();
            if(this.collision){
                this.Reset();
            }
        }
        public Reset():void {
             this.stopTimer();
             
        }
       
        public startTimer():void{
            this.timer=setInterval(() => {
                this.Move();
            }, 800);
        }
        public stopTimer():void{
            clearInterval(this.timer);
            //alert("Game over");
        }
        public Move():void {
             //according to the keyboard event to decide direction to change snake's move
             if(this.direction.moveLeft){
                this.gridPosX--;
            }
            if(this.direction.moveRight){
                this.gridPosX++;
            }
            if(this.direction.moveDown){
                this.gridPosY++;
            }
            if(this.direction.moveUp){
                this.gridPosY--;
            }

             //To set new location of snake
             this.newCoords = this.getGridPosition(this.gridPosX, this.gridPosY);
             this.x = this.newCoords[0];
             this.y = this.newCoords[1];
        }
      
        public CheckBound():void {
            if(this.x+this.width>=1040||this.x+this.width<=50){
                this.collision=true;
                //alert("Game over");
            }
            if(this.y+this.height>=726){
                this.collision=true;
                //alert("Game over");
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