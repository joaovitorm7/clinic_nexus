# 📚 DOCUMENTAÇÃO - CLÍNICA NEXUS

**Bem-vindo! Aqui você encontrará toda a documentação do sistema.**

---

## 🎯 Comece Aqui

### Você é...

#### 👤 **Novo Usuário End-User?**
👉 Leia: [**Manual do Usuário**](./MANUAL_DO_USUARIO.md)
- Como usar cada funcionalidade
- Guia passo a passo
- Respostas a dúvidas frequentes
- ~400 linhas | ⏱️ 30 minutos de leitura

---

#### ⚡ **Quer Começar Rápido?**
👉 Leia: [**Quick Start**](./QUICK_START.md)  
- Configure em 5 minutos
- Comandos essenciais
- Erros comuns
- ~50 linhas | ⏱️ 5 minutos de leitura

---

#### 🧑‍💻 **Desenvolvedor ou Admin?**
👉 Leia: [**Guia Técnico**](./GUIA_TECNICO.md)
- Arquitetura do sistema
- Instalação completa
- Integração com API
- Troubleshooting técnico
- ~350 linhas | ⏱️ 45 minutos de leitura

---

#### 🔍 **Quer Conhecer Todas as Features?**
👉 Leia: [**Funcionalidades**](./FUNCIONALIDADES.md)
- Lista completa de recursos
- Fluxos de uso
- Endpoints da API
- Possibilidades do sistema
- ~300 linhas | ⏱️ 20 minutos de leitura

---

## 📖 Estrutura da Documentação

```
📁 clinic_nexus/
├── 📄 README.md                    ← Leia primeiro (este arquivo!)
├── ⚡ QUICK_START.md               ← Se com pressa
├── 📋 MANUAL_DO_USUARIO.md         ← Guia completo do usuário
├── 🔧 GUIA_TECNICO.md              ← Para developing
├── 🔌 FUNCIONALIDADES.md           ← Overview de features
│
├── 📁 backend/                     ← API NestJS
│   ├── README.md
│   ├── .env.example
│   └── src/
│
├── 📁 frontend/                    ← React + Vite
│   ├── README.md
│   └── src/
│
├── 📁 test/                        ← Testes
│
└── 📄 clinic_nexus_backup.sql      ← Banco de dados
```

---

## 🚀 Roteiro Recomendado

### Para Usuários Finais
```
1. ⚡ QUICK_START (5 min)
   ↓ Instalar e rodar
2. 📋 MANUAL_DO_USUARIO (30 min)
   ↓ Aprender a usar
3. ❓ FAQ no Manual
   ↓ Dúvidas? Leia FAQ
```

### Para Desenvolvedores
```
1. ⚡ QUICK_START (5 min)
   ↓ Instalar sistema
2. 🔧 GUIA_TECNICO (45 min)
   ↓ Entender arquitetura
3. 🔌 FUNCIONALIDADES (20 min)
   ↓ Conhecer features
4. 📋 Backend README
   ↓ Desenvolver
```

### Para Administradores
```
1. ⚡ QUICK_START (5 min)
   ↓ Setup inicial
2. 🔧 GUIA_TECNICO - Seção de Segurança
   ↓ Segurança e backups
3. 📋 MANUAL_DO_USUARIO - Seção Admin
   ↓ Gerenciar usuários
```

---

## 🎓 Tempo de Leitura Total

| Documento | Linhas | Tempo |
|-----------|--------|-------|
| QUICK_START.md | ~50 | 5 min |
| FUNCIONALIDADES.md | ~300 | 20 min |
| MANUAL_DO_USUARIO.md | ~400 | 30 min |
| GUIA_TECNICO.md | ~350 | 45 min |
| **TOTAL** | **~1100** | **100 min** |

---

## 🔍 Encontrar Informação Rápida

### Quero saber como...

