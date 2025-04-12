const forms = document.getElementById("form");
const campos = forms.querySelectorAll(".required");
const span = document.querySelectorAll(".error");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

forms.addEventListener("submit", (event) => {
  event.preventDefault();
  validarNome();
  validarEmail();
  validarSenha();
  validarSenhaConfirmacao();
});

function pegarErro(index) {
  campos[index].style.border = "2px solid red";
  span[index].style.display = "block";
}

function limparErro(index) {
  campos[index].style.border = "";
  span[index].style.display = "none";
}

function validarNome() {
  if (campos[0].value.length < 3) {
    pegarErro(0);
  } else {
    limparErro(0);
  }
}

function validarEmail() {
  if (!regexEmail.test(campos[1].value)) {
    pegarErro(1);
  } else {
    limparErro(1);
  }
}

function validarSenha() {
  if (campos[2].value.length < 6) {
    pegarErro(2);
  } else {
    limparErro(2);
    validarSenhaConfirmacao();
  }
}

function validarSenhaConfirmacao() {
  if (campos[2].value == campos[3].value && campos[3].value.length >= 6) {
    limparErro(3);
  } else {
    pegarErro(3);
  }
}

function cadastro() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (nome && email) {
    alert(`Cadastro realizado com sucesso!\nNome: ${nome}\nEmail: ${email}`);
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

function atualizarAno() {
  const anoAtual = new Date().getFullYear();
  document.getElementById("anoAtual").textContent = anoAtual;
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarAno();
});
