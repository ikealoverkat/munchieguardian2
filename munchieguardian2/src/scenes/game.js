import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

export function gameScene() {
    let munchieguardianX = width() / 2;
    let munchieguardianY = height() / 2; 

    const munchieguardian = add([
        sprite("munchieguardian"),
        scale(0.25, 0.25),
        pos(munchieguardianX, munchieguardianY), {
            speed: 350,
        },
        anchor("center"),
        area(),
        "munchieguardian",
    ]);
    
    const clampOffset = 25;
    munchieguardian.onUpdate(() => {      
        munchieguardian.pos.x = clamp(munchieguardian.pos.x, clampOffset, width() - clampOffset);
        munchieguardian.pos.y = clamp(munchieguardian.pos.y, clampOffset, height()- clampOffset); //clamps so the munchieguardian doesn't go off screen
    });

    munchieguardian.onKeyDown((key) => {
        if (key === "w") {
            munchieguardian.move(0, -munchieguardian.speed);
        } //up
        if (key === "a") {
            munchieguardian.move(-munchieguardian.speed, 0);
        } //left
        if (key === "s") {
            munchieguardian.move(0, munchieguardian.speed);
        } //down
        if (key === "d") {
            munchieguardian.move(munchieguardian.speed, 0);
        } //right
    });
    onClick(() => {
        const bullet = add([
            sprite("bullet"),
            scale(0.1, 0.1),
            pos(munchieguardian.pos.x, munchieguardian.pos.y),
            anchor("center"),
            area(),
            move(mousePos().sub(munchieguardian.pos).unit(), 700),
            rotate(mousePos().angle(munchieguardian.pos)),
            "bullet",
        ])
    }) //adds bullets on click
}
