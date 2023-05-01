let coin;
let money = 0;

var myGame;
let old_mouse_z = 0;
let second_timer = 0;
const menu_origin = 80;

let coin_clicked = false;

let sound_click;
let sound_buy;

const game_money_particles = [];
const game_items = [];

class Game {
  constructor() {
    this.menu_origin_y = 0;
    this.money_per_click = 1;
    this.money_per_second = 0;
  }

  get_menu_origin_y() {
    return this.menu_origin_y;
  }

  set_menu_origin_y(new_menu_origin_y) {
    this.menu_origin_y = new_menu_origin_y;
  }

  get_money_per_second() {
    return this.money_per_second;
  }

  add_money_per_second(new_money_increment) {
    this.money_per_second += new_money_increment;
  }

  get_money_per_click() {
    return this.money_per_click;
  }

  add_money_per_click(new_money_increment) {
    this.money_per_click += new_money_increment;
  }
}

function location_clicked(min_x, max_x, min_y, max_y) {
  return (
    mouse_x > min_x &&
    mouse_x < max_x &&
    mouse_y > min_y &&
    mouse_y < max_y &&
    (mouse_b & 1 || mouse_b & 2)
  );
}

function location_right_clicked(min_x, max_x, min_y, max_y) {
  return (
    mouse_x > min_x &&
    mouse_x < max_x &&
    mouse_y > min_y &&
    mouse_y < max_y &&
    mouse_b & 4
  );
}

function draw() {
  const jedcoin_amount = "Jed Coins: " + money;
  textout(canvas, font, jedcoin_amount, 5, 35, 40, makecol(0, 0, 0));

  const jedcoin_per_second = "JC/S: " + myGame.get_money_per_second();
  const jedcoin_per_click = "JC/C: " + myGame.get_money_per_click();

  textout(canvas, font, jedcoin_per_second, 5, 65, 30, makecol(0, 0, 0));
  textout(canvas, font, jedcoin_per_click, 5, 95, 30, makecol(0, 0, 0));

  if (
    !location_clicked(10, 410, 190, 600) &&
    !location_right_clicked(10, 410, 190, 600)
  )
    draw_sprite(canvas, coin, 10, 190);
  if (
    location_clicked(10, 410, 190, 600) ||
    location_right_clicked(10, 410, 190, 600)
  )
    stretch_sprite(canvas, coin, 30, 210, 360, 360);

  game_items.forEach((item) => item.draw());

  game_money_particles.forEach((particle) => particle.draw());
}

function update() {
  second_timer++;

  if (second_timer > 60) {
    second_timer = 0;
    money += myGame.get_money_per_second();
    if (myGame.get_money_per_second() > 0)
      game_money_particles.push(
        new MoneyParticle(
          Math.floor(Math.random() * 340 + 31),
          Math.floor(Math.random() * 270 + 231),
          myGame.get_money_per_second()
        )
      );
  }

  for (i = 0; i < game_money_particles.length; ++i) {
    if (game_money_particles[i].update() == false)
      game_money_particles.splice(i, 1);
  }

  // Cheats
  if (key[KEY_I]) money += 10000;

  if (key[KEY_O]) money = money * 10000;

  //Coin being clicked
  if (
    (location_clicked(10, 410, 190, 600) ||
      location_right_clicked(10, 410, 190, 600)) &&
    !coin_clicked
  ) {
    coin_clicked = true;
    money += myGame.get_money_per_click();
    game_money_particles.push(
      new MoneyParticle(
        Math.floor(Math.random() * 340 + 31),
        Math.floor(Math.random() * 270 + 231),
        myGame.get_money_per_click()
      )
    );
    play_sample(sound_click);
  }

  if (!mouse_b & 1) coin_clicked = false;

  game_items.forEach((item) => item.update());

  if (mouse_z != old_mouse_z) scroll_step = 0;

  old_mouse_z = mouse_z;
}

function setup() {
  myGame = new Game();
  const item_space = 40;

  game_data.forEach((item, i) => {
    game_items.push(
      new Item(
        550,
        menu_origin + i * item_space,
        item.type,
        item.cost,
        item.value,
        item.name,
        item.image
      )
    );
  });

  coin = load_bmp("images/coin.png");

  sound_click = load_sample("audio/sound_click.mp3");
  sound_buy = load_sample("audio/sound_buy.mp3");
}

function main() {
  enable_debug("debug");
  allegro_init_all("game_canvas", 1000, 921);
  setup();
  ready(function () {
    loop(function () {
      clear_to_color(canvas, makecol(255, 255, 255));
      update();
      draw();
    }, BPS_TO_TIMER(60));
  });
  return 0;
}
END_OF_MAIN();
