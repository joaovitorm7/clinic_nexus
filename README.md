# Como integrar o frontend com o backend

## 1. Configuração do Banco de Dados

No seu gerenciador MySQL (Workbench, VSCode ou outro), execute o arquivo
**`clinic_nexus_backup.sql`** para criar o banco e suas tabelas.

Em seguida, abra o arquivo **`.env`** localizado na pasta **backend** e
preencha as informações do banco de dados:

    DB_HOST=...
    DB_USER=...
    DB_PASS=...
    DB_NAME=...

------------------------------------------------------------------------

## 2. Configurando a API no Frontend

Para consumir a API no React, utilize o seguinte padrão de import:

``` javascript
import { funcaoDaAPI } from "../../services/nomeDoArquivo";
```

------------------------------------------------------------------------

## 3. Rodando o Servidor Backend

Na pasta raiz do projeto **clinic_nexus**, abra um terminal e execute o
servidor NestJS:

``` bash
cd backend
npm run start:dev
```

------------------------------------------------------------------------

## 4. Possíveis Erros no Backend

Se o servidor apresentar erros, verifique:

-   Se o terminal está aberto na pasta **backend**
-   Se as informações do arquivo **`.env`** estão corretas

### Erros comuns

**Erro: módulo não encontrado (`class-validator`)**

    Cannot find module 'class-validator' or its corresponding type declarations.

**Erro: módulo `class-transformer` ausente**

    ERROR [PackageLoader] The "class-transformer" package is missing.

### Solução

Instale as dependências:

``` bash
cd backend
npm install
```

------------------------------------------------------------------------

## 5. Rodando o Servidor Frontend

Abra outro terminal na pasta raiz do projeto e execute o servidor React:

``` bash
cd frontend
npm run dev
```

------------------------------------------------------------------------
