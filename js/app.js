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
    gamesWon: 0,
    gamesLost: 0,
    shotsFired: 0,
    shotsHit: 0,
    shotsMissed: 0,
}

////////////////
///GAME SETUP///
////////////////

//builds the two game boards and labels the divs 1 through 100 top to left, bottom right
const buildBoard = (user) =>{
  for(let i = 1;  i <= 100; i++){
    const $boardSquares = $(`<div class="${user}_board_squares" id="${i}">`)
    .on('click', userFires)
    const $board = $(`#${user}_board`)
    $board.append($boardSquares)
    } 
}

//randomly places the computers ships and makes them disappear with opacity. the arrays below are pixel values for height on gamebaoard. right now the game is set up so each ship can only be put on two different rows. 
const carrierTop = [0, 17, 34, 51, 68, 85, 102, 119, 136, 153];
const battleshipTop = [-17, 0, 17, 34, 51, 68, 85, 102, 119, 136];
const cruiserTop = [-34, -17, 0, 17, 34, 51, 68, 85, 102, 119];
const submarineTop = [-51, -34, -17, 0, 17, 34, 51, 68, 85, 102];
const destroyerTop = [-68, -51, -34, -17, 0, 17, 34, 51, 68, 85];
const placePlayer1Ships = () => {
  $('#p1Carrier').css('top', (`${carrierTop[Math.floor(Math.random() * 2)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) + 8) * 16)}px`))
  $('#p1Battleship').css('top', (`${battleshipTop[(Math.floor(Math.random() * 2) + 2)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +10) * 16)}px`))
  $('#p1Cruiser').css('top', (`${cruiserTop[(Math.floor(Math.random() * 2) + 4)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +11) * 16)}px`))
  $('#p1Submarine').css('top', (`${submarineTop[(Math.floor(Math.random() * 2) + 6)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +11) * 16)}px`))
  $('#p1Destroyer').css('top', (`${destroyerTop[(Math.floor(Math.random() * 2) + 8)]}px`))
    .css('left', (`${((Math.floor(Math.random() * 6) +12) * 16)}px`))
}

//takes the ID of where the ship was dropped on board and adds/subtracts the the correct amout of spaces according to the length of the ship. This is for HORIZONTAL ONLY
const p2AddShipLocation = (ship, location)=>{
  const space = Number(location)
  if(ship === "p2Carrier") {
    player2Data.shipLocation.p2Carrier = 
    [`${space - 2}`, `${space - 1}`, location, `${space  + 1}` , `${space  + 2}`]
  } else if (ship === "p2Battleship"){
    player2Data.shipLocation.p2Battleship = 
    [`${space - 1}`, location, `${space  + 1}` , `${space  + 2}`] 
  } else if (ship === 'p2Cruiser'){
    player2Data.shipLocation.p2Cruiser = 
    [`${space - 1}`, location, `${space  + 1}`]
  } else if (ship === 'p2Submarine'){
    player2Data.shipLocation.p2Submarine = 
    [`${space - 1}`, location, `${space  + 1}`] 
  } else if (ship === 'p2Destroyer'){
    player2Data.shipLocation.p2Destroyer = 
    [ location, `${space  + 1}`]
  } else {
    alert('Ship didn\'t register....Please reset last dropped ship!')
    console.log('placement not working')
  }
}
//////////////////////
///GENERAL GAMEPLAY///
//////////////////////

const startMessage = () => {
  alert('Please place your ships on the board and hit START GAME!')
}

