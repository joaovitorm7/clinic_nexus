# Como integrar o frontend com o backend

## 1. Configuração do Banco de Dados

No seu gerenciador MySQL (Workbench, VSCode ou outro), execute o arquivo
**`clinic_nexus_backup.sql`** para criar o banco e suas tabelas.

Em seguida, abra o arquivo **`.env`** localizado na pasta **backend** e
preencha as informações do banco de dados:

```env
DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=...
```

### Comandos principais

* **Criar o banco e aplicar as migrations:**

```bash
cd backend
npm run db:create
```

* **Reverter a última migration aplicada:**

```bash
npm run migration:revert
```

---

## 2. Configurando a API no Frontend

Para consumir a API no React, utilize o seguinte padrão de import:

```javascript
import { funcaoDaAPI } from "../../services/nomeDoArquivo";
```

---

## 3. Rodando o projeto

* **No navegador (React + API):**

```bash
npm run dev
```

* **No Electron:**

```bash
npm run dev:electron
```

---

## 4. Possíveis erros no Backend

Se o servidor apresentar erros, verifique:

* Se o terminal está aberto na pasta **backend**
* Se as informações do arquivo **`.env`** estão corretas

### Erros comuns

* **Módulo não encontrado (`class-validator`)**

```text
Cannot find module 'class-validator' or its corresponding type declarations.
```

* **Módulo `class-transformer` ausente**

```text
ERROR [PackageLoader] The "class-transformer" package is missing.
```

### Solução

Instale as dependências:

```bash
cd backend
npm install
```

