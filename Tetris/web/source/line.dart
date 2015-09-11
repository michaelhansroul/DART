part of tetris;

class Line extends Form
{
  Line() {
    this.type = Form.LINE;

    this.points = new List<Point>();
    this.points.add(new Point(0,0));
    this.points.add(new Point(1,0));
    this.points.add(new Point(2,0));
    this.points.add(new Point(3,0));

    void _move()
    {

    }
  }
}