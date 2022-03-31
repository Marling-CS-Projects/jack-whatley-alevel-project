kaboom({

    scale: 1,
    background: [0,0,0],

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
        outline(5, (255, 0, 0)),
    
    ])

    add([

        text("Systems:", {
            size: 20,

        }),
        pos(width() * 0.01, height() * 0.08),

    ])

});

go("game");