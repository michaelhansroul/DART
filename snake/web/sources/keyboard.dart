part of snake;

class Keyboard
{
  HashMap<int, int> _keys = new HashMap<int, int>();

  Keyboard()
  {
    print("KEYBOARD");
    html.window.onKeyDown.listen(onKeyDown);
    html.window.onKeyUp.listen(onKeyUp);
  }

  void onKeyDown( html.KeyboardEvent e){
    print("KEYCODE:"+e.keyCode.toString());
    if(!_keys.containsKey(e.keyCode)) {
      this._keys[e.keyCode] = e.timeStamp;
    }
  }

  void onKeyUp( html.KeyboardEvent e){
    this._keys.remove(e.keyCode);
  }

  bool isPressed(int keyCode) => _keys.containsKey(keyCode);
}