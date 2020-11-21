$('h1').click(function(){
  $(this).text("I was changed")
})

$('input').eq(0).keypress(function(event){
  console.log(event);
})

$('h1').on('dblclick',function(){
  $(this).toggleClass('turnBlue');
})

$('input').eq(1).on('click',function(){
  $('.container').fadeOut(3000)
})
