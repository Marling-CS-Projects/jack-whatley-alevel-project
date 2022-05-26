kaboom({

    scale: 1,
    background: [108, 117, 125],

});

function addButton(name, x, y, f) {

	const btn = add([
		sprite(name),
		pos(width() * x, height() * y),
		scale(4),
		origin("center"),
	])

	btn.onClick(f)

}

loadSprite("floor", "sprites/floor.png");
loadSprite("corridor", "sprites/corridor.png");
loadSprite("corridor90", "sprites/corridor90.png");
loadSprite("connector", "sprites/connector.png");

const left = 0.376;
const right = 0.624;
const heights = [0.801, 0.681, 0.56, 0.451, 0.33, 0.21]

scene("map-menu", () => {
    
    add([
        pos(width() * 0.5, height() * 0.5),
        rect(700, 700),
        origin("center"),
        outline(3),
        color(2, 62, 125)
    
    ])

    addButton("corridor", 0.5, heights[0], () => debug.log("among us"))

    /*const entrance = add([

        sprite("corridor"),
        pos(width() * 0.5, height() * heights[0]),
        scale(4),
        origin("center")
        

    ])*/

    const connector = add([

        sprite("connector"),
        pos(width() * 0.5, height() * heights[1]),
        scale(4),
        origin("center")

    ])

    const left90 = add([

        sprite("corridor90"),
        pos(width() * 0.438, height() * heights[1]),
        scale(4),
        origin("center")

    ])

    const right90 = add([

        sprite("corridor90"),
        pos(width() * 0.562, height() * heights[1]),
        scale(4),
        origin("center")

    ])

    const connectorL = add([

        sprite("connector"),
        pos(width() * left, height() * heights[1]),
        scale(4),
        origin("center")

    ])

    const connectorR = add([

        sprite("connector"),
        pos(width() * right, height() * heights[1]),
        scale(4),
        origin("center")

    ])

    const left1 = add([

        sprite("corridor"),
        pos(width() * left, height() * heights[2]),
        scale(4),
        origin("center")

    ])

    const right1 = add([

        sprite("corridor"),
        pos(width() * right, height() * heights[2]),
        scale(4),
        origin("center")

    ])

    const connectorL1 = add([

        sprite("connector"),
        pos(width() * left, height() * heights[3]),
        scale(4),
        origin("center")

    ])

    const connectorR1 = add([

        sprite("connector"),
        pos(width() * right, height() * heights[3]),
        scale(4),
        origin("center")

    ])

    const left2 = add([

        sprite("corridor"),
        pos(width() * left, height() * heights[4]),
        scale(4),
        origin("center")

    ])

    const right2 = add([

        sprite("corridor"),
        pos(width() * right, height() * heights[4]),
        scale(4),
        origin("center")

    ])

    const connectorL2 = add([

        sprite("connector"),
        pos(width() * left, height() * heights[5]),
        scale(4),
        origin("center")

    ])

    const connectorR2 = add([

        sprite("connector"),
        pos(width() * right, height() * heights[5]),
        scale(4),
        origin("center")

    ])

});

scene("test-menu", () => {

    add([
        pos(width() * 0.5, height() * 0.5),
        rect(700, 700),
        origin("center"),
        outline(3),
        color(2, 62, 125)
    
    ])

})

go("map-menu");