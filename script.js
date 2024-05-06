//import { telaLogin } from "../module.js"
// Criando menu menu hamburger na versão mobile
let menu = document.querySelector(".sidebar")

document.querySelector(".menu-hamburger").addEventListener("click",function() {
    menu.classList.toggle("expandir")
})

/* Adicionando o bom dia, boa tarde ou boa noite */
let h = new Date()
let hora

if(h.getHours() > 4 && h.getHours() < 12) {
  hora = "Bom dia"
} else if (h.getHours() >= 12 && h.getHours() < 18) {
  hora = "Boa tarde"
} else if(h.getHours() >= 18) {
  hora = "Boa noite"
} else {
  hora = "Boa Madrugada"
}

let msg = document.querySelector("#greeting").innerHTML = hora

/* Criando a parte da escolha dos artistas */
let artists = [
 { id: 1, name: "Foo Fighters", genre: "Rock", urlImg: "https://i.scdn.co/image/ab67616100005174c884df599abc793c116cdf15", sound: "Foo-Fighters"},
  { id: 2, name: "Michael Jackson", genre: "Pop", urlImg: "https://i.scdn.co/image/ab676161000051740e08ea2c4d6789fbf5cbe0aa" },
  { id: 3, name: "Emicida", genre: "Hip Hop", urlImg: "https://i.scdn.co/image/ab67616100005174908b4b4bc90e1518b68b4068" },
  { id: 4, name: "Chitãozinho e Xororó", genre: "Sertanejo", urlImg: "https://i.scdn.co/image/ab676161000051744606c59411c57f7b49588be4" },
  { id: 5, name: "Mc Coringa", genre: "Funk", urlImg: "https://i.scdn.co/image/ab67616d00001e02fe8f6dd361ad0f12b88c7f56" },
  { id: 6, name: "Arlindo Cruz", genre: "Samba", urlImg: "https://i.scdn.co/image/ab67616100005174181873f93056642d7b340839" },
  { id: 7, name: "Caetano Veloso", genre: "MPB", urlImg: "https://i.scdn.co/image/ab67616100005174e98de50f36cf1aa4bf047757" }, {
    id: 8, name: "Lana Del Rey", genre: "Pop", urlImg: "src/assets/imagens/lana.jpg", sound: "Lana-Del-Rey"
  }, {
    id: 9, name: "Tame Impala - Let it happen", genre: "Indie", urlImg: "src/assets/imagens/tame-impala.jpg", sound: "tame-impala"
  }, {
    id: 10, name: "Pink Floyd", genre: "Rock", urlImg: "src/assets/imagens/pink-floyd.jpg", sound: "pink-floyd-time"
  }, {
    id: 10, name: "Tame Impala - Boderline", genre: "Indie", urlImg: "src/assets/imagens/tame-impala-boderline.jpg", sound: "tame-impala-boderline"
  }, {
    id: 11, name: "Ethel Cain - American Teenager", genre: "Alternativo/Indie", urlImg: "src/assets/imagens/ethel-cain.jpg", sound: "ethel-cain"
  }]
    

let valorInput = document.querySelector("#search-input")
let resultArtist = document.querySelector("#result-artist")
let containerCards = document.querySelector(".offer__scroll-container")

let audio1 = document.querySelector(".audio")


document.querySelector("#search-input").addEventListener("input", function() {
  if(valorInput.value === ""){
    resultArtist.classList.add("hidden")
    containerCards.classList.remove("hidden")
  } else {
    let valorI = valorInput.value.toLowerCase()
  
    for(art of artists) {
  // Verificando se o input está de acordo com os artistas do array
      if(art.name.includes(valorInput.value)) {
        resultArtist.classList.remove("hidden")
        containerCards.classList.add("hidden")
        
    // adicionando os detalhes do artistas no card
        document.querySelector("#artist-img").setAttribute("src", art.urlImg)
        document.querySelector(".img-tl").setAttribute("src", art.urlImg)
        
        document.querySelector("#artist-name").innerHTML = art.name
        document.querySelector(".artista-nome").innerHTML = `<span>${art.name}</span>`
        
        document.querySelector(".artist-categorie").innerHTML = art.genre
        document.querySelector(".audio").setAttribute("src", `src/sounds/${art.sound}.mp3`)
        
      }
    }
  }
})
// Variáveis do "Tela Cheia"
let barraC = document.querySelector(".barra-comeco")
let barraF = document.querySelector(".barra-final")

let iconeTelaCheia = document.querySelector(".bi-play-circle-fill")
let icone = document.querySelector("#btn-play")

let barraInterna = document.querySelector(".barra-interna")
let tCheia = document.querySelector(".tela-cheia")

let mm = 0
let ss = 0
let cron

function minutagem(mi, se, duracaoAudio) {
  let duracaoTotal = 0
  cron = setInterval(() => {
    ss++
    tempo = duracaoTotal + ss
// criando a barra de progresso do player,  
    barraInterna.style.width = `${(tempo / duracaoAudio) * 100}%`
    
    if(ss > 59) {
      duracaoTotal += 60
      mm++
      ss = 0
    
    }
    barraC.innerHTML = `${mm < 10 ? "0"+mm : mm}:${ss < 10? "0"+ss : ss}`
    // parando a função dentro da própria função, usando ela msm
    
    if(mm == mi && ss == se) {
      clearInterval(cron)
    }
    }, 1000)
}

// Duração das músicas
function duracao() {
// Arredondando o resultado
  let duracaoAudio = audio1.duration
  let mi = Math.floor(duracaoAudio / 60)
  let se = Math.floor(duracaoAudio % 60)
  
  console.log(`Total = ${audio1.duration}`)
  barraF.innerHTML = `${mi < 10? "0"+mi :  mi}:${se < 10? "0"+se : se}`
  
  minutagem(mi, se, duracaoAudio)
}

function pararC() {
  clearInterval(cron)
}

// FUNÇÃO QUE MUDA O BOTÃO PLAY
function playPause() {
    if(icone.classList.contains("fa-play") || iconeTelaCheia.classList.contains("bi-play-circle-fill")) {
      
      icone.classList.replace("fa-play", "fa-pause")
      iconeTelaCheia.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill")
      mm = 0
      ss = 0
      audio1.play()
      duracao()
  
      } else {
        document.querySelector(".fa-pause").classList.replace("fa-pause", "fa-play")
        
        document.querySelector(".bi-pause-circle-fill").classList.replace("bi-pause-circle-fill", "bi-play-circle-fill")
        audio1.pause()
        pararC()
      }
}

for(let i = 0; i < 2 ; i++) {
  document.querySelectorAll(".play")[i].addEventListener("click", playPause)
}
// função de maximizar
document.querySelector(".hidden-tela-cheia").addEventListener("click", () => {
  tCheia.classList.remove("aparecer")
  document.querySelector("main").classList.remove("hidden")
  document.querySelector("footer").classList.remove("hidden")
  menu.classList.remove("hidden")
})
// adicionando a opção de minimizar clicando na seta
document.querySelector(".bi-arrows-fullscreen").addEventListener("click", () => {
  tCheia.classList.add("aparecer")
  document.querySelector("main").classList.add("hidden")
  document.querySelector("footer").classList.add("hidden")
  menu.classList.add("hidden")
})

