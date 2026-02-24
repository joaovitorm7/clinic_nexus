# ⚡ QUICK START - CLÍNICA NEXUS

**Comece em menos de 5 minutos!**

---

## 📋 Pré-Requisitos

- ✅ Node.js v18+ ([Download](https://nodejs.org/))
- ✅ MySQL v8+ ([Download](https://dev.mysql.com/downloads/mysql/))
- ✅ Git ([Download](https://git-scm.com/))

---

## 🚀 Instalação Rápida

### 1. Clone o Repositório

```bash
git clone https://github.com/joaovitorm7/clinic_nexus.git
cd clinic_nexus
```

### 2. Configure o Banco de Dados

```bash
# Importe o arquivo SQL
mysql -u root -p < clinic_nexus_backup.sql
```

**Nome do Banco:** `clinic_nexus`

### 3. Configure as Variáveis (Backend)

Crie `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=clinic_nexus
DB_PORT=3306
JWT_SECRET=seu_secret_aqui
JWT_EXPIRATION=3600
NODE_ENV=development
PORT=3000
```

### 4. Instale Dependências

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

### 5. Rode a Aplicação

**Terminal 1** - Backend:
```bash
cd backend
npm run start:dev
```

**Terminal 2** - Frontend:
```bash
cd frontend
npm run dev
```

### 6. Acesse

- 🌐 Frontend: http://localhost:5173
- 🔌 API: http://localhost:3000

---

## 🔓 Login Padrão

```
Email: admin@clinic.com
Senha: 123456
```

---

## 📁 Estrutura de Pastas

```
clinic_nexus/
├── backend/          # API NestJS
├── frontend/         # React + Vite
├── electron/         # App Desktop
└── test/             # Testes
```

---

## 🔧 Comandos Principais

### Backend

```bash
npm run start:dev      # Rodar em desenvolvimento
npm run build          # Build para produção
npm run test           # Rodar testes
npm run migration:run  # Aplicar migrations
npm run migration:revert # Desfazer last migration
npm run db:create      # Criar banco
npm run db:seed        # Popular dados
```

### Frontend

```bash
npm run dev            # Dev server
npm run build          # Build production
npm run preview        # Preview build
npm run test           # Rodar testes
npm run test:ui        # Testes com UI
npm run lint           # Verificar linting
npm run electron       # App desktop
```

---

## 🆘 Erros Comuns

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000 && kill -9 <PID>
```

### "Cannot find module"
```bash
npm install
```

### "Connection refused (MySQL)"
```bash
# Verifique se MySQL está rodando
mysql -u root -p
```

---

## 📚 Documentação Completa

- 👤 [Manual do Usuário](./MANUAL_DO_USUARIO.md) - Guia completo para usuários finais
- 🔧 [Guia Técnico](./GUIA_TECNICO.md) - Documentação técnica para devs

---

## 🎯 Próximos Passos

1. ✅ Aplicação rodando com sucesso
2. 📖 Leia o [Manual do Usuário](./MANUAL_DO_USUARIO.md)
3. 🔐 Altere a senha do admin
4. 📊 Explore o Dashboard

---

**Bem-vindo ao Clínica Nexus! 🏥**

