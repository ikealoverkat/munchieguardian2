import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

export function floor2Scene() {
    setGravity(3000); //gravity = 3x jump force
    
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
            "           ---                ",
            "         b --- --           ",
            "=====================   ======",
            "=====================   ======",
            "=====================   ======",
    ]);

    makeCollidingBox(300, 300, "gunBox");

    let munchieguardianState = "idle";

    const munchieguardian = add([
        sprite("munchieguardian"),
        scale(0.25, 0.25),
        pos(10, 500), {
            speed: 500,
        },
        anchor("center"),
        area(),
        animate(),
        body(),
        "munchieguardian",
    ]);

    // setCamScale(1.1);
    // onUpdate(() => {
    //     setCamPos(munchieguardian.pos);
    // })

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

    onKeyPressRepeat(["w", "up", "space"], () => {
        if (jumpsLeft > 0) {
            munchieguardian.jump(950);
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
        munchieguardianState = "dashing";
        if (munchieguardianDirection == RIGHT) {
            tween(munchieguardian.pos.x, munchieguardian.pos.x + 200, 0.2, (v) => (munchieguardian.pos.x = v), easings.easeInOutCirc)
            // munchieguardian.move(20*munchieguardian.speed, 15);
        }
        if (munchieguardianDirection == LEFT) {
            tween(munchieguardian.pos.x, munchieguardian.pos.x - 200, 0.2, (v) => (munchieguardian.pos.x = v), easings.easeInOutCirc)
        } //change direction

        for (let i = 0; i <= 4; i++) {
            wait(i * 0.04, () => {
                add([
                    sprite(munchieguardian.sprite),
                    scale(munchieguardian.scale),
                    pos(munchieguardian.pos.x, munchieguardian.pos.y - 100),
                    opacity(0.2),
                    lifespan(0, {
                        fade: 0.5,
                    }) 
                ]);
            }    
            );
        } //dash trail
    }) //dash
    onKeyRelease("shift", () => {
        wait(0.2, () => {
            munchieguardianState = "idle";
        })
    })//dash over

    // onUpdate(() => {
    //     debug.log(munchieguardianState);
    // })

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
                ], //floor tile
                "-": () => [
                    rect(64, 64),
                    area(),
                    body({isStatic: true}),
                    color(100, 50, 10),
                ], //platform box
            }
        })
    } 

    function makeCollidingBox(boxX, boxY, boxTag) {
        add([
            rect(72, 72),
            pos(boxX, boxY),
            area(),
            body(),
            color(175, 80, 30),
            boxTag,       
        ])
    }

    onCollide("munchieguardian", "gunBox", () => {
        if (munchieguardianState == "dashing") {
            destroyAll("gunBox");
        }
        destroyAll("tile")
    })
}