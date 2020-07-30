module managers
{
    export class Keyboard
    {
        //public properties
        public moveUp:boolean=false;
        public moveDown:boolean=false;
        public moveLeft:boolean=false;
        public moveRight:boolean=true;
        public moveDirection:string="right";
        public debugX:boolean=false;

        //constructor
        constructor()
        {
            document.addEventListener("keydown", this.onkeyDown.bind(this),false);
            //document.addEventListener("keyup", this.onkeyUp.bind(this),false);
        }

        //private methods

        // onkeydown event listener

        private onkeyDown(event:KeyboardEvent):void
        {
            event.preventDefault();
             switch(event.keyCode)
            {
                case enums.Keys.W:
                case enums.Keys.UP_ARROW:
                    if(this.moveDirection!="down"){
                        this.moveUp=true;
                        this.moveDown=false;
                        this.moveLeft=false;
                        this.moveRight=false;
                        this.moveDirection="up";
                    }
                    break;
                case enums.Keys.S:
                case enums.Keys.DOWN_ARROW:
                    if(this.moveDirection!="up"){
                        this.moveDown=true;
                        this.moveUp=false;
                        this.moveLeft=false;
                        this.moveRight=false;
                        this.moveDirection="down";
                    }
                    break;
                case enums.Keys.A:
                case enums.Keys.LEFT_ARROW:
                    if(this.moveDirection!="right"){
                        this.moveLeft=true;
                        this.moveUp=false;
                        this.moveDown=false;
                        this.moveRight=false;
                        this.moveDirection="left";
                    }
                    break;
                case enums.Keys.D:
                case enums.Keys.RIGHT_ARROW:
                    if(this.moveDirection!="left"){
                        this.moveRight=true;
                        this.moveUp=false;
                        this.moveDown=false;
                        this.moveLeft=false;
                        this.moveDirection="right";
                    }
                    break;
                case enums.Keys.X:
                    this.debugX=true;
                    break;
            } 
        }

        // onkeyup event listener
        private onkeyUp(event:KeyboardEvent):void
        {

            switch(event.keyCode)
            {
                case enums.Keys.W:
                case enums.Keys.UP_ARROW:
                    this.moveUp=false;
                    break;
                case enums.Keys.A:
                case enums.Keys.LEFT_ARROW:
                    this.moveLeft=false;
                    break;
                case enums.Keys.S:
                case enums.Keys.DOWN_ARROW:
                    this.moveDown=false;
                    break;
                case enums.Keys.D:
                case enums.Keys.RIGHT_ARROW:
                    this.moveRight=false;
                    break;
                case enums.Keys.X:
                    this.debugX=false;
                    break;
            }
        }
    }


}