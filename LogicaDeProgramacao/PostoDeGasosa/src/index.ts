import { Bomba } from "./modules/bomba";
import { Cliente } from "./modules/cliente";
import { Frentista } from "./modules/frentista";

function main(): void{

  const bombaG1 = new Bomba("Gasolina");
  const frentista1 = new Frentista();
  const vini = new Cliente();
  
  frentista1.abastecerCarroCliente(bombaG1, vini, 55);

}

main();