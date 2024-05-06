// Variáveis 
let form = document.querySelector("#form")
let name = document.querySelector("#name")
let sobrenome = document.querySelector("#sobrenome")
let nascimento = document.querySelector("#nascimento")
let password = document.querySelector("#senha")
let passwordN = document.querySelector("#senha2")
let email = document.querySelector("#email")

const logins = []

// Verificações 
form.addEventListener("submit", (event) => {
  event.preventDefault()
  let dateNasc = Number(nascimento.value.substr(0,4))
  let currentYear = new Date().getFullYear()
  let age = currentYear - dateNasc
// o return para a execução do código 
  
  if(name.value === "") {
    border(name,"red", "input1", "Por favor, digite seu nome")
    return
  } else {
    border(name, "#81d581", "input1", "")
  }
  
  if(sobrenome.value === "") {
    border(sobrenome,"red", "input2", "Por favor, digite seu sobrenome")
    return
  } else {
    border(sobrenome, "#81d581", "input2", "")
  }
  
  if(age < 18) {
    border(nascimento,"red", "input3", "Você não tem idade para criar uma conta")
    return
  } else {
    border(nascimento,"#81d581", "input3", "")
  }
  
  if(password.value.length <= 8) {
    border(password, "red", "input4","Por favor, sua senha precisa ter no mínimo 8 digitos")
    return
  } else {
    border(password, "#81d581", "input4","")
  }
  
  if(passwordN.value !== password.value) {
    border(passwordN, "red", "input5","As senhas não coincidem")
    return
  } else {
    border(passwordN, "#81d581", "input5","")
  }
  
  if(email.value === "" || !isEmailValid(email.value)) {
    border(email, "red", "input6","Por favor, digite um e-mail válido")
    return
  } else {
    border(email, "#81d581", "input6","")
  }
  
/*  createLogin({
    name: name.value,
    sobrenome: sobrenome.value,
    year: nascimento.value,
    age: age,
    password: password.value,
    email: email.value
  }) */
  addBd({
    nome: name.value,
    sobrenome: sobrenome.value,
    idade: age,
    ano: nascimento.value,
    senha: password.value,
    email: email.value
  })
  
})
const passwords = [password, passwordN]
document.querySelectorAll(".pass").forEach((item, i) => {
  item.addEventListener("click", () => {
  if(passwords[i].getAttribute("type") === "password") {
    passwords[i].setAttribute("type", "text")
    item.classList.replace("bi-eye-fill","bi-eye-slash-fill")
  } else {
    passwords[i].setAttribute("type", "password")
    item.classList.replace("bi-eye-slash-fill", "bi-eye-fill")
  }
})
})

// funções
function isEmailValid(email) {
  const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/)
  if(emailRegex.test(email)) {
    return true
  }
  return false
}

function createLogin(login) {
  logins.push(login)
  console.log(logins)
}

function border(elemento, color,input , msg) {
  elemento.style.border = `1px solid ${color}`
  document.querySelector(`.${input}`).innerHTML = msg
}

function addBd(objeto) {
  firebase.initializeApp({
    apiKey: "AIzaSyAHAfjNvHoQ-s-gNkg4T3MxLPIVs5nL3GI",
    authDomain: "tutorial-javascript-80877.firebaseapp.com",
    projectId: "tutorial-javascript-80877",
    storageBucket: "tutorial-javascript-80877.appspot.com",
    messagingSenderId: "204974399774",
    appId: "1:204974399774:web:fa292851dc50677288690f"
  })
  
  const bd = firebase.firestore()
  
  bd.collection("users").add({
    nome: objeto.nome,
    sobrenome: objeto.sobrenome,
    idade: objeto.idade,
    ano: objeto.ano,
    senha: objeto.senha,
    email: objeto.email
  }).then((doc) => {
    console.log(doc.id)
  })
}