class Cliente{
    // Declaração das propriedades
    valorAbastecimento
    litrosAbastecimento

    /**
     * Inicializa o cliente com os valores
     */
    constructor(){
        this.valorAbastecimento = 0;
        this.litrosAbastecimento = 0;
    }

    /**
     * Define o total que o cliente abasteceu
     * @param {number} valorAbastecimento 
     * @param {Bomba} bomba 
     */
    abastecer(valorAbastecimento, bomba){
        if(valorAbastecimento > 0){
            this.valorAbastecimento = valorAbastecimento
            this.litrosAbastecimento = this.valorAbastecimento / 5
            
            if (bomba.temLitro(this.litrosAbastecimento)){            
                console.log("Valor solicitado: " + valorAbastecimento + "R$");
                console.log("Quantidade atual de litros na bomba: " + bomba.litros);
                console.log("Total abastecido em litros: " + this.litrosAbastecimento + "L");
                bomba.litros -= this.litrosAbastecimento;
                console.log("Nova quantidade de litros na bomba: " + bomba.litros);
            } 
        }else{
            console.log("Tente novamente, valor solicitado incorreto!");
        } 
    }

    /**
     * Manda o valor abastecido para quem solicitar
     * @returns {number}
     */
    pagarAbastecimento(){
        return this.valorAbastecimento
    }
}