var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        //constructor
        function Keyboard() {
            //public properties
            this.moveUp = false;
            this.moveDown = false;
            this.moveLeft = false;
            this.moveRight = true;
            this.moveDirection = "right";
            document.addEventListener("keydown", this.onkeyDown.bind(this), false);
            //document.addEventListener("keyup", this.onkeyUp.bind(this),false);
        }
        //private methods
        // onkeydown event listener
        Keyboard.prototype.onkeyDown = function (event) {
            switch (event.keyCode) {
                case enums.Keys.W:
                case enums.Keys.UP_ARROW:
                    event.preventDefault();
                    if (this.moveDirection != "down") {
                        this.moveUp = true;
                        this.moveDown = false;
                        this.moveLeft = false;
                        this.moveRight = false;
                        this.moveDirection = "up";
                    }
                    break;
                case enums.Keys.S:
                case enums.Keys.DOWN_ARROW:
                    event.preventDefault();
                    if (this.moveDirection != "up") {
                        this.moveDown = true;
                        this.moveUp = false;
                        this.moveLeft = false;
                        this.moveRight = false;
                        this.moveDirection = "down";
                    }
                    break;
                case enums.Keys.A:
                case enums.Keys.LEFT_ARROW:
                    if (this.moveDirection != "right") {
                        this.moveLeft = true;
                        this.moveUp = false;
                        this.moveDown = false;
                        this.moveRight = false;
                        this.moveDirection = "left";
                    }
                    break;
                case enums.Keys.D:
                case enums.Keys.RIGHT_ARROW:
                    if (this.moveDirection != "left") {
                        this.moveRight = true;
                        this.moveUp = false;
                        this.moveDown = false;
                        this.moveLeft = false;
                        this.moveDirection = "right";
                    }
                    break;
            }
        };
        // onkeyup event listener
        Keyboard.prototype.onkeyUp = function (event) {
            switch (event.keyCode) {
                case enums.Keys.W:
                case enums.Keys.UP_ARROW:
                    this.moveUp = false;
                    break;
                case enums.Keys.A:
                case enums.Keys.LEFT_ARROW:
                    this.moveLeft = false;
                    break;
                case enums.Keys.S:
                case enums.Keys.DOWN_ARROW:
                    this.moveDown = false;
                    break;
                case enums.Keys.D:
                case enums.Keys.RIGHT_ARROW:
                    this.moveRight = false;
                    break;
            }
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=Keyboard.js.map