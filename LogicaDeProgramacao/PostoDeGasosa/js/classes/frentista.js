class Frentista{
    // Declaração das propriedades
    totalRecebidoDia
    valorPagoAbastecimentoAtual

    /**
     * Inicializa o frentista com os valores
     */
    constructor() {
        this.totalRecebidoDia = 0;
        this.valorPagoAbastecimentoAtual = 0;
    }

    /**
     * 
     * @param {Cliente} cliente 
     * @param {Bomba} bomba 
     */
    receberPagamentoCliente(cliente) {
        this.valorPagoAbastecimentoAtual = cliente.pagarAbastecimento();
        this.totalRecebidoDia += this.valorPagoAbastecimentoAtual;
    }

    /**
     * 
     * @param {Bomba} bomba 
     * @param {number} quantidade 
     */
    reabastecerBomba(bomba, quantidade){
        console.log("Quantidade antiga de litros da bomba: " + bomba.litros);
        bomba.litros += quantidade;
        console.log("Quantidade nova de litros da bomba: " + bomba.litros);
    }
}