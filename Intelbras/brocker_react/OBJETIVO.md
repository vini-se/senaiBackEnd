### //////////////////////////////////////////////////////////////////////

# Dash-board{
  - Criar 1 servidor para buscar as mensagens salvas no DB.
  - Criar 1 front dash board que vai consumir os dados da API
# }

### //////////////////////////////////////////////////////////////////////

# Brocker{
  - Criar 1 receptor e salvar as mensagens em um DB a cada 1min.
  - Criar 3 publishers que enviam: 
   <code> {
      request: {
        Id: number, 
        Produto: string,
        Quantidade: number,
        Status: boolean,
      }
    }
    </code>
# }

### //////////////////////////////////////////////////////////////////////