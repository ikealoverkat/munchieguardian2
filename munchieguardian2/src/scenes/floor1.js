import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

export function floor1Scene() {
    const munchieguardian = add([
        sprite("munchieguardian"),
        scale(0.25, 0.25),
        pos(10, 750), {
            speed: 350,
        },
        anchor("center"),
        area(),
        animate(),
        "munchieguardian",
    ]);

    // munchieguardian.tween(vec2(10, 750), vec2(150, 750), 1, (value) => (munchieguardian.pos = value));    
    // munchieguardian.animate("pos", [vec2(10, 750), vec2(150, 750)], {
    //     duration: 0.5,
    //     interpolation: "spline",
    //     direction: "forward",
    //     loop: false,
    // })
    
    tween(
        vec2(10, 750),
        vec2(200, 750),
        0.5,
        (v) => munchieguardian.pos = v,
        (t) => (Math.sin((Math.PI * t) / 2))
    );


}