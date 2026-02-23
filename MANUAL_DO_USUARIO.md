# 📋 MANUAL DO USUÁRIO - CLÍNICA NEXUS

**Versão:** 1.0  
**Data:** Fevereiro de 2026  
**Sistema:** Clínica Nexus - Gerenciamento Integrado de Consultas e Prontuários

---

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Começando](#começando)
3. [Autenticação](#autenticação)
4. [Módulo de Administração](#módulo-de-administração)
5. [Módulo de Recepção](#módulo-de-recepção)
6. [Módulo de Ala Médica](#módulo-de-ala-médica)
7. [Funcionalidades Gerais](#funcionalidades-gerais)
8. [Dúvidas Frequentes](#dúvidas-frequentes)
9. [Suporte Técnico](#suporte-técnico)

---

## 🎯 Visão Geral

**Clínica Nexus** é um sistema web completo desenvolvido em **React** para gerenciamento integrado de clínicas e consultórios. O sistema foi projetado para automatizar e otimizar os processos de:

- 🔐 **Autenticação e Controle de Acesso** - Diferentes perfis de usuários
- 👥 **Gestão de Pacientes** - Cadastro e atualização de dados
- 📅 **Agendamento de Consultas** - Calendário integrado
- 👨‍⚕️ **Gestão de Médicos e Especialidades**
- 📝 **Prontuário Eletrônico** - Registro de consultas e histórico
- 💼 **Gerenciamento de Funcionários**
- 📊 **Dashboards Administrativos**

### Requisitos Técnicos

- **Navegador:** Chrome, Firefox, Safari ou Edge (versão recente)
- **Conexão:** Internet estável
- **Sistema Operacional:** Windows, macOS ou Linux
- **Resolução:** Mínimo 1024x768 (recomendado 1920x1080)

---

## 🚀 Começando

### 1️⃣ Acessando o Sistema

#### Opção A: Via Navegador Web (Recomendado)

1. Abra seu navegador
2. Acesse: `http://localhost:5173` (ambiente de desenvolvimento)
3. Ou o endereço fornecido pelo administrador
4. Você será redirecionado para a página de **Login**

#### Opção B: Via Aplicativo Desktop (Electron)

1. Localize o atalho do Clínica Nexus na sua área de trabalho
2. Clique para abrir
3. O aplicativo carregará com a interface completa

### 2️⃣ Requisitos para Usar

Antes de começar, você precisa ter:

- ✅ Credenciais de acesso (email e senha)
- ✅ Funções de usuário já configuradas pelo administrador
- ✅ Acesso ao banco de dados da clínica

---

## 🔐 Autenticação

### Fazendo Login

1. **Na tela de Login**, preencha:
   - **Email:** seu endereço de e-mail cadastrado
   - **Senha:** sua senha segura

2. **Clique em "Entrar"**

3. O sistema validará sua credencial e você será redirecionado para seu Dashboard

### Esqueceu a Senha?

Se não conseguir acessar:

1. Na página de Login, procure por "Esqueci minha senha"
2. Insira seu email registrado
3. Um link de reset será enviado
4. Siga as instruções no e-mail
5. Crie uma nova senha

> ⚠️ **Nota:** Se nenhum link for recebido, verifique sua pasta de Spam

### Criando uma Conta (Se Permitido)

1. Na page de Login, clique em **"Criar Conta"** ou **"Registrar"**
2. Preencha os dados solicitados:
   - **Nome Completo**
   - **Email**
   - **Senha** (mínimo 8 caracteres)
   - **Confirme a Senha**
3. Clique em **"Registrar"**
4. Aguarde a validação do administrador

> ⚠️ **Aviso:** O registro pode requerer aprovação administrativa

### Logout (Sair)

Para sair da sua conta:

1. Procure seu **perfil** ou **menu** no canto superior direito
2. Clique em **"Sair"** ou **"Logout"**
3. Você voltará à página de Login

---

## 👨‍💼 Módulo de Administração

O módulo administrativo é restrito a usuários com permissão de **Administrador**.

### Acessando a Administração

1. Após login, ele será redirecionado para seu Dashboard
2. Se tiver permissões, clique em **"Administração"** no menu

### 1. Dashboard Administrativo

**Local:** `/administracao`

Visualiza:
- ✅ Estatísticas gerais do sistema
- ✅ Quantidade de pacientes
- ✅ Consultas agendadas
- ✅ Funcionários e médicos cadastrados
- ✅ Gráficos e relatórios

### 2. Gerenciamento de Funcionários

**Local:** `/funcionarios`

#### Visualizar Funcionários

1. Vá para **"Funcionários"** no menu
2. Uma tabela mostrará todos os funcionários registrados
3. Veja informações como:
   - Nome
   - Email
   - Cargo
   - Data de admissão
   - Status

#### Adicionar Novo Funcionário

1. Clique em **"Adicionar Funcionário"**
2. Preencha o formulário:
   - **Nome Completo**
   - **Email**
   - **Cargo** (Recepcionista, Enfermeiro, Médico, etc.)
   - **Data de Admissão**
   - **CPF/CRM** (se aplicável)
3. Clique em **"Salvar"**

#### Editar Funcionário

1. Na tabela de funcionários, encontre o funcionário
2. Clique em **"Editar"** ou no ícone de edição
3. Altere os dados necessários
4. Clique em **"Salvar Alterações"**

#### Excluir Funcionário

1. Na tabela, clique em **"Excluir"** ao lado do funcionário
2. Confirme a ação

> ⚠️ **Cuidado:** Esta ação não pode ser desfeita

### 3. Gerenciamento de Médicos

**Local:** `/admin/medicos`

#### Visualizar Médicos

1. Acesse **"Médicos"** no menu administrativo
2. Veja a lista completa de médicos disponíveis
3. Informações exibidas:
   - Nome do médico
   - Especialidade(s)
   - Horário de trabalho
   - Status (Ativo/Inativo)

#### Adicionar Médico

1. Clique em **"Adicionar Médico"**
2. Preencha:
   - **Nome Completo**
   - **CRM/CREO** (credencial profissional)
   - **Especialidade** (selecione uma ou mais)
   - **Email**
   - **Telefone**
   - **Dias de Trabalho**
   - **Horários**
3. Clique em **"Cadastrar"**

#### Editar Médico

1. Clique em **"Editar"** ao lado do médico desejado
2. Atualize as informações necessárias
3. Clique em **"Salvar"**

### 4. Gerenciamento de Especialidades

As especialidades aparecem no sistema com:
- **Cardiologia**
- **Dermatologia**
- **Pediatria**
- **Odontologia**
- **Oftalmologia**
- E outras conforme configurado

---

## 📞 Módulo de Recepção

O módulo de Recepção é para usuários com cargo de **Recepcionista**.

### 1. Dashboard de Recepção

**Local:** `/recepcao`

Acesso rápido para:
- 📅 Agendar nova consulta
- 👥 Gerenciar pacientes
- 📋 Visualizar agenda do dia
- ⏰ Consultas programadas

### 2. Agendamento de Consultas

**Local:** `/recepcao/agendar-consulta`

#### Passos para Agendar:

1. Clique em **"Agendar Consulta"**

2. **Selecione o Paciente:**
   - Procure por nome, CPF ou email
   - Se o paciente não existir, clique em "Adicionar Paciente"

3. **Escolha o Médico:**
   - Selecione na lista de médicos disponíveis
   - Ou procure por especialidade

4. **Selecione a Data e Hora:**
   - Clique no calendário
   - Escolha uma data disponível
   - Selecione um horário livre

5. **Descrição (Opcional):**
   - Indique motivo da consulta
   - Anotações importantes

6. Clique em **"Confirmar Agendamento"**

#### Visualizar Agendamentos

1. Vá para **"Agenda do Médico"**
2. Selecione o médico
3. Veja o calendário com suas consultas agendadas
4. Clique em qualquer consulta para ver detalhes

### 3. Cadastro e Gestão de Pacientes

**Local:** `/recepcao/pacientes`

#### Cadastrar Novo Paciente

1. Clique em **"Novo Paciente"** ou **"Adicionar Paciente"**

2. Preencha as informações:
   - **Nome Completo** ✓ Obrigatório
   - **Data de Nascimento**
   - **CPF** ✓ Obrigatório
   - **Email**
   - **Telefone**
   - **Endereço**
     - Rua
     - Número
     - Bairro
     - Cidade
     - CEP
   - **Gênero**
   - **Alergias** (muito importante!)
   - **Medicamentos em uso**

3. Clique em **"Salvar Paciente"**

#### Visualizar Pacientes

1. Acesse **"Visualizar Pacientes"**
2. Uma tabela mostra todos os pacientes
3. Use a **barra de busca** para encontrar por:
   - Nome
   - CPF
   - Email

#### Editar Dados do Paciente

1. Encontre o paciente na lista
2. Clique em **"Editar"** ou no ícone de lápis
3. Altere os dados necessários
4. Clique em **"Salvar Alterações"**

#### Visualizar Histórico

1. Clique em **"Ver Histórico"** ou **"Detalhes"**
2. Veria todas as consultas anteriores do paciente
3. Informações como:
   - Data da consulta
   - Médico responsável
   - Diagnóstico
   - Observações

### 4. Visualizar e Editar Agenda

**Local:** `/recepcao/agenda`

#### Editar Agendamento

1. Na lista de consultas, clique em **"Editar"**
2. Você pode alterar:
   - **Data**
   - **Hora**
   - **Médico**
   - **Motivo da consulta**
3. Clique em **"Salvar Alterações"**

#### Cancelar Agendamento

1. Clique em **"Cancelar"** na consulta desejada
2. Indique o motivo (opcional)
3. Confirme o cancelamento

> 📌 **Dica:** O sistema pode enviar notificação ao paciente automáticamente

---

## 👨‍⚕️ Módulo de Ala Médica

Acesso restrito a usuários com cargo de **Médico** ou **Fisioterapeuta**.

### 1. Dashboard Med

**Local:** `/ala-medica`

Oferece:
- 📋 Consultas do dia
- 📝 Acesso rápido ao prontuário
- 📊 Estatísticas de atendimento
- ⏱️ Próximas consultas

### 2. Listar Minhas Consultas

**Local:** `/ala-medica/consultas`

#### Visualizar Consultas Agendadas

1. Vá para **"Minhas Consultas"**
2. Veja a lista de consultas:
   - **Futuras:** Agendadas para depois
   - **Hoje:** Consultas de hoje
   - **Passadas:** Histórico de atendimentos

3. Clique em uma consulta para **"Ver Detalhes"**

#### Informações da Consulta

- Nome do paciente
- Data e hora do atendimento
- Tipo de consulta
- Histórico médico do paciente
- Observações prévias

### 3. Prontuário Eletrônico

**Local:** `/ala-medica/prontuario`

O Prontuário é o registro oficial de todos os atendimentos e informações clínicas.

#### Acessar Prontuário de um Paciente

1. Na lista de consultas, clique em **"Abrir Prontuário"**
2. Ou vá para **"Prontuário"** e busque o paciente

#### Consultar Informações do Prontuário

O prontuário contém:

- **Dados Pessoais:**
  - Nome e CPF
  - Data de nascimento
  - Contatos

- **Alergias e Contraindicações**

- **Medicamentos em Uso**

- **Histórico de Consultas:**
  - Data
  - Diagnóstico
  - Tratamento recomendado
  - Medicações prescritas

- **Exames Realizados**

#### Registrar Nova Consulta (Criar Anotação)

1. No Prontuário, clique em **"Nova Consulta"** ou **"Adicionar Anotação"**

2. Preencha:
   - **Data da Consulta** (automático)
   - **Queixa Principal:** Motivo da consulta
   - **Histórico da Doença Atual**
   - **Antecedentes Pessoais** (alergias, cirurgias)
   - **Medicações Prévias**

3. **Exame Físico:**
   - Pressão Arterial
   - Frequência Cardíaca
   - Temperatura
   - Peso
   - Altura
   - Observações

4. **Diagnóstico(s):**
   - Indique o diagnóstico
   - Código CID (se conhecer)

5. **Plano de Tratamento:**
   - Medicações prescritas
   - Dosagem
   - Duração
   - Orientações

6. **Observações Finais**

7. Clique em **"Salvar Prontuário"**

#### Receituário

Ao registrar medicações:
1. O sistema gera automaticamente uma receita
2. Você pode **imprimir** ou **enviar** para o paciente
3. A receita fica registrada no prontuário

### 4. Detalhes da Consulta

**Local:** `/ala-medica/consulta/{id}`

Aqui você pode:
- ✅ Ver informações do paciente
- ✅ Acessar prontuário completo
- ✅ Registrar anotações e observações
- ✅ Prescrever medicamentos
- ✅ Solicitar exames
- ✅ Gerar receita ou atestado

---

## 🔧 Funcionalidades Gerais

### 📅 Calendário Integrado

O sistema usa **FullCalendar** para visão otimizada de agendamentos:

- **Visualizar:** Arraste pela semana ou mês
- **Clicar em evento:** Veja/edite os detalhes
- **Arrastar evento:** Remova ou reorganize (se permissionado)
- **Cores:** Diferentes cores para diferentes tipos de evento

### 🔍 Busca e Filtros

Disponível em várias telas:

- **Busca por Nome**
- **Filtro por Data**
- **Filtro por Status**
- **Filtro por Especialidade**

### 📱 Responsividade

O sistema é otimizado para:
- 💻 Desktop (recomendado)
- 📱 Tablets
- 📞 Smartphones (design adaptado)

---

## ❓ Dúvidas Frequentes

### P: Como mudo minha senha?
**R:** Vá para Configurações de Perfil (menu usuário > Perfil > Alterar Senha) e insira sua senha atual e a nova.

### P: Posso agendar múltiplas consultas para o mesmo paciente?
**R:** Sim! Você pode agendar quantas consultas forem necessárias, desde que haja horários disponíveis.

### P: O que acontece se cancelar uma consulta?
**R:** O agendamento é removido e o horário fica disponível novamente. Você pode notificar o paciente automaticamente ou manualmente.

### P: Como gero um receituário?
**R:** Ao registrar uma consulta e prescrever medicamentos, o sistema gera automaticamente. Você pode imprimir na opção "Imprimir Receita".

### P: Posso editar consultas passadas?
**R:** Sim, você pode adicionar notas ou observações ao prontuário de consultas anteriores para manter o histórico atualizado.

### P: O sistema faz backup dos dados?
**R:** Sim, o banco de dados realiza backups automáticos. Consulte o administrador para informações sobre frequência.

### P: Posso visualizar prontuários de outros médicos?
**R:** Não. Por questões de segurança e sigilo, você só pode visualizar/editar prontuários de suas próprias consultas.

### P: Como adiciono especialidades a um médico?
**R:** Na tela de edição do médico, você pode selecionar múltiplas especialidades. Isso é feito pela Administração.

---

## 🆘 Suporte Técnico

### Problemas Comuns

#### "Erro na conexão com o servidor"
- ✅ Verifique sua conexão internet
- ✅ Verifique se o servidor backend está rodando
- ✅ Recarregue a página (F5 ou Ctrl+R)
- ✅ Limpe o cache do navegador

#### "Erro 401 - Não autorizado"
- ✅ Seu token expirou, faça login novamente
- ✅ Suas permissões foram revogadas, entre em contato com o administrador

#### "Página branca em branco"
- ✅ Aguarde o carregamento (pode demorar)
- ✅ Abra o Console (F12) para ver mensagens de erro
- ✅ Recarregue a página
- ✅ Limpe o localStorage: `localStorage.clear()`

#### "Não consigo agendar uma consulta"
- ✅ Verifique se o paciente está cadastrado
- ✅ Verifique se existe horário disponível
- ✅ Verifique se o médico está ativo

### Contato de Suporte

Para problemas não resolvidos acima:

- **Email:** suporte@clinicaexus.com
- **Telefone:** (XX) X XXXX-XXXX
- **Horário:** Segunda a Sexta, 9h às 18h
- **Chat:** Disponível no sistema (ícone de mensagem)

### Informações para Suporte

Ao contatar o suporte, forneça:
1. Qual módulo estava usando?
2. Qual ação exata executou?
3. Qual foi a mensagem de erro? (capturas de tela ajudam)
4. Qual seu navegador e versão?
5. Qual seu cargo/perfil no sistema?

---

## 📌 Dicas Importantes

- 🔐 **Nunca compartilhe suas credenciais** com outras pessoas
- 💾 **Salve regularmente** suas anotações importantes
- 📝 **Complete prontuários** logo após as consultas para evitar esquecimentos
- 🔔 **Ative notificações** para não perder agendamentos
- 🌐 **Use navegador atualizado** para melhor performance
- 🖥️ **Backup local:** Faça screenshots de dados críticos

---

## 📄 Informações Legais

**Clínica Nexus** © 2026  
Sistema desenvolvido para gerenciamento de clínicas e consultórios.

- Todos os dados são protegidos por criptografia
- Conformidade com LGPD (Lei Geral de Proteção de Dados)
- Acesso controlado por autenticação
- Logs de auditoria para rastreamento de ações

---

**Última atualização:** Fevereiro de 2026  
**Versão do Manual:** 1.0

**Para atualizações e novas funcionalidades, consulte o administrador do sistema.**

---

