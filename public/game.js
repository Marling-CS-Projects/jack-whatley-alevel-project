kaboom({

    width: 1280,
    height: 720,
    background: [0,0,225],

});

loadSprite("floor", "sprites/floor.png");

const LEVELS = [

    [

        "====================",
        "====================",
        "===================="

    ]

]

const levelConf = {

    width: 16,
    height: 16,
    pos: vec2(0,0),

    "=": () => [

        sprite("floor"),
        area(),
        solid(),
        origin("bot")

    ]

}

scene("game", (levelNumber = 0) => {

    const level = addLevel(LEVELS[levelNumber], levelConf);

});

go("game");