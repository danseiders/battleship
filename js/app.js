
   
   //this builds the two game boards, assigin a letter and number to the class for each square on the board. Letters are rows, numbers are columns. 
   const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
   
   const buildBoard = (user) =>{
   for(let i = 1;  i <= 10; i++){
     for(let j = 0; j < rowLetters.length; j++){
      const letter = rowLetters[j];
        const $boardSquares = $(`<div class="${user}_board_squares" column="${letter}" row="${i}" id="${letter} ${i}">`).on('click', (e) => {
          $(e.target).css('background-color', 'red') //for now this changes the square to the color red, although I need to add a function that will check the contents of the box for a ship, then change the color to white if miss, red if hit. 
        })
        const $board = $(`#${user}_board`)
        $board.append($boardSquares)
       } 
    }
}


////////////////////
///JQUERY ON LOAD///
////////////////////

$(()=> {
  buildBoard('player1')
  buildBoard('player2')
  


  /////////////////////////////
  ///JQuery UI Drag and Drop///
  /////////////////////////////
  $(function() {  
    const $carrier = $(".carrier")
    
    //this makes each ship draggable to specific pixel grid and changes cursor to crosshairs. 
    $( ".P1ship").draggable({ 
      cursor: "crosshair",
      revert: "invalid",
      grid: [ 16, 17 ],
     });
    
     $( ".P2ship" ).draggable({ 
      cursor: "crosshair",
      revert: "invalid",
      grid: [ 16, 17 ],
     });
  
    //this only lets the user drop their ships on only their board, while adding the class of where its dropped.

    const $column = document.getElementById('column')
    const $row = document.getElementById('row')

    $( ".player1_board_squares" ).droppable({
      accept: ".P1ship",
      drop: function( e, ui ) {
        // $().html(ui.draggable.remove().html());
        // $(this).droppable('destroy')
        $(this).addClass( "P1_placed_ship" ).find(".player1_board_squares")
     
      }
    });
    $( ".player2_board_squares" ).droppable({
      accept: ".P2ship",
      drop: function( e, ui ) {
        $( this ).addClass( "P2_placed_ship" ).find( "div" )
            
      }
    });
  });   
})

////////////////
///to do list///
////////////////

//VISUAL AND INTERACTION
//give ships the ability to rotate
//make overall game look better


//LOGIC
//user (player 2) places ships
//user hits "play" button that locks in ship placement
// when user hits "play" player 1 ships get randomly placed
// player 1 ships disappear from "player 1 ships"
//user fires shots by clicking on player 1 board.
// missed shots are changed to white circle inside of square
// hits are changed to red circle inside of square
// player 1 automatically fires after user fires
// player 1 shots are random on board. (can try to make this a little smarter if I have time)
