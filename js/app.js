
   const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
   
   const buildBoard = (user) =>{
   for(let i = 0;  i < rowLetters.length; i++){
      const letter = rowLetters[i];
      for(let j = 1; j <= 10; j++){
        const $boardSquares = $(`<div class="${user}_board_squares" id="${letter}${j}">`)
        const $board = $(`#${user}_board`)
        $board.append($boardSquares)
    // console.log(i)
       } 
    }
}



$(()=> {
  buildBoard('player1')
  buildBoard('player2')
    
})
