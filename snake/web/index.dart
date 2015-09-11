library snake;

import 'dart:html' as html;
import 'dart:math' as math;
import 'dart:collection';
import 'package:stagexl/stagexl.dart';

part 'sources/game.dart';
part 'sources/keyboard.dart';
part 'sources/snake.dart';

html.Element canvas;
Stage stage;
RenderLoop renderLoop;
ResourceManager resourceManager;
Juggler renderJuggler;
Keyboard keyboard;
Game game;

const int WIDTH = 400;
const int HEIGHT = 400;
const int CELL_SIZE = 10;

void main() {
  canvas = html.querySelector('#stage');
  stage = new Stage(canvas);
  renderLoop = new RenderLoop();
  renderLoop.addStage(stage);
  renderJuggler = renderLoop.juggler;

  resourceManager = new ResourceManager();

  //html.window.onKeyDown.listen(onKeyDown);
  //html.window.onKeyUp.listen(onKeyUp);

  keyboard = new Keyboard();

  resourceManager.load().then((res) {
    game = new Game(WIDTH, HEIGHT);
    stage.addChild(game);
    renderJuggler.add(game);

  });

}

