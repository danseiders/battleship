
   
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
/////////////////////////////
///JQUERY UI DRAG AND DROP///
/////////////////////////////

$(function() {  
  $( ".P1ship" ).draggable({ 
    containment: "#player1_board",
    cursor: "crosshair",
    // revert: true,
    grid: [ 16, 17 ],
   });
  
   $( ".P2ship" ).draggable({ 
    containment: "#player2_board",
    cursor: "crosshair",
    // revert: true,
    grid: [ 16, 17 ],
   });
   
   $( ".player1_board_squares" ).droppable({
      accept: "#P1carrier",
      accept: "#P1battleship",
      accept: "#P1cruiser",
      accept: "#P1submarine",
      accept: "#P1destroyer",
   });
  
   $( ".player2_board_squares" ).droppable({
    accept: "#P2carrier",
      accept: "#P2battleship",
      accept: "#P2cruiser",
      accept: "#P2submarine",
      accept: "#P2destroyer",
   });

});  

////////////////////
///JQUERY ON LOAD///
////////////////////

$(()=> {
  buildBoard('player1')
  buildBoard('player2')
  

  
  
})
