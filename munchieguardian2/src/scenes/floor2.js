import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

export function floor2Scene() {
    add([
        text("FLOOR 2", {size: 48}),
        pos(20, 20),
        opacity(1),
        lifespan(2, {
            fade: 0.75,
        })
    ])

    setGravity(3000); //gravity = 3x jump force
    //to make the quests
    add([
        rect(500, 300), //y size is # of quests * a number for how long each of them are + starting size
        //make it a slice9
        anchor("top"),
        pos(1600, 65),
    ])
    add([
        text("Quests", {
            size: 64,
        }),
        color(10, 10, 100),
        anchor("center"),
        pos(1600, 125)
    ])

    function addQuest() {
        
    }

    class levels {
        constructor(level) {
            this.obj = addLevel(level, {
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
                    "^": () => [
                        rect(64, 64),
                        opacity(0),
                        area(),
                        body({isStatic: true}),
                        "spike",
                    ] //spike
                }
            })     
        }
    }

    const levelOne = new levels([
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
            "           --- --           ",
            "=====================     ====",
            "=====================     ====",
            "=====================     ====",
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    ])

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

//guardian movement
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
        munchieguardianState = "idle";
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
        munchieguardianState = "moving"
    })

    onKeyDown(["a", "left"], () => {
        munchieguardian.move(-munchieguardian.speed, 0);
        munchieguardian.scale = vec2(-0.25, 0.25);
        munchieguardianDirection = LEFT;
        munchieguardianState = "moving";
    }) //move controls
    
    onUpdate(() => {
        munchieguardian.pos.x = clamp(munchieguardian.pos.x, -15, 1980);
    }) //clamp munchieguardian position

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
        wait(1, () => {
            munchieguardianState = "idle";
        })
    })//dash over

    // onUpdate(() => {
    //     debug.log(munchieguardianState);
    // })

    onCollide("munchieguardian", "spike", () => {
        shake(7);
        wait(0.05, () => {
            go("floor2");
        })
    })

    class collidingBox {
        constructor(boxX, boxY, boxTag) {
            this.obj = add([
                rect(72, 72),
                pos(boxX, boxY),
                area(),
                body(),
                color(175, 80, 30),
                boxTag,                
            ])
        }
    } //make new box

    function addInteractiveSign(playerTag, interactiveObjectTag, interactiveItemX, interactiveItemY) {
        onCollide(playerTag, interactiveObjectTag, () => {
            add([
                sprite("Ebutton"),
                anchor("center"),
                pos(interactiveItemX + 100, interactiveItemY - 34),
                opacity(1),
                lifespan(1.5, {
                    fade: 0.5,
                })
            ]) //E key
            add([
                text("to interact"),
                pos(interactiveItemX + 150, interactiveItemY - 50),
                opacity(1),
                lifespan(1.5, {
                    fade: 0.5,
                })                
            ]) //E to interact text
        })
    }

    let munchieguardianGun;

    if (isGunUnlocked == false) {
        const gunBox = new collidingBox(300, 300, "gunBox");

        onCollide("munchieguardian", "gunBox", () => {
            onClick(() => {
                if(isGunUnlocked == false) {
                    const gunLoot = add([
                        rect(80, 64),
                        pos(gunBox.obj.pos),
                        color(255, 255, 255),
                        scale(1),
                        anchor("center"),
                        area(),
                        body(),
                        "gunLoot",
                    ])            
                    destroyAll("gunBox");
                    munchieguardianState = "attacking";
                    wait(0.5, () => {
                        munchieguardianState = "idle";
                    }) 
                    const destroyedBoxParticleEmitter = add([
                        pos(gunLoot.pos.x, gunLoot.pos.y),
                        particles({
                            max: 100,
                            scale: 3,
                            speed: [75, 100],
                            lifeTime: [0.75, 1.0],
                            opacities: [1.0, 0.0],
                            color: gunBox.color,
                        }, {
                            direction: -90,
                            spread: 45,
                        })
                    ])
                    destroyedBoxParticleEmitter.emit(40);
                    tween(vec2(0.2), vec2(1), 0.5, (v) => (gunLoot.scale = v), easings.easeOutElastic)
                    isGunUnlocked = true;
                    //do some destruction particles and then spawn a gun
                    addInteractiveSign("munchieguardian", "gunLoot", gunLoot.pos.x, gunLoot.pos.y);
                    onKeyPress("e", () => {
                        destroy(gunLoot);
                        wait(0.02, () => {
                            newDialogueBox(["munchieguardianBigSprite", "munchieguardianBigSprite", "munchieguardianBigSprite", "munchieguardianBigSprite"], ["Munchie Guardian", "Munchie Guardian", "Munchie Guardian", "null"], ["A gun...?", "Yo i'm scared... who left this here?", "Ok whatever we ball", "null"]);
                        })
                        //switch munchieguardian sprite
                        //add gun
                        munchieguardianGun = munchieguardian.add([
                            sprite("munchieguardian"),
                            anchor("left"),
                            pos(20, 20),
                            area(),
                            "munchieguardianGun"
                        ])
                    }) //e to pick up the gun (then the munchieguardian will switch sprites)
                }   
            })
        }) //munchieguardian can break the box on collide!
    }
    
    onClick(() => {
        if (isGunUnlocked == true) {
            let bulletDamage = 1;
            const bullet = add([
                sprite("bullet"),
                scale(0.1),
                pos(munchieguardian.pos.x + 100, munchieguardian.pos.y + 20),
                anchor("center"),
                area(),
                move(mousePos().sub(munchieguardian.pos).unit(), 1000),
                rotate(mousePos().angle(munchieguardian.pos)),
                "bullet",
            ]) //adds bullet on click
        }
    })


    function newDialogueBox(characterSprites, characterName, dialogue) {
        //all arguments are arrays
        let curText = 1;

        const charactersArray = characterSprites;
        const dialogueArray = dialogue;
        const characterNamesArray = characterName;

        const onscreenCharacterSprite = add([
            sprite("munchieguardianBigSprite"),
            pos(200, 200),
            layer("ui"),
        ])

        const dialogueBox = add([
            rect(width() - 200, 300),
            pos(width()/2, height() - 200),
            anchor("center"),
            layer("ui"),
        ]) 

        const dialogueText = dialogueBox.add([
            text(dialogueArray[curText - 1], {
                // font: ,
                size: 36,
                width: 1500,
            }),
            pos(-750, -40),
            color(10, 10, 100),
            layer("ui"),
        ])

        const dialogueCharacterName = add([
            text("Munchie Guardian", {
                // font: ,
                size: 40,
            }),
            pos(dialogueBox.pos.x - 750, dialogueBox.pos.y - 100),
            color(10, 10, 100),
            z(100),
            layer("ui"),
        ])

        onClick(() => {
            onscreenCharacterSprite.use(sprite(charactersArray[curText].toString()));
            dialogueCharacterName.text = characterNamesArray[curText];

            dialogueText.text = dialogueArray[curText];
            if (curText > dialogueArray.length - 2) {
                destroy(dialogueBox);
                destroy(dialogueText);
                destroy(dialogueCharacterName);
                destroy(onscreenCharacterSprite);
            } else {
                curText++;
            } 
        })
    }
}