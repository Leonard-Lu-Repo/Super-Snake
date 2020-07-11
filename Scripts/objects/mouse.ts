module objects {
    export class Mouse extends createjs.Bitmap {
        // Variables
        public  x: number;
        public  y: number;
        public mouseTimer;
        public mouseInterval: number;  //mouse relocate interval
        
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super( "./Assets/mouse.png");
            this.Start();
        }

        public Start():void {
            this.x = Math.floor(Math.random() * (700 - 50 + 1)) + 50;  
            this.y = Math.floor(Math.random() * (600 - 50 + 1))+ 50; 
            this.scaleX= 0.10;             
            this.scaleY = 0.10;  
            this.mouseInterval = 50000 ; //every 50000ms(50s), the mouse relocate at a new location   
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

	   //Use a timer to locate mouse
	   public startTimer():void{
		this.mouseTimer=setInterval(() => {
			this.Start();
		}, this.mouseInterval);
		}
		//Clear timer
		public stopTimer():void{
			clearInterval(this.mouseTimer);
		}
       
    }
}