//starts the game after user clicks start button. 
const startGame = () => {
  const $shipContents = $('.player1ShipContents')
  $('.start_button').css('visibility', 'hidden') //removes start button
  $('.player1_board_squares').css('background-color', '')
    .css('border-radius', '0') //resets player1 board
  $('.player2_board_squares').css('background-color', '')
    .css('border-radius', '0') //resets player2 board
  $('.p1ship').draggable('disable') //disables drag functionality on player 1
  $('.p2ship').draggable('disable') //disables drag functionality on player 2
  placePlayer1Ships();  //runs start sequence
  $shipContents.on('click', userFires)
  $('.p1ship').css('backgroundColor') //changes computer ships to transparent
  $('.player1ShipContents').css('opacity', '0') //changes computer ships to transparet
  $('#gamesWon').html(`WINS<br>${player2Data.gamesWon}`) //appends scores to scoreboard
  $('#gamesLost').html(`LOSSES<br>${player2Data.gamesLost}`)
  $('#shotsFired').html(`SHOTS FIRED<br>${player2Data.shotsFired}`)
  $('#shotsHit').html(`HITS<br>${player2Data.shotsHit}`)
  $('#shotsMissed').html(`MISSES<br>${player2Data.shotsMissed}`)
}

////////////////////
///WIN CONDITIONS///
////////////////////
const checkForWinner = () => {
  if(player1Data.destroyedShips.length === 5){
    player2Data.gamesWon += 1
    alert('YOU WIN!')
    $('#gamesWon').html(`WINS<br>${player2Data.gamesWon}`)
    $('.start_button').css('visibility', 'visible')
  } else if (player2Data.destroyedShips.length === 5){ 
    player2Data.gamesLost += 1
    $('#gamesLost').html(`LOSSES<br>${player2Data.gamesLost} `)
    alert('Sorry...You lost')
    $('.start_button').css('visibility', 'visible')
  }

}

//checks player 1 score and pushes destroyed ships to player1 object
const checkPlayer1Score = (shipStrength, target) => {
  const shipName = (target).slice(2 , -6)
  console.log(shipName)
    console.log(target)
  if(shipStrength === 0){
    player1Data.destroyedShips.push(target)
    alert(`You sunk the enemy ${shipName}`)
    console.log(target)
    checkForWinner()
  }
}
//checks player 2 score and pushes destroyed ships to player2 object
const checkPlayer2Score = (shipStrength, target) => {
  if(shipStrength === 0){
    const shipName = (target).slice(2)
    alert(`The computer sunk your ${shipName}`)
    player2Data.destroyedShips.push(target)
    checkForWinner()
  }
}

//////////////////////
///ATTACK SEQUENCES///
//////////////////////

const divsAlreadyClicked = []
//when player 2 clicks on player 1 board, this will check the contents to see if its a hit or miss by comparing the class of the square clicked, then run the computer fire sequence
const userFires = (e) => {
  const miss = e.target.classList.contains('player1_board_squares')
  const hit = e.target.classList.contains('player1ShipContents')
  const location = e.target.id
  const ship = e.target.id.slice(0 , -6)
  const shipDiv = e.target.id.slice(-5)
  player2Data.shotsFired += 1
    $('#shotsFired').html(`SHOTS FIRED<br>${player2Data.shotsFired}`)
  if(divsAlreadyClicked.includes(location)){
    alert(`You've already chosen this space. Work on your aim guy!`)
  }else if(miss === true) {
    player2Data.shotsMissed += 1
    $('#shotsMissed').html(`MISSES<br>${player2Data.shotsMissed}`)
    divsAlreadyClicked.push(location)
    // console.log('that was a miss!')
    $(e.target).css('background-color', 'white')
    .css('opacity', '.7')
    .css('border-radius', '10px') 
    setTimeout(computerFiresBack, 500) 
  } else if (hit === true) {
    player2Data.shotsHit += 1
    $('#shotsHit').html(`HITS<br>${player2Data.shotsHit}`)
    divsAlreadyClicked.push(location)
    // console.log(e.target.id)
    // console.log(ship)
    if(ship === 'p1Carrier'){
      player1Data.p1Carrier -=1
      checkPlayer1Score(player1Data.p1Carrier, e.target.id)
    } else if (ship === 'p1Battleship'){
      player1Data.p1Battleship -=1
      checkPlayer1Score(player1Data.p1Battleship, e.target.id)
    } else if (ship === 'p1Cruiser'){
      player1Data.p1Cruiser -=1
      checkPlayer1Score(player1Data.p1Cruiser, e.target.id)
    } else if (ship === 'p1Submarine'){
      player1Data.p1Submarine -=1
      checkPlayer1Score(player1Data.p1Submarine, e.target.id)
    } else if (ship === 'p1Destroyer'){
      player1Data.p1Destroyer -=1
      checkPlayer1Score(player1Data.p1Destroyer, e.target.id)
    }
    // console.log(`HIT!`)
    // console.log(shipDiv)
    $(e.target).css('background-color', 'red').css('border-radius', '10px').css('opacity', '.8')
    setTimeout(computerFiresBack, 500) 
  }
  
}

