module objects{
    export class Saw extends objects.GameObject{
        public collision:boolean=false;
         
         // Constructor
         constructor(assetManager:createjs.LoadQueue) {
             super(assetManager,"saw");
             this.Start();
         }
 
         public Start():void {
            this.x=-20;
            this.y=170;

            this.regX=this.getBounds().width*0.5;
            this.regY=this.getBounds().height*0.5;
         }
 
         public Update():void { 
            if(this.x<20){
                this.x+=1;
            }
            if(this.collision==false&&this.x>=20){
                this.Move();
            }
            if(this.x>=20){
                console.log(true);
            }
            this.stopMove();
         }
        
        public Move():void{
            this.rotation=this.rotation+20;
            
            if(this.x==20&&this.y>=70){
                this.y+=2;
            }
            if(this.y>=620&&this.x>=20){
                this.y=620;
                this.x+=2;
            }
            if(this.x>=950&&this.y<=620){
                this.x=950;
                this.y=this.y-2;
            }
            if(this.y<=70&&this.x<=950){
                this.x-=2;
                this.y=70
            }
        }     
        public stopMove():void{
            if(this.collision){
                this.x=this.x;
                this.y=this.y;
            }
        }
        public resetMove():void{
            this.collision=false;
            this.x=-20;
            this.y=170;
            this.regX=this.getBounds().width*0.5;
            this.regY=this.getBounds().height*0.5;
        }
    }
}