# CYCLE 4 Room Generation v2

## Design

### Objectives

In Cycle 4 I wanted to make sure the room generation for corridors worked perfectly on both axes and that the floor for the junction class of room was working. To do this I added an optional part to the generateCorridor() function from Cycle 3 which rotated the parts of corridor 90°; this wasn't so simple though as I had to make sure the parts of the corridor lined up correctly in the z axis.

I also had to create the basis of the generateJunction() function which would allow me to create the floor generating element now; and then allow me in future cycles to work on the generation of the walls of junction.

* [ ] Add rotation to the generateCorridor() function.
* [ ] Test that it is working with multiple examples.
* [ ] Begin work on the generateJunction() function.

### Key Variables

| Variable Name | Usage |
| ------------- | ----- |
|               |       |
|               |       |
|               |       |

### Pseudocode

```
```

## Development



### Challenges

One of the challenges I face was getting the corridor to rotate correctly, with earlier attempts being out of alignment or further ahead/behind on the z axis. I was able to overcome this effectively by trial and error which also allowed me to come up with a solution that would work for all corridor shapes and sizes.

![When initially just rotating, the walls would rotate inside each other.](<../.gitbook/assets/image (5).png>)

![After some experimenting I managed to get one wall lined up.](<../.gitbook/assets/image (3).png>)
