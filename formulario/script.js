const form = document.getElementById("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const termos = document.getElementById("termos");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validarFormulario()) {
    alert("Formulário enviado com sucesso!");
    form.reset();
  }
});

function validarFormulario() {
  const nomeValido = validarNome();
  const emailValido = validarEmail();
  const senhaValida = validarSenha();
  const confirmacaoValida = validarConfirmacaoSenha();
  const termosValidos = validarTermos();

  return (
    nomeValido &&
    emailValido &&
    senhaValida &&
    confirmacaoValida &&
    termosValidos
  );
}

function validarNome() {
  if (nome.value.trim() === "") {
    setErro(nome, "O nome é obrigatorio");
    return false;
  }
  setSucesso(nome);
  return true;
}

function validarEmail() {
  if (!requisitosEmail(email.value)) {
    setErro(email, "Email inválido");
    return false;
  }
  setSucesso(email);
  return true;
}

function validarSenha() {
  if (!senhaForte(senha.value)) {
    setErro(
      senha,
      "A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial",
    );
    return false;
  }
  setSucesso(senha);
  return true;
}

function validarConfirmacaoSenha() {
  if (confirmarSenha === "" || senha.value !== confirmarSenha.value) {
    setErro(confirmarSenha, "As senhas não coincidem");
    return false;
  }
  setSucesso(confirmarSenha);
  return true;
}

function validarTermos() {
  if (!termos.checked) {
    setErro(termos, "Você precisa aceitar os termos");
    return false;
  }
  setSucesso(termos);
  return true;
}

function setErro(input, mensagem) {
  const campo = input.parentElement;
  const small = campo.querySelector(".erro");
  small.innerText = mensagem;
}

function setSucesso(input) {
  const campo = input.parentElement;
  const small = campo.querySelector(".erro");
  small.innerText = "";
}

function requisitosEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function senhaForte(senha) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(senha);
}
