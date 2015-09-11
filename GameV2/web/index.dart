library games;

import 'dart:html' as html;
import 'dart:math' as math;
import 'package:stagexl/stagexl.dart';

part 'source/painting.dart';
part 'source/clock.dart';
part 'source/grid.dart';
part 'source/candy.dart';
part 'source/position.dart';

main() {
  print("MAIN");
  // setup the Stage and RenderLoop
  var canvas = html.querySelector('#stage');
  var stage = new Stage(canvas);
  var renderLoop = new RenderLoop();
  renderLoop.addStage(stage);

  /*var painting = new Painting();
  painting.x = 40;
  painting.y = 40;
  stage.addChild(painting);

  var clock = new Clock();
  clock.x = 40;
  clock.y = 40;
  stage.addChild(clock);*/

  var grid = new Grid(canvas.clientWidth,canvas.clientHeight);
  stage.addChild(grid);
}