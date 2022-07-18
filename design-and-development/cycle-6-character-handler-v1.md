# CYCLE 6 Character Handler v1

## Design

### Objectives

In Cycle 6 I wanted to create a basic character handling system, using classes, so that in the next few cycles I can work on characters and gameplay. This also meant that I needed to create a test map so that I can have something to work with as I am programming in the gameplay.

The basic character handler will involve using classes and also a function at the end of the game.js file to make sure that their position is updated every frame. However I will also need to implement a system that makes it consistent as I do not want the game to run slower or faster on different frame rates as it currently does now.

There will also be a top down camera mode which will lock the OrbitControls and camera position which will be switchable using the GUI.

**Update:** I also needed to have a way for clicks to be detected by the game; this meant I had to import an old library called THREEx. I also had to make sure it was working and update it if I could.

* [x] Create a test map.
* [x] Create a top down Camera.
* [x] **Update:** Import and test the method for detecting clicks on objects.
* [x] Create classes for characters.
* [ ] Create an update function at the end of game.js.

### Key Variables

| Variable Name | Usage                                                                                 |
| ------------- | ------------------------------------------------------------------------------------- |
| c1-c6         | The variables that store the corridors from the test map.                             |
| j1-j5         | The variables that store the junctions from the test map.                             |
| freecam       | The variable used to store the boolean for if the free camera mode is enabled or not. |

### Pseudocode

```
```

## Development

For this section I will be breaking down the development into multiple parts as there are a number of separate elements which I have to create.

**Development Part 1:** Creating The Map & Camera

To start with I began by making the map; for now it will be basic and created with a number of variables. These are listed above: c1-c6 and j1-j5. This will allow me to create a simple map and also focus on other things such as adding a locked camera.

To add the locked camera I had to add two functions to the GUI which when activated move the cameras position and where it is looking, it also disables OrbitControls. Then when pressing free cam this creates the opposite effect.

I also removed the bit of code that meant the background was a blue colour as with all the new terrain, because it was a solid colour, it was causing performance issues.

{% tabs %}
{% tab title="Map Code" %}
```javascript
const spawnJunction = generateJunction([10, 1, 10], 0xffffff, [0, 0, 0]);
spawnJunction.add(scene);

const c1 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [10, 0, 0]);
c1.add(scene);

const c2 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 0]);
c2.add(scene);

const j1 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 0]);
j1.add(scene);

const c3 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [20, 0, 0]);
c3.add(scene);

const c4 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [0, 0, 10], "z");
c4.add(scene);

const c5 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-20, 0, 10], "z");
c5.add(scene);

const j2 = generateJunction([10, 1, 10], 0xffffff, [-20, 0, 20]);
j2.add(scene);

const c6 = generateCorridor([10, 1, 10 / 3 + 2], 0xff11ff, [-10, 0, 20]);
c6.add(scene);

const j3 = generateJunction([10, 1, 10], 0xffffff, [0, 0, 20]);
j3.add(scene);

const j4 = generateJunction([10, 1, 10], 0xffffff, [30, 0, 0]);
j4.add(scene);
```
{% endtab %}

{% tab title="Camera Code" %}
```javascript
function createPanel() {

    const panel = new GUI( { width: 310 } );

    const helpFolder = panel.addFolder( "Help" );
    const settingFolder = panel.addFolder( "Settings" );

    let settings = {

        "Use the show stats button to see stats.": "SIUUUUUUUUUUUUU",
        "Show Stats": function() {

            document.body.appendChild( stats.dom );

        },
        "Lock Camera": function() {

            camera.position.set(-10, 40, 10);
            camera.lookAt(-10, 0, 10);
            freecam = false;

        },
        "Free Camera": function() {

            camera.position.set(moveableCube.position.x - 5, moveableCube.position.y + 5, moveableCube.position.z);
            camera.lookAt(moveableCube.position);
            freecam = true;

        }

    }

    helpFolder.add( settings, "Use the show stats button to see stats." );
    settingFolder.add( settings, "Show Stats" );
    settingFolder.add( settings, "Lock Camera" );
    settingFolder.add( settings, "Free Camera" );

    helpFolder.close();
    settingFolder.open();

}

createPanel();
```
{% endtab %}
{% endtabs %}

