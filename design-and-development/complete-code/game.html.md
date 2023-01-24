# game.html

```html
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Untitled Horror Game - Game Screen</title>

        <link rel="stylesheet" href="./style.css">
        <!--<script type="module" src="/threex-domevents/threex.domevents.js"></script>-->

    </head>

    <body>

        <div class="text-box hidden" id="view-output">
            
            <h1 class="text">Game Over</h1>

        </div>

        <script type="importmap">
            
            {
                
                "imports": {
                
                    "three": "../build/three.module.js"
                
                }
            
            }
        
        </script>

        <script type="module" src="./game.js"></script>

    </body>

</html>
```