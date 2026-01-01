import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

export function floor1Scene() {
    setGravity(2700); //gravity = 3x jump force
    
    const munchieguardian = add([
        sprite("munchieguardian"),
        scale(0.25, 0.25),
        pos(10, 750), {
            speed: 500,
        },
        anchor("center"),
        area(),
        animate(),
        body(),
        "munchieguardian",
    ]);

    const floor = add([
        rect(1920, 200),
        area(),
        pos(0, height() - 200),
        body({ isStatic: true }),
        color(0, 20, 100),
    ]);

    tween(
        vec2(10, 800),
        vec2(200, 800),
        0.5,
        (v) => munchieguardian.pos = v,
        easings.easeOutCirc
    );

    onKeyPress(["w", "up"], () => {
        if (munchieguardian.isGrounded()) {
            munchieguardian.jump(900);
        }
    })


    onKeyDown(["d", "right"], () => {
        munchieguardian.move(munchieguardian.speed, 0);
        munchieguardian.scale = vec2(0.25, 0.25);
    })

    onKeyDown(["a", "left"], () => {
        munchieguardian.move(-munchieguardian.speed, 0);
        munchieguardian.scale = vec2(-0.25, 0.25);
    }) 

    // munchieguardian.


}