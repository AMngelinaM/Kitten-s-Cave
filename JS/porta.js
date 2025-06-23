// Spritesheet da porta animada
const spritePorta = new Image();
spritePorta.src = "./IMG/ultimasala/porta.png"; // spritesheet com 14 frames

// Imagem final da porta aberta
const imagemPortaFinal = new Image();
imagemPortaFinal.src = "./IMG/ultimasala/porta_fim.png"; // sprite final da porta

// Configurações da animação
const portaTotalFrames = 14;
const portaLarguraFrame = 128;
const portaAlturaFrame = 128;
const portaFPS = 10;
const portaAnimFrameDelay = Math.round(60 / portaFPS);

let portaX = 1900;
let portaY = 320;

let portaAnimando = false;
let portaAnimacaoFinalizada = false;
let portaFrameAtual = 0;
let portaAnimFrameTick = 0;
let portaMostrarFinal = false;

// Chame esta função para iniciar a animação da porta
function iniciarAnimacaoPorta() {
  if (!portaAnimando && !portaAnimacaoFinalizada) {
    portaAnimando = true;
    portaFrameAtual = 0;
    portaAnimFrameTick = 0;
    portaAnimacaoFinalizada = false;
    portaMostrarFinal = false;
  }
}

// Chame esta função em todo frame para atualizar a animação da porta
function atualizarPorta() {
  if (portaAnimando && !portaAnimacaoFinalizada) {
    portaAnimFrameTick++;
    if (portaAnimFrameTick >= portaAnimFrameDelay) {
      portaAnimFrameTick = 0;
      if (portaFrameAtual < portaTotalFrames - 1) {
        portaFrameAtual++;
      } else {
        portaAnimando = false;
        portaAnimacaoFinalizada = true;
        // Troca rapidamente para a imagem final da porta
        setTimeout(() => {
          portaMostrarFinal = true;
        }, 50);
      }
    }
  }
}

// Chame esta função em todo frame para desenhar a porta
function desenharPorta(ctx) {
  if (portaAnimando && !portaMostrarFinal) {
    ctx.drawImage(
      spritePorta,
      portaFrameAtual * portaLarguraFrame,
      0,
      portaLarguraFrame,
      portaAlturaFrame,
      portaX,
      portaY,
      portaLarguraFrame,
      portaAlturaFrame
    );
  } else if (portaAnimacaoFinalizada && portaMostrarFinal) {
    ctx.drawImage(
      imagemPortaFinal,
      portaX,
      portaY,
      portaLarguraFrame,
      portaAlturaFrame
    );
  }
}
