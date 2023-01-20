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

To create the room scanner: I first started by making the UI, this involved mostly HTML and then I would switch the classes of the div element, depending on whether it was occupied or not. I also made the scanner so it only detects when it is in the junction (square) rooms. Furthermore, to make it so the scanner can only be used every two turns I added a turn counter to the view turn class.

{% tabs %}
{% tab title="game.html" %}
Part of the game.html file, the CSS used will be included inside the complete code section as it is too long.

{% code overflow="wrap" lineNumbers="true" %}
```html
<!-- part of the body tag -->
<body>
    <div class="scan-ui">
        <p class="scan-title">Enemy Scanner</p>
        <div class="scan-container">
            <!-- the scanning ui is made of a reusable blocks -->
            <div class="row-1">
                <div class="junction-element" id="row-1-1"></div>
                <div class="spacer"></div>
                <div class="corridor-element" id="row-1-2"></div>
                <div class="spacer"></div>
                <div class="junction-element" id="row-1-3"></div>
                <div class="spacer"></div>
                <div class="corridor-element" id="row-1-4"></div>
                <div class="spacer"></div>
                <div class="corridor-element" id="row-1-5"></div>
                <div class="spacer"></div>
                <div class="junction-element" id="row-1-6"></div>
            </div>
            <div class="row-2">
                <div class="vertical-corridor-element" id="row-2-1"></div>
                <div class="spacer"></div>
                <div class="invisible-junction-element"></div>
                <div class="spacer"></div>
                <div class="vertical-corridor-element" id="row-2-2"></div>
            </div>
            <div class="row-3">
                <div class="junction-element" id="row-3-1"></div>
                <div class="spacer"></div>
                <div class="corridor-element" id="row-3-2"></div>
                <div class="spacer"></div>
                <div class="junction-element" id="row-3-3"></div>
            </div>
            <div class="row-4">
                <p class="turn-counter" id="turn-counter">
                    Turns till next scan
                    <!-- the used font does not support : or - -->
                    <span class="font-change"> :- </span>
                    <span class="glitch-text" id="turn-count">0</span>
                </p>
                <button class="scan" id="scan-button">Scan</button>
            </div>
        </div>
    </div>
</body>
```
{% endcode %}
{% endtab %}

{% tab title="game.js" %}
Part of the game.js file.

{% code overflow="wrap" lineNumbers="true" %}
```javascript
// this function runs every time the "scan" button is pressed
scanButton.addEventListener("click", () => {
    // viewTurn.count % 2 === 0 checks if the number is even
    // otherwise the function won't run
    if (viewTurn.count % 2 === 0) {
        // this if statement checks for all the possible rooms
        // that the enemy can be in
        if (enemy.room.link.name == "lowerLeftJunction") {
            document.getElementById("row-3-1").classList.add("enemy");
            document.getElementById("row-3-3").classList.remove("enemy");
            document.getElementById("row-1-1").classList.remove("enemy");
            document.getElementById("row-1-3").classList.remove("enemy");
        } else if (enemy.room.link.name == "lowerMiddleJunction") {
            document.getElementById("row-3-3").classList.add("enemy");
            document.getElementById("row-3-1").classList.remove("enemy");
            document.getElementById("row-1-1").classList.remove("enemy");
            document.getElementById("row-1-3").classList.remove("enemy");
        } else if (enemy.room.link.name == "topLeftJunction") {
            document.getElementById("row-1-1").classList.add("enemy");
            document.getElementById("row-3-3").classList.remove("enemy");
            document.getElementById("row-3-1").classList.remove("enemy");
            document.getElementById("row-1-3").classList.remove("enemy");
        } else if (enemy.room.link.name == "spawnJunction") {
            document.getElementById("row-1-3").classList.add("enemy");
            document.getElementById("row-3-1").classList.remove("enemy");
            document.getElementById("row-3-3").classList.remove("enemy");
            document.getElementById("row-1-1").classList.remove("enemy");
        } else {
            return;
        }
    } else {
        return;
    }
});

/// Part of animate function
// this updates the tracker for how many turns until the scan will work
function animate() {
    document.getElementById("turn-count").innerHTML = viewTurn.count % 2;
}
```
{% endcode %}
{% endtab %}

{% tab title="turn.js" %}
Part of the turn.js file.

{% code overflow="wrap" lineNumbers="true" %}
```javascript
class ViewTurn {
    constructor(turn, count) {
        this.turn = turn;
        this.count = count;

    }
    // true = viewing; false = moving
    initialise() {
        this.turn = true;
        this.count = 0;

    }
    // run this function every turn
    iterate() {
        this.count++;
        
    }
}
```
{% endcode %}


{% endtab %}
{% endtabs %}

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption><p>The scanner UI from the code above, showing where the enemy is.</p></figcaption></figure>

I also wanted to add a turn counter to let the player know how long they had survived and also so they could compare to other people and see how well they were doing. This involved reusing some of the CSS above to make a similar style display; I also needed to make use of the count part of the view class that I had created earlier.

{% tabs %}
{% tab title="game.html" %}
Part of the game.html file, the CSS used will be included inside the complete code section as it is too long.

{% code overflow="wrap" lineNumbers="true" %}
```html
<!-- part of the body tag -->
<body>
    <div class="score-cont" id="score-board">
        <p class="scan-title">Score</p>
        <div class="score-body">
            <p class="score-text">
                <!-- using a span to represent variable -->
                <span id="score-count">0</span> turns survived
            </p>
        </div>
    </div>
</body>
```
{% endcode %}
{% endtab %}

{% tab title="game.js" %}
Part of the game.js file.

{% code overflow="wrap" lineNumbers="true" %}
```javascript
/// Part of the animate function
function animate() {
    // setting the text of the span = to the count part of the class
    document.getElementById("score-count").innerHTML = viewTurn.count;
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption><p>The Score UI from the code above.</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption><p>The full UI created in this part of the cycle.</p></figcaption></figure>

**Development Part 3:** UI CSS

For the last part of the Cycle I wanted to create a better looking version of the default UI that comes as part of THREE.js. This was important to keep the theme of the game; it also meant I could add an options menu and a help box popup.



## Testing

## Video Evidence
