part of tetris;

class Game extends Sprite implements Animatable
{
  static const num GAME_SPEED = 0.1;
  static const num CELL_SIZE = 10;

  List<Form> forms;
  Form currentForm;

  num _currentTime = 0.0;
  num _lastTimeStamp = 0.0;

  Game()
  {
    init();
  }

  void init()
  {
    this.forms = new List<Form>();
    this.currentForm = randomForm();
  }

  Form randomForm()
  {
    return new Line();
  }

  bool advanceTime(num time)
  {
    _currentTime = _currentTime  + time;
    num dif = _currentTime - _lastTimeStamp;
    if(dif>GAME_SPEED)
    {
      for(Form form in forms)
      {
        form.update();
      }
    }
    return true;
  }

  void drawCell(Point point)
  {

    applyCache(0,0,this.width,this.height);
  }

}