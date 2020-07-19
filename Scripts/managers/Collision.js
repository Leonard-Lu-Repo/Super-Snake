var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.AABBCollisionCheck = function (obj1, obj2) {
            var collisionX;
            var conllisionY;
            var obj1TopLeftX = obj1.x - obj1.halfW;
            var obj1TopLeftY = obj1.y - obj1.halfH;
            var obj2TopLeftX = obj2.x - obj2.halfW;
            var obj2TopLeftY = obj2.y - obj2.halfH;
            //Detect collision on x axis
            collisionX = obj1TopLeftX + obj1.width > obj2TopLeftX && obj2TopLeftX + obj2.width > obj1TopLeftX;
            //Detec collision on y axis
            conllisionY = obj1TopLeftY + obj1.height > obj2TopLeftY && obj2TopLeftY + obj2.height > obj1TopLeftY;
            return collisionX && conllisionY;
        };
        Collision.squaredRadiusCheck = function (obj1, obj2) {
            var objetRad = obj1.halfH + obj2.getBounds().height * 0.5;
            var sqrDistance = Math.pow(Math.abs((obj1.x - obj2.x)), 2) + Math.pow(Math.abs(obj1.y - obj2.y), 2);
            if (sqrDistance < Math.pow(objetRad, 2)) {
                return true;
            }
            return false;
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=Collision.js.map