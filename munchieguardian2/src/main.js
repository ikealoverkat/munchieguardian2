import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

loadRoot("./");

import { gameScene } from "scenes/game.js";
import { tutorialScene } from "scenes/tutorial.js";

kaplay({
    width: 1920,
    height: 1080,
    background: "#000000",
    canvas: document.getElementById("canvas"),
});

loadRoot("./"); // ts for shipping on itch
//note 2 self: all sprites must be loaded here
loadSprite("logo", "ui/logo.png")
loadSprite("munchieguardian", "sprites/munchieguardian.png")
loadSprite("bullet", "sprites/bullet.png")
loadSprite("chargeAttackBullet", "sprites/chargeattack_bullet.png")


scene("tutorial", tutorialScene);

scene("game", gameScene);


scene("title", () => {
    add([
        sprite("logo"),
        scale(0.4, 0.4),
        anchor("center"),
        pos(center()),
        "logo",
    ])
})

go("tutorial");