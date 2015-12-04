var x = 100,y = 100;
var coin;
var money=0;
var money_per_click=1;
var money_per_second=0;

var tap_x = 0;
var tap_y = 0;

var bobX=600;
var bobY=600;
var flip=0;
var angle=0;
var h=25;
var w=25;

var COINS_PER_CLICK = 0;
var COINS_PER_SECOND = 1;

var tap_down = false;

var slave_y=0;
var old_mouse_z = 0;
var second_timer = 0;

var coin_clicked = false;
var slabo_26;

var sound_click;
var sound_buy;

var money_particle_array = [];

var money_particle = function (x,y,money){
    this.x = x;
    this.y = y;
    this.money = money;
}



money_particle.prototype.draw = function(){
    textout( canvas,font,"$" +  this.money, this.x,this.y,10, makecol(0,200,0));
}

money_particle.prototype.update = function(){
    this.y--;
    if(this.y<0){
        return false;
    }else{
        return true;
    }
}


//Creates an item based on the item class
//The arguments are x position, y position, money type, initial cost, amount of money received, and name.

var slave = new item(550,0,COINS_PER_SECOND,100,2,"Slave");
var press = new item(550,40,COINS_PER_CLICK,100,2,"JedCoin Press");
var workstation = new item(550,80,COINS_PER_SECOND,750,10,"Workstation");
var mine = new item(550,120,COINS_PER_SECOND,2000,25,"JedCoin Mine");
var forge = new item(550,160,COINS_PER_SECOND,20000,100,"JedCoin Forge");
var jmocrop = new item(550,200,COINS_PER_SECOND,35000,300,"Jedetically Modified Crop");
var clone = new item(550,240,COINS_PER_CLICK,40000,100,"Jed Clone");
var powerplant = new item(550,280,COINS_PER_SECOND,50000,750,"Nuclear Power Plant");
var village = new item(550,320,COINS_PER_SECOND,100000,2000,"Village");
var spacestation = new item(550,360,COINS_PER_SECOND,1250000,15000,"Space Station");
var moon = new item(550,400,COINS_PER_SECOND,2000000,50000,"Moon");
var jedos = new item(550,440,COINS_PER_CLICK,7500000,5000,"JeDOS AI");
var teleporter = new item(550,480,COINS_PER_SECOND,100000000,500000,"Space Teleporter");
var magnet = new item(550,520,COINS_PER_CLICK,150000000,25000,"Electromagnetic Coin Magnifier");
var robot = new item(550,560,COINS_PER_SECOND,500000000,1000000,"Killer Robot");
var darkcoin = new item(550,600,COINS_PER_SECOND,1000000000,3000000,"Dark Matter Coin");
var starship = new item(550,640,COINS_PER_SECOND,2500000000,6000000,"Starship Fleet");
var planet = new item(550,680,COINS_PER_SECOND,7500000000,20000000,"Distant Inhabitable Planet");
var blackhole = new item(550,720,COINS_PER_SECOND,10000000000,80000000,"Black Hole");
var jedsalt = new item(550,760,COINS_PER_SECOND,150000000000,200000000,"Jed Salt");
var jed = new item(550,800,COINS_PER_SECOND,100000000000000,30000000000,"Jed");
var cookie = new item(550,840,COINS_PER_SECOND,7,0,"Depressed Cookie");


function location_tapped(min_x,max_x,min_y,max_y){
    if(tap_x>min_x && tap_x<max_x && tap_y>min_y && tap_y<max_y && tap_down){
        return true;
	}else{
		return false;
	}
}


function location_clicked(min_x,max_x,min_y,max_y){
    if(mouse_x>min_x && mouse_x<max_x && mouse_y>min_y && mouse_y<max_y && (mouse_b & 1 || mouse_b & 2)){
        return true;
	}else{
		return false;
	}
}

function location_right_clicked(min_x,max_x,min_y,max_y){
    if(mouse_x>min_x && mouse_x<max_x && mouse_y>min_y && mouse_y<max_y && mouse_b & 4){
        return true;
	}else{
		return false;
	}
}

function location_pressed(min_x,max_x,min_y,max_y){
    if(location_clicked(min_x,max_x,min_y,max_y) || location_tapped(min_x,max_x,min_y,max_y)){
        return true;
	}else{
		return false;
	}
}
}

