// Immediate Invoked Anonymous Function

(function() {

    // Global Game Variables
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;

    let assetManager:createjs.LoadQueue;
    let assetManifest: any[];

    // Store current scene information
    let currentScene:objects.Scene;
    let currentState:number;

    assetManifest = [
        {id:"startButton", src:"./Assets/StartBtn.png"},
        {id:"background",src:"./Assets/background.png"},
        {id:"thornsWall",src:"./Assets/thornsWall.png"},
        {id:"instruction",src:"./Assets/instruction.png"},
        {id:"gameLogo", src:"./Assets/SnakeLogo-Background.png"},
        {id:"snakeHead", src:"./Assets/snakeHead.png"},
        {id:"snakeBody", src:"./Assets/snakeBody.png"},
        {id:"mouse",src:"./Assets/mouse.png"},
        {id:"bomb",src:"./Assets/bomb.png"},
        {id:"speedUpShoe",src:"./Assets/speedUpShoe.png"},
        {id:"speedDownShoe",src:"./Assets/speedDownShoe.png"},
        {id:"life", src:"./Assets/life.png"},
        {id:"coin", src:"./Assets/coin.png"},
        {id:"lifeIcon", src:"./Assets/lifeIcon.png"},
        {id:"explosion", src:"./Assets/explosion.png"},
        {id:"thumbsUp", src:"./Assets/thumbsUp.png"},
        {id:"mainButton",src:"./Assets/MainPageBtn.png"},
        {id:"replayButton",src:"./Assets/TryAgainBtn.png"},
        {id:"eagle",src:"./Assets/eagle.png"},
        {id:"eaglecatchsnake",src:"./Assets/eaglecatchsnake.png"},
        {id:"saw",src:"./Assets/saw.png"},
        {id:"fort",src:"./Assets/fort.png"},
        {id:"bullet",src:"./Assets/bullet.png"}
    ]
    

    function Init() {
        console.log("Initializing Start");

        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        
        // register sounds
        createjs.Sound.registerSound("./Assets/Explosion+3.wav", "explosion");
        createjs.Sound.registerSound("./Assets/GameOverScreenSound.mp3", "GameOverSound");
        createjs.Sound.registerSound("./Assets/HomeScreenSound.mp3", "HomeScreenSound");
        createjs.Sound.registerSound("./Assets/Level-complete-sound-effect.mp3", "LevelCompleteSound");
        createjs.Sound.registerSound("./Assets/snake_eatmice.wav", "SnakeEatMiceSound");
        createjs.Sound.registerSound("./Assets/snake_hitsEagle.wav", "SnakeHitsEagle");
        createjs.Sound.registerSound("./Assets/snakehitWall.wav", "SnakeHitWall");
        createjs.Sound.registerSound("./Assets/snakeHitCoin.wav", "SnakeHitCoin");
        createjs.Sound.registerSound("./Assets/extraLife.wav", "ExtraLife");
        createjs.Sound.registerSound("./Assets/sawSound.mp3", "sawSound");
        createjs.Sound.registerSound("./Assets/bulletSound.mp3", "bulletSound");
        
        assetManager.on("complete", Start, this);
    }

    function Start() {
        console.log("Starting Application...");

        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);

        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        // Set up default game states -- State Machine
        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        Main();
    }

    function Update() {
        // Has my state changed since the last check?
        if(currentState != objects.Game.currentScene)
        {
            console.log("Changing scenes to " + objects.Game.currentScene);
            Main();
        }
        if(currentScene!=null)
        currentScene.Update();
        stage.update();
    }


    function Main() {
        console.log("Game Start");

        // Finite State Machine
        switch(objects.Game.currentScene)
        {
            case config.Scene.START:
                stage.removeAllChildren();
                currentScene = new scenes.StartScene(assetManager);
                stage.addChild(currentScene);
                
            break;
            case config.Scene.GAME:
                stage.removeAllChildren();
                currentScene = new scenes.PlayScene(assetManager);
                stage.addChild(currentScene);
            break;
            case config.Scene.OVER:
                stage.removeAllChildren();
                currentScene = new scenes.GameOverScene(assetManager);
                stage.addChild(currentScene);
            break;
            case config.Scene.WIN:
                stage.removeAllChildren();
                currentScene = new scenes.WinScene(assetManager);
                stage.addChild(currentScene);
            break;
        }

        currentState = objects.Game.currentScene;
      
    }

    window.onload = Init;
})();