module objects {
    export class Level {

        private levelNo:number;
        private targetScore:number;
        private bombNo:number;// Number of bombs in level
        private lifeNo:number;// Number of lives in level
        private coinNo:number;
        private speedUpShoe:boolean=false;// If there is a speed-up shoe in level
        private speedDownShoe:boolean=false;// If there is a speed-down shoe in level
        private saw:boolean=false;
        private fort:boolean=false;

        // TODO: Need to put in eagle (boolean?)
        // TODO: Allow multiple speed shoes per level?

        // Getters
        public getLevelNo():number {return this.levelNo;}
        public getTargetScore():number {return this.targetScore;}
        public getBombNo():number {return this.bombNo;}
        public getLifeNo():number {return this.lifeNo;}
        public getCoinNo():number {return this.coinNo;}
        public getSpeedUpShoe():boolean {return this.speedUpShoe;}
        public getSpeedDownShoe():boolean {return this.speedDownShoe;}
        public getSaw():boolean {return this.saw;}
        public getFort():boolean {return this.fort;}

        // Setters
        public setLevelNo(levelNo:number) {this.levelNo = levelNo;}
        public setTargetScore(targetScore:number) {this.targetScore = targetScore;}
        public setBombNo(bombNo:number) {this.bombNo = bombNo;}
        public setLifeNo(lifeNo:number) {this.lifeNo = lifeNo;}
        public setCoinNo(cointNo:number) {this.coinNo = cointNo;}
        public setSpeedUpShoe(speedUpShoe:boolean) {this.speedUpShoe = speedUpShoe;}
        public setSpeedDownShoe(speedDownShoe:boolean) {this.speedDownShoe = speedDownShoe;}
        public setSaw(saw:boolean) {this.saw = saw;}
        public setFort(fort:boolean) {this.fort = fort;}

        // This static function contains and outputs the data for each level.
        public static GetLevelData(levelNo:number):Level {

            let levelData = new Level();

            if (levelNo == 1) {
                levelData.setLevelNo(1);
                levelData.setTargetScore(50);
                levelData.setBombNo(2);
                levelData.setLifeNo(0);
                levelData.setCoinNo(5);
                levelData.setSpeedUpShoe(false);
                levelData.setSpeedDownShoe(false);
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
                levelData.setSpeedDownShoe(false);
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
                levelData.setSpeedDownShoe(true);
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
                levelData.setSpeedDownShoe(true);
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
                levelData.setSpeedDownShoe(true);
                levelData.setSaw(false);
                levelData.setFort(true);
            }

            return levelData;
        }

    }
}