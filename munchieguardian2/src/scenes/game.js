import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

loadSprite("munchieguardian", "../public/sprites/munchieguardian.png");

export function gameScene() {
    munchieguardian = add([
        sprite("munchieguardian"),
        scale(0.5, 0.5),
        pos(center()),
        anchor("center"),
    ])
}
