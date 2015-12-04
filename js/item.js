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
        if(location_pressed(this.x,this.x+45,this.y,this.y+40) && this.step>10){
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


