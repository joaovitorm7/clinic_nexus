# 🛠️ GUIA TÉCNICO - CLÍNICA NEXUS

**Versão:** 1.0  
**Data:** Fevereiro de 2026  
**Público:** Desenvolvedores e Administradores de TI

---

## 📚 Índice

1. [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
2. [Requisitos do Sistema](#requisitos-do-sistema)
3. [Instalação e Configuração](#instalação-e-configuração)
4. [Estrutura do Projeto Frontend](#estrutura-do-projeto-frontend)
5. [Como Executar](#como-executar)
6. [Integrações com API](#integrações-com-api)
7. [Troubleshooting](#troubleshooting)
8. [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## 🏗️ Visão Geral da Arquitetura

### Stack Tecnológico

**Frontend:**
- **React** 19.2.0 - Framework UI
- **Vite** 7.1.7 - Build tool e dev server
- **React Router** 6.16.0 - Roteamento
- **Axios** 1.12.2 - HTTP Client
- **FullCalendar** 6.1.19 - Calendário integrado
- **React Modal** 3.16.3 - Modais
- **React Icons** 5.5.0 - Ícones SVG

**Backend:**
- **NestJS** - Framework Node.js
- **TypeScript** - Tipagem
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados principal
- **JWT** - Autenticação

**Desktop:**
- **Electron** 38.2.2 - Aplicação desktop

### Fluxo de Dados

```
Usuário → Frontend (React) → API Backend (NestJS) → Banco de Dados (MySQL)
           ↑                                             ↓
           └─────────── Resposta JSON ────────────────┘
```

### Autenticação

1. Usuário faz login com email e senha
2. Backend valida credenciais
3. Retorna `access_token` (JWT)
4. Frontend armazena token em `localStorage`
5. Token é enviado em todas as requisições no header `Authorization`

---

## 📋 Requisitos do Sistema

### Hardware Mínimo
- **CPU:** Intel/AMD dual-core 2.0 GHz
- **RAM:** 4 GB
- **Disco:** 500 MB livres
- **Conexão:** Internet 1 Mbps (mínimo)

### Software Necessário

#### Para Desenvolvimento
- **Node.js:** v18.0.0 ou superior
- **npm:** v8.0.0 ou superior (incluído no Node.js)
- **Git:** v2.30.0 ou superior
- **MySQL:** v8.0.0 ou superior
- **Visual Studio Code:** Recomendado para desenvolvimento

#### Para Produção
- **Servidor Web:** Nginx ou Apache
- **Node.js:** v18.0.0+
- **MySQL:** v8.0.0+
- **SSL/TLS:** Certificado válido

#### Navegadores Suportados
- **Chrome/Chromium:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Edge:** 90+

---

## 🚀 Instalação e Configuração

### 1. Preparar o Ambiente (Windows/macOS/Linux)

#### Instalar Node.js

```bash
# Windows (com Chocolatey)
choco install nodejs

# macOS (com Homebrew)
brew install node

# Linux (Debian/Ubuntu)
sudo apt-get install nodejs npm
```

#### Verificar Instalação

```bash
node --version  # Deve retornar v18.0.0 ou superior
npm --version   # Deve retornar v8.0.0 ou superior
```

#### Instalar Git

```bash
# Windows
choco install git

# macOS
brew install git

# Linux
sudo apt-get install git
```

### 2. Clonar o Repositório

```bash
git clone https://github.com/joaovitorm7/clinic_nexus.git
cd clinic_nexus
```

### 3. Instalar Dependências

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 4. Configurar Banco de Dados

#### Opção A: Usando MySQL Workbench

1. Abra MySQL Workbench
2. Conecte à sua instância MySQL
3. Vá para **File → Open SQL Script**
4. Selecione `clinic_nexus_backup.sql` da raiz do projeto
5. Clique em **Execute all**
6. Aguarde a criação das tabelas

#### Opção B: Usando Linha de Comando

```bash
mysql -u root -p < clinic_nexus_backup.sql
```

### 5. Configurar Variáveis de Ambiente

#### Backend - Criar arquivo `.env`

Na pasta `backend/`, crie um arquivo `.env`:

```env
# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_mysql
DB_NAME=clinic_nexus
DB_PORT=3306

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRATION=3600

# API
API_URL=http://localhost:3000
NODE_ENV=development
PORT=3000
```

#### Valores Recomendados

```env
# Para Desenvolvimento
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=          # (vazio se sem senha)
DB_NAME=clinic_nexus
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRATION=86400
NODE_ENV=development
PORT=3000

# Para Produção (MUDE estes valores!)
DB_HOST=seu-servidor-mysql.com
DB_PORT=3306
DB_USER=usuário_seguro
DB_PASS=senha_forte_muito_segura
DB_NAME=clinic_nexus
JWT_SECRET=gere_uma_chave_aleatória_e_segura_aqui
JWT_EXPIRATION=86400
NODE_ENV=production
PORT=3000
```

#### Frontend - Variáveis Implícitas

O frontend usa a URL da API automaticamente:
- **Desenvolvimento:** `http://localhost:3000/api`
- **Produção:** `https://seu-dominio.com/api`

Você pode configurar em `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000';
```

---

## 📁 Estrutura do Projeto Frontend

```
frontend/
├── src/
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Admin/              # Página de administração
│   │   │   ├── Dashboard/
│   │   │   ├── Funcionarios/
│   │   │   ├── Medicos/
│   │   │   └── EditarFuncionarios/
│   │   ├── AlaMedica/          # Páginas para médicos
│   │   │   ├── Dashboard/
│   │   │   ├── prontuario/
│   │   │   ├── ListarConsultas/
│   │   │   └── DetalhesConsulta/
│   │   ├── recepcao/           # Páginas de recepção
│   │   │   ├── DashboardRecepcao/
│   │   │   ├── AgendarConsulta/
│   │   │   ├── VisualizarAgenda/
│   │   │   ├── EditarAgenda/
│   │   │   ├── CadastroPaciente/
│   │   │   ├── VisualizarPacientes/
│   │   │   ├── EditarPaciente/
│   │   │   └── AgendaMedico/
│   │   ├── Login/              # Autenticação
│   │   ├── Register/
│   │   └── Receptionist/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Navbar/
│   │   ├── ProtectedRoute/
│   │   ├── DoctorCard/
│   │   ├── EmployeeCard/
│   │   ├── EmployeeModal/
│   │   ├── FloatingButton/
│   │   └── EmployeeAdd/
│   ├── services/               # APIs e serviços
│   │   ├── api.js              # Configuração Axios
│   │   ├── authService.js      # Autenticação
│   │   ├── agendamentoService.js
│   │   ├── pacienteService.js
│   │   ├── doctors.services.js
│   │   ├── employees.services.js
│   │   ├── especialidadeService.js
│   │   ├── agenda.service.js
│   │   └── prontuarioService.js
│   ├── context/                # React Context
│   │   └── AuthContext.jsx     # Contexto de autenticação
│   ├── utils/                  # Utilitários
│   ├── assets/                 # Imagens e ícones
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Entry point
│   ├── index.css               # Estilos globais
│   └── App.css
├── public/                     # Arquivos estáticos
├── electron.js                 # Configuração Electron
├── preload.js                  # Preload do Electron
├── package.json
├── vite.config.js              # Config Vite
└── index.html
```

### Componentes Principais

#### `App.jsx`
Define todas as rotas da aplicação usando React Router.

```javascript
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  {/* Rotas de Admin */}
  {/* Rotas de Recepção */}
  {/* Rotas de Ala Médica */}
</Routes>
```

#### `AuthContext.jsx`
Gerencia estado de autenticação globalmente:

```javascript
- login(email, senha)   // Autentica usuário
- logout()              // Remove token e user
- user                  // Dados do usuário atual
- loading               // Flag de carregamento
```

#### Serviços de API
Cada serviço encapsula chamadas à API:

```javascript
// authService.js
export const login = (email, senha) => { ... }
export const register = (dados) => { ... }

// agendamentoService.js
export const agendarConsulta = (dados) => { ... }
export const listarAgendamentos = () => { ... }

// pacienteService.js
export const createPaciente = (dados) => { ... }
export const getPaciente = (id) => { ... }
export const updatePaciente = (id, dados) => { ... }
```

---

## ▶️ Como Executar

### 1. Ambiente de Desenvolvimento

#### Terminal 1 - Backend

```bash
cd backend
npm install
npm run start:dev
```

**Esperado:**
```
[Nest] 12345  - 02/23/2026, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 02/23/2026, 10:00:01 AM     LOG [InstanceLoader] AppModule dependencies initialized [...]
[Nest] 12345  - 02/23/2026, 10:00:01 AM     LOG [RoutesResolver] AuthController {/auth}:
[Nest] 12345  - 02/23/2026, 10:00:01 AM     LOG [NestApplication] Nest application successfully started +
```

#### Terminal 2 - Frontend (Web)

```bash
cd frontend
npm install
npm run dev
```

**Esperado:**
```
VITE v7.1.7  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

#### Terminal 3 - Frontend (Electron - Opcional)

```bash
cd frontend
npm run electron
```

### 2. Acessar a Aplicação

- **Frontend Web:** http://localhost:5173
- **API Backend:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/docs (se disponível)

### 3. Login Padrão

Se você executou o seeder:

```
Email: admin@clinic.com
Senha: 123456
Cargo: Administrador
```

### 4. Build para Produção

#### Frontend
```bash
cd frontend
npm run build
```

Gera pasta `dist/` com arquivos otimizados.

#### Backend
```bash
cd backend
npm run build
```

---

## 🔌 Integrações com API

### Configuração Axios

Arquivo: `frontend/src/services/api.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Exemplo de Serviço

```javascript
// pacienteService.js
import api from './api';

export const getPacientes = async () => {
  const response = await api.get('/paciente');
  return response.data;
};

export const createPaciente = async (dados) => {
  const response = await api.post('/paciente', dados);
  return response.data;
};

export const updatePaciente = async (id, dados) => {
  const response = await api.patch(`/paciente/${id}`, dados);
  return response.data;
};

export const deletePaciente = async (id) => {
  const response = await api.delete(`/paciente/${id}`);
  return response.data;
};
```

### Endpoints Principais

#### Autenticação
```
POST   /auth/login          - Fazer login
POST   /auth/register       - Registrar novo usuário
GET    /auth/me             - Dados do usuário atual
POST   /auth/refresh        - Renovar token
```

#### Pacientes
```
GET    /paciente            - Listar todos
GET    /paciente/:id        - Detalhes
POST   /paciente            - Criar novo
PATCH  /paciente/:id        - Atualizar
DELETE /paciente/:id        - Deletar
```

#### Agendamentos
```
GET    /agendamento         - Listar todos
GET    /agendamento/:id     - Detalhes
POST   /agendamento         - Criar novo
PATCH  /agendamento/:id     - Atualizar
DELETE /agendamento/:id     - Deletar
```

#### Médicos
```
GET    /medico              - Listar todos
GET    /medico/:id          - Detalhes
POST   /medico              - Criar novo
PATCH  /medico/:id          - Atualizar
DELETE /medico/:id          - Deletar
```

#### Prontuários
```
GET    /prontuario          - Listar todos
GET    /prontuario/:id      - Detalhes
POST   /prontuario          - Criar novo
PATCH  /prontuario/:id      - Atualizar
```

---

## 🐛 Troubleshooting

### Problema: "Cannot find module"

**Sintoma:** Erro ao rodas `npm run dev`

**Solução:**
```bash
npm install
rm -rf node_modules package-lock.json
npm install
```

### Problema: Porta 5173 já em uso

**Sintoma:** `Port 5173 is in use`

**Solução:**
```bash
# Matar processo na porta
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>

# Ou mudar porta no vite.config.js
export default {
  server: {
    port: 5174,  // Nova porta
  },
}
```

### Problema: Erro de conexão com banco de dados

**Sintoma:** `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solução:**
1. Verifique se MySQL está rodando
2. Verifique credenciais no `.env`
3. Verifique host e porta

### Problema: Token expirado

**Sintoma:** `401 Unauthorized` após tempo de inatividade

**Solução:**
O usuário precisa fazer login novamente. O sistema irá redirecionar para `/`.

### Problema: CORS (Cross-Origin)

**Sintoma:** `No 'Access-Control-Allow-Origin' header`

**Solução:** Backend deve ter CORS configurado:

```typescript
// main.ts (NestJS)
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### Problema: Calendário não aparece

**Sintoma:** Tela branca na página de agenda

**Solução:**
```bash
npm install @fullcalendar/core @fullcalendar/daygrid @fullcalendar/react
```

### Problema: Estado persistente não atualiza

**Sintoma:** localStorage não sincroniza

**Solução:**
```javascript
// Limpar cache
localStorage.clear();
// Recarregar página
window.location.reload();
```

---

## 🔑 Variáveis de Desenvolvimento

### Script `seedLocalStorage()`

Arquivo: `frontend/src/seedLocalStorage.js`

Inicializa dados de exemplo no localStorage:

```javascript
export const seedLocalStorage = () => {
  if (!localStorage.getItem('usuario')) {
    localStorage.setItem('usuario', JSON.stringify({
      id: 1,
      nome: 'Usuário Demo',
      email: 'demo@clinic.com',
      cargo: 'admin'
    }));
  }
};
```

### Ambiente de Teste

Arquivo: `frontend/vite.config.test.js`

Para rodar testes:

```bash
npm run test                # Rodar testes uma vez
npm run test:ui             # Interface visual
npm run test:coverage       # Cobertura
```

---

## 📝 Checklist de Configuração

- [ ] Node.js v18+ instalado
- [ ] npm v8+ instalado
- [ ] Git instalado
- [ ] MySQL v8+ instalado e rodando
- [ ] Repositório clonado
- [ ] `backend/package.json` - `npm install`
- [ ] `frontend/package.json` - `npm install`
- [ ] `clinic_nexus_backup.sql` - banco criado
- [ ] `backend/.env` - configurado
- [ ] `npm run start:dev` (backend) - rodando
- [ ] `npm run dev` (frontend) - rodando
- [ ] http://localhost:5173 - acessível
- [ ] Login funciona

---

## 🔒 Segurança

### Boas Práticas

1. **Nunca commite `.env`**
   ```bash
   echo ".env" >> .gitignore
   ```

2. **Use variáveis de ambiente seguros**
   ```env
   JWT_SECRET=gere_com_openssl_rand_-_hex_32
   ```

3. **HTTPS em produção**
   ```bash
   # Use certificado SSL válido
   ```

4. **Valide inputs no backend**
   ```typescript
   @IsEmail()
   @MinLength(8)
   senha: string;
   ```

5. **Logs de auditoria**
   ```bash
   # Registre todas as ações críticas
   ```

---

## 📞 Contato para Suporte Técnico

- **Repositório:** https://github.com/joaovitorm7/clinic_nexus
- **Issues:** Abra uma issue no GitHub
- **Email:** dev@clinicaexus.com

---

**Última atualização:** Fevereiro de 2026

