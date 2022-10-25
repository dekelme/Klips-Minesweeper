const board = document.getElementById("board");
start()

function start() {
  board.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    row = board.insertRow(i);
    for (let j = 0; j < 10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function () {
        userClick(this);
      }
      var mine = document.createAttribute("haveMine");
      mine.value = "false"
      cell.setAttributeNode(mine);
    }
  }
  createMines();
}

function createMines() {
  for (let i = 0; i < 50; i++) {
    let row = Math.floor(Math.random() * 10)
    let col = Math.floor(Math.random() * 10)
    let cell = board.rows[row].cells[col].setAttribute("haveMine", "true");
  }
}

function progress() {
  let finish = true
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if ((board.rows[i].cells[j].getAttribute("haveMine") == "false") && (board.rows[i].cells[j].innerHTML == "")){
        finish = false;
      }
        
    }
  }
  if (finish) {
    endGame();
    alert("Game ended you won");
  }
}

function userClick(cell) {
  if (cell.getAttribute("haveMine") == "true") {
    endGame()
  }
  else {
    let count = 0;
    let boardRow = cell.parentNode.rowIndex;
    let boardCol = cell.cellIndex;
    for (let i = Math.max(boardRow - 1, 0); i <= Math.min(boardRow + 1, 9); i++) {
      for (let j = Math.max(boardCol - 1, 0); j <= Math.min(boardCol + 1, 9); j++) {
        if (board.rows[i].cells[j].getAttribute("haveMine") == "true") {
          count++;
        }

      }
    }
    cell.innerHTML = count;
    if (count == 0) {
      for (let i = Math.max(boardRow - 1, 0); i <= Math.min(boardRow + 1, 9); i++) {
        for (let j = Math.max(boardCol - 1, 0); j <= Math.min(boardCol + 1, 9); j++) {
          if (board.rows[i].cells[j].innerHTML == "") {
            userClick(board.rows[i].cells[j])
          }
        }
      }
    }
    progress()
  }
}

function endGame() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = board.rows[i].cells[j];
      if (cell.getAttribute("haveMine") == "true") {
        cell.className = "mine"
      }
    }
  }
}