import { useState } from "react";
import "./App.css";
import { Botao } from "./components/botao/Botao";
import { BotaoZero } from "./components/botaoZero/BotaoZero";

function App() {
  const [numeroUm, setNumeroUm] = useState("");
  const [simbolo, setSimbolo] = useState("");
  const [numeroDois, setNumeroDois] = useState("");

  function adicionarNumero(n) {
    let num = numeroUm + n;
    setNumeroUm(num);
  }

  function conta(sinal) {
    if (numeroUm != "" && numeroDois != "") {
      if (simbolo === "/") {
        setNumeroDois(parseFloat(numeroDois) / parseFloat(numeroUm));
      } else if (simbolo === "*") {
        setNumeroDois(parseFloat(numeroDois) * parseFloat(numeroUm));
      } else if (simbolo === "-") {
        setNumeroDois(parseFloat(numeroDois) - parseFloat(numeroUm));
      } else if (simbolo === "+") {
        setNumeroDois(parseFloat(numeroDois) + parseFloat(numeroUm));
      }
      setSimbolo(sinal);
      setNumeroUm("");
    } else {
      setSimbolo(sinal);
      setNumeroDois(numeroUm);
      setNumeroUm("");
    }
  }

  function resultado() {
    if (numeroUm != "" && numeroDois != "" && simbolo != "=") {
      if (simbolo === "/") {
        setNumeroUm(parseFloat(numeroDois) / parseFloat(numeroUm));
      } else if (simbolo === "*") {
        setNumeroUm(parseFloat(numeroDois) * parseFloat(numeroUm));
      } else if (simbolo === "-") {
        setNumeroUm(parseFloat(numeroDois) - parseFloat(numeroUm));
      } else if (simbolo === "+") {
        setNumeroUm(parseFloat(numeroDois) + parseFloat(numeroUm));
      }
      setNumeroDois("");
      setSimbolo("=");
    }
  }

  function limpar() {
    setNumeroUm("");
  }

  function limparTudo() {
    setNumeroUm("");
    setNumeroDois("");
    setSimbolo("");
  }

  function porcentagem() {
    let p = (parseFloat(numeroUm) / 100) * parseFloat(numeroDois);
    setNumeroUm(p);
  }

  function adicionarPonto() {
    if (numeroUm === "") {
      setNumeroUm("0.");
    } else if (!numeroUm.includes(".")) {
      let num = numeroUm + ".";
      setNumeroUm(num);
    }
  }

  return (
    <div className="content">
      <div className="calculadora">
        <div className="calculadoraHeader">
          <p className="equacao">{numeroDois}</p>
          <p className="solucao">
            {simbolo} {numeroUm}
          </p>
        </div>
        <div className="botoes">
          <div className="linhas">
            <Botao
              text={"CE"}
              background={"#616161"}
              color={"#A5A5A5"}
              onClick={() => limpar()}
            />
            <Botao
              text={"C"}
              background={"#616161"}
              color={"#A5A5A5"}
              onClick={() => limparTudo()}
            />
            <Botao
              text={"%"}
              background={"#616161"}
              color={"#A5A5A5"}
              onClick={() => porcentagem()}
            />
            <Botao
              text={"/"}
              background={"#005DB2"}
              color={"#339DFF"}
              onClick={() => conta("/")}
            />
          </div>
          <div className="linhas">
            <Botao
              text={"7"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(7)}
            />
            <Botao
              text={"8"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(8)}
            />
            <Botao
              text={"9"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(9)}
            />
            <Botao
              text={"X"}
              background={"#005DB2"}
              color={"#339DFF"}
              onClick={() => conta("*")}
            />
          </div>
          <div className="linhas">
            <Botao
              text={"4"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(4)}
            />
            <Botao
              text={"5"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(5)}
            />
            <Botao
              text={"6"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(6)}
            />
            <Botao
              text={"-"}
              background={"#005DB2"}
              color={"#339DFF"}
              onClick={() => conta("-")}
            />
          </div>
          <div className="linhas">
            <Botao
              text={"1"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(1)}
            />
            <Botao
              text={"2"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(2)}
            />
            <Botao
              text={"3"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(3)}
            />
            <Botao
              text={"+"}
              background={"#005DB2"}
              color={"#339DFF"}
              onClick={() => conta("+")}
            />
          </div>
          <div className="linhas">
            <BotaoZero
              text={"0"}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarNumero(0)}
            />
            <Botao
              text={"."}
              background={"#616161"}
              color={"#29A8FF"}
              onClick={() => adicionarPonto()}
            />
            <Botao
              text={"="}
              background={"#005DB2"}
              color={"#339DFF"}
              onClick={() => resultado()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