//fires back after user shoots. a random div is picked by column(letter) vs row(number). The div shot at changes colors to white.
const numbersChosen = []
const computerFiresBack = () => {
  // console.log('COMPUTER FIRES BACK!')
  const id = Math.floor(Math.random() * 100) + 1 //picks a random number from 1-100 to compare to squares
  const $square = $(document.body.children[0].children[3].children[3].children[`${id}` - 1]) //accesses the player2 gameboard to change color for missed shots
  if(numbersChosen.includes(id) === true ) { //if the number selected by mathrandom has already been chosen. 
    computerFiresBack() //repeat function
  } else if (player2Data.shipLocation.p2Carrier.includes(`${id}`)){ //if the number selected by mathrandom is in the player Object ship location
    const shipDivHit = player2Data.shipLocation.p2Carrier.indexOf(`${id}`)+ 1; //uses the random number to check where in the ship location array it is and subtracts 1. 
    $(`#p2Carrier${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px').css('opacity', '1') //using the index number, this selects the correct div in the ship container.
    player2Data.p2Carrier -= 1 //subtracts points from ship
    // console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Carrier, 'p2Carrier')
  } else if (player2Data.shipLocation.p2Battleship.includes(`${id}`) === true){
    const shipDivHit = player2Data.shipLocation.p2Battleship.indexOf(`${id}`)+ 1;  
    $(`#p2Battleship${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px').css('opacity', '1') 
    player2Data.p2Battleship -= 1 
    // console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Battleship, 'p2Battleship')
  } else if (player2Data.shipLocation.p2Cruiser.includes(`${id}`) === true) { 
    const shipDivHit = player2Data.shipLocation.p2Cruiser.indexOf(`${id}`)+ 1; 
    $(`#p2Cruiser${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px').css('opacity', '1') 
    player2Data.p2Cruiser -= 1 //subtracts points from ship
    // console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Cruiser, 'p2Cruiser')
  } else if (player2Data.shipLocation.p2Submarine.includes(`${id}`) === true) { 
    const shipDivHit = player2Data.shipLocation.p2Submarine.indexOf(`${id}`)+ 1; 
    $(`#p2Submarine${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px').css('opacity', '1') 
    player2Data.p2Submarine -= 1 //subtracts points from ship
    // console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Submarine, 'p2Submarine')
  } else if (player2Data.shipLocation.p2Destroyer.includes(`${id}`) === true) { 
    const shipDivHit = player2Data.shipLocation.p2Destroyer.indexOf(`${id}`)+ 1; 
    $(`#p2Destroyer${shipDivHit}`).css('background-color', 'red').css('border-radius', '10px').css('opacity', '1') 
    player2Data.p2Destroyer-= 1 //subtracts points from ship
    // console.log('COMPUTER HIT!')
    numbersChosen.push(id)
    checkPlayer2Score(player2Data.p2Destroyer, 'p2Destroyer')
  } else { //if the computer shot is a miss, change the div white
    $square.css('background-color', 'white')
    $square.css('border-radius', '10px')
    numbersChosen.push(id)
  }
}
  
////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      drop: function(e, ui) {
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
//give ships the ability to rotate
//make overall game look better
//make modal with directions
//make modal with YOU WON or YOU LOST!
//when someone wins, create reset button to start over without reloading.
//fix bottom container spacing
//make ships appear in ships lost section

//LOGIC

//BUGS/THINGS TO FIX
//stop user ships from being able to be placed outside of board