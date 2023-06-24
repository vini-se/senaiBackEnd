export default class Cliente{
  valorAbastecimento: number;
  litrosAbastecimento: number;
  pagou: boolean = false;

  constructor(){
      this.valorAbastecimento = 0;
      this.litrosAbastecimento = 0;
  }

  abastecer(valorAbastecimento: number){
    this.valorAbastecimento = valorAbastecimento;
    this.litrosAbastecimento = valorAbastecimento / 5.5;      
  }

  pagarAbastecimento(): number {
    this.pagou = true;
    return this.valorAbastecimento;
  }
}