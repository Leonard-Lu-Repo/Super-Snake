var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var WinScene = /** @class */ (function (_super) {
        __extends(WinScene, _super);
        // Constructor
        function WinScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        WinScene.prototype.Start = function () {
            // Initialize variables
            this.congratsLabel = new objects.Label("Congratulations!", "60px", "Comic", "#FF9A36", 480, 240, true);
            this.subLabel = new objects.Label("You completed all 5 levels!", "35px", "Comic", "#FF9A36", 480, 280, true);
            this.background = new objects.Background(this.assetManager, "background");
            this.mainButton = new objects.Button(this.assetManager, "mainButton", 400, 340);
            this.Main();
        };
        WinScene.prototype.Update = function () { };
        WinScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.congratsLabel);
            this.addChild(this.subLabel);
            this.addChild(this.mainButton);
            // TODO: Insert win sound
            this.mainButton.on("click", this.mainButtonClick);
        };
        WinScene.prototype.mainButtonClick = function () {
            createjs.Sound.stop();
            objects.Game.currentScene = config.Scene.START;
        };
        return WinScene;
    }(objects.Scene));
    scenes.WinScene = WinScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=win.js.map