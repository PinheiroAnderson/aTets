const forms = document.getElementById("form");
const campos = forms.querySelectorAll(".required");
const span = document.querySelectorAll(".error");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const historicoCadastro = document.getElementById("historicoCadastro");

function cadastro() {
  validarNome();
  validarEmail();
  validarSenha();
  validarSenhaConfirmacao();

  const nomeValido = campos[0].value.length >= 3;
  const emailValido = regexEmail.test(campos[1].value);
  const senhaValida = campos[2].value.length >= 6;
  const senhaConfirmada = campos[2].value === campos[3].value;

  return nomeValido && emailValido && senhaValida && senhaConfirmada;
}

forms.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (cadastro()) {
    const cadastroAnterior =
      JSON.parse(localStorage.getItem("historicoCadastro")) || [];
    cadastroAnterior.push({ nome: nome, email: email });
    localStorage.setItem("historicoCadastro", JSON.stringify(cadastroAnterior));

    cadastrosRealizados();
    forms.reset();
    campos.forEach((campo, index) => limparErro(index));
  } else {
    alert("Por favor, revise os campos do formulário.");
  }
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

function cadastrosRealizados() {
  const cadastroAnterior =
    JSON.parse(localStorage.getItem("historicoCadastro")) || [];
  historicoCadastro.innerHTML = "";

  cadastroAnterior.forEach((cadastro) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const nome = document.createElement("h3");
    nome.textContent = `Nome: ${cadastro.nome}`;

    const email = document.createElement("p");
    email.textContent = `E-mail: ${cadastro.email}`;

    card.appendChild(nome);
    card.appendChild(email);
    historicoCadastro.appendChild(card);
  });
}


window.addEventListener("DOMContentLoaded", cadastrosRealizados);
