let GATO_DIERITA = 3;
let GATO_ESQUERDA = 4;
let GATO_CIMA = 2;
let GATO_BAIXO = 1;

function Gato(context, teclado, imagem) {
  this.context = context;
  this.teclado = teclado;
  this.largura = 100;
  this.altura = 100;
  this.x = 0;
  this.y = 0;
  this.velocidade = 2;

  // Criar a spritesheet a partir de uma imagem recebida
  this.sheet = new Spritesheet(context, imagem, 5, 4);
  this.sheet.intervalo = 300; // Aumente o valor para desacelerar a troca de quadros (em milissegundos)

  this.andando = false;
  this.direcao = GATO_DIERITA;
}
Gato.prototype = {
  atualizar: function () {
    if (this.teclado.pressionada(SETA_DIREITA)) {
      if (!this.andando || this.direcao != GATO_DIERITA) {
        this.sheet.linha = 3;
        this.sheet.coluna = 0;
      }
      this.andando = true;
      this.direcao = GATO_DIERITA;

      this.sheet.proximoQuadro();
      this.x += this.velocidade;
    } else if (this.teclado.pressionada(SETA_ESQUERDA)) {
      if (!this.andando || this.direcao != GATO_ESQUERDA) {
        this.sheet.linha = 4;
        this.sheet.coluna = 0;
      }
      this.andando = true;
      this.direcao = GATO_ESQUERDA;

      this.sheet.proximoQuadro();
      this.x -= this.velocidade;
    } else if (this.teclado.pressionada(SETA_CIMA)) {
      if (!this.andando || this.direcao != GATO_CIMA) {
        this.sheet.linha = 2;
        this.sheet.coluna = 0;
      }
      this.andando = true;
      this.direcao = GATO_CIMA;

      this.sheet.proximoQuadro();
      this.y -= this.velocidade;
    } else if (this.teclado.pressionada(SETA_BAIXO)) {
      if (!this.andando || this.direcao != GATO_BAIXO) {
        this.sheet.linha = 1;
        this.sheet.coluna = 0;
      }
      this.andando = true;
      this.direcao = GATO_BAIXO;

      this.sheet.proximoQuadro();
      this.y += this.velocidade;
    } else {
      if (this.direcao == GATO_DIERITA) {
        this.sheet.coluna = 2;
        this.sheet.linha = 0;
        this.andando = false;
      } else if (this.direcao == GATO_ESQUERDA) {
        this.sheet.coluna = 3;
        this.sheet.linha = 0;
        this.andando = false;
      } else if (this.direcao == GATO_CIMA) {
        this.sheet.coluna = 1;
        this.sheet.linha = 0;
        this.andando = false;
      } else if (this.direcao == GATO_BAIXO) {
        this.sheet.coluna = 0;
        this.sheet.linha = 0;
        this.andando = false;
      }
    }
  },
  desenhar: function () {
    let largura = this.largura; // Largura desejada do personagem
    let altura = this.altura; // Altura desejada do personagem

    this.context.drawImage(
      this.sheet.imagem,
      this.sheet.coluna * (this.sheet.imagem.width / this.sheet.numColunas),
      this.sheet.linha * (this.sheet.imagem.height / this.sheet.numLinhas),
      this.sheet.imagem.width / this.sheet.numColunas,
      this.sheet.imagem.height / this.sheet.numLinhas,
      this.x,
      this.y,
      largura,
      altura
    );
  },
};
