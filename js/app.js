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
      p2Carrier: [],
      p2Battleship: [],
      p2Cruiser: [],
      p2Submarine: [],
      p2Destroyer: [],

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
  for(let i = 1;  i <= 100; i++){
    const $boardSquares = $(`<div class="${user}_board_squares" id="${i}">`)
    .on('click', userFires)
    const $board = $(`#${user}_board`)
    $board.append($boardSquares)
    } 
}




//randomly places the computers ships and makes them disappear with opacity. the arrays below are pixel values for height on gamebaoard. 
const carrierTop = [0, 17, 34, 51, 68, 85, 102, 119, 136, 153];
const battleshipTop = [-17, 0, 17, 34, 51, 68, 85, 102, 119, 136];
const cruiserTop = [-34, -17, 0, 17, 34, 51, 68, 85, 102, 119];
const submarineTop = [-51, -34, -17, 0, 17, 34, 51, 68, 85, 102];
const destroyerTop = [-68, -51, -34, -17, 0, 17, 34, 51, 68, 85];
const placePlayer1Ships = () => {
  $('#p1Carrier').css('top', (`${carrierTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +7) * 16)}px`))
  $('#p1Battleship').css('top', (`${battleshipTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +8) * 16)}px`))
  $('#p1Cruiser').css('top', (`${cruiserTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +9) * 16)}px`))
  $('#p1Submarine').css('top', (`${submarineTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +9) * 16)}px`))
  $('#p1Destroyer').css('top', (`${destroyerTop[Math.floor(Math.random() * 10)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +10) * 16)}px`))
  $('.player1ShipContents').css('opacity',  '0')
  // $('.p1ship').css('opacity', '0')
}

//takes the ID of where the ship was dropped on board and adds/subtracts the the correct amout of spaces according to the length of the ship. This is for HORIZONTAL ONLY
const p2AddShipLocation = (ship, location)=>{
  const space = Number(location)
  if(ship === "p2Carrier") {
    player2Data.shipLocation.p2Carrier = 
    [`${space - 2}`, `${space - 1}`, location, `${space  + 1}` , `${space  + 2}`], 
    console.log(player2Data.shipLocation.p2Carrier)
  } else if (ship === "p2Battleship"){
    player2Data.shipLocation.p2Battleship = 
    [`${space - 1}`, location, `${space  + 1}` , `${space  + 2}`], 
      console.log(player2Data.shipLocation.p2Battleship)
  } else if (ship === 'p2Cruiser'){
    player2Data.shipLocation.p2Cruiser = 
    [`${space - 1}`, location, `${space  + 1}`], 
    console.log(player2Data.shipLocation.p2Cruiser)
  } else if (ship === 'p2Submarine'){
    player2Data.shipLocation.p2Submarine = 
    [`${space - 1}`, location, `${space  + 1}`], 
    console.log(player2Data.shipLocation.p2Submarine)
  } else if (ship === 'p2Destroyer'){
    player2Data.shipLocation.p2Destroyer = 
    [ location, `${space  + 1}`], 
    console.log(player2Data.shipLocation.p2Destroyer)
  } else {
    alert('Please reset last dropped ship!')
    console.log('not working')
  }
}
//////////////////////
///GENERAL GAMEPLAY///
//////////////////////

//starts the game after user clicks start button. 
const startGame = () => {
  const $shipContents = $('.player1ShipContents')
  $('.start_button').remove() //removes start button
  $('.player1_board_squares').css('background-color', '')
    .css('border-radius', '0') //resets player1 board
  $('.player2_board_squares').css('background-color', '')
    .css('border-radius', '0') //resets player2 board
  $('.p1ship').draggable('disable') //disables drag functionality on player 1
  $('.p2ship').draggable('disable') //disables drag functionality on player 2
  placePlayer1Ships();  //runs start sequence
  $shipContents.on('click', userFires)
}

const checkForWinner = () => {
  if(player1Data.destroyedShips.length === 5){
    alert('Player 1 has lost!')
  } else if (player2Data.destroyedShips.length === 5){ 
    alert('Player 2 has lost!')
  }

}

const checkPlayer1Score = (shipStrength, target) => {
  console.log(shipStrength)
  if(shipStrength === 0){
    player1Data.destroyedShips.push(target)
    checkForWinner()
    console.log(player1Data.destroyedShips)
  }
}

const checkPlayer2Score = (shipStrength, target) => {
  console.log(shipStrength)
  if(shipStrength === 0){
    player2Data.destroyedShips.push(target)
    checkForWinner()
    console.log(player2Data.destroyedShips)
  }
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
    .css('opacity', '.7')
    .css('border-radius', '10px') 
    setTimeout(computerFiresBack, 500) 
  } else if (hit === true) {
    if(e.target.id === 'p1Carrier'){
      player1Data.p1Carrier -=1
      checkPlayer1Score(player1Data.p1Carrier, e.target.id)
    } else if (e.target.id === 'p1Battleship'){
      player1Data.p1Battleship -=1
      checkPlayer1Score(player1Data.p1Battleship, e.target.id)
    } else if (e.target.id === 'p1Cruiser'){
      player1Data.p1Cruiser -=1
      checkPlayer1Score(player1Data.p1Cruiser, e.target.id)
    } else if (e.target.id === 'p1Submarine'){
      player1Data.p1Submarine -=1
      checkPlayer1Score(player1Data.p1Submarine, e.target.id)
    } else if (e.target.id === 'p1Destroyer'){
      player1Data.p1Destroyer -=1
      checkPlayer1Score(player1Data.p1Destroyer, e.target.id)
    }
    console.log(`HIT!`)
    $(e.target).css('background-color', 'red')
    .css('border-radius', '10px')
    .css('opacity', '1')
    setTimeout(computerFiresBack, 500) 
  }
}

