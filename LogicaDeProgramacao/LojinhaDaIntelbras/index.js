function inicio() {

    //Variáveis 

    var carrinho = 0; //para armanezar o valor das compras
    var opcao; //para o switch 1

    //Variáveis de preco para facilitar as contas
    let precoCamisa = 50;
    let precoMoletom = 100;

    //Variavel para o loop geral
    let flag = true;
    let repetir;

    do {
        opcao = parseInt(prompt("Qual produto você deseja visualizar?\n\nCamisa: 1\nMoletom: 2"));

        while ((opcao !== 1 && opcao !== 2)) {
            opcao = parseInt(prompt("Qual produto você deseja visualizar?\n\nCamisa: 1\nMoletom: 2"));
        }

        switch (opcao) {

            case 1:

                let escolha = parseInt(prompt("Produto: Camisa\nPreço: R$" + precoCamisa + "\nDeseja comprar quantas?"));
                while (typeof escolha == Number) {
                    escolha = prompt("Deseja quantas?");
                }

                alert("Obrigado por comprar conosco! Volte sempre!");
                carrinho += precoCamisa * escolha;

                break;

            case 2:
                parseInt(alert("Produto: Moletom\nPreço: R$" + precoMoletom + "\nDeseja comprar quantos?"));

                let escolha2 = prompt("Deseja comprar quantos?");
                while (typeof escolha2 == Number ) {
                    escolha2 = prompt("Deseja comprar quantos?");
                }
                
                alert("Obrigado por comprar conosco! Volte sempre!");
                carrinho += precoMoletom * escolha2;

                break;
        }

        repetir = prompt("Deseja realizar mais compras? (s/n)");
        while (repetir != 's' && repetir != 'n') {
            repetir = prompt("Deseja realizar mais compras? (s/n)");
        }

        if (repetir == 's'){
            flag = true;
        } else {
            flag = false;
        }

    } while (flag == true);

    alert ("Total comprado: R$" + carrinho);
}