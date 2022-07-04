# CYCLE 4 Room Generation v2

## Design

### Objectives

In Cycle 4 I wanted to make sure the room generation for corridors worked perfectly on both axes and that the floor for the junction class of room was working. To do this I added an optional part to the generateCorridor() function from Cycle 3 which rotated the parts of corridor 90°; this wasn't so simple though as I had to make sure the parts of the corridor lined up correctly in the z axis.

I also had to create the basis of the generateJunction() function which would allow me to create the floor generating element now; and then allow me in future cycles to work on the generation of the walls of junction.

* [ ] Add rotation to the generateCorridor() function.
* [ ] Test that it is working with multiple examples.
* [ ] Begin work on the generateJunction() function.

### Key Variables

| Variable Name      | Usage                                                          |
| ------------------ | -------------------------------------------------------------- |
| Corridor           | The class for storing all the elements in a corridor.          |
| room, room2, room3 | The variables used for testing that the rotation of corridors. |
| wallHeight         | The constant used to keep the height of walls the same.        |

### Pseudocode

```
function generateCorridor(size, colour, position, rotation) {
    floor = createCube(size, colour)
    floor.setPosition(position[0], position[1], position[2])
    
    wall1 = createCube(size[0], wallHeight, size[1], colour)
    wall2 = createCube(size[0], wallHeight, size[1], colour)
    
    wall1.setPosition(position[0], position[1], position[2])
    wall2.setPosition(position[0], position[1], position[2])
    
    corridor = new Corridor(floor, wall1, wall2)
    
    return corridor

}
```

## Development

I started by creating a degrees to radians function as THREE handles rotation in radians, however it was more intuitive for me to just rotate it 90 degrees. This meant I had to look up the formula for converting degrees to radians which in javascript is `degrees * (Math.PI / 180)`. I then added this to my exports.js file so I could import it into the main.js file.

I then experimented in the main file with just some basic rotations of the corridor I created in [CYCLE 3](cycle-3-room-generation.md), that lead to some of the images that can be seen below in the Challenges section. However once I had it working (I ended up making a better position solution which used the local position of the floor and its width to align it perfectly) I added it to the generateCorridor() function.&#x20;

This involved adding another element to the function when parsing it, so if it sees "z" input into it, it rotates the corridor 90 degrees onto the z axis and repositions the walls.

I also began work on the generateJunction() function, only the floor for now as I would have to create a lot of walls if I was to fully make it in this cycle. This meant creating a new function and importing it: _---text about function here---_

### Challenges

One of the challenges I face was getting the corridor to rotate correctly, with earlier attempts being out of alignment or further ahead/behind on the z axis. I was able to overcome this effectively by trial and error which also allowed me to come up with a solution that would work for all corridor shapes and sizes.

![When initially just rotating, the walls would rotate inside each other.](<../.gitbook/assets/image (5).png>)

![After some experimenting I managed to get one wall lined up.](<../.gitbook/assets/image (3).png>)
