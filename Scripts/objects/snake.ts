module objects {
    export class Snake extends objects.GameObject {
       // Variables
        gridPosX=1;
        gridPosY=2;
        public gridX;
        public gridY; 
        direction:managers.Keyboard; 
        newCoords: Array<number>;
        public timer;
        public collision:boolean=false;

        // Charlie comment: add List containing all bodies
        //List<Body> listOfBodies = new List<Body>();
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString:string) {
            super(assetManager, imageString);         
            this.direction=new managers.Keyboard();
            this.Start();
        }

        public Start():void {
            this.Move();
            this.startTimer();
        }
        public Update():void {
            //console.log("X: "+this.x+" Y: "+this.y); 
            
            console.log("gridX: "+Snake.prototype.gridX+" gridY: "+Snake.prototype.gridY);
            this.CheckBound();   
            this.Reset();
        }
        
        public Reset():void {
            if(this.x+this.halfW>960){
                this.x=960-this.halfW;
            }
            if(this.x<this.halfW){
                this.x=Math.abs(this.x);
            }
            if(this.y+this.halfH>700){
                this.y=690-this.halfH;
            }
            if(this.y<this.halfH){
                this.y=Math.abs(this.y);                   
            }
            if(this.collision){
                this.stopTimer();
                objects.Game.currentScene = config.Scene.OVER;
            }
        }
       //Use a timer to locate snake's head
        public startTimer():void{
            this.timer= setInterval(() => {
                this.Move();  
            }, 200);                                  
        } 
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
            this.newCoords=this.getGridPosition(this.gridPosX, this.gridPosY);
            this.x = this.newCoords[0];
            this.y = this.newCoords[1]; 
            Snake.prototype.gridX=this.gridPosX;
            Snake.prototype.gridY=this.gridPosY;

       }
        public CheckBound():void {
            if(this.x+this.halfW>960||this.x<this.halfW){
                    this.collision=true;
            }
            if(this.y+this.halfH>690||this.y<this.halfH){
                    this.collision=true;
            }
        }
        
       
      
    }
}