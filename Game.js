let coin;
let money=0;

// Setup enum for types
const COINS = {
  PER_CLICK: 0,
  PER_SECOND: 1
}
var myGame;
let old_mouse_z = 0;
let second_timer = 0;
const menu_origin = 80;

let coin_clicked = false;

let sound_click;
let sound_buy;

let game_money_particles = [];
let game_items = [];

class Game{
  constructor(){
    this.menu_origin_y = 0;
    this.money_per_click = 1;
    this.money_per_second = 0;
  }

  get_menu_origin_y(){
    return this.menu_origin_y;
  }

  set_menu_origin_y(new_menu_origin_y){
    this.menu_origin_y = new_menu_origin_y;
  }

  get_money_per_second(){
    return this.money_per_second;
  }

  add_money_per_second(new_money_increment){
    this.money_per_second += new_money_increment;
  }

  get_money_per_click(){
    return this.money_per_click;
  }

  add_money_per_click(new_money_increment){
    this.money_per_click += new_money_increment;
  }
}

class Item {
  constructor(x,y,money_type,price,value,name,img_path) {
    this.name = name;
    this.value = value;
    this.x = x;
    this.y = y;
    this.price = price;
    this.money_type = money_type;
    this.step=0;
    this.amount = 0;
    this.scroll_step=0;
    this.image = 0;
    this.image = load_bmp("images/"+img_path+".png");
  }
  handle_click(){
    if(money>=this.price){
      if(this.name == "Jed")
        alert("You win!");
      
      play_sample(sound_buy);
      money-=this.price;
      this.amount++;
      if(this.money_type==COINS.PER_CLICK)
        myGame.add_money_per_click(this.value);
        
      if(this.money_type==COINS.PER_SECOND)
        myGame.add_money_per_second(this.value);
        

      this.price=Math.round(this.price*1.25);
    }
  }
    
  update(){
    if(this.name=="Inmate")
      myGame.set_menu_origin_y(this.y);
        
    this.step++;
        
    if(mouse_z < old_mouse_z && myGame.get_menu_origin_y()<menu_origin)
      this.y+=40;
           
    if(mouse_z > old_mouse_z && myGame.get_menu_origin_y()>menu_origin-40)
      this.y-=40;
    
        
        
    if((this.name=="Jed" && this.amount==0)|| this.name!="Jed" ){
      if(location_clicked(this.x,this.x+45,this.y,this.y+40) && this.step>10){
          this.handle_click()
          this.step=0;
        }
    
        if(location_right_clicked(this.x,this.x+45,this.y,this.y+40))
          this.handle_click()
      }
    }

  draw(){
        
    rect(canvas,this.x+45,this.y,SCREEN_W-1,this.y+40,makecol(0,0,0));
    if(money<this.price){
      rectfill(canvas,this.x,this.y,this.x+45,this.y+40,makecol(255,0,0));
    }else{
      rectfill(canvas,this.x,this.y,this.x+45,this.y+40,makecol(0,255,0));
      textout( canvas,font,"Buy", this.x+12,this.y+24,15, makecol(0,0,0), "Buy");
    }
        
    rect(canvas,this.x,this.y,this.x+45,this.y+40,makecol(0,0,0));
    textout_right(canvas,font,this.price,this.x-10,this.y+25,16,makecol(0,0,0));

    if(this.money_type==COINS.PER_SECOND)
      textout_right( canvas, font, this.value + " JC/S", SCREEN_W-25, this.y+15, 12, makecol(0,100,0));
        
    else
      textout_right( canvas, font, this.value + " JC/C", SCREEN_W-25, this.y+15, 12, makecol(200,0,0));
        
    for(let i = 0; i <this.amount; i++)
      draw_sprite(canvas,this.image,this.x+50+(i*25),this.y+10);
      
    textout(canvas,font,this.name + "s: " + this.amount, this.x+50,this.y+15,12,makecol(0,0,0));
	
  }
}

function location_clicked(min_x,max_x,min_y,max_y){
  return (mouse_x>min_x && mouse_x<max_x && mouse_y>min_y && mouse_y<max_y && (mouse_b & 1 || mouse_b & 2));
}

function location_right_clicked(min_x,max_x,min_y,max_y){
  return (mouse_x>min_x && mouse_x<max_x && mouse_y>min_y && mouse_y<max_y && mouse_b & 4);
}

function draw()
{	
	let jedcoin_amount = "Jed Coins: " + money;
	textout(canvas,font,jedcoin_amount,5,35,40,makecol(0,0,0));
	
	let jedcoin_per_second = "JC/S: " + myGame.get_money_per_second();
	let jedcoin_per_click = "JC/C: " + myGame.get_money_per_click();
	
	textout(canvas,font,jedcoin_per_second,5,65,30,makecol(0,0,0));
	textout(canvas,font,jedcoin_per_click,5,95,30,makecol(0,0,0));
	
	if(!location_clicked(10,410,190,600) && !location_right_clicked(10,410,190,600))draw_sprite(canvas,coin,10,190);
	if(location_clicked(10,410,190,600) || location_right_clicked(10,410,190,600))stretch_sprite(canvas,coin,30,210,360,360);
   
  for (i = 0; i < game_items.length; ++i) 
    game_items[i].draw();
    
  for (i = 0; i < game_money_particles.length; ++i) 
    game_money_particles[i].draw();
	
}

