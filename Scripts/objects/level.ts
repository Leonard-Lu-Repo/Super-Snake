module objects {
    export class Level {

        private levelNo:number;
        private targetScore:number;

        // TODO: Need to add more properties for Levels

        public getLevelNo():number {
            return this.levelNo;
        }
        public getTargetScore():number {
            return this.targetScore;
        }
        public setLevelNo(levelNo) {
            this.levelNo = levelNo;
        }
        public setTargetScore(targetScore) {
            this.targetScore = targetScore;
        }

        // This static function contains and outputs the data for each level.
        public static GetLevelData(levelNo):Level {

            let levelData = new Level();

            if (levelNo == 1) {
                levelData.setLevelNo(1);
                levelData.setTargetScore(30);
            }
            if (levelNo == 2) {
                levelData.setLevelNo(2);
                levelData.setTargetScore(80);
            }
            // Add extra levels here...

            return levelData;
        }

    }
}