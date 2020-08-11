module managers{
    export class Collision{
        public static AABBCollisionCheck(obj1:objects.GameObject,
                                         obj2:objects.GameObject):boolean
        {
            let collisionX:boolean;
            let conllisionY:boolean;

            let obj1TopLeftX=obj1.x-obj1.halfW;
            let obj1TopLeftY=obj1.y-obj1.halfH;

            let obj2TopLeftX=obj2.x-obj2.halfW;
            let obj2TopLeftY=obj2.y-obj2.halfH;
            //Detect collision on x axis
            collisionX=obj1TopLeftX+obj1.width>obj2TopLeftX&&obj2TopLeftX+obj2.width>obj1TopLeftX;
            //Detec collision on y axis
            conllisionY=obj1TopLeftY+obj1.height>obj2TopLeftY&&obj2TopLeftY+obj2.height>obj1TopLeftY;

            return collisionX&&conllisionY;
        }

        public static squaredRadiusCheck(obj1:objects.GameObject,
                                         obj2:objects.GameObject):boolean
        {
            let objetRad=obj1.halfH+obj2.getBounds().height*0.5;
            let sqrDistance=Math.pow( Math.abs((obj1.x-obj2.x)),2)+Math.pow(Math.abs(obj1.y-obj2.y),2);
            if(sqrDistance<Math.pow(objetRad,2)){
                return true;
            }
            
            return false;
        }
    }
}