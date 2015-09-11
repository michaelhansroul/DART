library tetris;

import 'dart:html' as html;
import 'dart:math' as math;
import 'dart:collection';
import 'package:stagexl/stagexl.dart';

part 'source/game.dart';
part 'source/form.dart';
part 'source/line.dart';

Stage stage;
RenderLoop renderLoop;
ResourceManager resourceManager;
Juggler renderJuggler;

void main()
{
  stage = new Stage(html.querySelector('#stage'));
  renderLoop = new RenderLoop()();
  renderLoop.addStage(stage);
  renderJuggler = renderLoop.juggler;

  resourceManager = new ResourceManager();

  resourceManager.load().then((_res)
  {
    Game game = new Game();
  });

}