![The test map that I have created.](<../.gitbook/assets/image (11).png>)

![The locked camera mode, with all the controls disabled.](<../.gitbook/assets/image (4).png>)

**Development Part 2:** Object Click Detection

To begin I began researching how to do this: I found a number of solutions including using ray casting and click detection at the same time. However this would be hard to implement as the camera is fixed and objects are near to each other. Luckily I managed to find an older library (2013) that would do this for me called THREEx.DomEvents.

However it did take a bit of setting up: first I had to actually download the module rather than using NPM; I also had to import it through exports.js, however I had to edit the file to import THREE into it and also to add an `export { THREEx }` as it wasn't actually exporting anything.

Once I had managed to import it without any errors I had to play around to get it working; at first I tried just applying it to a whole class however it would throw an error every time I clicked. Due to this I had to apply it to the floor of the class. This means that the player can only click on the floor to trigger an event; however I will eventually be adding a separate scene for a top down map and then having the camera moved to the room once clicked on.

{% tabs %}
{% tab title="domevent (game.js)" %}
This part only shows the bits used for the domevent, not the whole file.

```javascript
import { THREEx } from "./exports.js";

let domEvent = new THREEx.DomEvents( camera, renderer.domElement );

domEvent.addEventListener(spawnJunction.components[0], "click", (e) => {

    alert("Test");

});
```
{% endtab %}

{% tab title="exports.js" %}
```javascript
export { OrbitControls } from "/examples/jsm/controls/OrbitControls.js";
export { GLTFLoader } from "/examples/jsm/loaders/GLTFLoader.js";
export { EffectComposer } from "/examples/jsm/postprocessing/EffectComposer.js";
export { RenderPass } from "/examples/jsm/postprocessing/RenderPass.js";
export { ShaderPass } from "/examples/jsm/postprocessing/ShaderPass.js";
export { GlitchPass } from "/examples/jsm/postprocessing/GlitchPass.js";
export { UnrealBloomPass } from "/examples/jsm/postprocessing/UnrealBloomPass.js";
export { GUI } from '/examples/jsm/libs/lil-gui.module.min.js';

export { createCube } from "/scripts/createCube.js";
export { generateCorridor, generateJunction } from "/scripts/generateRoom.js";
export { Corridor, Junction } from "/scripts/roomClass.js";
export { degToRad } from "/scripts/degToRad.js";
export { Enemy } from "/scripts/characterClasses.js";

export { THREEx } from "/threex-domevents/threex.domevents.js";
```
{% endtab %}

{% tab title="threex.domevents.js" %}
Warning long file.

