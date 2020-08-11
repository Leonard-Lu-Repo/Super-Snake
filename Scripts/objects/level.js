var objects;
(function (objects) {
    var Level = /** @class */ (function () {
        function Level() {
            this.speedUpShoe = false; // If there is a speed-up shoe in level
            this.saw = false;
            this.fort = false;
        }
        // TODO: Need to put in eagle (boolean?)
        // TODO: Allow multiple speed shoes per level?
        // Getters
        Level.prototype.getLevelNo = function () { return this.levelNo; };
        Level.prototype.getTargetScore = function () { return this.targetScore; };
        Level.prototype.getBombNo = function () { return this.bombNo; };
        Level.prototype.getLifeNo = function () { return this.lifeNo; };
        Level.prototype.getCoinNo = function () { return this.coinNo; };
        Level.prototype.getSpeedUpShoe = function () { return this.speedUpShoe; };
        Level.prototype.getSaw = function () { return this.saw; };
        Level.prototype.getFort = function () { return this.fort; };
        // Setters
        Level.prototype.setLevelNo = function (levelNo) { this.levelNo = levelNo; };
        Level.prototype.setTargetScore = function (targetScore) { this.targetScore = targetScore; };
        Level.prototype.setBombNo = function (bombNo) { this.bombNo = bombNo; };
        Level.prototype.setLifeNo = function (lifeNo) { this.lifeNo = lifeNo; };
        Level.prototype.setCoinNo = function (cointNo) { this.coinNo = cointNo; };
        Level.prototype.setSpeedUpShoe = function (speedUpShoe) { this.speedUpShoe = speedUpShoe; };
        Level.prototype.setSaw = function (saw) { this.saw = saw; };
        Level.prototype.setFort = function (fort) { this.fort = fort; };
        // This static function contains and outputs the data for each level.
        Level.GetLevelData = function (levelNo) {
            var levelData = new Level();
            if (levelNo == 1) {
                levelData.setLevelNo(1);
                levelData.setTargetScore(50);
                levelData.setBombNo(2);
                levelData.setLifeNo(0);
                levelData.setCoinNo(5);
                levelData.setSpeedUpShoe(false);
                levelData.setSaw(false);
                levelData.setFort(false);
            }
            if (levelNo == 2) {
                levelData.setLevelNo(2);
                levelData.setTargetScore(80);
                levelData.setBombNo(3);
                levelData.setLifeNo(1);
                levelData.setCoinNo(5);
                levelData.setSpeedUpShoe(false);
                levelData.setSaw(false);
                levelData.setFort(false);
            }
            if (levelNo == 3) {
                levelData.setLevelNo(3);
                levelData.setTargetScore(100);
                levelData.setBombNo(4);
                levelData.setLifeNo(1);
                levelData.setCoinNo(10);
                levelData.setSpeedUpShoe(true);
                levelData.setSaw(false);
                levelData.setFort(false);
            }
            if (levelNo == 4) {
                levelData.setLevelNo(4);
                levelData.setTargetScore(140);
                levelData.setBombNo(5);
                levelData.setLifeNo(1);
                levelData.setCoinNo(10);
                levelData.setSpeedUpShoe(true);
                levelData.setSaw(true);
                levelData.setFort(false);
            }
            if (levelNo == 5) {
                levelData.setLevelNo(5);
                levelData.setTargetScore(200);
                levelData.setBombNo(2);
                levelData.setLifeNo(1);
                levelData.setCoinNo(10);
                levelData.setSpeedUpShoe(true);
                levelData.setSaw(false);
                levelData.setFort(true);
            }
            return levelData;
        };
        return Level;
    }());
    objects.Level = Level;
})(objects || (objects = {}));
//# sourceMappingURL=level.js.map