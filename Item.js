class Item {
  constructor(x, y, money_type, price, value, name, img_path) {
    this.name = name;
    this.value = value;
    this.x = x;
    this.y = y;
    this.price = price;
    this.money_type = money_type;
    this.step = 0;
    this.amount = 0;
    this.scroll_step = 0;
    this.image = 0;
    this.image = load_bmp("images/" + img_path + ".png");
  }
  handle_click() {
    if (money >= this.price) {
      if (this.name == "Jed") alert("You win!");

      play_sample(sound_buy);
      money -= this.price;
      this.amount++;
      if (this.money_type == COINS.PER_CLICK)
        myGame.add_money_per_click(this.value);

      if (this.money_type == COINS.PER_SECOND)
        myGame.add_money_per_second(this.value);

      this.price = Math.round(this.price * 1.25);
    }
  }

  update() {
    if (this.name == "Inmate") myGame.set_menu_origin_y(this.y);

    this.step++;

    if (mouse_z < old_mouse_z && myGame.get_menu_origin_y() < menu_origin)
      this.y += 40;

    if (mouse_z > old_mouse_z && myGame.get_menu_origin_y() > menu_origin - 40)
      this.y -= 40;

    if ((this.name == "Jed" && this.amount == 0) || this.name != "Jed") {
      if (
        location_clicked(this.x, this.x + 45, this.y, this.y + 40) &&
        this.step > 10
      ) {
        this.handle_click();
        this.step = 0;
      }

      if (location_right_clicked(this.x, this.x + 45, this.y, this.y + 40))
        this.handle_click();
    }
  }

  draw() {
    rect(
      canvas,
      this.x + 45,
      this.y,
      SCREEN_W - 1,
      this.y + 40,
      makecol(0, 0, 0)
    );
    if (money < this.price) {
      rectfill(
        canvas,
        this.x,
        this.y,
        this.x + 45,
        this.y + 40,
        makecol(255, 0, 0)
      );
    } else {
      rectfill(
        canvas,
        this.x,
        this.y,
        this.x + 45,
        this.y + 40,
        makecol(0, 255, 0)
      );
      textout(
        canvas,
        font,
        "Buy",
        this.x + 12,
        this.y + 24,
        15,
        makecol(0, 0, 0),
        "Buy"
      );
    }

    rect(canvas, this.x, this.y, this.x + 45, this.y + 40, makecol(0, 0, 0));
    textout_right(
      canvas,
      font,
      this.price,
      this.x - 10,
      this.y + 25,
      16,
      makecol(0, 0, 0)
    );

    if (this.money_type == COINS.PER_SECOND)
      textout_right(
        canvas,
        font,
        this.value + " JC/S",
        SCREEN_W - 25,
        this.y + 15,
        12,
        makecol(0, 100, 0)
      );
    else
      textout_right(
        canvas,
        font,
        this.value + " JC/C",
        SCREEN_W - 25,
        this.y + 15,
        12,
        makecol(200, 0, 0)
      );

    for (let i = 0; i < this.amount; i++)
      draw_sprite(canvas, this.image, this.x + 50 + i * 25, this.y + 10);

    textout(
      canvas,
      font,
      this.name + "s: " + this.amount,
      this.x + 50,
      this.y + 15,
      12,
      makecol(0, 0, 0)
    );
  }
}
