var item = function (x,y,money_type,price,value,name) {
	this.name = name;
	this.value = value
	this.x = x;
	this.y = y;
	this.price = price;
	this.money_type = money_type;
	this.amount = 0;
	this.step=0;
	this.scroll_step=0;
	this.image = 0;
	
}

item.prototype.draw = function(){
	
	rect(canvas,this.x+45,this.y,SCREEN_W-1,this.y+40,makecol(0,0,0));
	
    if(this.name!="Jed" || (this.name=="Jed" && this.amount==0)){
        if(money<this.price){
                rectfill(canvas,this.x,this.y,this.x+45,this.y+40,makecol(255,0,0));
                textout_right(canvas,font,this.price,this.x-10,this.y+25,16,makecol(0,0,0));
        }else{
            rectfill(canvas,this.x,this.y,this.x+45,this.y+40,makecol(0,255,0));
		    textout( canvas,font,"Buy", this.x+12,this.y+24,15, makecol(0,0,0), "Buy");
            textout_right(canvas,font,this.price,this.x-10,this.y+25,16,makecol(0,0,0));
	      }
    }
    if(this.name=="Jed" && this.amount!=0){
           rectfill(canvas,this.x,this.y,this.x+45,this.y+40,makecol(100,100,255));
    }
    
    
	rect(canvas,this.x,this.y,this.x+45,this.y+40,makecol(0,0,0));

	
	if(this.money_type==COINS_PER_SECOND){
		//var coin_string = string.concat(value,"JS/C");
		coin_string = this.value + " JC/S"
		textout_right( canvas, font, coin_string, SCREEN_W-25, this.y+15, 12, makecol(0,100,0));
	}
    if(this.money_type==COINS_PER_CLICK){
		coin_string = this.value + " JC/C"
		textout_right( canvas, font, coin_string, SCREEN_W-25, this.y+15, 12, makecol(200,0,0));
	}
	for(i = 0; i <this.amount; i++){
         draw_sprite(canvas,this.image,this.x+50+(i*25),this.y+10);
    }
	
	textout(canvas,font,this.name + "s: " + this.amount, this.x+50,this.y+15,12,makecol(0,0,0));
	
	
}
item.prototype.update = function(){
	
    if(this.name=="Slave"){
		slave_y = this.y;
	}
    
	this.step++;
	
	if(mouse_z < old_mouse_z && slave_y<0){
       this.y+=40;
       
    }
	if(mouse_z > old_mouse_z && slave_y>-280){
        this.y-=40;
     
    }
	
	
	if((this.name=="Jed" && this.amount==0)|| this.name!="Jed" ){
        if(location_clicked(this.x,this.x+45,this.y,this.y+40) && this.step>10){
            if(money>=this.price){
                if(this.name == "Jed"){
                    alert("You win!");
                }
                play_sample(sound_buy);
                money-=this.price;
                this.amount++;
                if(this.money_type==0){
                money_per_click+=this.value;
                }
                if(this.money_type==1){
                    money_per_second+=this.value;
                }

                this.price=Math.round(this.price*1.25);
            }
            this.step=0;
        }

        if(location_right_clicked(this.x,this.x+45,this.y,this.y+40)){
            if(money>=this.price){
                if(this.name == "Jed"){
                    alert("You win!");
                }
                play_sample(sound_buy);
                money-=this.price;
                this.amount++;
                if(this.money_type==0){
                    money_per_click+=this.value;
                }
                if(this.money_type==1){
                    money_per_second+=this.value;
                }
				var numbermath = this.price*1.25;
                this.price=Math.round(numbermath);
            }
        }
    }

	
}

item.prototype.set_image = function(image_to_load){
	this.image = load_bmp(image_to_load);
	
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
