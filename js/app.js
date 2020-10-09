
   
   //this builds the two game boards, assigin a letter and number to the class for each square on the board. Letters are rows, numbers are columns. 
   const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
   
   const buildBoard = (user) =>{
   for(let i = 1;  i <= 10; i++){
     for(let j = 0; j < rowLetters.length; j++){
      const letter = rowLetters[j];
        const $boardSquares = $(`<div class="${user}_board_squares" id="${letter}${i}">`).on('click', (e) => {
          $(e.target).css('background-color', 'red') //for now this changes the square to the color red, although I need to add a function that will check the contents of the box for a ship, then change the color to white if miss, red if hit. 
        })
        const $board = $(`#${user}_board`)
        $board.append($boardSquares)
       } 
    }
}


const addPeg = () => {
  
}

////////////////////
///JQUERY ON LOAD///
////////////////////

$(()=> {
  buildBoard('player1')
  buildBoard('player2')

  
  
})


//////////////NOTES///////////////////
// this is the jquery drag and drop that should hopefully work?
// $( "#draggable4" ).draggable({ grid: [ 20, 20 ] });

/// stylesheet link?
// <style>
  // .draggable { width: 90px; height: 80px; padding: 5px; float: left; margin: 0 10px 10px 0; font-size: .9em; }
  // .ui-widget-header p, .ui-widget-content p { margin: 0; }
  // #snaptarget { height: 140px; }
  // </style>

  //<div id="draggable4" class="draggable ui-widget-content">
  // <p>I snap to a 20 x 20 grid</p>
  // </div>