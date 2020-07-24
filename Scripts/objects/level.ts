module objects {
    export class Level {

        private levelNo:number;
        private targetScore:number;
        private bombNo:number;// Number of bombs in level
        private lifeNo:number;// Number of lives in level
        private speedUpShoe:boolean;// If there is a speed-up shoe in level
        private speedDownShoe:boolean;// If there is a speed-down shoe in level

        // Getters
        public getLevelNo():number {return this.levelNo;}
        public getTargetScore():number {return this.targetScore;}
        public getBombNo():number {return this.bombNo;}
        public getLifeNo():number {return this.lifeNo;}
        public getSpeedUpShoe():boolean {return this.speedUpShoe;}
        public getSpeedDownShoe():boolean {return this.speedDownShoe;}

        // Setters
        public setLevelNo(levelNo) {this.levelNo = levelNo;}
        public setTargetScore(targetScore) {this.targetScore = targetScore;}
        public setBombNo(bombNo) {this.bombNo = bombNo;}
        public setLifeNo(lifeNo) {this.lifeNo = lifeNo;}
        public setSpeedUpShoe(speedUpShoe) {this.speedUpShoe = speedUpShoe;}
        public setSpeedDownShoe(speedDownShoe) {this.speedDownShoe = speedDownShoe;}

        // This static function contains and outputs the data for each level.
        public static GetLevelData(levelNo):Level {

            let levelData = new Level();

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
        }

    }
}