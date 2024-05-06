export let telaLogin = "Júnior"

let iconPassword = document.querySelector(".passw")
let loginP = document.querySelector("#password-login")

let emailLogin = document.querySelector("#email-login")
let passwordLogin = document.querySelector("#password-login")
 
 
    
iconPassword.addEventListener("click", () => {
  if(loginP.getAttribute("type") === "password") {
    loginP.setAttribute("type", "text")
    iconPassword.classList.replace("bi-eye-fill", "bi-eye-slash-fill")
  } else {
    loginP.setAttribute("type", "password")
    iconPassword.classList.replace("bi-eye-slash-fill", "bi-eye-fill")
  }
})


firebase.initializeApp({
  apiKey: "AIzaSyAHAfjNvHoQ-s-gNkg4T3MxLPIVs5nL3GI",
  authDomain: "tutorial-javascript-80877.firebaseapp.com",
  projectId: "tutorial-javascript-80877",
  storageBucket: "tutorial-javascript-80877.appspot.com",
  messagingSenderId: "204974399774",
  appId: "1:204974399774:web:fa292851dc50677288690f"
})
let bd = firebase.firestore()


document.querySelector("#form-login").addEventListener("submit", (e) => {
  e.preventDefault()
  
  if(emailLogin.value === "") {
    border(emailLogin, "red", "Por favor, digite seu e-mail")
    return
  } else {
    border(emailLogin, "#81d581", "")
  }
  
  if(passwordLogin.value === "") {
    border(passwordLogin, "red",  "Por favor,  digite uma senha válida")
    return
  } else {
    border(passwordLogin, "#81d581", "")
  }
  
  bd.collection("users").onSnapshot((documento) => {
    documento.docChanges().forEach((changes) => {
      let dado = changes.doc.data()
      if((emailLogin.value === dado.email) && (passwordLogin.value === dado.senha)) {
        border(emailLogin, "#81d581", "")
        border(passwordLogin, "#81d581", "")
        document.querySelector("#center").style.border = "1px solid #81d581"
        window.location.href = "index.html"
        document.body.classList.add(".true")
        return
      } else {
        border(emailLogin, "red", "")
        border(passwordLogin, "red", "")
        document.querySelector("#center").style.border = "1px solid red"
        alert("E-mail e senha não correspondem")
        return
      }
      
    })
  })
  
})

function border(elemento, color, msg) {
  elemento.style.border = `1px solid ${color}`
  if(msg !== "") {
    alert(msg)
  }
}
