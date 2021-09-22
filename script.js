const jogador = document.querySelector('.jogador')
const areaDeJogo = document.querySelector('#fundo-jogo')
const aliens = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png']
const instrucoesTexto = document.querySelector('.instrucoes')
const botaoDeInicio = document.querySelector('.iniciar-jogo')
let alienIntervalo

function acionarNave(event) {
    if (event.key === 'w') {
        event.preventDefault()
        moverPraCima()
    } else if (event.key === 's') {
        event.preventDefault()
        moverPraBaixo()
    } else if (event.key === ' ') {
        event.preventDefault()
        configurarLaser()
    }
}

function moverPraCima() {
    let posicaoTop = getComputedStyle(jogador).getPropertyValue('top')
    if (posicaoTop == "5px") {
        return
    } else {
        let posicao = parseInt(posicaoTop)
        posicao -= 25
        jogador.style.top = `${posicao}px`
    }
}

function moverPraBaixo() {
    let posicaoTop = getComputedStyle(jogador).getPropertyValue('top')
    if (posicaoTop === "530px") {
        return
    } else {
        let posicao = parseInt(posicaoTop)
        posicao += 25
        jogador.style.top = `${posicao}px`
    }
}

function configurarLaser() {
    let laser = criarLaser()
    areaDeJogo.appendChild(laser)
    moverLaser(laser)
}

function criarLaser() {
    let posicaoX = parseInt(window.getComputedStyle(jogador).getPropertyValue('left'))
    let posicaoY = parseInt(window.getComputedStyle(jogador).getPropertyValue('top'))
    let novoLaser = document.createElement('img')
    novoLaser.src = 'img/shoot.png'
    novoLaser.classList.add('laser')
    novoLaser.style.left = `${posicaoX}px`
    novoLaser.style.top = `${posicaoY - 10}px`
    return novoLaser
}

function moverLaser(laser) {
    setInterval(() => {
        let posicaoX = parseInt(laser.style.left)
        let aliens = document.querySelectorAll('.alien')

        aliens.forEach((alien) => {
            if (verificarColisoes(laser, alien)) {
                alien.src = 'img/explosion.png'
                alien.classList.remove('alien')
                alien.classList.add('alien-destruido')
            }
        })

        if (posicaoX === 340) {
            laser.remove()
        } else {
            laser.style.left = `${posicaoX + 8}px`
        }
    }, 10)
}

function criarAlien() {
    let novoAlien = document.createElement('img')
    let alienSorteado = aliens[Math.floor(Math.random() * aliens.length)]
    novoAlien.src = alienSorteado
    novoAlien.classList.add('alien')
    novoAlien.classList.add('alien-transition')
    novoAlien.style.left = '370px'
    novoAlien.style.top = `${Math.floor(Math.random() * 330 + 30)}px`
    areaDeJogo.appendChild(novoAlien)
    moverAlien(novoAlien)

}

function moverAlien(alien) {
    setInterval(() => {
        let posicaoX = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
        if (posicaoX <= 50) {
            if (Array.from(alien.classList).includes('alien-destruido')) {
                alien.remove()
            } else {
                gameOver()
            }
        } else {
            alien.style.left = `${posicaoX - 2}px`
        }
    }, 30)
}

function verificarColisoes(laser, alien) {
    let laserTop = parseInt(laser.style.top)
    let laserLeft = parseInt(laser.style.left)
    let laserBottom = laserTop - 20
    let alienTop = parseInt(alien.style.top)
    let alienLeft = parseInt(alien.style.left)
    let alienBottom = alienTop - 30

    if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if (laserTop <= alienTop && laserTop >= alienBottom) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

botaoDeInicio.addEventListener('click', () => {
    iniciarJogo()
})
function iniciarJogo() {
    botaoDeInicio.style.display = 'none'
    instrucoesTexto.style.display = 'none'
    window.addEventListener('keydown', acionarNave)
    alienIntervalo = setInterval(() => {
        criarAlien()
    }, 2000)
}

function gameOver(){
    window.removeEventListener('keydown', acionarNave)
    clearInterval(alienIntervalo)
    let aliens = document.querySelectorAll('.alien')
    aliens.forEach((alien) => alien.remove())
    let lasers = document.querySelectorAll('.laser')
    lasers.forEach((laser) => {
        laser.remove()
    })
    setTimeout(() => {
        alert('Game Over')
        jogador.style.top = '250px'
        botaoDeInicio.style.display = 'block'
        instrucoesTexto.style.display = 'block'
    })
}