//fires back after user shoots. a random div is picked by column(letter) vs row(number). The div shot at changes colors to white.
const numbersChosen = []
const computerFiresBack = () => {
  console.log('COMPUTER FIRES BACK!')
  const id = Math.floor(Math.random() * 100) + 1 //picks a random number from 1-100 to compare to squares
  const $square = $(document.body.children[0].children[3].children[2].children[`${id}` - 1]) //accesses the player2 gameboard to change color for missed shots
  if(numbersChosen.includes(id) === true ) { //if the number selected by mathrandom has already been chosen. 
    computerFiresBack() //repeat function
  } else if (player2Data.shipLocation.p2Carrier.includes(`${id}`)){ //if the number selected by mathrandom is in the player Object ship location
    const shipDivHit = player2Data.shipLocation.p2Carrier.indexOf(`${id}`)+ 1; //uses the random number to check where in the ship location array it is and subtracts 1. 
    $(`#p2Carrier${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px') //using the index number, this selects the correct div in the ship container.
    player2Data.p2Carrier -= 1 //subtracts points from ship
    console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Carrier, 'p2Carrier')
  } else if (player2Data.shipLocation.p2Battleship.includes(`${id}`) === true){ //if the number selected by mathrandom is in the player Object ship location
    const shipDivHit = player2Data.shipLocation.p2Battleship.indexOf(`${id}`)+ 1; //uses the random number to check where in the ship location array it is and subtracts 1. 
    $(`#p2Battleship${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px') //using the index number, this selects the correct div in the ship container.
    player2Data.p2Battleship -= 1 //subtracts points from ship
    console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Battleship, 'p2Battleship')
  } else if (player2Data.shipLocation.p2Cruiser.includes(`${id}`) === true) { //if the number selected by mathrandom is in the player Object ship location
    const shipDivHit = player2Data.shipLocation.p2Cruiser.indexOf(`${id}`)+ 1; //uses the random number to check where in the ship location array it is and subtracts 1. 
    $(`#p2Cruiser${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px') //using the index number, this selects the correct div in the ship container.
    player2Data.p2Cruiser -= 1 //subtracts points from ship
    console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Cruiser, 'p2Cruiser')
  } else if (player2Data.shipLocation.p2Submarine.includes(`${id}`) === true) { //if the number selected by mathrandom is in the player Object ship location
    const shipDivHit = player2Data.shipLocation.p2Submarine.indexOf(`${id}`)+ 1; //uses the random number to check where in the ship location array it is and subtracts 1. 
    $(`#p2Submarine${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px') //using the index number, this selects the correct div in the ship container.
    player2Data.p2Submarine -= 1 //subtracts points from ship
    console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Submarine, 'p2Submarine')
  } else if (player2Data.shipLocation.p2Destroyer.includes(`${id}`) === true) { //if the number selected by mathrandom is in the player Object ship location
    const shipDivHit = player2Data.shipLocation.p2Destroyer.indexOf(`${id}`)+ 1; //uses the random number to check where in the ship location array it is and subtracts 1. 
    $(`#p2Destroyer${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px') //using the index number, this selects the correct div in the ship container.
    player2Data.p2Destroyer-= 1 //subtracts points from ship
    console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Destroyer, 'p2Destroyer')
  } else { //if the computer shot is a miss, change the div white
    $square.css('background-color', 'white')
    $square.css('border-radius', '10px')
    numbersChosen.push(id)
    console.log(numbersChosen)
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

////////////////////////////////////////////////////////////////////////
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
    
    //lets the user drop their ships on only their board, while adding the class of ship where its dropped to the square.
    $( ".player2_board_squares" ).droppable({
      accept: ".p2ship",
      drop: function(e) {
       const location = e.target.id //gets the div the ship is dropped on
       const ship = document.getElementById(`${e.originalEvent.target.id}`).parentElement.id //finds the id of the ship dropped
        $(this).addClass(`${e.originalEvent.target.id}`).find( ".player2_board_squares" )        
        p2AddShipLocation(ship, location)    
      },
    });
  });   
})
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// ONLY NOTES BELOW THIS LINE PLEASE!//////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

////////////////
///to do list///
////////////////

//VISUAL AND INTERACTION
//media query for smaller screens!
//fix drag and drop for mobile
//fix overlapping ships on boards
//give ships the ability to rotate
//make overall game look better
//make modal with directions
//make modal with YOU WON or YOU LOST!
//when someone wins, create reset button to start over without reloading.
//fix bottom container spacing
//make ships reappear in ships lost section

//LOGIC

//Temp fix player 1 ship placement to 5 different positions.

//BUGS/THINGS TO FIX
//stop player 1 ships from overlapping on startup
//stop player 2 ships from being able to be placed outside of board