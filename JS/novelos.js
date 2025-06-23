// Carrega as imagens dos dois tipos de novelos
const imagemNoveloAzul = new Image();
imagemNoveloAzul.src = "./IMG/novelo_azul.png";

const imagemNoveloRoxo = new Image();
imagemNoveloRoxo.src = "./IMG/novelo_roxo.png";

// Lista com todos os novelos ativos na tela
const novelos = [];

let novelosRoxosColetados = 0; // contador global para novelos roxos coletados

// Cria um novo novelo com tipo aleatório e posição horizontal aleatória
function criarNovelo() {
  const tipo = Math.random() < 0.5 ? "azul" : "roxo";
  const x = Math.random() * (600 - 64); // 600 é a largura do canvas
  novelos.push({
    x: x,
    y: -64, // começa fora da tela, caindo de cima
    largura: 64,
    altura: 64,
    tipo: tipo,
    velocidade: 2 + Math.random() * 2, // entre 2 e 4 pixels por frame
  });
}

// Cria novos novelos periodicamente
setInterval(criarNovelo, 350);

// Atualiza a posição dos novelos (fazem eles "caírem")
function atualizarNovelos() {
  for (let i = novelos.length - 1; i >= 0; i--) {
    novelos[i].y += novelos[i].velocidade;

    // Remove o novelo se ele sair da tela
    if (novelos[i].y > 600) {
      novelos.splice(i, 1);
    }
  }
}

// Desenha todos os novelos na tela com base no tipo
function desenharNovelos(ctx, offsetX, offsetY) {
  novelos.forEach((novelo) => {
    const img = novelo.tipo === "azul" ? imagemNoveloAzul : imagemNoveloRoxo;
    ctx.drawImage(
      img,
      novelo.x + offsetX,
      novelo.y + offsetY,
      novelo.largura,
      novelo.altura
    );
  });
}

// Verifica se o jogador clicou em algum novelo
function checarCliqueNovelo(xClique, yClique) {
  const xRelativo = xClique - camera.offsetX;
  const yRelativo = yClique - camera.offsetY;

  for (let i = novelos.length - 1; i >= 0; i--) {
    const n = novelos[i];
    if (
      xRelativo >= n.x &&
      xRelativo <= n.x + n.largura &&
      yRelativo >= n.y &&
      yRelativo <= n.y + n.altura
    ) {
      if (n.tipo === "azul") {
        for (let j = 0; j < 3; j++) {
          perderVida(); // tira 3 vidas
        }
      } else if (n.tipo === "roxo") {
        novelosRoxosColetados++; // conta roxo
        pontos += 10; // adiciona pontos
        if (vidas.atuais.length < vidas.max) {
          vidas.atuais.push(true); // recupera vida, se possível
        }
      }

      novelos.splice(i, 1); // remove o novelo clicado
      break; // apenas um clique por vez
    }
  }
}
