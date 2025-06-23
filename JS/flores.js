// Carrega as imagens de cada tipo de flor (direto da pasta IMG/)
const imagemFlor1 = new Image();
imagemFlor1.src = "./IMG/ultimasala/florum.png";

const imagemFlor2 = new Image();
imagemFlor2.src = "./IMG/ultimasala/flordois.png";

const imagemFlor3 = new Image();
imagemFlor3.src = "./IMG/ultimasala/flortres.png";

const imagemFlor4 = new Image();
imagemFlor4.src = "./IMG/ultimasala/florquatro.png";

// Array de flores
const flores = [];

// Função para verificar colisão entre flor e obstáculos
function florColideComObstaculo(x, y, larguraFlor, alturaFlor, obstaculos) {
  for (const obs of obstaculos) {
    if (
      x < obs.x + obs.width &&
      x + larguraFlor > obs.x &&
      y < obs.y + obs.height &&
      y + alturaFlor > obs.y
    ) {
      return true; // Colidiu
    }
  }
  return false; // Não colidiu
}

// Função para gerar uma posição válida para a flor
function gerarFlorValida(
  larguraFlor,
  alturaFlor,
  obstaculos,
  LIMITE_X_MIN,
  LIMITE_X_MAX,
  LIMITE_Y_MIN,
  LIMITE_Y_MAX
) {
  let x, y;
  let tentativas = 0;
  do {
    x = LIMITE_X_MIN + Math.random() * (LIMITE_X_MAX - LIMITE_X_MIN);
    y = LIMITE_Y_MIN + Math.random() * (LIMITE_Y_MAX - LIMITE_Y_MIN);
    tentativas++;
    if (tentativas > 1000) break; // evita loop infinito
  } while (florColideComObstaculo(x, y, larguraFlor, alturaFlor, obstaculos));
  return { x, y };
}

// Defina os mesmos limites do gato
const LIMITE_X_MIN = 20;
const LIMITE_X_MAX = 2000 - (80 + 50); // larguraCenario - (gato.largura + 50)
const LIMITE_Y_MIN = 100;
const LIMITE_Y_MAX = 800 - (80 + 160); // alturaCenario - (gato.altura + 160)
const larguraFlor = 32;
const alturaFlor = 32;

// Gera 5 flores de cada tipo em posições aleatórias, sem colidir com obstáculos
for (let tipo = 1; tipo <= 4; tipo++) {
  for (let i = 0; i < 5; i++) {
    // Use a variável 'obstaculos' que deve estar disponível no escopo global
    const pos = gerarFlorValida(
      larguraFlor,
      alturaFlor,
      typeof obstaculos !== "undefined" ? obstaculos : [],
      LIMITE_X_MIN,
      LIMITE_X_MAX,
      LIMITE_Y_MIN,
      LIMITE_Y_MAX
    );
    flores.push({
      x: pos.x,
      y: pos.y,
      tipo: tipo,
      coletada: false,
    });
  }
}

// Função que desenha as flores
function desenharFlores() {
  flores.forEach((flor) => {
    if (flor.coletada) return;

    let imagem = null;
    if (
      flor.tipo === 1 &&
      imagemFlor1.complete &&
      imagemFlor1.naturalWidth !== 0
    ) {
      imagem = imagemFlor1;
    } else if (
      flor.tipo === 2 &&
      imagemFlor2.complete &&
      imagemFlor2.naturalWidth !== 0
    ) {
      imagem = imagemFlor2;
    } else if (
      flor.tipo === 3 &&
      imagemFlor3.complete &&
      imagemFlor3.naturalWidth !== 0
    ) {
      imagem = imagemFlor3;
    } else if (
      flor.tipo === 4 &&
      imagemFlor4.complete &&
      imagemFlor4.naturalWidth !== 0
    ) {
      imagem = imagemFlor4;
    }

    if (imagem) {
      ctx.drawImage(imagem, flor.x, flor.y, 32, 32);
    }
  });
}

// Função para verificar se o gato colidiu com alguma flor
function verificarColetaDeFlores() {
  flores.forEach((flor) => {
    if (!flor.coletada) {
      const hitboxGato = {
        x: gato.x + gato.hitbox.offsetX,
        y: gato.y + gato.hitbox.offsetY,
        largura: gato.hitbox.largura,
        altura: gato.hitbox.altura,
      };

      const hitboxFlor = {
        x: flor.x,
        y: flor.y,
        largura: 32,
        altura: 32,
      };

      const colidiu =
        hitboxGato.x < hitboxFlor.x + hitboxFlor.largura &&
        hitboxGato.x + hitboxGato.largura > hitboxFlor.x &&
        hitboxGato.y < hitboxFlor.y + hitboxFlor.altura &&
        hitboxGato.y + hitboxGato.altura > hitboxFlor.y;

      if (colidiu) {
        flor.coletada = true;
        if (typeof gato.floresColetadas === "number") {
          gato.floresColetadas++;
        } else {
          gato.floresColetadas = 1;
        }
        // Aqui você pode adicionar som, animação, etc.
      }
    }
  });
}
