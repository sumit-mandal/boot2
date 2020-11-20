//Restart game
var restart=document.querySelector("#b")

//grabs all square
var squares=document.querySelectorAll('td');


//clear all square
function clearBoard(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].textContent='';
  }
}

restart.addEventListener('click',clearBoard);
//check the square marker

function changeMarker(){
  if(this.textContent===''){
    this.textContent='X';
  }else if (this.textContent==='X') {
    this.textContent='O';
  }else {
    this.textContent='';
  }
}


//for loop to add event listener to all the  square

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click',changeMarker)
}
