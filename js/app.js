///////////////
///GAME DATA///
///////////////
let player1Data = {
    p1Carrier: 5,
    p1Battleship: 4,
    p1Cruiser: 3,
    p1Submarine: 3,
    p1Destroyer: 2,
    destroyedShips: [],
    shotsFired: 0,
    shotsMissed: 0,
    shotsHit: 0,
    gamesWon: 0,
    gamesLost: 0,
}
let player2Data = {
    p2Carrier: 5,
    p2Battleship: 4,
    p2Cruiser: 3,
    p2Submarine: 3,
    p2Destroyer: 2,
    shipLocation: {
      p1Carrier: [],
      p1Battleship: [],
      p1Cruiser: [],
      p1Submarine: [],
      p1Destroyer: [],

    },
    destroyedShips: [],
    shotsFired: 0,
    shotsMissed: 0,
    shotsHit: 0,
    gamesWon: 0,
    gamesLost: 0,
}

////////////////
///GAME SETUP///
////////////////

//this builds the two game boards, assigin a letter and number to the class for each square on the board. Letters are rows, numbers are columns. 
const columnLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
   
const buildBoard = (user) =>{
  for(let i = 1;  i <= 10; i++){
    for(let j = 0; j < columnLetters.length; j++){
    const letter = columnLetters[j];
    const $boardSquares = $(`<div class="${user}_board_squares" column="${letter}" row="${i}" id="${letter}${i}">`)
    .on('click', userFires)
    const $board = $(`#${user}_board`)
    $board.append($boardSquares)
    } 
  }
}



//randomly places the computers ships and makes them disappear with opacity. the arrays below are pixel values for height on gamebaoard. 
const CarrierrierTop = [0, 17, 34, 51, 68, 85, 102, 119, 136, 153];
const battleshipTop = [-17, 0, 17, 34, 51, 68, 85, 102, 119, 136];
const cruiserTop = [-34, -17, 0, 17, 34, 51, 68, 85, 102, 119];
const submarineTop = [-51, -34, -17, 0, 17, 34, 51, 68, 85, 102];
const destroyerTop = [-68, -51, -34, -17, 0, 17, 34, 51, 68, 85];
const placePlayer1Ships = () => {
  $('#p1Carrier').css('top', (`${CarrierrierTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +7) * 16)}px`))
  $('#p1Battleship').css('top', (`${battleshipTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +8) * 16)}px`))
  $('#p1Cruiser').css('top', (`${cruiserTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +9) * 16)}px`))
  $('#p1Submarine').css('top', (`${submarineTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +9) * 16)}px`))
  $('#p1Destroyer').css('top', (`${destroyerTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +10) * 16)}px`))
  // $('.player1ShipContents').css('opacity',  '0.01') OPACITY!!!
}

//starts the game after user clicks start button. 
const startGame = () => {
  const $shipContents = $('.player1ShipContents')
  $('.start_button').remove() //removes start button
  $('.player1_board_squares').css('background-color', 'cadetblue')
    .css('border-radius', '0') //resets player1 board
  $('.player2_board_squares').css('background-color', 'cadetblue')
    .css('border-radius', '0') //resets player2 board
  $('.p1ship').draggable('disable') //disables drag functionality on player 1
  $('.p2ship').draggable('disable') //disables drag functionality on player 2
  placePlayer1Ships();  //runs start sequence
  $shipContents.on('click', userFires)
  
//   (e) => {
//     $(e.target).css('background-color', 'red')
//     .css('border-radius', '10px') 
//     .css('opacity', '1')
// })
  
}




//////////////////////
///ATTACK SEQUENCES///
//////////////////////
//when player 2 clicks on player 1 board, this will check the contents to see if its a hit or miss by comparing the class of the square clicked, then run the computer fire sequence
const userFires = (e) => {
  const miss = e.target.classList.contains('player1_board_squares')
  const hit = e.target.classList.contains('player1ShipContents')
  const location = e.target.id
  const ship = 'player2Data.' + location
  if(miss === true) {
    console.log('that was a miss!')
    $(e.target).css('background-color', 'white')
    .css('border-radius', '10px') 
    setTimeout(computerFiresBack, 500) 
  } else if(hit === true) {
    console.log(`HIT!`)
    $(e.target).css('background-color', 'red')
    .css('border-radius', '10px')
    setTimeout(computerFiresBack, 500) 
  }
}

