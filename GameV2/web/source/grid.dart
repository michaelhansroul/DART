part of games;

class Grid extends DisplayObjectContainer
{
  final num numRow = 5;
  final num numColumn = 5;

  List<List<Candy>> __grid = [];
  List<Candy> _swithCandies=[];

  num widthCandy;
  num heightCandy;

  Candy _selected = null;

  Grid(num width,num height)
  {
    this.widthCandy = width/this.numRow;
    this.heightCandy = height/this.numColumn;

    for (var i = 0; i < this.numRow; i++)
    {
      List<Candy> row = new List<Candy>();
      for(var t=0; t< this.numColumn;t++)
      {
        Candy candy = new Candy(widthCandy,heightCandy);
        candy.x = t*widthCandy;
        candy.y = i*heightCandy;
        row.add(candy);
        this.addChild(candy);
      }
      __grid.add((row));
    }

    this.validate();
    //this.add();

    this.onMouseUp.capture(_onKeyUpCapture);
    this.onMouseDown.capture(_onKeyDownCapture);
  }

  Position getPosition(candy)
  {
    for(var i=0;i<this.__grid.length;i++)
    {
      var row = this.__grid[i];
      for(var t=0;t<row.length;t++)
      {
        if(row[t]==candy)
        {
          return new Position(i,t);
        }
      }
    }
    return null;
  }

  void showSwitchCandies()
  {
    if(this._selected==null)return;
    Position position = this.getPosition(this._selected);

    if(position.indexRow-1>=0) {
      this._swithCandies.add(this.__grid[position.indexRow - 1][position.indexColumn]);
    }
    if(position.indexColumn-1>=0){
      this._swithCandies.add(this.__grid[position.indexRow][position.indexColumn-1]);
    }

    if(position.indexColumn+1<this.__grid[0].length){
      this._swithCandies.add(this.__grid[position.indexRow][position.indexColumn+1]);
    }

    if(position.indexRow+1<this.__grid.length){
      this._swithCandies.add(this.__grid[position.indexRow+1][position.indexColumn]);
    }

    for(var i=0;i<this._swithCandies.length;i++)
    {
      if(this._swithCandies[i]!=null)
        this._swithCandies[i].canSwitch(true);
    }

  }

  void hideSwitchCandies()
  {
    for(var i=0;i<this._swithCandies.length;i++)
    {
      if(this._swithCandies[i]!=null)
        this._swithCandies[i].canSwitch(false);
    }
    this._swithCandies = [];
  }

  void select(Candy candy)
  {
    if(candy == this._selected)
    {
      return;
    }

    if(this._selected != null)
    {
      this._selected.deselect();
    }

    this._selected = candy;

    if(this._selected != null)
    {
      //this.addChild(this._selected);
      this._selected.select();
    }
  }

  var switchOnCompleteIndex = 0;
  void switchCandies(Candy candy1, Candy candy2, var onComplete)
  {
    Position position1 = this.getPosition(candy1);
    Position position2 = this.getPosition(candy2);

    num saveX = candy1.x;
    num saveY = candy1.y;

    var ag = new AnimationGroup();
    ag.add(candy1.animateChangePosition(candy2.x,candy2.y));
    ag.add(candy2.animateChangePosition(saveX,saveY));
    ag.onComplete = () => onComplete();
    this.stage.juggler.add(ag);

    this.__grid[position1.indexRow][position1.indexColumn] = candy2;
    this.__grid[position2.indexRow][position2.indexColumn] = candy1;
  }

  void add()
  {

    for(var i=0;i<this.__grid.length;i++) {
      var row = this.__grid[i];
      for (var t = 0;t < row.length;t++) {
        if(row[t]==null)
        {
          if(i==0)
          {
            Candy candy = new Candy(widthCandy,heightCandy);
            candy.x = t*widthCandy;
            candy.y = i*heightCandy;
            row[t]=candy;
            this.addChild(candy);
          }
          else
          {
            Candy candy = this.__grid[i-1][t];
            this.stage.juggler.add(candy.animateChangePosition( t*widthCandy, i*heightCandy));
            this.__grid[i-1][t]  = null;
            this.__grid[i][t] = candy;
          }

          this.add();
          return;
        }
      }
    }
  }

  void validate()
  {
    for(var i=0;i<this.__grid.length;i++)
    {
      var row = this.__grid[i];
      for(var t=0;t<row.length;t++)
      {
        if(this.validateCandy(row[t]))
        {
          this.validate();
          return;
        }
      }
    }
  }

  bool validateCandy(Candy candy)
  {
    if(candy == null) return false;
    print("validateCandy");
    Position position = this.getPosition(candy);
    num countRow = 0;
    num countColumn = 0;
    List<Candy> candiesRow = [];
    List<Candy> candiesColumn = [];

    print("countrow");
    for(var c=position.indexColumn;c<this.__grid[position.indexRow].length;c++)
    {
      if(this.__grid[position.indexRow][c]!=null && this.__grid[position.indexRow][c]._color==candy._color)
      {
        candiesRow.add(this.__grid[position.indexRow][c]);
        countRow++;
      }
      else
      {
        break;
      }
    }

    print("countcolumn");
    for(var c=position.indexRow;c<this.__grid.length;c++)
    {
      if(this.__grid[c][position.indexColumn]!=null && this.__grid[c][position.indexColumn]._color==candy._color)
      {
        candiesColumn.add(this.__grid[c][position.indexColumn]);
        countColumn++;
      }
      else
      {
        break;
      }
    }

    if(countRow >= 3) {
      print("REMOVE CANDIES ROW");
      for (var i = 0;i < candiesRow.length;i++) {
        this.remove(candiesRow[i]);
      }
    }

    if(countColumn >=3)
    {
      print("REMOVE CANDIES COLUMN");
      for(var i=0;i<candiesColumn.length;i++)
      {
        this.remove(candiesColumn[i]);
      }
    }

    if(countColumn >=3 || countRow >= 3)
    {
      return true;
    }

    return false;

  }

  void remove(Candy candy)
  {
    Position position = this.getPosition(candy);
    if(position==null)return;
    this.removeChild(candy);
    this.__grid[position.indexRow][position.indexColumn]=null;
  }

  void _onKeyUpCapture(MouseEvent event)
  {
    if (event.target is Candy)
    {
      Candy candy = event.target as Candy;
      if(this._selected!= null && candy.canSwitched)
      {
        this.hideSwitchCandies();
        this.switchCandies(this._selected,candy,(){
          this.select(null);
          this.validate();
          this.add();
        });

      }
      else
      {
        this.hideSwitchCandies();
        this.select(event.target as Candy);
        this.showSwitchCandies();
      }

    }
  }

  void _onKeyDownCapture(MouseEvent event)
  {
    if (event.target is Candy)
    {

    }
  }

}