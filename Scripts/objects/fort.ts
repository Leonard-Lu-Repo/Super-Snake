module objects{
    export class Fort extends objects.GameObject{
        public bullets:objects.Bullets;

          // Constructor
          constructor(assetManager:createjs.LoadQueue,x:number,y:number) {
            super(assetManager,"fort");
            this.x=x;
            this.y=y;
            this.bullets=new objects.Bullets(assetManager);
            this.Start();
        }
        public Start():void {
            this.regX=this.getBounds().width*0.5;
            this.regY=this.getBounds().height*0.5;
        }
 
         public Update():void { 
             //this.Move();
        }
        
        public Move():void{
           /*  this.y+=1;
            if(this.y>=90){
                this.y=90;
                this.bullets.y+=4;
            } */
            
        }     

    }
}