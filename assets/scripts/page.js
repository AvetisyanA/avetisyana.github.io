(function (TicTacToe){
  if (typeof TicTacToe === "undefined") {
    console.error("TicTacToe is undefined");
    return;
  }

  var game = new TicTacToe();

  document.addEventListener("DOMContentLoaded", function(event) {
    var newGameButton = document.getElementById("new-game-button");
    var newGameDialogButton = document.getElementById("new-game-dialog-button");
    var gameBoard = document.getElementsByClassName("game-board")[0];
    newGameButton.addEventListener("click", onNewGame);
    newGameDialogButton.addEventListener("click", onNewGame);
    gameBoard.addEventListener("click", onGameEvent);
  });

  function onNewGame() {
    game = new TicTacToe();
    updateBoard();
    gameOver(false);
  }

  function onGameEvent(eventArgument) {
    if (game.isGameOver()) {
      return;
    }

    var gameRows = document.getElementsByClassName("game-row");
    for (var i = 0; i < gameRows.length; i++) {
      var rowDiv = gameRows[i];
      for (var j = 0; j < rowDiv.children.length; j++) {
        if (eventArgument.target === rowDiv.children[j]) {
          if (!game.putX(i, j)) {
            return;
          }

          if (game.isGameOver()) {
            updateBoard();
            gameOver(true);
            return;
          }

          aiGameMove();
          updateBoard();
          if (game.isGameOver()) {
            gameOver(true);
          }

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
          var needReset = game.putO(i, j);
          if (needReset) {
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
    var gameRows = document.getElementsByClassName("game-row");
    for (var i = 0; i < game.getBoardSize(); i++) {
      for (var j = 0; j < game.getBoardSize(); j++) {
          if (game.isX(i, j)) {
            gameRows[i].children[j].children[0].className =
              "fa fa-times fa-3x align";
          }
          else if(game.isO(i, j)) {
            gameRows[i].children[j].children[0].className =
              "fa fa-circle-o fa-3x align";
          }
          else {
            gameRows[i].children[j].children[0].className = "";
          }
      }
    }
  }

  function gameOver(show) {
    var gameOverPanel = document.getElementById("game-over-panel");
    gameOverPanel.className = show ? "show-panel" : "";
  }

})(TicTacToe);
