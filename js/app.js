//this builds the two game boards, assigin a letter and number to the class for each square on the board. Letters are rows, numbers are columns. 
const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
   
const buildBoard = (user) =>{
  for(let i = 1;  i <= 10; i++){
    for(let j = 0; j < rowLetters.length; j++){
    const letter = rowLetters[j];
    const $boardSquares = $(`<div class="${user}_board_squares" column="${letter}" row="${i}" id="${letter} ${i}">`).on('click', (e) => {
    $(e.target).css('background-color', 'white')
    .css('border-radius', '10px') 
    })
    const $board = $(`#${user}_board`)
    $board.append($boardSquares)
    } 
  }
}



//this section randomly places the computers ships and makes them disappear with opacity. the arrays below are pixel values for height. 
const carrierTop = [0, 17, 34, 51, 68, 85, 102, 119, 136, 153];
const battleshipTop = [-17, 0, 17, 34, 51, 68, 85, 102, 119, 136];
const cruiserTop = [-34, -17, 0, 17, 34, 51, 68, 85, 102, 119];
const submarineTop = [-51, -34, -17, 0, 17, 34, 51, 68, 85, 102];
const destroyerTop = [-68, -51, -34, -17, 0, 17, 34, 51, 68, 85];
const placePlayer1Ships = () => {
  $('#P1Carrier').css('top', (`${carrierTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +7) * 16)}px`))
  $('#P1Battleship').css('top', (`${battleshipTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +8) * 16)}px`))
  $('#P1Cruiser').css('top', (`${cruiserTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +9) * 16)}px`))
  $('#P1Submarine').css('top', (`${submarineTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +9) * 16)}px`))
  $('#P1Destroyer').css('top', (`${destroyerTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +10) * 16)}px`))
  $('.player1ShipContents').css('opacity',  '0.01')
}

//this starts the game after user clicks start button. 
const startGame = () => {
  const $shipContents = $('.player1ShipContents')
  $('.start_button').remove() //removes start button
  $('.player1_board_squares').css('background-color', 'cadetblue')
    .css('border-radius', '0') //resets player1 board
  $('.player2_board_squares').css('background-color', 'cadetblue')
    .css('border-radius', '0') //resets player2 board
  $('.P1ship').draggable('disable') //disables drag functionality on player 1
  $('.P2ship').draggable('disable') //disables drag functionality on player 2
  placePlayer1Ships();  //runs start sequence
  $shipContents.on('click', (e) => {
    $(e.target).css('background-color', 'red')
    .css('border-radius', '10px') 
    .css('opacity', '1')
})
  
}



/////////////////////////////////////////////////////////////////////////////////////////
////////////////////
///JQUERY ON LOAD///
////////////////////


$(()=> {
  const $startButton = $('.start_button')
  
  buildBoard('player1') //builds player1 board
  buildBoard('player2') //builds player 2 board
  $($startButton).on('click', startGame)//when start button clicked, ships cant be moved
  
//   const $shipContents = $('.player1ShipContents')
//   $shipContents.on('click', (e) => {
//     $(e.target).css('background-color', 'red')
//     .css('border-radius', '10px') 
// })

  
  

//////////////////////////////////////////////////
  /////////////////////////////
  ///JQuery UI Drag and Drop///
  /////////////////////////////
  $(function() {  
    const $carrier = $(".carrier")
    const $column = document.getElementById('column')
    const $row = document.getElementById('row')
    
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
    $( ".player1_board_squares" ).droppable({
      accept: ".P1ship",
      drop: function( e, ui ) {
        $(this).addClass( "P1_placed_ship" ).find(".player1_board_squares")
      }
    });

    $( ".player2_board_squares" ).droppable({
      accept: ".P2ship",
      drop: function( e, ui ) {
        $( this ).addClass( "P2_placed_ship" ).find( ".player2_board_squares" )        
      }
    });
  });   
})
//////////////////////////////////////////////////////////////////////////////////

////////////////
///to do list///
////////////////

//VISUAL AND INTERACTION
//give ships the ability to rotate
//make overall game look better


//LOGIC
//make modal with directions

// hits are changed to red circle inside of square
// player 1 automatically fires after user fires
// player 1 shots are random on board. (can try to make this a little smarter if I have time)
