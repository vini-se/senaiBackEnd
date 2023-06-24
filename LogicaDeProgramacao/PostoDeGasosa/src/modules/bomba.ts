type TipoCombustivel = "Gasolina" | "Etanol" | "Diesel" | "GNV" | "Flex";

class Bomba {
  private tipoCombustivel: TipoCombustivel;
  private litros: number;

  constructor(tipoCombustivel: TipoCombustivel = "Gasolina") {
    this.tipoCombustivel = tipoCombustivel;
    this.litros = 500;
  }

  abastecer(litros: number): void {
    console.log("Quantidade antiga de litros da bomba: " + this.litros);
    this.litros += litros;
    console.log("Quantidade nova de litros da bomba: " + this.litros);
  }

  consumir(litros: number): void {
    this.litros -= litros;
  }

  temLitro(litrosAbastecimento: number): boolean {
    if (litrosAbastecimento <= this.litros) {
      console.log("Abastecimento pode ser realizado!");
      return true;
    } else {
      console.log("Chame o frentista, pouca gasolina, impossível abastecer!");
      return false;
    }
  }

  statusBomba(): void {
    console.log(
      `O total de litros do combustível '${this.tipoCombustivel}' é de ${this.litros}L`
    );
  }

  getTipoCombustivel(): TipoCombustivel {
    return this.tipoCombustivel;
  }
}

export { Bomba };