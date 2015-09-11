library flappyBird;

import 'dart:html' as html;
import 'dart:math' as math;
import 'package:stagexl/stagexl.dart';

part 'sources/bird.dart';
part 'sources/game.dart';
part 'sources/ground.dart';

Stage stage;
RenderLoop renderLoop;
ResourceManager resourceManager;
html.Element canvas;

void main() {

  StageXL.stageOptions.renderEngine = RenderEngine.WebGL;
  //StageXL.bitmapDataLoadOptions.webp = true;

  //------------------------------------------------------------------
  // Initialize the Display List
  //------------------------------------------------------------------
  canvas = html.querySelector('#stage');
  stage = new Stage(canvas);
  renderLoop = new RenderLoop();
  renderLoop.addStage(stage);

  //------------------------------------------------------------------
  // Load images and sounds
  //------------------------------------------------------------------

  resourceManager = new ResourceManager();
  resourceManager.addTextureAtlas("bird", "images/bird.json");
  resourceManager.addBitmapData("background", "images/background.png");
  resourceManager.addBitmapData("ground", "images/ground.png");
  //------------------------------------------------------------------
  // Once all resources are loaded, setup the stage.
  //------------------------------------------------------------------
  resourceManager.load().then((rm) {

    Game game = new Game();
    stage.addChild(game);

  });



}