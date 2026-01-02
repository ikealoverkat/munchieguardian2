import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix


import { gameScene } from "./scenes/game.js";
import { floor1Scene } from "./scenes/floor1.js";
import { floor2Scene } from "./scenes/floor2.js";

kaplay({
    width: 1920,
    height: 1080,
    background: "#000000",
    canvas: document.getElementById("canvas"),
});

loadRoot("./"); // ts for shipping on itch
//note 2 self: all sprites must be loaded here
loadSprite("logo", "ui/logo.png")
loadSprite("Ebutton", "ui/E.png")

loadSprite("munchieguardian", "sprites/munchieguardian.png")
loadSprite("bullet", "sprites/bullet.png")
loadSprite("chargeAttackBullet", "sprites/chargeattack_bullet.png")

scene("floor1", floor1Scene);

scene("floor2", floor2Scene);

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

go("floor2");