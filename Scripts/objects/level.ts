module objects {
    export class Level {

        private levelNo:number;
        private targetScore:number;
        private bombNo:number;// Number of bombs in level

        // TODO: Need to add more properties for Levels

        public getLevelNo():number {
            return this.levelNo;
        }
        public getTargetScore():number {
            return this.targetScore;
        }
        public getBombNo():number {
            return this.bombNo;
        }
        public setLevelNo(levelNo) {
            this.levelNo = levelNo;
        }
        public setTargetScore(targetScore) {
            this.targetScore = targetScore;
        }
        public setBombNo(bombNo) {
            this.bombNo = bombNo;
        }

        // This static function contains and outputs the data for each level.
        public static GetLevelData(levelNo):Level {

            let levelData = new Level();

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
        }

    }
}