var objects;
(function (objects) {
    var Level = /** @class */ (function () {
        function Level() {
        }
        // Getters
        Level.prototype.getLevelNo = function () { return this.levelNo; };
        Level.prototype.getTargetScore = function () { return this.targetScore; };
        Level.prototype.getBombNo = function () { return this.bombNo; };
        Level.prototype.getLifeNo = function () { return this.lifeNo; };
        Level.prototype.getSpeedUpShoe = function () { return this.speedUpShoe; };
        Level.prototype.getSpeedDownShoe = function () { return this.speedDownShoe; };
        // Setters
        Level.prototype.setLevelNo = function (levelNo) { this.levelNo = levelNo; };
        Level.prototype.setTargetScore = function (targetScore) { this.targetScore = targetScore; };
        Level.prototype.setBombNo = function (bombNo) { this.bombNo = bombNo; };
        Level.prototype.setLifeNo = function (lifeNo) { this.lifeNo = lifeNo; };
        Level.prototype.setSpeedUpShoe = function (speedUpShoe) { this.speedUpShoe = speedUpShoe; };
        Level.prototype.setSpeedDownShoe = function (speedDownShoe) { this.speedDownShoe = speedDownShoe; };
        // This static function contains and outputs the data for each level.
        Level.GetLevelData = function (levelNo) {
            var levelData = new Level();
            if (levelNo == 1) {
                levelData.setLevelNo(1);
                levelData.setTargetScore(50);
                levelData.setBombNo(2);
                levelData.setLifeNo(1);
                levelData.setSpeedUpShoe(false);
                levelData.setSpeedDownShoe(false);
            }
            if (levelNo == 2) {
                levelData.setLevelNo(2);
                levelData.setTargetScore(80);
                levelData.setBombNo(4);
                levelData.setLifeNo(1);
                levelData.setSpeedUpShoe(true);
                levelData.setSpeedDownShoe(false);
            }
            if (levelNo == 3) {
                levelData.setLevelNo(3);
                levelData.setTargetScore(100);
                levelData.setLifeNo(1);
                levelData.setSpeedUpShoe(false);
                levelData.setSpeedDownShoe(true);
            }
            // Add extra levels here...
            return levelData;
        };
        return Level;
    }());
    objects.Level = Level;
})(objects || (objects = {}));
//# sourceMappingURL=level.js.map