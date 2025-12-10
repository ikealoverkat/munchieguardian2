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
    const munchieguardianDirectionVector = vec2(0, 0); //creates new vector that moves munchieguardian
        onKeyDown((key) => {
            if (key == "w") {munchieguardianDirectionVector.y = -1;}
            if (key == "a") {munchieguardianDirectionVector.x = -1;}
            if (key == "s") {munchieguardianDirectionVector.y = 1;}
            if (key == "d") {munchieguardianDirectionVector.x = 1;}
        })
        onKeyRelease((key) => {
        if (key == "a" || key == "d") munchieguardianDirectionVector.x = 0;
        if (key == "w" || key == "s") munchieguardianDirectionVector.y = 0;
        }) //munchieguardian direction controlling code 
        
    munchieguardian.onUpdate(() => {      
        munchieguardian.pos.x = clamp(munchieguardian.pos.x, clampOffset, width() - clampOffset);
        munchieguardian.pos.y = clamp(munchieguardian.pos.y, clampOffset, height()- clampOffset); //clamps so the munchieguardian doesn't go off screen

        const unitVector = munchieguardianDirectionVector.unit(); //normalizes the munchieguardian vector (makes the length 1) so diagonal movement isn't faster
        munchieguardian.move(unitVector.scale(munchieguardian.speed)); //moves munchieguardian according to the vector and speed 
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
        ]) //adds bullet on click
    }) 

    var chargeAttackAvailable = false;
    loop(4, () => {
        chargeAttackAvailable = true;
        onKeyPress("e", () => {
            if (chargeAttackAvailable == true) {
                chargeAttackAvailable = false;
                debug.log("charge attack fired!");
            }
        });        
    })
}