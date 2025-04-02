console.log("JS CONECTADO!");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const COpassword = document.getElementById("COpassword");
const tel = document.getElementById("tel");
const CPF = document.getElementById("CPF");
const RG = document.getElementById("RG");
const msgError = document.getElementsByClassName("msgError");

/* ------ FUNÇÃO PARA RENDERIZAR AS DIFERENTES MENSAGENS DE ERRO! ------ */
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};
/* --------------------------------------------------------------------- */

/* ---------------- FUNÇÃO PARA VERIFICAR O NOME ----------------------- */
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR O EMAIL --------------------- */
const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR IGUALDADE DAS SENHAS --------------- */
function checkPasswordMatch() {
  return password.value === confirmarSenha.value ? true : false;
}
/* --------------------------------------------------------------------- */

/* ----------- FUNÇÃO PARA INSERIR MASCARA NO TELEFONE ----------------- */

function maskPhoneNumber(event) {
  let tel = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(tel)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  tel = tel.replace(/\D/g, ""); // Remove os caracteres não numéricos

  if (tel.length > 11) {
    tel = tel.substring(0, 11);
  }

  if (tel.length > 2) {
    tel = `(${tel.substring(0, 2)}) ${tel.substring(2)}`;
  } else if (tel.length > 0) {
    tel = `(${tel}`;
  }

  if (tel.length > 10) {
    tel = tel.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = tel;
}
/* --------------------------------------------------------------------- */

/* ----------- FUNÇÃO PARA INSERIR MÁSCARA NO CPF ----------------- */
function maskCPF(event) {
  let CPF = event.target.value.replace(/[^0-9]/gi, ""); // Remove tudo que não seja número

  CPF = CPF.substring(0, 11); // Limita a 11 caracteres

  // Aplica a máscara XXX.XXX.XXX-XX
  CPF = CPF.replace(/(\d{3})(\d)/, "$1.$2");
  CPF = CPF.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  CPF = CPF.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  event.target.value = CPF; // Atualiza o valor do campo CPF
}

CPF.addEventListener("input", maskCPF); // Aplica a máscara ao campo CPF enquanto o usuário digita
/* --------------------------------------------------------------------- */

/* ----------- FUNÇÃO PARA INSERIR MÁSCARA NO RG ----------------- */
function maskRG(event) {
  let RG = event.target.value.replace(/[^0-9X]/gi, ""); // Remove tudo que não seja número ou "X"

  RG = RG.substring(0, 9); // Limita a 9 caracteres

  // Aplica a máscara XX.XXX.XXX-X
  RG = RG.replace(/(\w{2})(\w)/, "$1.$2");
  RG = RG.replace(/(\w{2})\.(\w{3})(\w)/, "$1.$2.$3");
  RG = RG.replace(/(\w{2})\.(\w{3})\.(\w{3})(\w)/, "$1.$2.$3-$4");

  event.target.value = RG; // Atualiza o valor do campo RG
}

RG.addEventListener("input", maskRG); // Aplica a máscara ao campo RG enquanto o usuário digita
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA VERIFICAR FORÇA DA SENHA ------------------ */
function checkPasswordStrength(password) {
  if (!/[a-z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(password)) {
    return "A senha deve ter pelo menos um caractere especial!";
  }
  if (!/\d/.test(password)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA CRIAR "CHUVA" NO FORMULÁRIO ------------------ */
const rainFunction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.querySelector(".container_rain");
  let left = Math.floor(Math.random() * (310 - 65) + 65); // Define posição aleatória da chuva
  let duration = Math.random() * 5;

  rain.classList.add("rain"); // Adiciona a classe 'rain' ao elemento criado
  cont_rain.appendChild(rain);
  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain.removeChild(rain); // Remove a "gota de chuva" após 1.5 segundos
  }, 1500);
};

setInterval(rainFunction, 250); // Chama a função a cada 250ms para criar o efeito de chuva
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA VERIFICAR E ENVIAR DADOS ------------------ */
function fetchDatas(event) {
  event.preventDefault();

  if (!checkNome) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(password.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (celular.value && /[A-Za-zÀ-ÿ]/.test(tel.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    password: password.value,
    tel: tel.value,
    CPF: CPF.value,
    RG: RG.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA VALIDAR E ENVIAR OS DADOS DO FORMULÁRIO ------------------ */
function fetchDatas(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Valida cada campo antes de prosseguir
  if (!checkNome(nome.value)) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(password.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (tel.value && /[A-Za-zÀ-ÿ]/.test(tel.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }
  formulario.addEventListener("submit", fetchDatas);
}
/* --------------------------------------------------------------------- */

/* ------------- ADICIONANDO EVENTOS------------------ */
nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é valido!");
  } else {
    createDisplayMsgError("");
  }
});

password.addEventListener("input", () => {
  if (password.value && checkPasswordStrength(password.value)) {
    createDisplayMsgError(checkPasswordStrength(password.value));
  } else {
    createDisplayMsgError("");
  }
});
/* --------------------------------------------------------------------- */

function checkPasswordStrength(password) {
  if (!/[a-z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(password)) {
    return "A senha deve ter pelo menos um caractere especial!";
  }
  if (!/\d/.test(password)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

tel.addEventListener("input", maskPhoneNumber);