```javascript
import * as THREE from "three"; // added by me

/** @namespace */
var THREEx		= THREEx 		|| {};

// # Constructor
THREEx.DomEvents	= function(camera, domElement)
{
	this._camera	= camera || null;
	this._domElement= domElement || document;
	this._raycaster = new THREE.Raycaster();
	this._selected	= null;
	this._boundObjs	= {};
	// Bind dom event for mouse and touch
	var _this	= this;

	this._$onClick		= function(){ _this._onClick.apply(_this, arguments);		};
	this._$onDblClick	= function(){ _this._onDblClick.apply(_this, arguments);	};
	this._$onMouseMove	= function(){ _this._onMouseMove.apply(_this, arguments);	};
	this._$onMouseDown	= function(){ _this._onMouseDown.apply(_this, arguments);	};
	this._$onMouseUp	= function(){ _this._onMouseUp.apply(_this, arguments);		};
	this._$onTouchMove	= function(){ _this._onTouchMove.apply(_this, arguments);	};
	this._$onTouchStart	= function(){ _this._onTouchStart.apply(_this, arguments);	};
	this._$onTouchEnd	= function(){ _this._onTouchEnd.apply(_this, arguments);	};
	this._$onContextmenu	= function(){ _this._onContextmenu.apply(_this, arguments);	};
	this._domElement.addEventListener( 'click'	, this._$onClick	, false );
	this._domElement.addEventListener( 'dblclick'	, this._$onDblClick	, false );
	this._domElement.addEventListener( 'mousemove'	, this._$onMouseMove	, false );
	this._domElement.addEventListener( 'mousedown'	, this._$onMouseDown	, false );
	this._domElement.addEventListener( 'mouseup'	, this._$onMouseUp	, false );
	this._domElement.addEventListener( 'touchmove'	, this._$onTouchMove	, false );
	this._domElement.addEventListener( 'touchstart'	, this._$onTouchStart	, false );
	this._domElement.addEventListener( 'touchend'	, this._$onTouchEnd	, false );
	this._domElement.addEventListener( 'contextmenu', this._$onContextmenu	, false );
	
}

// # Destructor
THREEx.DomEvents.prototype.destroy	= function()
{
	// unBind dom event for mouse and touch
	this._domElement.removeEventListener( 'click'		, this._$onClick	, false );
	this._domElement.removeEventListener( 'dblclick'	, this._$onDblClick	, false );
	this._domElement.removeEventListener( 'mousemove'	, this._$onMouseMove	, false );
	this._domElement.removeEventListener( 'mousedown'	, this._$onMouseDown	, false );
	this._domElement.removeEventListener( 'mouseup'		, this._$onMouseUp	, false );
	this._domElement.removeEventListener( 'touchmove'	, this._$onTouchMove	, false );
	this._domElement.removeEventListener( 'touchstart'	, this._$onTouchStart	, false );
	this._domElement.removeEventListener( 'touchend'	, this._$onTouchEnd	, false );
	this._domElement.removeEventListener( 'contextmenu'	, this._$onContextmenu	, false );
}

THREEx.DomEvents.eventNames	= [
	"click",
	"dblclick",
	"mouseover",
	"mouseout",
	"mousemove",
	"mousedown",
	"mouseup",
	"contextmenu",
	"touchstart",
	"touchend"
];

THREEx.DomEvents.prototype._getRelativeMouseXY	= function(domEvent){
	var element = domEvent.target || domEvent.srcElement;
	if (element.nodeType === 3) {
		element = element.parentNode; // Safari fix -- see http://www.quirksmode.org/js/events_properties.html
	}
	
	//get the real position of an element relative to the page starting point (0, 0)
	//credits go to brainjam on answering http://stackoverflow.com/questions/5755312/getting-mouse-position-relative-to-content-area-of-an-element
	var elPosition	= { x : 0 , y : 0};
	var tmpElement	= element;
	//store padding
	var style	= getComputedStyle(tmpElement, null);
	elPosition.y += parseInt(style.getPropertyValue("padding-top"), 10);
	elPosition.x += parseInt(style.getPropertyValue("padding-left"), 10);
	//add positions
	do {
		elPosition.x	+= tmpElement.offsetLeft;
		elPosition.y	+= tmpElement.offsetTop;
		style		= getComputedStyle(tmpElement, null);

		elPosition.x	+= parseInt(style.getPropertyValue("border-left-width"), 10);
		elPosition.y	+= parseInt(style.getPropertyValue("border-top-width"), 10);
	} while(tmpElement = tmpElement.offsetParent);
	
	var elDimension	= {
		width	: (element === window) ? window.innerWidth	: element.offsetWidth,
		height	: (element === window) ? window.innerHeight	: element.offsetHeight
	};
	
	return {
		x : +((domEvent.pageX - elPosition.x) / elDimension.width ) * 2 - 1,
		y : -((domEvent.pageY - elPosition.y) / elDimension.height) * 2 + 1
	};
};


/********************************************************************************/
/*		domevent context						*/
/********************************************************************************/

// handle domevent context in object3d instance

THREEx.DomEvents.prototype._objectCtxInit	= function(object3d){
	object3d._3xDomEvent = {};
}
THREEx.DomEvents.prototype._objectCtxDeinit	= function(object3d){
	delete object3d._3xDomEvent;
}
THREEx.DomEvents.prototype._objectCtxIsInit	= function(object3d){
	return object3d._3xDomEvent ? true : false;
}
THREEx.DomEvents.prototype._objectCtxGet		= function(object3d){
	return object3d._3xDomEvent;
}

/********************************************************************************/
/*										*/
/********************************************************************************/

/**
 * Getter/Setter for camera
*/
THREEx.DomEvents.prototype.camera	= function(value)
{
	if( value )	this._camera	= value;
	return this._camera;
}

THREEx.DomEvents.prototype.bind	= function(object3d, eventName, callback, useCapture)
{
	console.assert( THREEx.DomEvents.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);
	var objectCtx	= this._objectCtxGet(object3d);	
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	objectCtx[eventName+'Handlers'].push({
		callback	: callback,
		useCapture	: useCapture
	});
	
	// add this object in this._boundObjs
	if( this._boundObjs[eventName] === undefined ){
		this._boundObjs[eventName]	= [];	
	}
	this._boundObjs[eventName].push(object3d);
}
THREEx.DomEvents.prototype.addEventListener	= THREEx.DomEvents.prototype.bind

THREEx.DomEvents.prototype.unbind	= function(object3d, eventName, callback, useCapture)
{
	console.assert( THREEx.DomEvents.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);

	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		if( callback != handler.callback )	continue;
		if( useCapture != handler.useCapture )	continue;
		handlers.splice(i, 1)
		break;
	}
	// from this object from this._boundObjs
	var index	= this._boundObjs[eventName].indexOf(object3d);
	console.assert( index !== -1 );
	this._boundObjs[eventName].splice(index, 1);
}
THREEx.DomEvents.prototype.removeEventListener	= THREEx.DomEvents.prototype.unbind

THREEx.DomEvents.prototype._bound	= function(eventName, object3d)
{
	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx )	return false;
	return objectCtx[eventName+'Handlers'] ? true : false;
}

/********************************************************************************/
/*		onMove								*/
/********************************************************************************/

// # handle mousemove kind of events

THREEx.DomEvents.prototype._onMove	= function(eventName, mouseX, mouseY, origDomEvent)
{
//console.log('eventName', eventName, 'boundObjs', this._boundObjs[eventName])
	// get objects bound to this event
	var boundObjs	= this._boundObjs[eventName];
	if( boundObjs === undefined || boundObjs.length === 0 )	return;
	// compute the intersection
	var vector = new THREE.Vector2();

	// update the picking ray with the camera and mouse position
	vector.set( mouseX, mouseY );
	this._raycaster.setFromCamera( vector, this._camera );	

	var intersects = this._raycaster.intersectObjects( boundObjs );

	var oldSelected	= this._selected;
	
	if( intersects.length > 0 ){
		var notifyOver, notifyOut, notifyMove;
		var intersect	= intersects[ 0 ];
		var newSelected	= intersect.object;
		this._selected	= newSelected;
		// if newSelected bound mousemove, notify it
		notifyMove	= this._bound('mousemove', newSelected);

		if( oldSelected != newSelected ){
			// if newSelected bound mouseenter, notify it
			notifyOver	= this._bound('mouseover', newSelected);
			// if there is a oldSelect and oldSelected bound mouseleave, notify it
			notifyOut	= oldSelected && this._bound('mouseout', oldSelected);
		}
	}else{
		// if there is a oldSelect and oldSelected bound mouseleave, notify it
		notifyOut	= oldSelected && this._bound('mouseout', oldSelected);
		this._selected	= null;
	}


	// notify mouseMove - done at the end with a copy of the list to allow callback to remove handlers
	notifyMove && this._notify('mousemove', newSelected, origDomEvent, intersect);
	// notify mouseEnter - done at the end with a copy of the list to allow callback to remove handlers
	notifyOver && this._notify('mouseover', newSelected, origDomEvent, intersect);
	// notify mouseLeave - done at the end with a copy of the list to allow callback to remove handlers
	notifyOut  && this._notify('mouseout' , oldSelected, origDomEvent, intersect);
}


/********************************************************************************/
/*		onEvent								*/
/********************************************************************************/

// # handle click kind of events

THREEx.DomEvents.prototype._onEvent	= function(eventName, mouseX, mouseY, origDomEvent)
{
	//console.log('eventName', eventName, 'boundObjs', this._boundObjs[eventName])
	// get objects bound to this event
	var boundObjs	= this._boundObjs[eventName];
	if( boundObjs === undefined || boundObjs.length === 0 )	return;
	// compute the intersection
	var vector = new THREE.Vector2();

	// update the picking ray with the camera and mouse position
	vector.set( mouseX, mouseY );
	this._raycaster.setFromCamera( vector, this._camera );	

	var intersects = this._raycaster.intersectObjects( boundObjs, true);
	// if there are no intersections, return now
	if( intersects.length === 0 )	return;

	// init some variables
	var intersect	= intersects[0];
	var object3d	= intersect.object;
	var objectCtx	= this._objectCtxGet(object3d);
	var objectParent = object3d.parent;

	while ( typeof(objectCtx) == 'undefined' && objectParent )
	{
	    objectCtx = this._objectCtxGet(objectParent);
	    objectParent = objectParent.parent;
	}
	if( !objectCtx )	return;

	// notify handlers
	this._notify(eventName, object3d, origDomEvent, intersect);
}

THREEx.DomEvents.prototype._notify	= function(eventName, object3d, origDomEvent, intersect)
{
	var objectCtx	= this._objectCtxGet(object3d);
	var handlers	= objectCtx ? objectCtx[eventName+'Handlers'] : null;
	
	// parameter check
	console.assert(arguments.length === 4)

	// do bubbling
	if( !objectCtx || !handlers || handlers.length === 0 ){
		object3d.parent && this._notify(eventName, object3d.parent, origDomEvent, intersect);
		return;
	}
	
	// notify all handlers
	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		var toPropagate	= true;
		handler.callback({
			type		: eventName,
			target		: object3d,
			origDomEvent	: origDomEvent,
			intersect	: intersect,
			stopPropagation	: function(){
				toPropagate	= false;
			}
		});
		if( !toPropagate )	continue;
		// do bubbling
		if( handler.useCapture === false ){
			object3d.parent && this._notify(eventName, object3d.parent, origDomEvent, intersect);
		}
	}
}

/********************************************************************************/
/*		handle mouse events						*/
/********************************************************************************/
// # handle mouse events

THREEx.DomEvents.prototype._onMouseDown	= function(event){ return this._onMouseEvent('mousedown', event);	}
THREEx.DomEvents.prototype._onMouseUp	= function(event){ return this._onMouseEvent('mouseup'	, event);	}


THREEx.DomEvents.prototype._onMouseEvent	= function(eventName, domEvent)
{
	var mouseCoords = this._getRelativeMouseXY(domEvent);
	this._onEvent(eventName, mouseCoords.x, mouseCoords.y, domEvent);
}

THREEx.DomEvents.prototype._onMouseMove	= function(domEvent)
{
	var mouseCoords = this._getRelativeMouseXY(domEvent);
	this._onMove('mousemove', mouseCoords.x, mouseCoords.y, domEvent);
	this._onMove('mouseover', mouseCoords.x, mouseCoords.y, domEvent);
	this._onMove('mouseout' , mouseCoords.x, mouseCoords.y, domEvent);
}

THREEx.DomEvents.prototype._onClick		= function(event)
{
	// TODO handle touch ?
	this._onMouseEvent('click'	, event);
}
THREEx.DomEvents.prototype._onDblClick		= function(event)
{
	// TODO handle touch ?
	this._onMouseEvent('dblclick'	, event);
}

THREEx.DomEvents.prototype._onContextmenu	= function(event)
{
	//TODO don't have a clue about how this should work with touch..
	this._onMouseEvent('contextmenu'	, event);
}

/********************************************************************************/
/*		handle touch events						*/
/********************************************************************************/
// # handle touch events


THREEx.DomEvents.prototype._onTouchStart	= function(event){ return this._onTouchEvent('touchstart', event);	}
THREEx.DomEvents.prototype._onTouchEnd	= function(event){ return this._onTouchEvent('touchend'	, event);	}

THREEx.DomEvents.prototype._onTouchMove	= function(domEvent)
{
	if( domEvent.touches.length != 1 )	return undefined;

	domEvent.preventDefault();

	var mouseX	= +(domEvent.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(domEvent.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
	this._onMove('mousemove', mouseX, mouseY, domEvent);
	this._onMove('mouseover', mouseX, mouseY, domEvent);
	this._onMove('mouseout' , mouseX, mouseY, domEvent);
}

THREEx.DomEvents.prototype._onTouchEvent	= function(eventName, domEvent)
{
	if( domEvent.touches.length != 1 )	return undefined;

	domEvent.preventDefault();

	var mouseX	= +(domEvent.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(domEvent.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
	this._onEvent(eventName, mouseX, mouseY, domEvent);	
}

export { THREEx }; // also added by me
```
{% endtab %}
{% endtabs %}