function draw()
{	
    
    
	var jedcoin_amount = "JedCoins: " + money;
	textout(canvas,font,jedcoin_amount,5,35,40,makecol(0,0,0));
	
	var jedcoin_per_second = "JC/S: " + money_per_second;
	var jedcoin_per_click = "JC/C: " + money_per_click;
	
	textout(canvas,font,jedcoin_per_second,5,65,30,makecol(0,0,0));
	textout(canvas,font,jedcoin_per_click,5,95,30,makecol(0,0,0));
	
	if(!location_clicked(10,410,190,600) && !location_right_clicked(10,410,190,600))draw_sprite(canvas,coin,10,190);
	if(location_clicked(10,410,190,600) || location_right_clicked(10,410,190,600))stretch_sprite(canvas,coin,30,210,360,360);
	
    
    
    
	slave.draw();
    press.draw();
    workstation.draw();
    mine.draw();
    clone.draw();
    forge.draw();
    jmocrop.draw();
    powerplant.draw();
    village.draw();
    spacestation.draw();
    moon.draw();
    jedos.draw();
    teleporter.draw();
    magnet.draw();
    jedsalt.draw();
    robot.draw();
    darkcoin.draw();
    starship.draw();
    planet.draw();
    jed.draw();
    blackhole.draw();
    cookie.draw();
   
    for (i = 0; i < money_particle_array.length; ++i) {
       money_particle_array[i].draw();
    }
    
	
}

function update()
{	
    
    
    if(location_tapped(10,410,190,600)){
           money_particle_array.push(new money_particle(Math.floor((Math.random() * 340) + 31),Math.floor((Math.random() * 270) + 231),money_per_click));
    }
    
	second_timer++;
	

    
    
	if(second_timer>60){
        second_timer=0;
        money+=money_per_second;
        if(money_per_second>0){
            money_particle_array.push(new money_particle(Math.floor((Math.random() * 340) + 31),Math.floor((Math.random() * 270) + 231),money_per_second));
        }
	}
	
   
    for (i = 0; i < money_particle_array.length; ++i) {
       if(money_particle_array[i].update()==false){
          money_particle_array.splice(i,1);
       }
    }
       
    
   
	
	if(key[KEY_I]){
		money+=10000;
	}
    
    if(key[KEY_O]){
		money=money*10000;
	}
	//Coin being clicked
	if((location_clicked(10,410,190,600)||location_right_clicked(10,410,190,600)) && !coin_clicked){
		coin_clicked = true;
		money+=money_per_click;
        money_particle_array.push(new money_particle(Math.floor((Math.random() * 340) + 31),Math.floor((Math.random() * 270) + 231),money_per_click));
		play_sample(sound_click);
	}
	
	if(!mouse_b & 1){
		coin_clicked = false;
	}
	
	slave.update();
    press.update();
    workstation.update();
    mine.update();
    clone.update();
    forge.update();
    jmocrop.update();
    powerplant.update();
    village.update();
    spacestation.update();
    moon.update();
    jedos.update();
    teleporter.update();
    magnet.update();
    jedsalt.update();
    robot.update();
    darkcoin.update();
    starship.update();
    planet.update();
    blackhole.update();
    jed.update();
    cookie.update();
	
	if(mouse_z != old_mouse_z){
        scroll_step=0;
    }
    
	old_mouse_z = mouse_z;
    tap_down = false;
    

}
function getTouch(){
    
    tap_down = true;
    tap_x = event.touches[0].pageX;
    tap_y = event.touches[0].pageY
}

function setup(){
	
	slave.set_image( "images/slave.png");
    workstation.set_image( "images/workstation.png");
    mine.set_image( "images/mine.png");
    clone.set_image( "images/jedclone.png");
    press.set_image( "images/press.png");
    forge.set_image( "images/forge.png");
    powerplant.set_image( "images/powerplant.png");
    village.set_image( "images/village.png");
    spacestation.set_image( "images/spacestation.png");
    moon.set_image( "images/moon.png");
    jedos.set_image( "images/jedos.png");
    teleporter.set_image( "images/teleporter.png");
    magnet.set_image( "images/magnet.png");
    jedsalt.set_image( "images/jedsalt.png");
    jmocrop.set_image( "images/jmocrop.png");
    robot.set_image( "images/robot.png");
    darkcoin.set_image( "images/darkcoin.png");
    starship.set_image( "images/starship.png");
    planet.set_image( "images/planet.png");
    blackhole.set_image( "images/blackhole.png");
    jed.set_image( "images/jed.png");
    cookie.set_image( "images/cookie.png");
	//How do I font?
	//slabo_26 = load_font("slabo_26.pcx")
	coin = load_bmp("images/coin.png");
	
	sound_click = load_sample("audio/sound_click.mp3");
	sound_buy = load_sample("audio/sound_buy.mp3");
}


function main()
{
    
    var touchzone = document.getElementById("game_canvas");
      touchzone.addEventListener("touchstart", getTouch, false);
      
	enable_debug('debug');
	allegro_init_all("game_canvas", 1000,600);
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

 