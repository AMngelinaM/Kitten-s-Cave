let projeteis = [];

function dispararProjetil(
  x,
  y,
  velocidadeX = 0,
  velocidadeY = 5,
  raio = 5,
  origem = "cima"
) {
  projeteis.push({
    x: x,
    y: y,
    raio: raio,
    velocidadeX: velocidadeX,
    velocidadeY: velocidadeY,
    ativo: true,
    origem: origem, // "cima" ou "baixo"
  });
}

function atualizarProjeteis(larguraCenario, gato, onDano) {
  for (let i = 0; i < projeteis.length; i++) {
    let p = projeteis[i];
    if (!p.ativo) continue;

    p.x += p.velocidadeX;
    p.y += p.velocidadeY;

    // Remove se atingir a altura oposta
    if (
      (p.origem === "cima" && p.y >= yBaixo) ||
      (p.origem === "baixo" && p.y <= yCima) ||
      p.x - p.raio > larguraCenario ||
      p.x + p.raio < 0 ||
      p.y - p.raio > 1000 ||
      p.y + p.raio < 0
    ) {
      p.ativo = false;
      continue;
    }

    // Colisão com o gato
    if (
      p.x + p.raio > gato.x &&
      p.x - p.raio < gato.x + gato.largura &&
      p.y + p.raio > gato.y &&
      p.y - p.raio < gato.y + gato.altura
    ) {
      p.ativo = false;
      if (typeof onDano === "function") onDano();
    }
  }

  // Limpa projéteis inativos do array
  projeteis = projeteis.filter((p) => p.ativo);
}

function desenharProjeteis(ctx, camera) {
  for (let i = 0; i < projeteis.length; i++) {
    let p = projeteis[i];
    if (!p.ativo) continue;
    ctx.beginPath();
    ctx.arc(p.x + camera.offsetX, p.y + camera.offsetY, p.raio, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}

// ---- Intervalos de disparo ----

const quantidadeProjetilCima = 5;
const gapCima = 260;
const separacaoCima = 144;
const yCima = 110;

setInterval(() => {
  for (let i = 0; i < quantidadeProjetilCima; i++) {
    const x = gapCima + i * separacaoCima - camera.offsetX; // ajustado
    dispararProjetil(x, yCima, 0, 5, 5, "cima");
  }
}, 3500);

const quantidadeProjetilBaixo = 5;
const gapBaixo = 333;
const separacaoBaixo = 148;
let yBaixo = 500; // altura do cenário

setInterval(() => {
  for (let i = 0; i < quantidadeProjetilBaixo; i++) {
    const x = gapBaixo + i * separacaoBaixo - camera.offsetX; // ajustado
    dispararProjetil(x, yBaixo, 0, -5, 5, "baixo");
  }
}, 4500);
