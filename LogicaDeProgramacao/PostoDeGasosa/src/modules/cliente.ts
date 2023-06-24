class Cliente{
  private valorAbastecimento: number = 0;
  private litrosAbastecimento: number = 0;
  private pagou: boolean = false;

  novoPedidoAbastecimento(valorAbastecimento: number){
    this.valorAbastecimento = valorAbastecimento;
    this.litrosAbastecimento = valorAbastecimento / 5.5;      
  }

  pagarAbastecimento(): number {    
    this.pagou = true;
    return this.valorAbastecimento;
  }

  getValorAbastecimento(): number {
    return this.valorAbastecimento;
  }

  getLitrosAbastecimento(): number {
    return this.litrosAbastecimento;
  }

}

export { Cliente }; 