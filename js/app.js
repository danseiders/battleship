
 const buildBoards = () =>{
   for(let i = 1; i <= 100; i++){
    const $boardSquares = $('<div class="squares">')
    const $board = $('.board')
  $board.append($boardSquares)
  }
}


$(()=> {
  buildBoards()
    
})
