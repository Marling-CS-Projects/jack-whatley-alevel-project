kaboom({

    scale: 1,
    background: [108, 117, 125],

});

loadSprite("floor", "sprites/floor.png");

const LEVELS = [

    [

        "",
        "================================================================================================="

    ]

]

const levelConf = {

    width: 16,
    height: 16,
    pos: vec2(0,0),

    "=": () => [

        sprite("floor"),
        area(),
        solid()

    ]

}

scene("game", () => {

    //const level = addLevel(LEVELS[levelNumber], levelConf);
    
    add([
        pos(width() * 0.5, height() * 0.5),
        rect(700, 700),
        origin("center"),
        outline(3),
        color(2, 62, 125)
    
    ])

    const mapButton = add([

        text("Map", {
            size: 20,

        }),
        pos(width() * 0.30, height() * 0.1),
        origin("center")

    ])
    
    const sysButton = add([

        text("Systems", {
            size: 20,

        }),
        pos(width() * 0.35, height() * 0.1),
        origin("center")

    ])

    const crewButton = add([

        text("Crew", {
            size: 20,

        }),
        pos(width() * 0.40, height() * 0.1),
        origin("center")

    ])

});

go("game");