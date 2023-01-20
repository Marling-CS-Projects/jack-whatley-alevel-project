# CYCLE 10 Bonus Patch

## Design

### Objectives

Cycle 10 is a bonus patch to add more features to the game and make the UI better to give the game a more polished feel. In this patch it will be important to come up with a theme and look for the game, as well as improve all the UI.

* [x] Make Room Scanner.
* [x] Make Room Scanner have a cooldown.
* [x] Make enemy only visible when close to player.
* [x] Make turn counter.
* [x] Customise control menu CSS.

### Key Variables

| Variable Name | Usage |
| ------------- | ----- |
|               |       |
|               |       |

## Development

**Development Part 1:** Enemy Visibility

The easiest way to make the enemy only visible when in the adjacent rooms was to create a flat donut shape that follows the player around. This works because it only allows the camera to see a small section of the map. To make this shape I used a `THREE.LatheGeometry` and a custom set of coordinates to build a shape.

<pre class="language-javascript" data-title="game.js [part of]" data-overflow="wrap" data-line-numbers><code class="lang-javascript"><strong>// shape coordinates
</strong><strong>let points = [
</strong>    new THREE.Vector3(10,0,80), //top left
    new THREE.Vector3(25,0,50), //top right
    new THREE.Vector3(25,0,-50), //bottom right
    new THREE.Vector3(10,0,-50), //bottom left
    new THREE.Vector3(10,0,50) //back to top left - close square path
]

// creating mesh from points
let mesh = new THREE.Mesh( new THREE.LatheGeometry(points), new THREE.MeshLambertMaterial({color: 0x000000}) )
mesh.position.set(0,5,0);

// adding mesh to map screen
MapView.add(mesh);
</code></pre>

I also had to make sure that the shape would follow the player around when they moved, to do this I added a line into the animate function (that runs every frame). This function updates the position of the shape relative to that of the player.

{% code title="game.js [part of]" overflow="wrap" lineNumbers="true" %}
```javascript
function animate() {
    // setting mesh (shape) position to that of character class
    mesh.position.set(
        character.mesh[0].position.x, 
        5, 
        character.mesh[0].position.z);
}

// running function every frame
animate()
```
{% endcode %}

In the pictures below I have edited the colour of the shape to make it more visible, however the normal colour is black.

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption><p>Demonstration of the shape placed over the map, as viewed from the free camera.</p></figcaption></figure>

{% embed url="https://youtu.be/BoCx1MvfcUU" %}
Demonstration of how the enemy cover looks in game, except the colour is changed for easier viewing.
{% endembed %}

**Development Part 2:** Room Scanner + Turn Counter

**Development Part 3:** UI CSS

## Testing

## Video Evidence
