type TipoCombustivel = "Gasolina" | "Etanol" | "Diesel" | "GNV" | "Flex";

export default class Bomba {
  tipoCombustivel: TipoCombustivel;
  litros: number;

  constructor(tipoCombustivel: TipoCombustivel = "Gasolina") {
    this.tipoCombustivel = tipoCombustivel;
    this.litros = 500;
  }

  temLitro(valorAbastecimento: number): boolean {
    if (valorAbastecimento <= this.litros) {
      return true;
    } else {
      console.log("Chame o frentista, pouca gasolina, impossível abastecer");
      return false;
    }
  }

  statusBomba(): void {
    console.log(
      `O total de litros do combustível '${this.tipoCombustivel}' é de ${this.litros}L`
    );
  }
}
