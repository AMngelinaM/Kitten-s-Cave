function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.ligado = false;
}

Animacao.prototype = {
  novoSprite: function (sprite) {
    this.sprites.push(sprite);
  },
  ligar: function () {
    this.ligado = true;
    this.proximoFrame();
  },
  desligar: function () {
    this.ligado = false;
  },
  proximoFrame: function () {
    // Posso ligar?
    if (!this.ligado) return;

    // A cada ciclo, limpamos a tela
    this.limparTela();

    // Atualizar o estado das sprites
    for (let i in this.sprites) {
      let sprite = this.sprites[i];

      // Verifica se a sprite tem posição e tamanho
      if (sprite.x !== undefined && sprite.y !== undefined) {
        // Margem para colisão no eixo Y
        const margemY = 50;

        // Margem para o lado esquerdo do eixo X
        const margemXEsquerda = 30;

        // Colisão com as bordas do canvas
        if (sprite.x < margemXEsquerda) sprite.x = margemXEsquerda; // Borda esquerda com margem
        if (sprite.x + 100 > this.context.canvas.width)
          sprite.x = this.context.canvas.width - 100; // Borda direita
        if (sprite.y < margemY) sprite.y = margemY; // Borda superior com margem
        if (sprite.y + 100 > this.context.canvas.height - margemY)
          sprite.y = this.context.canvas.height - margemY - 100; // Borda inferior com margem
      }

      sprite.atualizar();
    }

    // Desenhar os sprites
    for (let i in this.sprites) {
      this.sprites[i].desenhar();
    }

    // Chamar o próximo ciclo
    let animacao = this;
    requestAnimationFrame(function () {
      animacao.proximoFrame();
    });
  },
  limparTela: function () {
    let ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },
};
