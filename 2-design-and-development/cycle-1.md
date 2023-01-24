# CYCLE 0 Server Setup

## Design

### Objectives

In Cycle 0 I wanted to make sure that the game was able to be run from my own computer which involved setting up a server with Express.js and also a HTML file for the Kaboom.js canvas.

* [x] Setup an Express.js server
* [x] Post a HTML file with Express
* [x] Setup a basic menu structure
* [x] Created a basic Kaboom Canvas to work with

### Usability Features

### Key Variables

| Variable Name | Usage                                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| app           | Holds the functionality of the express library and is how I can create a server.    |
| path          | Allows me to work with directories for express to send a HTML file from the server. |

### Pseudocode

```
import server
port = 5000

server.send(public)

server.host(
    server.send(index.html)
)

server.listen(port)
```

## Development

### Outcome

In the server.js file I have created a server that allows me to send my HTML file (containing the game canvas) to the user. I setup a basic menu structure as the first page the user comes to which at the moment when new game is pressed it takes them to the game, I can also go directly to the canvas whilst developing by going to localhost:5000/game.html. I have also created the kaboom canvas with a basic colour so that I can see it is working.

```
File Structure:
|- 📁 Node Modules
|- 📁 Public
    |- favicon.ico
    |- game.html
    |- game.js
    |- style.css
|- index.html
|- package.json
|- readme.md
|- server.js
```

{% tabs %}
{% tab title="server.js" %}
```javascript
const express = require("express");
const app = express();

// allows access to public folder
app.use(express.static("public"));

// sets up default route: localhost:5000/
app.get("/", (req, res) => {
    // redirects user to menu
    res.redirect("/menu");

});

// sets up menu route: localhost:5000/menu
app.get("/menu", (req, res) => {
    // sends html file to user
    res.sendFile(__dirname + "/index.html");

});

// sets up game route: localhost:5000/game
app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/public/game.html");

});

// starts server listening for requests
app.listen(5000);
```
{% endtab %}

{% tab title="index.html" %}
```html
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Kaboom Game</title>

        <link rel="stylesheet" href="./style.css">

    </head>

    <body>

        <div class="container">

            <h1 class="game-title">Untitled Game</h1>

            <div class="button-container">

                <button class="menu-button" id="new-button" onclick="window.location.href='./game.html'">New Game</button>
                <button class="menu-button" id="load-button">Load Game</button>
                <button class="menu-button" id="options-button">Options</button>

            </div>

        </div>

        <div class="options-menu hidden" id="option-menu">

            <h1 id="close-options">╳</h1>

            <h1 class="game-title">Options Menu</h1>

        </div>

        <script type="text/javascript">

            const oButton = document.getElementById("options-button");
            const oMenu = document.getElementById("option-menu");
            const oClose = document.getElementById("close-options");

            oButton.addEventListener("click", () => {

                oMenu.classList.remove("hidden");

            });

            oClose.addEventListener("click", () => {

                oMenu.classList.add("hidden");

            });

        </script>

    </body>

</html>
```
{% endtab %}

{% tab title="game.html" %}
```html
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Kaboom Game</title>

        <link rel="stylesheet" href="./style.css">

    </head>

    <body>

        <script src="https://unpkg.com/kaboom/dist/kaboom.js"></script>
        <script src="./game.js"></script>

    </body>

</html>
```
{% endtab %}

{% tab title="game.js" %}
```javascript
kaboom({ // kaboom is already imported in the html file

    // a basic kaboom canvas for testing
    width: 640,
    height: 480,
    background: [0,0,225],

})
```
{% endtab %}
{% endtabs %}

I have also used the npm package nodemon, this updates the server every time it detects a change in a javascript file. I have also setup the commands `npm install` to install all dependencies and `npm start` to make the command `npx nodemon server.js` much simpler.

### Challenges

When I was programming this project I had a number of errors, first of all was trying to use the kaboom.js CDN to load it, rather than trying to install it as an npm module. However it was struggling to get it to work as I kept seeing the error below, however it was because of the school internet blocking the kaboom CDN. So I discovered I have to use my mobile hotspot for development.

![The School WIFI did not authorise my connection to the Kaboom CDN.](<../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1).png>)

Another error I had was when I tried to link to another file, but I was met with a 404 error (as seen below), this was because the server was not sending the other files to the user on connection. This was fixed by adding the `app.use(express.static("public"));` this means that everything in the public folder is sent to the user and that I can now link to it.

![I was getting a 404 error every time before I knew about sending static files.](<../.gitbook/assets/image (1) (1) (1) (1) (1).png>)

## Testing

For Cycle 0 the elements I needed to test were: is the server working, can I make a connection; is the menu functioning, can I browse it without errors; is the canvas displaying, is the kaboom code working.

### Tests

| Test | Instructions           | What I expect                                                                                   | What happened                                                                                         | Pass/Fail |
| ---- | ---------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------- |
| 1    | Run the server.        | The server should start without error and I should be able to connect                           | The server started without error and connecting to localhost works.                                   | Pass      |
| 2    | Browse the menus.      | The menu buttons should work without error and the new game button should take me to the canvas | The menu is browsable but the load game button doesn't work as it hasn't been implemented yet         | Pass      |
| 3    | View the Kaboom Canvas | I should be able to press the new game button and it will redirect me to the kaboom page.       | It redirects me to the kaboom page and I can view the kaboom canvas with the colour I have set for it | Pass      |

### Evidence

![Image example of me running the express server.](<../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1).png>)

![My games placeholder main menu.](<../.gitbook/assets/image (2) (3).png>)
