const vidas = {
  max: 7,
  atuais: [],
  img: new Image(),
  x: 32,
  y: 32,
  margem: 5,
  posicao: { x: 10, y: 10 },
  acabou: false,
  opacidade: 1,
  corGameOver: "#404EBF",
};

vidas.img.src = "./IMG/vidas.png";

function inicializarVidas() {
  vidas.atuais = new Array(vidas.max).fill(true); // Cria um novo array com o número total de vidas (vidas.max)
  // Cada elemento do array representa uma vida ativa (true)
  vidas.acabou = false;
  vidas.opacidade = 1;
}

function perderVida() {
  if (vidas.atuais.length > 0) {
    vidas.atuais.pop();
    if (vidas.atuais.length === 0 && !vidas.acabou) {
      vidas.acabou = true;
      setTimeout(() => {
        // Aguarda 5 segundos antes de executar o código dentro da função (callback)
        fadeOutERestartar();
      }, 2000); // espera 2 segundos antes de iniciar fade
    }
  }
}

function desenharVidas(ctx) {
  vidas.atuais.forEach((_, i) => {
    // Percorre cada elemento do array de vidas (vidas.atuais)
    const posX = vidas.posicao.x + i * (vidas.x + vidas.margem);
    const posY = vidas.posicao.y;
    ctx.drawImage(vidas.img, posX, posY, vidas.x, vidas.y);
  });

  if (vidas.acabou) {
    desenharGameOver(ctx);
  }
}

function desenharGameOver(ctx) {
  ctx.save();
  ctx.globalAlpha = vidas.opacidade; // Define a opacidade global da renderização no canvas
  // Usado para fazer o efeito de fade-out na tela azul ao perder todas as vidas
  ctx.fillStyle = vidas.corGameOver;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    "Evite a água. Tente de novo uma próxima vida",
    ctx.canvas.width / 2,
    ctx.canvas.height / 2
  );
  ctx.restore();
}

function fadeOutERestartar() {
  const fadeInterval = setInterval(() => {
    vidas.opacidade -= 0.02;
    if (vidas.opacidade <= 0) {
      clearInterval(fadeInterval);
      window.location.reload(); // reinicia a fase
    }
  }, 50); // a cada 50ms reduz a opacidade
}
