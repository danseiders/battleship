BATTLESHIP!
Adapted from Milton Bradley's classic board game BATTLESHIP. 
Programming and design by: Dan Seiders 

Battleship was built using HTML, CSS, JavaScript, JQuery, JQuery UI and a hack called JQuery UI Touch Punch. 

I started this game by working on a general html layout and using loops to make boards with correct classes and IDs. After that it was onto logic and integrating JQuery UI draggable/droppable for the ships. Some of this proved difficult, since the user drops ships but the computer needed ships to be placed for it - so I ended up moving the user ships using location  by pixel. After hitting "start game" making the computer ships opacity changes to 0, so the user would click on the ship rather than the board (if it was a hit!) Again- this made things challenging because the user was clicking while the computer was auto-firing back by board ID location. 

In the future:
Add a restart button so you can continue playing without reload.
Get ships to rotate to vertical positions.
Make computer ships have more variety with auto placement.
Append ships to "ships lost" divs. 
Fix the overlapping issue with ship placement / being able to place ships outside of board.

Known Issues: 
When the user places their ships, sometimes the droppable information doesn't react properly and an alert shows to place ship again. 
Sometimes, the user is able to click on the div behind the computer ship, registering a miss and letting the computer get an extra shot....



Gameboard background photos: https://unsplash.com/@dynamicwang

_____ jQuery UI Touch Punch 0.2.3 _____
* Copyright 2011–2014, Dave Furfero
* Dual licensed under the MIT or GPL Version 2 licenses.

github.furf/jquery-ui-touch-punch
http://touchpunch.furf.com/
_______________________________________
