# style.css

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

body {

    margin: 0px;
    padding: 0px;

}

.container {

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    background: #14213d;
    font-family: 'Roboto Condensed', sans-serif;

}

.game-title {

    margin: 0px;

    width: max-content;
    height: min-content;

    position: relative;
    top: 20%;
    left: 20%;

    color: white;
    font-size: 5em;

}

.button-container {

    margin: 0px;

    width: max-content;
    height: max-content;

    position: relative;
    top: 40%;
    left: 20%;

}

.menu-button {

    width: 8em;
    height: 4em;

    margin-right: 1em;

}

.options-menu {

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    background: #14213d;
    color: white;
    z-index: 1000;

    font-family: 'Roboto Condensed', sans-serif;

}

.hidden {

    display: none;

}

#close-options {

    position: absolute;
    top: 1.5%;
    left: 95%;

    width: max-content;
    height: max-content;

}

#close-options:hover {

    cursor: default;

}

.lil-gui.autoPlace { /* gui touching border */

    right: 0px !important;

}

.text-box {

    position: absolute;
    top: 0%;
    left: 0%;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0px;
    width: 100%;
    height: 100%;

    z-index: 100000;

}

.text {

    color: white;
    
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 10em;

    user-select: none;

}

.hidden {

    display: none !important;

}
```