class Bomba{ 
    // Declaração das propriedades
    tipoCombustivel;
    litros;

    /**
     * Inicializa a Bomba com os valores
     */
    constructor(){
        this.tipoCombustivel = "Gasolina"
        this.litros = 500
    }

    /**
     * Essa função serve para verificar se a quantidade de litros requisitados a bomba tem.
     * @param {number} valorAbastecimento 
     * @returns {boolean}
     */
    temLitro(valorAbastecimento){
        // return valorAbastecimento < this.litros ? true : console.log("Chame o frentista, pouca gasolina, impossível abastecer");

        if(valorAbastecimento < this.litros){
            return true           
        }else{
            console.log("Chame o frentista, pouca gasolina, impossível abastecer")
        }
    }

    statusBomba(){
        return console.log("O total de litros do combustivél '" + this.tipoCombustivel + "' é de " + this.litros + "L")
    }

}