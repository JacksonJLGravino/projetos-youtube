const horas = document.querySelector("#horas");
const minutos = document.querySelector("#minutos");
const segundos = document.querySelector("#segundos");
const contador = document.querySelector("#contador");

function iniciarContador() {
  if (horas.value > 23) {
    horas.value = 23;
  }
  if (minutos.value > 59) {
    minutos.value = 59;
  }
  if (segundos.value > 59) {
    segundos.value = 59;
  }

  let hors = parseInt(horas.value, 10);
  let min = parseInt(minutos.value, 10);
  let sec = parseInt(segundos.value, 10);

  setInterval(() => {
    sec--;
    if (sec === 0) {
      if (min > 0) {
        min--;
        sec = 59;
      } else if (hors > 0) {
        hors--;
        min = 59;
        sec = 59;
      } else if (sec === 0 && min === 0 && hors === 0) {
        alert("timer concluido");
        location.reload();
      }
    }

    sec = sec < 10 ? "0" + sec : sec;
    min = min < 10 ? "0" + min : min;

    contador.innerHTML = hors + ":" + min + ":" + sec;
    min = parseInt(min);
  }, 1000);
}
