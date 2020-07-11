module objects {
    export class Snake extends objects.GameObject {
        // Variables

        gridPosX = 1;
        gridPosY = 2;
        direction:managers.Keyboard; 
        newCoords: Array<number>;
        public timer;
       
        private collision:boolean=false;
        // Charlie comment: add List containing all bodies
        //List<Body> listOfBodies = new List<Body>();

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
            
            if(this.collision){
                this.Reset();
            }
            
        }
        
        public Reset():void {
             this.stopTimer();
             
        }
       //Use a timer to locate snake's head
        public startTimer():void{
            this.timer=setInterval(() => {
                this.Move();
            }, 800);
        }
        //Clear timer
        public stopTimer():void{
            clearInterval(this.timer);
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

                  

            this.CheckBound();
            
        }
      //If snake's head touch the stage bound make collision true and game over
        public CheckBound():void {
            if(this.x+this.halfW>=930||this.x<=this.halfW){
                this.collision=true;
                console.log("Game over");
                objects.Game.currentScene = config.Scene.OVER;      
            }
            if(this.y+this.halfH>=690||this.y<=this.halfH){
                this.collision=true;
                console.log("Game over");
                objects.Game.currentScene = config.Scene.OVER;      
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