//fires back after user shoots. a random div is picked by column(letter) vs row(number). The div shot at changes colors to white.
const computerFiresBack = () => {
  console.log('COMPUTER FIRES BACK!')
  const column = columnLetters[Math.floor(Math.random() * 10)]
  const row = Math.floor(Math.random() * 10)
  const $square = $(document.body.children[0].children[2].children[3].children[`${column}${row}`])
  $square.css('background-color', 'white')
  $square.css('border-radius', '10px')
}



// const p1AddShipLocation = (ship, location)=>{
//   if(ship === "p1Carrier") {
//     player1ShipLocation.p1Carrier = location
//     console.log(userShipLocation)
//   } else if (ship === "p1Battleship"){
//     player1ShipLocation.p1Battleship = location   
//     console.log(userShipLocation)
//   } else if (ship === 'p1Cruiser'){
//     player1ShipLocation.p1Cruiser = location   
//     console.log(userShipLocation)
//   } else if (ship === 'p1Submarine'){
//     player1ShipLocation.p1Submarine = location   
//     console.log(userShipLocation)
//   } else if (ship === 'p1Destroyer'){
//     player1ShipLocation.p1Destroyer = location   
//     console.log(userShipLocation)
//   }
// }
const p2AddShipLocation = (ship, location)=>{
  const locationLetter = location[0]
  const locationNumber = Number(location[1])
  
  if(ship === "p2Carrier") {
    player2Data.shipLocation.p2Carrier = [
      locationLetter + (locationNumber - 2), 
      locationLetter + (locationNumber - 1), 
      location, 
      locationLetter + (locationNumber + 1), 
      locationLetter + (locationNumber + 2)]
    console.log(player2Data.shipLocation.p2Carrier)
    console.log(locationLetter)
    console.log(locationNumber + 100)
  } else if (ship === "p2Battleship"){
    player2ShipLocation.p2Battleship = location   
    console.log(player2ShipLocation)
  } else if (ship === 'p2Cruiser'){
    player2ShipLocation.p2Cruiser = location   
    console.log(player2ShipLocation)
  } else if (ship === 'p2Submarine'){
    player2ShipLocation.p2Submarine = location   
    console.log(player2ShipLocation)
  } else if (ship === 'p2Destroyer'){
    player2ShipLocation.p2Destroyer = location   
    console.log(player2ShipLocation)
  }
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
  


//////////////////////////////////////////////////
  /////////////////////////////
  ///JQuery UI Drag and Drop///
  /////////////////////////////
  $(function() {  
    //makes each ship draggable to each playerboard at correct pixel and changes cursor to crosshairs. 
    $( ".p1ship").draggable({ 
      cursor: "crosshair",
      revert: "invalid",
      grid: [ 16, 17 ],
     });
    $( ".p2ship").draggable({ 
      cursor: "crosshair",
      revert: "invalid",
      grid: [ 16, 17 ],
     });
    
   
  
    //lets the user drop their ships on only their board, while adding the class of where its dropped.
    // $( ".player1_board_squares" ).droppable({
    //   accept: ".p1ship",
    //   drop: function( e, ui ) {
    //     $(this).addClass( "p1_placed_ship" ).find(".player1_board_squares")
    //   }
    // });

    // $( ".player1_board_squares" ).droppable({
    //   accept: ".p1ship",
    //   drop: function(e) {
    //    const location = e.target.id //gets the div the ship is dropped on
    //    const ship = document.getElementById(`${e.originalEvent.target.id}`).parentElement.id //finds the id of the ship dropped
    //    p1AddShipLocation(ship, location)
    //    $(this).addClass(`${e.originalEvent.target.id}`).find( ".player1_board_squares" )        
    //   },
    // });

    $( ".player2_board_squares" ).droppable({
      accept: ".p2ship",
      drop: function(e) {
       const location = e.target.id //gets the div the ship is dropped on
       const ship = document.getElementById(`${e.originalEvent.target.id}`).parentElement.id //finds the id of the ship dropped
       p2AddShipLocation(ship, location)
       $(this).addClass(`${e.originalEvent.target.id}`).find( ".player2_board_squares" )        
      },
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
//make modal with directions
//make modal with YOU WON or YOU LOST!

// data
//build player objects with ships
//build game statistics

//LOGIC

// hits to player 2 are changed to red circle inside of square
// player 1 automatically fires after user fires
// player 1 shots are random on board. (can try to make this a little smarter if I have time)
