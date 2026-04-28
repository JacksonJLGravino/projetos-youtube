let clicks = 0;
let winner = false;
const matrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function process(pos) {
  clicks++;
  let type = clicks % 2 === 0 ? "O" : "X";
  if (!document.game.opt[pos].value) {
    if (!winner) {
      document.game.opt[pos].value = type;
      check(type);
    } else {
      alert("O " + winner + " já venceu.");
    }
  } else {
    alert("Você já jogou ai");
  }

  if (clicks === 9 && !winner) {
    alert("Deu velha");
  }
}

function check(type) {
  matrix.forEach(function (x) {
    let count = 0;
    x.forEach(function (y) {
      if (document.game.opt[y] && document.game.opt[y].value === type) count++;
    });
    if (count == 3) {
      wins(x);
      let person = document.game[type].value || type;
      winner = person;
      alert("Parabéns " + person + "!!! você ganhou!!!");
    }
  });
}

function wins(x) {
  x.forEach(function (i) {
    document.game.opt[i].className = "wins";
  });
}

function restart() {
  for (x = 0; x <= 8; x++) {
    document.game.opt[x].value = "";
    document.game.opt[x].className = "";
  }
  document.game.X.value = "";
  document.game.O.value = "";
  winner = false;
  clicks = 0;
}
