(function (TicTacToe){
  if (typeof TicTacToe === "undefined") {
    console.error("TicTacToe is undefined");
    return;
  }

  var game = new TicTacToe();

  document.addEventListener("DOMContentLoaded", function(event) {
    var newGameButton = document.getElementById("newGame");
    var gameBoard = document.getElementsByClassName("game-board")[0];
    newGameButton.addEventListener("click", onNewGame);
    gameBoard.addEventListener("click", onGameEvent);
  });

  function onNewGame() {
    game = new TicTacToe();
    updateBoard();
  }

  function onGameEvent(eventArgument) {
    var gameBoard = document.getElementsByClassName("game-board")[0];
    for (var i = 0; i < gameBoard.children.length; i++) {
      var rowDiv = gameBoard.children[i];
      for (var j = 0; j < rowDiv.children.length; j++) {
        if (eventArgument.target === rowDiv.children[j]) {
          if (!game.putX(i, j)) {
            return;
          }

          aiGameMove();
          updateBoard();
          return;
        }
      }
    }
  }

  function aiGameMove() {
      var n = -1;
      var m = -1;
      var weight;
      for (var i = 0; i < game.getBoardSize(); ++i) {
        for (var j = 0; j < game.getBoardSize(); ++j) {
          var reset = game.putO(i, j);
          if (reset) {
            var newWeight = game.calculateWeight("O");
            if (typeof (weight) == "undefined" || newWeight > weight) {
              weight = newWeight;
              n = i;
              m = j;
            }

            game.reset(i, j);
          }
        }
      }

      if (n > -1) {
        game.putO(n, m);
      }
  }

  function updateBoard() {
    var gameBoard = document.getElementsByClassName("game-board")[0];
    for (var i = 0; i < game.getBoardSize(); i++) {
      for (var j = 0; j < game.getBoardSize(); j++) {
          if (game.isX(i, j)) {
            gameBoard.children[i].children[j].children[0].className =
              "fa fa-times fa-3x align";
          }
          else if(game.isO(i, j)) {
            gameBoard.children[i].children[j].children[0].className =
              "fa fa-circle-o fa-3x align";
          }
          else {
            gameBoard.children[i].children[j].children[0].className = "";
          }
      }
    }
  }

})(TicTacToe);