```
Updated File Structure:
|- 📁 Node Modules
|- 📁 Public
    |- 📁 models
        |- boat.glb
    |- 📁 scripts
        |- createCube.js
        |- generateRoom.js
        |- degToRad.js
        |- roomClass.js
    |- 📁 threex-domevents
        |- threex.domevenents.js
    |- exports.js
    |- favicon.ico
    |- game.html
    |- game.js
    |- style.css
|- .gitignore
|- index.html
|- package-lock.json
|- package.json
|- readme.md
|- server.js
```

**Development Part 3:** Character Classes

Like for creating the room classes; I created a separate javascript file for the character and enemy classes as I have decided to use object orientated programming. Meaning that the functions for the characters and enemy will be contained within the respective classes. I also need to make sure there is an update function as I would like to be able to update the position every frame but also I need to balance this in a way that it doesn't cause performance issues.

To set the position of the character I made sure that each character and enemy is tied to a room and then that is used to set the position of the character. Meaning that it will be easy to have this working in the final game as I can run setPos to update the position of the character after they have changed room.

{% tabs %}
{% tab title="characters (game.js)" %}
Shown below is the code used to test out the character classes.

```javascript
const enemy = new Enemy(j4, createCube([1, 5, 1], 0xffff11));
enemy.setPos(scene);

const character = new Character(spawnJunction, createCube([1, 5, 1], 0xff1111));
character.setPos(scene);

// the create cube is used to act as a temporary character model
// the spawnJunction and j4 are rooms the character is assigned to
```
{% endtab %}

{% tab title="characterClasses.js" %}
```javascript
class Enemy {
    constructor(room, mesh) {
        this.room = room;
        this.mesh = mesh;

    }

    setPos(scene) {
        scene.add(this.mesh);
        this.mesh.position.set(this.room.components[0].position.x, this.room.components[0].position.y /*+ (this.mesh.height / 2)*/, this.room.components[0].position.z);

    }

}

class Character {
    constructor(room, mesh, inventory) {
        this.room = room;
        this.mesh = mesh;
        this.inventory = inventory;

    }

    setPos(scene) {
        scene.add(this.mesh);
        this.mesh.position.set(this.room.components[0].position.x, this.room.components[0].position.y /*+ (this.mesh.height / 2)*/, this.room.components[0].position.z);

    }

}

export { Enemy, Character }
```
{% endtab %}
{% endtabs %}

