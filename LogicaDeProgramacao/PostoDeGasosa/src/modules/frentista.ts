import { Bomba } from "./bomba";
import { Cliente } from "./cliente";

class Frentista {
  totalRecebidoDia: number = 0;

  abastecerCarroCliente(bomba: Bomba, cliente: Cliente, valor: number) {
    cliente.novoPedidoAbastecimento(valor);
    if (bomba.temLitro(cliente.getLitrosAbastecimento())) {
      console.log(`Abastecendo ${cliente.getLitrosAbastecimento()}L de ${bomba.getTipoCombustivel()}`)
      bomba.consumir(cliente.getLitrosAbastecimento());
      this.receberPagamentoCliente(cliente.getValorAbastecimento());
    }
  }

  receberPagamentoCliente(valorCliente: number) {
    this.totalRecebidoDia += valorCliente;
  }

  reabastecerBomba(bomba: Bomba, quantidade: number) {
    bomba.abastecer(quantidade);
  }
}

export { Frentista };