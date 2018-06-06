$(document).ready(function(){

  var columns = 20;
  var rows = 20;
  var $table = $('#snakeBoard');
  var idCounter = 1;
  var colCounter = 0;
  var score = 0;
  var sec = 0;
  var direction = 'right'; // 'left', 'top', 'bottom'
  // Makes a grid of 400 squares on start-up
  $('#startGame').click(function(){

    for (var i = 0; i < columns; i++) {
      var row = $(`<tr class="snakeRow" id="${ colCounter }"></tr>`);
      colCounter++;
      $table.append(row);


      for (var j = 0; j < rows; j++) {
        var col = $(`<td class="boardPixel" id="${ idCounter }"> </td>`);
        idCounter++;
        row.append(col);
      }
    }

    $(this).unbind('click');

    function pad ( val ) { return val > 9 ? 'Timer : ' + val :'Timer: ' + "0" + val; }
    setInterval( function(){
      $("#timer").html(pad(++sec));
    }, 1000);

    // Where the snake head spawns
    var snake = Math.floor(Math.random() * 401);
    var snakeArr = [];
    // Loops 3 times to create a body of 3
    for (var i = 0; i < 2; i++) {
      snake++;
      snakeArr.push(snake);
      console.log(snakeArr)
      $(`#${snake}`).css('background','green');
    }

    // Where the snake head spawns
    var apple = Math.floor(Math.random() * 401);
    var appleArr = [];
    // Loops 3 times to create a body of 3
    for (var i = 0; i < 1; i++) {
      snakeArr.push(snake);
      $(`#${apple}`).css('background','red');
    }

    setInterval(moveSnake, 200);

    function moveSnake(){
      if (direction === 'up') {
        snake-=20;
        snakeArr.push(snake);
        $(`#${snake}`).css('background','green');
        // remove from tail
        $(`#${snakeArr[0]}`).css('background','transparent');
        snakeArr.splice(0,1);
      }
      if (direction === 'right') {
        snake++;
        snakeArr.push(snake);
        $(`#${snake}`).css('background','green');
        // remove from tail as it leaves the square
        $(`#${snakeArr[0]}`).css('background','transparent');
        snakeArr.splice(0,1);

      }
      if (direction === 'down') {
        snake+=20;
        snakeArr.push(snake);
        $(`#${snake}`).css('background','green');
        // remove from tail
        $(`#${snakeArr[0]}`).css('background','transparent');
        snakeArr.splice(0,1);

      }
      if (direction === 'left') {
        snake--;
        snakeArr.push(snake);
        $(`#${snake}`).css('background','green');
        // remove from tail
        $(`#${snakeArr[0]}`).css('background', 'transparent');
        snakeArr.splice(0,1);
      }

      if (snakeArr[snakeArr.length-1] === apple ) {
        snakeArr.push(appleArr[appleArr.length-1]);
        score+= 10;
        console.log(score);
        $('#score').text("Score: " + score);
        apple = Math.floor(Math.random() * 401);
        $(`#${apple}`).css('background','red');
        console.log(snakeArr);
        console.log(snake);

      }
      for (var i = 0; i < snakeArr.length-2; i++) {
        if (snake == snakeArr[i]) {
          gameOver();
          console.log(snakeArr[i]);
          console.log(snakeArr);
        }
      }
    }


    // Keys to press for movement and reassigns variable for function to work
    $(document).keydown(function(event){
      if (event.keyCode === 37 && direction == 'right') {
        direction = 'right';
        event.preventDefault();
        console.log("can't go left on yourself");
      } else if (event.keyCode === 37){
        direction = 'left';
        event.preventDefault();
      }
      if (event.keyCode === 39 && direction == 'left') {
        direction = 'left';
        console.log("Can't go right on yourself!");
        event.preventDefault();
      } else if (event.keyCode === 39){
        direction = 'right';
        event.preventDefault();
      }
      if (event.keyCode === 38 && direction == 'down'){
        direction = 'down';
        event.preventDefault();
        console.log("can't go down on yourself")
      } else if (event.keyCode === 38){
        direction = 'up';
        event.preventDefault();

      }
      if (event.keyCode === 40 && direction == "up" ){
        direction = 'up';
        event.preventDefault();
        console.log("can't go up on yourself");
      } else if (event.keyCode === 40){
        direction = 'down';
        event.preventDefault();

      }
    });

      // ============ UP DOWN
    /* If the direction is left and the key pressed is 39, it should stay left and it isn't supposed to be able to overlap itself
    if the snake goes to square 40 it should re-appear at square 1 with the same length of arrays

    */



    function gameOver() {
      var gameOverText1 = "<h2> Game Over! You scored: " + score + " points</h2>"
      $('#snakeBoard').html(gameOverText1);
      clearInterval(sec);
    }

  }); //start game function ends

  // reset button
  $('#reset').click(function(){
    location.reload();
  }) // reset button end

}); //document end
