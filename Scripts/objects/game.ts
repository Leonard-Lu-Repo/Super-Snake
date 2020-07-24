module objects {
    export class Game {
        // GLOBAL VARIABLES
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: number;
        public static usedGridPositions:Array<objects.Position>;
        public static snakeHeadSpeed:number;
        public static snakeHeadPos:Array<number>;
        public static bombCollision:boolean;
        public static achieveTargetScore:boolean
    }
}