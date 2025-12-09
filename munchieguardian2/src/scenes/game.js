import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

export function gameScene() {
    add([
        sprite("munchieguardian"),
        scale(0.5, 0.5),
        pos(center()),
        anchor("center"),
    ])
}
