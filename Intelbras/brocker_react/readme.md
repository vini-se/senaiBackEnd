# DashMasterService

Esse é um projeto para aprender e aplicar conhecimentos relacionados ao protocolo MQTT com node.

Temos 2 pastas:
- Brocker
- Dashboard

O sistema do BROCKER, onde tem 3 publishers e 1 receptor, ele irá salvar os dados dos publishers em uma DB pelo recptor. <br>
O sistema do Dashboard será em ReactJS e NodeJS, onde o Node consultará o banco e o React exibirá as informações na tela.

<br>
<br>

## Dash-board 
  - Criar 1 servidor para buscar as mensagens salvas no DB.
  - Criar 1 front dash board que vai consumir os dados da API

<br>
<br>

## Brocker
  - [x] ~~Criar 1 receptor e salvar as mensagens em um DB a cada 1min.~~
  - [x] ~~Criar 3 publishers que enviam:~~ 
   ```ts 
      {
      request: {
        Id: number, 
        Produto: string,
        Quantidade: number,
        Status: boolean,
        }
      }
  ```