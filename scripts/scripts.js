console.log("JS CONECTADO"); // Mensagem no console para indicar que o script está carregado corretamente.

const formulario = document.getElementById("cadastroForm"); // Obtém o formulário pelo ID
const nome = document.getElementById("nome"); // Obtém o campo de nome
const email = document.getElementById("email"); // Obtém o campo de e-mail
const password = document.getElementById("password"); // Obtém o campo de senha
const COpassword = document.getElementById("COpassword"); // Obtém o campo de confirmação de senha
const tel = document.getElementById("tel"); // Obtém o campo de telefone
const CPF = document.getElementById("CPF"); // Obtém o campo de CPF
const RG = document.getElementById("RG"); // Obtém o campo de RG
const msgError = document.getElementsByClassName("msgError"); // Obtém o elemento onde será exibida a mensagem de erro

/* ------ FUNÇÃO PARA EXIBIR UMA MENSAGEM DE ERRO NO FORMULÁRIO ------ */
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem; // Define o texto da primeira classe 'msgError' como a mensagem de erro passada
};

/* ---------------- FUNÇÃO PARA VALIDAR O NOME ----------------------- */
const chekNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Expressão regular para permitir apenas letras e espaços
  return nomeRegex.test(nome.value); // Retorna verdadeiro se o nome estiver no formato correto
};

/* ---------- FUNÇÃO PARA VALIDAR O E-MAIL --------------------- */
const chekEmail = (email) => {
  const partesEmail = email.split("@"); // Divide o e-mail pelo símbolo '@'

  // Verifica se o e-mail pertence a um dos domínios permitidos
  return (
    partesEmail.length === 2 &&
    ["gmail.com", "outlook.com", "hotmail.com"].includes(
      partesEmail[1].toLowerCase()
    )
  );
};

/* ---------- FUNÇÃO PARA VERIFICAR SE AS SENHAS COINCIDEM --------------- */
function chekPasswordMatch() {
  return password.value === COpassword.value; // Retorna verdadeiro se as senhas forem iguais
}

/* ----------- FUNÇÃO PARA INSERIR MÁSCARA NO TELEFONE ----------------- */
function maskPhoneNumber(event) {
  let tel = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(tel)) {
    // Verifica se há letras no telefone
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  tel = tel.replace(/\D/g, ""); // Remove todos os caracteres que não sejam números

  if (tel.length > 11) {
    tel = tel.substring(0, 11); // Limita o tamanho do telefone
  }

  // Adiciona a máscara de telefone no formato (XX) XXXXX-XXXX
  if (tel.length > 2) {
    tel = `(${tel.substring(0, 2)}) ${tel.substring(2)}`;
  } else if (tel.length > 0) {
    tel = `(${tel})`;
  }

  if (tel.length > 10) {
    tel = tel.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = tel; // Atualiza o valor do campo
}

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

/* ------------- FUNÇÃO PARA VERIFICAR A FORÇA DA SENHA ------------------ */
function chekPasswordStrength(password) {
  if (!/[a-z]/.test(password))
    return "A senha deve ter pelo menos uma letra minúscula!";
  if (!/[A-Z]/.test(password))
    return "A senha deve ter pelo menos uma letra maiúscula!";
  if (!/[\W_]/.test(password))
    return "A senha deve ter pelo menos um caractere especial!";
  if (!/\d/.test(password)) return "A senha deve ter pelo menos um número!";
  if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres!";

  return null; // Retorna null se a senha atender a todos os requisitos
}

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

/* ------------- FUNÇÃO PARA VALIDAR E ENVIAR OS DADOS DO FORMULÁRIO ------------------ */
function fetchDatas(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Valida cada campo antes de prosseguir
  if (!chekNome(nome.value)) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!chekEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
    return;
  }

  if (!chekPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = chekPasswordStrength(password.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (tel.value && /[A-Za-zÀ-ÿ]/.test(tel.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  // Cria um objeto com os dados do formulário
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

formulario.addEventListener("submit", fetchDatas); // Adiciona evento de envio ao formulário