#### 🔐 Fazer Login
- [Manual do Usuário → Autenticação](./MANUAL_DO_USUARIO.md#-autenticação)

#### 📅 Agendar Consulta
- [Manual do Usuário → Módulo de Recepção](./MANUAL_DO_USUARIO.md#-módulo-de-recepção)

#### 👥 Cadastrar Paciente
- [Manual do Usuário → Cadastro e Gestão de Pacientes](./MANUAL_DO_USUARIO.md#3-cadastro-e-gestão-de-pacientes)

#### 💊 Registrar Prontuário
- [Manual do Usuário → Prontuário Eletrônico](./MANUAL_DO_USUARIO.md#3-prontuário-eletrônico)

#### 👨‍💼 Gerenciar Funcionários
- [Manual do Usuário → Gerenciamento de Funcionários](./MANUAL_DO_USUARIO.md#2-gerenciamento-de-funcionários)

#### 🐛 Resolver Erro
- [Guia Técnico → Troubleshooting](./GUIA_TECNICO.md#-troubleshooting)
- [Manual do Usuário → Dúvidas Frequentes](./MANUAL_DO_USUARIO.md#-dúvidas-frequentes)

#### 🔌 Usar a API
- [Guia Técnico → Integrações com API](./GUIA_TECNICO.md#-integrações-com-api)
- [Funcionalidades → Endpoints da API](./FUNCIONALIDADES.md#-endpoints-da-api)

#### 🚀 Instalar o Sistema
- [Quick Start](./QUICK_START.md)
- [Guia Técnico → Instalação](./GUIA_TECNICO.md#-instalação-e-configuração)

---

## 📞 Suporte

### Primeira vez aqui?
1. Leia o [QUICK_START](./QUICK_START.md)
2. Consulte o [MANUAL_DO_USUARIO](./MANUAL_DO_USUARIO.md)

### Encontrou um bug?
1. Verifique [Troubleshooting](./GUIA_TECNICO.md#-troubleshooting)
2. Abra uma issue no [GitHub](https://github.com/joaovitorm7/clinic_nexus)

### Pergunta técnica?
1. Leia [Guia Técnico](./GUIA_TECNICO.md)
2. Verifique [Endpoints API](./FUNCIONALIDADES.md#-endpoints-da-api)

### Pergunta sobre uso?
1. Leia [Manual do Usuário](./MANUAL_DO_USUARIO.md)
2. Verifique [FAQ](./MANUAL_DO_USUARIO.md#-dúvidas-frequentes)

---

## 🔒 Informações de Segurança

⚠️ **Importante:** Antes de colocar em produção, leia:
- [Guia Técnico → Segurança](./GUIA_TECNICO.md#-segurança)
- [Manual do Usuário → Dicas Importantes](./MANUAL_DO_USUARIO.md#-dicas-importantes)

---

## ✅ Checklist de Setup

- [ ] Leia o QUICK_START
- [ ] Clone o repositório
- [ ] Instale dependências
- [ ] Configure banco de dados
- [ ] Configure `.env`
- [ ] Rode backend e frontend
- [ ] Faça login com demo account
- [ ] Explore o MANUAL_DO_USUARIO
- [ ] Leia FUNCIONALIDADES
- [ ] Configure em produção (see GUIA_TECNICO)

---

## 📝 Documentação por Módulo

### 🔐 Autenticação
- [Manual → Autenticação](./MANUAL_DO_USUARIO.md#-autenticação)
- [Técnico → AuthContext](./GUIA_TECNICO.md#authcontextjsx)
- [Features → Sistema de Autenticação](./FUNCIONALIDADES.md#-sistema-de-autenticação)

### 👥 Pacientes
- [Manual → Cadastro de Pacientes](./MANUAL_DO_USUARIO.md#3-cadastro-e-gestão-de-pacientes)
- [Técnico → Serviço Paciente](./GUIA_TECNICO.md#exemplo-de-serviço)
- [Features → Gerenciamento de Pacientes](./FUNCIONALIDADES.md#-gerenciamento-de-pacientes)

### 📅 Agendamentos
- [Manual → Agendamento](./MANUAL_DO_USUARIO.md#2-agendamento-de-consultas)
- [Técnico → Estrutura Agendamento](./GUIA_TECNICO.md#estrutura-do-projeto-frontend)
- [Features → Agendamento de Consultas](./FUNCIONALIDADES.md#-agendamento-de-consultas)

### 👨‍⚕️ Médicos
- [Manual → Gerenciamento de Médicos](./MANUAL_DO_USUARIO.md#3-gerenciamento-de-médicos)
- [Técnico → Endpoints Médicos](./GUIA_TECNICO.md#endpoints-principais)
- [Features → Gestão de Médicos](./FUNCIONALIDADES.md#-gestão-de-médicos)

### 📝 Prontuário
- [Manual → Prontuário Eletrônico](./MANUAL_DO_USUARIO.md#3-prontuário-eletrônico)
- [Técnico → Serviço Prontuário](./GUIA_TECNICO.md#estrutura-do-projeto-frontend)
- [Features → Prontuário Eletrônico](./FUNCIONALIDADES.md#-prontuário-eletrônico)

### 💼 Funcionários
- [Manual → Gerenciamento de Funcionários](./MANUAL_DO_USUARIO.md#2-gerenciamento-de-funcionários)
- [Técnico → Serviço Funcionários](./GUIA_TECNICO.md#estrutura-do-projeto-frontend)
- [Features → Gerenciamento de Funcionários](./FUNCIONALIDADES.md#-gerenciamento-de-funcionários)

### 📊 Dashboards
- [Manual → Dashboards](./MANUAL_DO_USUARIO.md#-funcionalidades-gerais)
- [Features → Dashboard e Relatórios](./FUNCIONALIDADES.md#-dashboard-e-relatórios)

---

## 🔄 Atualizar Esta Documentação

Se você implementar novas features, atualize:
1. [FUNCIONALIDADES.md](./FUNCIONALIDADES.md) - Adicione novo recurso
2. [MANUAL_DO_USUARIO.md](./MANUAL_DO_USUARIO.md) - Adicione guia de uso
3. [GUIA_TECNICO.md](./GUIA_TECNICO.md) - Atualize endpoints se necessário

---

## 📄 Versão da Documentação

- **Versão:** 1.0
- **Data:** Fevereiro de 2026
- **Compatibilidade:** Clínica Nexus v1.0+
- **Última Atualização:** Fevereiro de 2026

---

## 🎓 Recursos Externos

### Tecnologias Usadas
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [NestJS Docs](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MySQL Docs](https://dev.mysql.com/doc/)

### Padrões
- [RESTful API](https://restfulapi.net/)
- [JWT](https://jwt.io/)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Bem-vindo ao Clínica Nexus! 🏥**

*Escolha um documento acima e comece a aprender.*

