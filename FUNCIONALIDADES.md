# 🏥 FUNCIONALIDADES - CLÍNICA NEXUS

**Visão Geral de Todas as Features do Sistema**

---

## 📑 Índice

1. [Sistema de Autenticação](#sistema-de-autenticação)
2. [Gerenciamento de Pacientes](#gerenciamento-de-pacientes)
3. [Agendamento de Consultas](#agendamento-de-consultas)
4. [Gestão de Médicos](#gestão-de-médicos)
5. [Prontuário Eletrônico](#prontuário-eletrônico)
6. [Gerenciamento de Funcionários](#gerenciamento-de-funcionários)
7. [Dashboard e Relatórios](#dashboard-e-relatórios)
8. [Recursos Adicionais](#recursos-adicionais)

---

## 🔐 Sistema de Autenticação

### Funcionalidades

#### ✅ Login
- Acesso com email e senha
- Validação segura com JWT
- Lembrar sessão
- Recuperação de senha por email

#### ✅ Registro
- Cadastro de novo usuário
- Validação de email único
- Requisição de aprovação admin
- Confirmação por email

#### ✅ Gerenciamento de Sessão
- Armazenamento seguro de token
- Refresh de token automático
- Logout seguro
- Expiração de sessão

#### ✅ Controle de Acesso
- Diferentes perfis de usuário:
  - 👤 Paciente
  - 💼 Recepcionista
  - 👨‍⚕️ Médico
  - 🛠️ Funcionário
  - 🔑 Administrador
  
- Rotas protegidas por perfil
- Permissões específicas por papel

---

## 👥 Gerenciamento de Pacientes

### Funcionalidades Principais

#### ✅ Cadastro de Paciente

**Dados Coletados:**
```
Informações Pessoais:
├── Nome completo
├── CPF (único)
├── Data de nascimento
├── Gênero
├── Email
└── Telefone

Endereço:
├── Rua
├── Número
├── Complemento
├── Bairro
├── Cidade
├── Estado
└── CEP

Saúde:
├── Alergias
├── Medicamentos em uso
├── Antecedentes médicos
└── Contato de emergência
```

#### ✅ Visualizar Dados

- Listagem com busca por:
  - Nome
  - CPF
  - Email
  - Data de registro

- Filtros por:
  - Status (ativo/inativo)
  - Data de cadastro
  - Especialidade (última consulta)

#### ✅ Editar Informações

- Atualize dados cadastrais
- Adicione alergias/medicamentos
- Modifique contatos
- Histórico de alterações

#### ✅ Excluir Paciente

- Exclusão lógica (arquivamento)
- Confirmação obrigatória
- Registro em auditoria

#### ✅ Prontuário

- Acesso ao histórico completo
- Visualização de consultas anteriores
- Diagnósticos e tratamentos

---

## 📅 Agendamento de Consultas

### Funcionalidades Principais

#### ✅ Agendar Consulta

**Processo em 4 Passos:**

1. **Selecione o Paciente**
   - Busca por nome/CPF
   - Ou crie novo paciente

2. **Escolha o Médico/Especialidade**
   - Filtro por especialidade
   - Visualização de disponibilidade

3. **Selecione Data/Hora**
   - Calendário interativo
   - Mostra horários livres
   - Período de funcionamento

4. **Confirme**
   - Revisão de dados
   - Notificação ao paciente

#### ✅ Visualizar Agenda

- **Calendário Integrado** (FullCalendar)
  - Vista por dia/semana/mês
  - Cores por médico/especialidade
  - Clique para detalhes

- **Lista de Consultas**
  - Filtro por data
  - Filtro por médico
  - Busca por paciente
  - Ordenação por hora

#### ✅ Editar Agendamento

- Mude data/hora
- Troque médico
- Adicione observações
- Notifique paciente

#### ✅ Cancelar Consulta

- Motivo do cancelamento
- Libera horário para outro
- Notificação automática
- Registro de cancelamento

#### ✅ Painéis Específicos

**Painel do Recepcionista:**
- Agendar novas consultas
- Gerenciar dia/semana
- Contato com pacientes

**Painel do Médico:**
- Suas consultas programadas
- Próximas consultas
- Histórico de atendimentos

---

## 👨‍⚕️ Gestão de Médicos

### Funcionalidades Principais

#### ✅ Cadastro

**Informações:**
```
Dados Pessoais:
├── Nome completo
├── CPF
├── Email
├── Telefone
└── Data de nascimento

Profissional:
├── CRM/CREO
├── Especialidade(s)
├── Ano de formatura
├── Universidade
└── Experiência

Operacional:
├── Horários de trabalho
├── Dias disponíveis
├── Consultório/Sala
└── Status (ativo/inativo)
```

#### ✅ Gerenciar Especialidades

- Médico pode ter múltiplas especialidades
- Horários diferentes por especialidade
- Indique especialidade principal
- Widget de especialidades no dashboard

#### ✅ Horários e Disponibilidade

- Defina dias de trabalho (seg-sex, etc.)
- Horas de início e fim
- Duração padrão de consulta (15/30/60 min)
- Horário de pausa/almoço
- Férias planejadas

#### ✅ Visualizar Médicos

- Listagem com especialidade
- Filtro por especialidade
- Busca por nome
- Visualizar agenda

#### ✅ Editar Cadastro

- Atualize dados
- Mude horários
- Adicione/remova especialidades
- Inative/reative

---

## 📝 Prontuário Eletrônico

### Funcionalidades Principais

#### ✅ Consultar Prontuário

**Seções:**

1. **Dados Demográficos**
   - Nome, CPF, data de nascimento
   - Contatos
   - Endereço

2. **Histórico de Saúde**
   - Alergias (com destaque visual)
   - Medicamentos atuais
   - Antecedentes pessoais
   - Antecedentes familiares

3. **Histórico de Consultas**
   - Data e hora (em ordem cronológica)
   - Médico responsável
   - Especialidade
   - Motivo da consulta
   - Diagnóstico(s)
   - Tratamento

4. **Exames**
   - Tipo de exame realizado
   - Data
   - Resultado
   - Link para arquivo (se digital)

#### ✅ Registrar Consulta

**Ao Atender um Paciente:**

1. **Queixa Principal**
   - Motivo da consulta
   - Duração dos sintomas

2. **História da Doença Atual**
   - Evolução dos sintomas
   - Fatores agravantes/aliviantes

3. **Exame Físico**
   - Pressão arterial
   - Frequência cardíaca
   - Frequência respiratória
   - Temperatura
   - Peso e altura
   - Achados do exame

4. **Diagnóstico(s)**
   - Campo de seleção múltipla
   - Código CID-10 (opcional)
   - Diagnóstico principal
   - Diagnósticos secundários

5. **Plano de Tratamento**
   - Medicações prescritas
   - Dosagem
   - Via de administração
   - Frequência
   - Duração
   - Instruções especiais

6. **Orientações ao Paciente**
   - Repouso recomendado
   - Atividades restritas
   - Retorno ao médico
   - Observações gerais

7. **Observações Adicionais**
   - Anotações livres
   - Contexto importante

#### ✅ Receituário

- **Geração Automática**
  - Ao registrar medicações
  - Com dados do médico
  - Com assinatura digital (opcional)

- **Impressão**
  - Formato padrão
  - Código de barras (se configurado)

- **Envio ao Paciente**
  - Email automático
  - SMS (se integrado)
  - WhatsApp (se integrado)

#### ✅ Histórico Acessível

- Última consulta em destaque
- Timeline de consultas
- Filtro por data
- Exportação para PDF

---

## 💼 Gerenciamento de Funcionários

### Funcionalidades Principais

#### ✅ Cadastro

**Dados de Funcionário:**
```
Pessoais:
├── Nome
├── CPF
├── Email
├── Telefone
└── Data de nascimento

Profissional:
├── Cargo
├── Data de admissão
├── Salário (se necessário)
├── CTPS
└── NIT

Acesso Sistema:
├── Email de login
├── Perfil (admin, recepção, etc.)
├── Permissões específicas
└── Status (ativo/inativo)
```

#### ✅ Cargos Disponíveis

- Administrador
- Gerente
- Recepcionista
- Enfermeiro(a)
- Técnico de Enfermagem
- Atendente
- Faxineiro(a)
- Segurança
- Outros (customizável)

#### ✅ Gerenciar Funcionários

- **Listar** com busca e filtros
- **Editar** dados cadastrais
- **Excluir** de forma segura
- **Inativar/Reativar** conforme necessidade

#### ✅ Controle de Acesso

- Diferentes níveis de permissão
- Acesso restrito por perfil
- Auditoria de ações

---

## 📊 Dashboard e Relatórios

### Dashboard Administrativo

#### Widgets Principais

1. **Estatísticas Gerais**
   - Total de pacientes
   - Total de médicos
   - Total de funcionários
   - Consultas hoje/semana/mês

2. **Gráficos**
   - Consultas por médico
   - Consultas por especialidade
   - Taxa de ocupação
   - Pacientes novos vs. retorno

3. **Alertas**
   - Consultas com atraso
   - Médicos sem agenda
   - Pacientes sem prontuário atualizado

4. **Métricas**
   - Taxa de no-show (faltas)
   - Tempo médio de consulta
   - Satisfação do paciente (opcional)

### Dashboard de Recepção

- ✅ Consultas do dia
- ✅ Próximas consultas
- ✅ Pacientes a atender
- ✅ Atalhos para funções principais

### Dashboard de Médico

- ✅ Próximas consultas
- ✅ Pacientes a atender
- ✅ Histórico do dia
- ✅ Acesso ao prontuário

---

## 🎁 Recursos Adicionais

### ✅ Notificações

- Confirmação de agendamento (para paciente)
- Lembrete 24h antes (para paciente)
- Cancelamento de consulta
- Alteração de data/hora

### ✅ Sincronização de Dados

- Tempo real entre módulos
- Atualização de status automática
- Sem necessidade de refresh

### ✅ Responsividade

- Desktop completo
- Tablet otimizado
- Mobile simplificado

### ✅ Exportação

- PDF de prontuário
- PDF de receita
- Excel de relatório
- Impressão de agenda

### ✅ Busca e Filtros

- Busca por texto (nome, CPF)
- Filtro por data
- Filtro por status
- Filtro por especialidade
- Combinação de filtros

### ✅ Segurança

- Criptografia de senhas
- JWT para autenticação
- HTTPS em produção
- Logs de auditoria
- Backup automático

### ✅ Integrações Futuras

- SMS de notificação
- WhatsApp de lembrete
- Email automático
- Google Calendar sync
- HL7 para outros sistemas

---

## 🔌 Endpoints da API

### Autenticação
```
POST   /auth/login          Login do usuário
POST   /auth/register       Registración novo usuário
GET    /auth/me             Dados do usuário atual
POST   /auth/logout         Logout
```

### Pacientes
```
GET    /paciente            Listar todos
GET    /paciente/:id        Detalhes
POST   /paciente            Criar novo
PATCH  /paciente/:id        Atualizar
DELETE /paciente/:id        Deletar
```

### Agendamentos
```
GET    /agendamento         Listar todos
GET    /agendamento/:id     Detalhes
POST   /agendamento         Criar novo
PATCH  /agendamento/:id     Atualizar
DELETE /agendamento/:id     Deletar
GET    /agendamento/medico/:id  Agenda do médico
GET    /agendamento/paciente/:id  Consultas do paciente
```

### Médicos
```
GET    /medico              Listar todos
GET    /medico/:id          Detalhes
POST   /medico              Criar novo
PATCH  /medico/:id          Atualizar
DELETE /medico/:id          Deletar
GET    /especialidade       Listar especialidades
```

### Funcionários
```
GET    /funcionarios        Listar todos
GET    /funcionarios/:id    Detalhes
POST   /funcionarios        Criar novo
PATCH  /funcionarios/:id    Atualizar
DELETE /funcionarios/:id    Deletar
```

### Prontuário
```
GET    /prontuario          Listar todos
GET    /prontuario/:id      Detalhes
POST   /prontuario          Criar novo
PATCH  /prontuario/:id      Atualizar
GET    /prontuario/paciente/:id  Prontuário do paciente
```

---

## 🎯 Fluxo Típico de Uso

### Para Recepcionista

1. **Abre o sistema** → Login
2. **Novo paciente** → Cadastra dados
3. **Novo agendamento** → Seleciona paciente, médico, data/hora
4. **Confirma** → Sistema envia notificação
5. **No dia** → Recebe o paciente, verifica chegada

### Para Médico

1. **Abre sistema** → Login
2. **Vê consultas do dia**
3. **Abre prontuário** do paciente
4. **Realiza atendimento**
5. **Registra consulta** no prontuário
6. **Prescreve medicação** → Gera receita
7. **Salva prontuário**

---

**Clínica Nexus - Sistema Integrado de Gerenciamento de Clínicas**

