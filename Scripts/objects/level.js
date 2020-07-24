var objects;
(function (objects) {
    var Level = /** @class */ (function () {
        function Level() {
        }
        // TODO: Need to add more properties for Levels
        Level.prototype.getLevelNo = function () {
            return this.levelNo;
        };
        Level.prototype.getTargetScore = function () {
            return this.targetScore;
        };
        Level.prototype.getBombNo = function () {
            return this.bombNo;
        };
        Level.prototype.setLevelNo = function (levelNo) {
            this.levelNo = levelNo;
        };
        Level.prototype.setTargetScore = function (targetScore) {
            this.targetScore = targetScore;
        };
        Level.prototype.setBombNo = function (bombNo) {
            this.bombNo = bombNo;
        };
        // This static function contains and outputs the data for each level.
        Level.GetLevelData = function (levelNo) {
            var levelData = new Level();
            if (levelNo == 1) {
                levelData.setLevelNo(1);
                levelData.setTargetScore(50);
                levelData.setBombNo(2);
            }
            if (levelNo == 2) {
                levelData.setLevelNo(2);
                levelData.setTargetScore(80);
                levelData.setBombNo(4);
            }
            if (levelNo == 3) {
                levelData.setLevelNo(3);
                levelData.setTargetScore(100);
            }
            // Add extra levels here...
            return levelData;
        };
        return Level;
    }());
    objects.Level = Level;
})(objects || (objects = {}));
//# sourceMappingURL=level.js.map