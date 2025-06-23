// Objeto que controla o sistema de vidas do jogador
const vidas = {
  max: 7, // Número máximo de vidas que o jogador pode ter
  atuais: [], // Array que guarda as vidas atuais (true = vida ativa)
  img: new Image(), // Imagem que representa o coração/vida
  x: 32, // Largura do ícone da vida no canvas
  y: 32, // Altura do ícone da vida no canvas
  margem: 5, // Espaçamento entre os ícones de vida
  posicao: { x: 10, y: 10 }, // Posição inicial do primeiro ícone na tela
  acabou: false, // Flag que indica se as vidas acabaram
  opacidade: 1, // Opacidade para o efeito de fade out na tela Game Over
  corGameOver: "#786897", // Cor do fundo na tela de Game Over
};

// Define a fonte da imagem dos corações
vidas.img.src = "./IMG/vidas.png";

/**
 * Inicializa ou reinicia as vidas do jogador.
 * Cria um novo array com o número máximo de vidas ativadas (true).
 * Também reseta flags importantes para o início da fase.
 */
function inicializarVidas() {
  vidas.atuais = new Array(vidas.max).fill(true);
  vidas.acabou = false;
  vidas.opacidade = 1;
}

/**
 * Função chamada quando o jogador perde uma vida.
 * Remove uma vida do array de vidas atuais.
 * Se acabar as vidas, dispara o efeito de Game Over após 2 segundos.
 */
function perderVida() {
  if (vidas.atuais.length > 0) {
    vidas.atuais.pop(); // Remove a última vida (pop)
    // Se não restar nenhuma vida e ainda não entrou em game over
    if (vidas.atuais.length === 0 && !vidas.acabou) {
      vidas.acabou = true; // Marca que acabou
      setTimeout(() => {
        // Aguarda 2 segundos e começa o fade out para reiniciar a fase
        fadeOutERestartar();
      }, 2000);
    }
  }
}

/**
 * Desenha as vidas na tela.
 * Para cada vida ativa, desenha um coração em posição calculada.
 * Se as vidas acabaram, desenha a tela de Game Over com efeito de fade.
 */
function desenharVidas(ctx) {
  vidas.atuais.forEach((_, i) => {
    // Calcula a posição X de cada coração com base no índice e margem
    const posX = vidas.posicao.x + i * (vidas.x + vidas.margem);
    const posY = vidas.posicao.y;

    // Desenha a imagem do coração no canvas
    ctx.drawImage(vidas.img, posX, posY, vidas.x, vidas.y);
  });

  // Se o jogador perdeu todas as vidas, desenha a tela de Game Over
  if (vidas.acabou) {
    desenharGameOver(ctx);
  }
}

/**
 * Desenha a tela de Game Over.
 * Mostra uma mensagem centralizada com fundo colorido.
 * Usa a opacidade para fazer o efeito de fade out.
 */
function desenharGameOver(ctx) {
  ctx.save();
  ctx.globalAlpha = vidas.opacidade; // Aplica opacidade para efeito de fade
  ctx.fillStyle = vidas.corGameOver; // Fundo roxo da tela de Game Over
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Preenche todo o canvas

  ctx.fillStyle = "white";
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    "Água é muito molhada. Tente de novo uma próxima vida",
    ctx.canvas.width / 2,
    ctx.canvas.height / 2
  );
  ctx.restore();
}

/**
 * Função que realiza o efeito de fade out da tela de Game Over
 * e depois reinicia a fase recarregando a página.
 */
function fadeOutERestartar() {
  // Intervalo que reduz a opacidade gradualmente
  const fadeInterval = setInterval(() => {
    vidas.opacidade -= 0.02; // Diminui a opacidade em 2% a cada passo
    if (vidas.opacidade <= 0) {
      clearInterval(fadeInterval); // Para o intervalo quando opacidade chega a 0
      window.location.reload(); // Recarrega a página para reiniciar a fase
    }
  }, 50); // A cada 50ms reduz a opacidade (fade durará aproximadamente 2,5s)
}
