module objects {
    export class Bomb extends createjs.Bitmap {
        // Variables
        public  x: number;
        public  y: number;
        public bombTimer;
        public interval: number;  //bomb relocate interval
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super( "./Assets/bomb.png");
            this.Start();
            
        }

        public Start():void {
            this.x = Math.floor(Math.random() * (700 - 50 + 1)) + 50;  
            this.y = Math.floor(Math.random() * (600 - 50 + 1))+ 50; 
            this.scaleX= 0.20;             
            this.scaleY = 0.20; 
            this.interval = 1000;  //every 1000ms(1s), the bomb relocate at a new location            
            this.startTimer();        
        }

        public Update():void { 
            
        }
        public Reset():void {
           
            this.stopTimer();
        }
        public Move():void {
            // I need a reference to the "STAGE" createjs object to get mouse position
            this.x = objects.Game.stage.mouseX;
            // This will eventually be replaced with keyboard input
            // Maybe xbox controller....maybe...
        }

         //Use a timer to locate snake's head
         public startTimer():void{
            this.bombTimer=setInterval(() => {
                this.Start();
            }, 10000);
        }
        //Clear timer
        public stopTimer():void{
            clearInterval(this.bombTimer);
        }
       
    }
}