function update()
{	
	second_timer++;
	
    
    
	if(second_timer>60){
    second_timer=0;
    money+=myGame.get_money_per_second();
    if(myGame.get_money_per_second()>0)
      game_money_particles.push(new MoneyParticle(Math.floor((Math.random() * 340) + 31),Math.floor((Math.random() * 270) + 231),myGame.get_money_per_second()));
	}
	
   
  for (i = 0; i < game_money_particles.length; ++i) {
    if(game_money_particles[i].update()==false)
      game_money_particles.splice(i,1);
      
  }
	
	if(key[KEY_I])
		money+=10000;
	
  if(key[KEY_O])
		money=money*10000;
	
	//Coin being clicked
	if((location_clicked(10,410,190,600)||location_right_clicked(10,410,190,600)) && !coin_clicked){
		coin_clicked = true;
		money+=myGame.get_money_per_click();
    game_money_particles.push(new MoneyParticle(Math.floor((Math.random() * 340) + 31),Math.floor((Math.random() * 270) + 231),myGame.get_money_per_click()));
		play_sample(sound_click);
	}
	
	if(!mouse_b & 1)
		coin_clicked = false;
	
	for (i = 0; i < game_items.length; ++i) 
    game_items[i].update();
	
	if(mouse_z != old_mouse_z)
    scroll_step=0;
    
	old_mouse_z = mouse_z;

}

function setup(){

    myGame = new Game();
	//Creates an item based on the item class
    //The arguments are x position, y position, money type, initial cost, amount of money received, and name.
    const item_space = 40;

    game_items.push( new Item(550,menu_origin+0*item_space,COINS.PER_SECOND,100,2,"Inmate","inmate"));
    game_items.push( new Item(550,menu_origin+1*item_space,COINS.PER_CLICK,100,2,"JedCoin Press","press"));
    game_items.push( new Item(550,menu_origin+2*item_space,COINS.PER_SECOND,750,10,"Workstation","workstation"));
    game_items.push( new Item(550,menu_origin+3*item_space,COINS.PER_SECOND,2000,25,"JedCoin Mine","mine"));
    game_items.push( new Item(550,menu_origin+4*item_space,COINS.PER_SECOND,20000,100,"JedCoin Forge","forge"));
    game_items.push( new Item(550,menu_origin+5*item_space,COINS.PER_SECOND,35000,300,"Jedetically Modified Crop","jmocrop"));
    game_items.push( new Item(550,menu_origin+6*item_space,COINS.PER_CLICK,40000,100,"Jed Clone","jedclone"));
    game_items.push( new Item(550,menu_origin+7*item_space,COINS.PER_SECOND,50000,750,"Nuclear Power Plant","powerplant"));
    game_items.push( new Item(550,menu_origin+8*item_space,COINS.PER_SECOND,100000,2000,"Village","village"));
    game_items.push( new Item(550,menu_origin+9*item_space,COINS.PER_SECOND,1250000,15000,"Space Station","spacestation"));
    game_items.push( new Item(550,menu_origin+10*item_space,COINS.PER_SECOND,2000000,50000,"Moon","moon"));
    game_items.push( new Item(550,menu_origin+11*item_space,COINS.PER_CLICK,7500000,5000,"JeDOS AI","jedos"));
    game_items.push( new Item(550,menu_origin+12*item_space,COINS.PER_SECOND,100000000,500000,"Space Teleporter","teleporter"));
    game_items.push( new Item(550,menu_origin+13*item_space,COINS.PER_CLICK,150000000,25000,"Electromagnetic Coin Magnifier","magnet"));
    game_items.push( new Item(550,menu_origin+14*item_space,COINS.PER_SECOND,500000000,1000000,"Killer Robot","robot"));
    game_items.push( new Item(550,menu_origin+15*item_space,COINS.PER_SECOND,1000000000,3000000,"Dark Matter Coin","darkcoin"));
    game_items.push( new Item(550,menu_origin+16*item_space,COINS.PER_SECOND,2500000000,6000000,"Starship Fleet","starship"));
    game_items.push( new Item(550,menu_origin+17*item_space,COINS.PER_SECOND,7500000000,20000000,"Distant Inhabitable Planet","planet"));
    game_items.push( new Item(550,menu_origin+18*item_space,COINS.PER_SECOND,10000000000,80000000,"Black Hole","blackhole"));
    game_items.push( new Item(550,menu_origin+19*item_space,COINS.PER_SECOND,150000000000,200000000,"Jed Salt","jedsalt"));
    game_items.push( new Item(550,menu_origin+20*item_space,COINS.PER_SECOND,100000000000000,30000000000,"Jed","jed"));
    game_items.push( new Item(550,menu_origin+21*item_space,COINS.PER_SECOND,7,0,"Depressed Cookie","cookie"));
    
	coin = load_bmp("images/coin.png");
	
	sound_click = load_sample("audio/sound_click.mp3");
	sound_buy = load_sample("audio/sound_buy.mp3");
}

function main()
{
	enable_debug('debug');
	allegro_init_all("game_canvas", 1000,921);
	setup();
	ready(function(){
		loop(function(){
			clear_to_color(canvas,makecol(255,255,255));
			update();
			draw();
		},BPS_TO_TIMER(60));
	});
	return 0;
}
END_OF_MAIN();

 