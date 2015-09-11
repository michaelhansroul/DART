part of snake;

class Snake
{
  static final Point LEFT = new Point(-1, 0);
  static final Point RIGHT = new Point(1, 0);
  static final Point UP = new Point(0, -1);
  static final Point DOWN = new Point(0, 1);
  static const int START_LENGTH = 6;

  List<Point> _body;
  Point _dir = RIGHT;

  Snake()
  {

    _body = new List<Point>();

    for( int i = START_LENGTH-1; i>=0 ; i--)
    {
      _body.add(new Point(i,0));
    }

  }

  Point get head => _body.first;

  void _checkInput() {
    if (keyboard.isPressed(html.KeyCode.LEFT) && _dir != RIGHT) {
      print("LEFT");
      _dir = LEFT;
    }
    else if (keyboard.isPressed(html.KeyCode.RIGHT) && _dir != LEFT) {
      print("RIGHT");
      _dir = RIGHT;
    }
    else if (keyboard.isPressed(html.KeyCode.UP) && _dir != DOWN) {
      print("UP");
      _dir = UP;
    }
    else if (keyboard.isPressed(html.KeyCode.DOWN) && _dir != UP) {
      print("DOWN");
      _dir = DOWN;
    }
  }

  void grow() {
    // add new head based on current direction
    _body.insert(0, head + _dir);
  }

  void _move() {
    // add a new head segment
    grow();

    // remove the tail segment
    _body.removeLast();
  }

  void _draw() {
    // starting with the head, draw each body segment
    for (Point p in _body) {
      game.drawCell(p, Color.Green);
    }
  }

  bool checkForBodyCollision() {
    for (Point p in _body.skip(1)) {
      if (p == head) {
        return true;
      }
    }

    return false;
  }

  void update() {
    _checkInput();
    _move();
    _draw();
  }
}