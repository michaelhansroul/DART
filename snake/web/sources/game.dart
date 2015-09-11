part of snake;

class Game extends Sprite implements Animatable
{
  //SECONDS
  static const num GAME_SPEED = 0.1;
  num _lastTimeStamp = 0;

  int _rightEdgeX;
  int _bottomEdgeY;

  int _gameWidth;
  int _gameHeight;

  Snake _snake;
  Point _food;

  Game(int gameWidth, int gameHeight)
  {
    print("GAME");
    this.width = gameWidth;
    this.height = gameHeight;
    _rightEdgeX = (gameWidth / CELL_SIZE).round();
    _bottomEdgeY = (gameHeight / CELL_SIZE).round();;
    init();
  }

  void init() {
    print("INIT");
    _snake = new Snake();
    _food = _randomPoint();
  }

  Point _randomPoint() {
    print("RANDOM POINT");
    math.Random random = new math.Random();
    return new Point(random.nextInt(_rightEdgeX),
    random.nextInt(_bottomEdgeY));
  }

  void _checkForCollisions() {
    // check for collision with food
    if (_snake.head == _food) {
      _snake.grow();
      _food = _randomPoint();
    }

    // check death conditions
    if (_snake.head.x <= -1 ||
    _snake.head.x >= _rightEdgeX ||
    _snake.head.y <= -1 ||
    _snake.head.y >= _bottomEdgeY ||
    _snake.checkForBodyCollision()) {
      init();
    }
  }

  //=============================//
  // START
  //=============================//


  num _currentTime = 0.0;

  bool advanceTime(num time) {
    _currentTime = _currentTime + time;

    final num diff = _currentTime - _lastTimeStamp;

    if (diff >= GAME_SPEED) {
      _lastTimeStamp = _currentTime;
      clear();
      this.drawCell(_food, Color.Blue);
      _snake.update();
      _checkForCollisions();
    }

    // keep looping
    //run();

    return true;
  }

  //=============================//
  // CLEAR
  //=============================//

  void clear()
  {
    this.graphics.clear();
  }

  //=============================//
  // CELL
  //=============================//
  void drawCell(Point position, int color) {

    int x = position.x * CELL_SIZE;
    int y = position.y * CELL_SIZE;

    this.graphics.beginPath();
    this.graphics.rectRound(x, y,CELL_SIZE,CELL_SIZE, 0, 0);
    this.graphics.closePath();
    this.graphics.fillColor(color);
    this.graphics.strokeColor(Color.White,1);

    applyCache(0, 0, this.width, this.height);
  }
}