const gotas = [];
const imgGota = new Image();
const imgSombra = new Image();

imgGota.src = "./IMG/gota.png";
imgSombra.src = "./IMG/sombra.png";

const larguraGota = 30;
const alturaGota = 30;

function Sincronizar() {
  const quantidade = 2 + Math.floor(Math.random() * 3); // de 2 a 4 gotas por vez

  for (let i = 0; i < quantidade; i++) {
    const x = Math.random() * (600 - larguraGota);

    // yFinal aleatório dentro da área segura
    const yFinal = 150 + Math.random() * (470 - 150 - alturaGota); // 470 é o limite visual

    // Criar sombra
    const sombra = {
      x: x,
      y: yFinal,
      sombra: true,
      ativa: true,
    };
    gotas.push(sombra);

    // Sombra desaparece depois de 2 segundos
    setTimeout(() => {
      sombra.ativa = false;
    }, 3000);

    // Depois de 1 segundo, criar gota sincronizada
    setTimeout(() => {
      gotas.push({
        x: x,
        y: 0, // todas começam do topo
        velocidade: 2 + Math.random() * 2,
        sombra: false,
        ativa: true,
        yFinal: yFinal, // ponto onde a gota deve parar
      });
    }, 1000);
  }
}

// Intervalo para criar gotas regularmente
setInterval(Sincronizar, 1000);

function atualizarGotas(gato) {
  for (let i = 0; i < gotas.length; i++) {
    const gota = gotas[i];
    if (!gota.ativa || gota.sombra) continue;

    gota.y += gota.velocidade;

    if (gota.y >= gota.yFinal) {
      gota.ativa = false;
    }

    // verificação de colisão com o gato
    if (
      gota.x < gato.x + gato.largura &&
      gota.x + larguraGota > gato.x &&
      gota.y < gato.y + gato.altura &&
      gota.y + alturaGota > gato.y
    ) {
      perderVida();
      gota.ativa = false;
    }
  }

  // remove gotas inativas
  for (let i = gotas.length - 1; i >= 0; i--) {
    if (!gotas[i].ativa) {
      gotas.splice(i, 1);
    }
  }
}

function desenharGotas(ctx, camera) {
  for (let gota of gotas) {
    if (!gota.ativa) continue;

    const xCanvas = gota.x + camera.offsetX;
    const yCanvas = gota.y + camera.offsetY;

    if (gota.sombra) {
      ctx.drawImage(imgSombra, xCanvas, yCanvas + 80, 30, 10);
    } else {
      ctx.drawImage(imgGota, xCanvas, yCanvas, larguraGota, alturaGota);
    }
  }
}
