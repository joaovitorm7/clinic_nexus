# Como integrar o frontend com o backend?

## Configurando o banco de dados
No seu gerenciador do banco de dados mysql, rode o script clinic_nexus_backup.sql no seu gerenciador de banco de dados para o mysql(Workbench ou Vscode). Logo após coloque as informações do seu banco de dados no arquito .env da pasta backend.


## Configuração da API
Para consumir a API, siga essa estrutura:
``javascript
import {função_da_API_que_você_queira_utilizar} "../../services/nome_do_script_que_você_queira utilizar".
``


## Rodar o servidor backend
 pasta do projeto clinic_nexus, abra um terminal para executar o servidor nest.js
```bash
 cd backend
 npm start run dev
```
## Erros no backend
Caso o servidor tenha erros, verifique novamente se ele está rodando na pasta do backend e se as informações do banco no arquivo .env estão corretas. Caso tenha um erro de importação como esse:

```bash
Cannot find module 'class-validator' or its corresponding type declarations.

1 import { IsString, IsDateString } from 'class-validator';
                                         ~~~~~~~~~~~~~~~

```
Ou esse
```bash
[Nest] 4940  - 30/10/2025, 08:39:59   ERROR [PackageLoader] The "class-transformer" package is missing. Please, make sure to install it to take advantage of ValidationPipe.
```
Dentro da pasta backend, rode o comando npm install para resolver esse problema.

## Rodar o servidor frontend
Na pasta do projeto clinic_nexus, abra um outro terminal para executar o servidor do react
``bash
cd frontend
npm run dev
`` 