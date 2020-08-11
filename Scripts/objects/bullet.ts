module objects{
    export class Bullets extends objects.GameObject{
         // Constructor
         constructor(assetManager:createjs.LoadQueue) {
            super(assetManager,"bullet");
            this.Start();
        }
        public Start():void {
            this.regX=this.getBounds().width*0.5;
            this.regY=this.getBounds().height*0.5;
        }
 
         public Update():void { 
        }
        
        public Move():void{
        }     
    }
}