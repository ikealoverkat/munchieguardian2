import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

export function floor1Scene() {
    setGravity(2400); //gravity = 3x jump force
    
    makeLevel([
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "                              ",
            "==============================",
            "==============================",
            "==============================",
    ]);

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

    // const floor = add([
    //     rect(1920, 200),
    //     area(),
    //     pos(0, height() - 200),
    //     body({ isStatic: true }),
    //     color(0, 20, 100),
    // ]);

    tween(
        vec2(10, 800),
        vec2(200, 800),
        0.5,
        (v) => munchieguardian.pos = v,
        easings.easeOutCirc
    );

    var munchieguardianDirection = RIGHT;
    let jumpsLeft = 2;

    munchieguardian.onGround(() => {
        jumpsLeft = 2;
    }); //double jump stuff

    onKeyPress(["w", "up"], () => {
        if (jumpsLeft > 0) {
            munchieguardian.jump(750);
            jumpsLeft--;
        }
    })

    onKeyDown(["d", "right"], () => {
        munchieguardian.move(munchieguardian.speed, 0);
        munchieguardian.scale = vec2(0.25, 0.25);
        munchieguardianDirection = RIGHT;
    })

    onKeyDown(["a", "left"], () => {
        munchieguardian.move(-munchieguardian.speed, 0);
        munchieguardian.scale = vec2(-0.25, 0.25);
        munchieguardianDirection = LEFT;
    }) //move controls
    
    onKeyPress("shift", () => {
        if (munchieguardianDirection == RIGHT) {
            tween(munchieguardian.pos.x, munchieguardian.pos.x + 200, 0.2, (v) => (munchieguardian.pos.x = v), easings.easeInOutCirc)
            // munchieguardian.move(20*munchieguardian.speed, 15);
        }
        if (munchieguardianDirection == LEFT) {
            tween(munchieguardian.pos.x, munchieguardian.pos.x - 200, 0.2, (v) => (munchieguardian.pos.x = v), easings.easeInOutCirc)
        } //change direction
    }) //dash

    function makeLevel(level) {
        addLevel(level, {
            tileWidth: 64,
            tileHeight: 64,
            tiles: {
                "=": () => [
                    rect(64, 64),
                    area(),
                    body({isStatic: true}),
                    color(0, 10, 100),
                ]
            }
        })
    } 

}