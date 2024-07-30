let ctx; //canvas context 
var py_barra1; //posição y do pimeiro jogador
var py_barra2;  //posição y do segundo jogador
var p1_points; // pontos do jogador 1
var p2_points; // pontos do jogador 2
var intervalo = 40;
let ball_y_orientation, ball_x_orientation, ball_x, ball_y
let tecla1, tecla2
const altura = 500; //altura do canvas
const largura = 800; //largura do canvas
const larguraBarras = 20; //largura das barras jogadora
const alturaBarras = 200; //altura das barras jogadora
const px_barra1 = 10; // posição x do primeiro jogador
const px_barra2 = largura - larguraBarras - 10; // posição x do segundo jogador


function setup() {
    const canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")

    // inicializa as posições y do joagador 1 e do jogador 2 para metade da tela
    py_barra1 = py_barra2 = (altura / 2) - (alturaBarras / 2)

    // inicializa os pontos dos jogadores como 0
    p1_points = 0
    p2_points = 0

    // define um intervalo para o loop
    intervalo = intervalo + 0.5
    console.log(intervalo)
    setInterval(loop, 1000 / intervalo)
    inicializaBola()
}

function loop() {
    //Verifica se a bola está colidindo com a barra do jogador 1
    if (ball_x >= px_barra1 && ball_x <= px_barra1 + 10 && ball_y >= py_barra1 && ball_y <= py_barra1 + alturaBarras) {
        ball_x_orientation = 1
    }
    //Verifica se a bola está colidindo com a barra do jogador 2
    else if (ball_x >= px_barra2 && ball_x <= px_barra2 + 10 && ball_y >= py_barra2 && ball_y <= py_barra2 + alturaBarras) {
        ball_x_orientation = -1
    }

    // verifica se a bola bateu no chão ou no teto
    if (ball_y + 10 >= altura || ball_y <= 0) ball_y_orientation *= -1

    //move a bola no eixo X e Y
    ball_x += 5 * ball_x_orientation
    ball_y += 5 * ball_y_orientation

    if (ball_x + 10 > largura) {
        p1_points++
        inicializaBola()
    }
    else if (ball_x < 0) {
        p2_points++
        inicializaBola()
    }

    if (tecla1 == 87 && py_barra1 > 0) {
        py_barra1 -= 5
    } else if (tecla1 == 83 && py_barra1 + alturaBarras < altura) {
        py_barra1 += 5
    }

    if (tecla2 == 38 && py_barra2 > 0) {
        py_barra2 -= 5
    } else if (tecla2 == 40 && py_barra2 + alturaBarras < altura) {
        py_barra2 += 5
    }
    desenha()
}

function inicializaBola() {
    console.log(`${p1_points} VS ${p2_points}`)
    ball_y_orientation = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3
    ball_x_orientation = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3
    ball_x = largura / 2 - 10
    ball_y = altura / 2 - 10
}

function desenha() {
    // fundo do canvas
    desenhaBarras(0, 0, largura, altura, "#000")
    // barra 1
    desenhaBarras(px_barra1, py_barra1, larguraBarras, alturaBarras)
    // barra 2
    desenhaBarras(px_barra2, py_barra2, larguraBarras, alturaBarras)
    // barra do meio que funciona como "rede" separando os lados 
    desenhaBarras(largura / 2 - 5, 0, 5, altura);
    // bola
    desenhaCirculo(ball_x, ball_y, 10, 10)
    escrevePontos()
}

function desenhaBarras(x, y, largura, altura, color = "#fff") {
    ctx.fillStyle = color
    ctx.fillRect(x, y, largura, altura)
    ctx.fillStyle = "#000"
}

function desenhaCirculo(x, y, largura, altura, color = "#fff") {
    ctx.fillStyle = color
    var raio = largura / 2; // Calcula o raio com base na largura (assumindo que largura_vermelho é o diâmetro)
    ctx.beginPath(); // Inicia o caminho para desenhar
    ctx.arc(x + raio, y + raio, altura + raio - 5, 0, 3 * Math.PI); // Desenha um arco completo (círculo)
    ctx.fill(); // Preenche o círculo com a cor definida
}

function escrevePontos() {
    ctx.font = "50px monospace";
    ctx.fillStyle = "#fff";
    // largura/4 = 1/4 da tela = metade da tela do player 1
    ctx.fillText(p1_points, largura / 4, 50);
    // 3*(largura/4) = 3/4 da tela = metade da tela do player 2
    ctx.fillText(p2_points, 3 * (largura / 4), 50);
}

document.addEventListener("keydown", function (ev) {
    // keyCode 87 = w = sobe, keycode 83 = s = desce
    if (ev.keyCode == 87 || ev.keyCode == 83) {
        tecla1 = ev.keyCode
    }
    // keycode 38 = seta pra cima, keycode 40 = seta pra baixo
    else if (ev.keyCode == 38 || ev.keyCode == 40)
        tecla2 = ev.keyCode
})

setup()