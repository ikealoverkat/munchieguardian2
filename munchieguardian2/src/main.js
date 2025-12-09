import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

import { gameScene } from "./scenes/game.js";

kaplay({
    width: 1280,
    height: 960,
    background: "#000000",
    canvas: document.getElementById("canvas"),
});

loadRoot("./"); // ts for shipping on itch
loadSprite("logo", "ui/logo.png")

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

go("game");