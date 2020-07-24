module objects{
    export class SpeedShoe extends objects.GameObject {
        // Variables
        private  gridX: number;
        private  gridY: number;
        private  coords: Array<number>;
        public shoeCollision:boolean=false;
    
        // Constructor
        constructor(assetManager:createjs.LoadQueue,imgString:string) {
            super(assetManager,imgString);
            this.Start();
        }
    
        public Start():void {
           /*  setInterval(()=>{
                this.setShoeLocation();
            },8000); */
            this.setShoeLocation();
        }
    
        public Update():void { 
        }
       
       public Move():void{
    
       }
       public ResetShoeLocation():void {
        this.setShoeLocation();
       }
        //To set new location of shoe
        private setShoeLocation():void{
            this.gridX=Math.round(Math.random()*28+1);
            this.gridY=Math.round(Math.random()*14+1);
            this.coords = this.getGridPosition(this.gridX, this.gridY);
            this.x = this.coords[0];
            this.y = this.coords[1];
        }
    }
}
