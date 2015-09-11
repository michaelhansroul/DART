part of tetris;

abstract class Form
{
  static const String LINE = "line";
  static const String SQUARE = "square";

  static const String HORIZONTAL = "horizontal";
  static const String VERTICAL = "vertical";

  String type;
  List<Point> points;

  void update()
  {
    _move();
    _draw();
  }

  void _move();

  void _draw()
  {
    for (Point p in _body) {
      game.drawCell(p, Color.Green);
    }
  }
}