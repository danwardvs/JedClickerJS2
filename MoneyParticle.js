class MoneyParticle{
  constructor(x,y,money){
    this.x = x;
    this.y = y;
    this.money = money;
  }

  update(){
    this.y--;
    return this.y>0;
  }

  draw(){
    textout( canvas,font,"$" +  this.money, this.x,this.y,10, makecol(0,200,0));
  }
}
  