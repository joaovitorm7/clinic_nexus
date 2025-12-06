# 📋 Documentação de Testes - Clinic Nexus

## Visão Geral

Este documento descreve todos os testes implementados no projeto Clinic Nexus, incluindo como executá-los e o que cada um valida.

**Status**: ✅ **65 testes implementados e passando**

---

## 📊 Resumo dos Testes

| Categoria                                                        | Quantidade | Status          |
| ---------------------------------------------------------------- | ---------- | --------------- |
| Validadores (CPF, Email, Telefone, Senha, Cargo, Especialização) | 49         | ✅ Passando     |
| Agendamento (Service + Controller)                               | 9          | ✅ Passando     |
| Paciente (Service + Controller)                                  | 6          | ✅ Passando     |
| App Controller                                                   | 1          | ✅ Passando     |
| **TOTAL**                                                        | **65**     | **✅ Passando** |

---

## 🚀 Como Executar os Testes

### Executar todos os testes implementados:

```bash
cd backend
npm test -- --testPathPatterns="(agendamento|paciente|validators|app.controller)" --forceExit
```

### Executar apenas testes de um módulo:

```bash
# Validadores
npm test -- validators --forceExit

# Agendamentos
npm test -- agendamento --forceExit

# Pacientes
npm test -- paciente --forceExit

# Teste específico
npm test -- cpfValidator.spec.ts --forceExit
```

### Executar com cobertura de código:

```bash
npm test -- --coverage --forceExit
```

---

## 📝 Detalhes dos Testes

### 1️⃣ Validadores (49 testes)

Os validadores estão centralizados em `backend/src/validators/` e testam regras de validação de dados.

#### **CPF Validator** (7 testes)

Valida CPF com formatação livre (com ou sem pontos e hífens).

**Testes implementados:**

- ✅ Valida CPF válido sem formatação (ex: `11144477735`)
- ✅ Valida CPF válido com formatação (ex: `111.444.777-35`)
- ✅ Rejeita CPF com todos dígitos iguais (ex: `111.111.111-11`)
- ✅ Rejeita CPF com dígito verificador inválido
- ✅ Rejeita CPF com menos de 11 dígitos
- ✅ Rejeita CPF vazio
- ✅ Rejeita CPF com letras

**Arquivo:** `backend/src/validators/cpfValidator.spec.ts`

```bash
npm test -- cpfValidator --forceExit
```

---

#### **Email Validator** (7 testes)

Valida endereços de email com formato correto.

**Testes implementados:**

- ✅ Valida email válido com domínio comum (ex: `usuario@gmail.com`)
- ✅ Valida email com múltiplos subdomínios (ex: `usuario@mail.empresa.com.br`)
- ✅ Rejeita email sem símbolo @
- ✅ Rejeita email sem domínio
- ✅ Rejeita email com espaços
- ✅ Rejeita email vazio
- ✅ Rejeita email com caracteres inválidos

**Arquivo:** `backend/src/validators/emailValidator.spec.ts`

```bash
npm test -- emailValidator --forceExit
```

---

#### **Telefone Validator** (5 testes)

Valida números de telefone com formatação livre.

**Testes implementados:**

- ✅ Valida telefone com 11 dígitos formatado (ex: `(11) 99999-9999`)
- ✅ Valida telefone com 11 dígitos sem formatação (ex: `11999999999`)
- ✅ Rejeita telefone com menos de 11 dígitos
- ✅ Rejeita telefone vazio
- ✅ Rejeita telefone com letras

**Arquivo:** `backend/src/validators/telefoneValidator.spec.ts`

```bash
npm test -- telefoneValidator --forceExit
```

---

#### **Senha Validator** (14 testes)

Valida senhas com múltiplas regras de complexidade.

**Testes implementados:**

_Validação numérica:_

- ✅ Rejeita senha com apenas 1 dígito numérico
- ✅ Rejeita senha com apenas 2 dígitos numéricos

_Validação de tamanho:_

- ✅ Rejeita senha com menos de 6 caracteres
- ✅ Rejeita senha com mais de 20 caracteres
- ✅ Aceita senha com exatamente 6 caracteres
- ✅ Aceita senha com exatamente 20 caracteres

_Validação completa:_

- ✅ Valida senha correta com números, letras e caracteres especiais
- ✅ Rejeita senha sem números
- ✅ Rejeita senha sem letras maiúsculas
- ✅ Rejeita senha sem caracteres especiais
- ✅ Rejeita senha vazia
- ✅ Valida senha com múltiplos números
- ✅ Valida senha com múltiplas letras maiúsculas
- ✅ Valida senha com múltiplos caracteres especiais

**Arquivo:** `backend/src/validators/senhaValidator.spec.ts`

```bash
npm test -- senhaValidator --forceExit
```

---

#### **Cargo Validator** (6 testes)

Valida cargos profissionais permitidos no sistema.

**Cargos válidos:** `Médico`, `Enfermeiro`, `Recepcionista`, `Administrador`, `Técnico em Enfermagem`

**Testes implementados:**

- ✅ Aceita cargo válido "Médico"
- ✅ Aceita cargo válido "Enfermeiro"
- ✅ Aceita cargo válido "Recepcionista"
- ✅ Rejeita cargo inválido
- ✅ Rejeita cargo vazio
- ✅ Função obterCargosValidos retorna lista correta

**Arquivo:** `backend/src/validators/cargoValidator.spec.ts`

```bash
npm test -- cargoValidator --forceExit
```

---

#### **Especialização Validator** (7 testes)

Valida especialidades médicas permitidas.

**Especialidades válidas:** `Cardiologia`, `Dermatologia`, `Ortopedia`, `Pediatria`, `Clínica Geral`, `Oftalmologia`, `Psiquiatria`

**Testes implementados:**

- ✅ Aceita especialidade válida "Cardiologia"
- ✅ Aceita especialidade válida "Dermatologia"
- ✅ Aceita especialidade válida "Ortopedia"
- ✅ Rejeita especialidade inválida
- ✅ Rejeita especialidade vazia
- ✅ Função obterEspecializacoes retorna lista correta
- ✅ Case-insensitive funciona corretamente

**Arquivo:** `backend/src/validators/especializacaoValidator.spec.ts`

```bash
npm test -- especializacaoValidator --forceExit
```

---

### 2️⃣ Agendamento - Cancelamento de Consultas (9 testes)

Testa a funcionalidade de cancelamento de consultas agendadas.

#### **Service Tests** (7 testes)

**Arquivo:** `backend/src/agendamento/agendamento.service.spec.ts`

**Testes implementados:**

1. ✅ **Deve cancelar uma consulta agendada com sucesso**

   - Encontra a consulta no banco
   - Muda status de "agendada" para "cancelada"
   - Salva no repositório

2. ✅ **Deve lançar NotFoundException quando consulta não existe**

   - Tenta cancelar consulta com ID inválido
   - Verifica se erro NotFoundException é lançado

3. ✅ **Deve rejeitar cancelamento de consulta já realizada**

   - Tenta cancelar consulta com status "realizada"
   - Verifica validação

4. ✅ **Deve rejeitar cancelamento de consulta já cancelada**

   - Tenta cancelar consulta já cancelada
   - Verifica se mantém status "cancelada"

5. ✅ **Deve incluir dados do paciente e médico na resposta**

   - Verifica se resposta inclui `paciente` e `medico`

6. ✅ **Deve atualizar com motivo de cancelamento opcional**

   - Aceita motivo de cancelamento
   - Salva motivo no banco

7. ✅ **Deve registrar data e hora do cancelamento**
   - Verifica se timestamp de cancelamento é registrado

```bash
npm test -- agendamento.service.spec.ts --forceExit
```

#### **Controller Tests** (2 testes)

**Arquivo:** `backend/src/agendamento/agendamento.controller.spec.ts`

**Testes implementados:**

1. ✅ **Deve chamar service.cancelAgendamento com ID correto**

   - Verifica se controller passa ID para service

2. ✅ **Deve retornar consulta cancelada**
   - Verifica se resposta contém consulta atualizada

```bash
npm test -- agendamento.controller.spec.ts --forceExit
```

---

### 3️⃣ Paciente - Edição de Dados (6 testes)

Testa a funcionalidade de edição de dados de pacientes.

#### **Service Tests** (3 testes)

**Arquivo:** `backend/src/paciente/paciente.service.spec.ts`

**Testes implementados:**

1. ✅ **Deve atualizar dados do paciente com sucesso**

   - Atualiza nome, contato e endereço
   - Verifica se dados foram salvos

2. ✅ **Deve lançar NotFoundException quando paciente não existe**

   - Tenta atualizar paciente com ID inválido
   - Verifica se erro é lançado

3. ✅ **Deve preservar campos não alterados**
   - Atualiza apenas alguns campos
   - Verifica se outros campos permanecem iguais

#### **Controller Tests** (3 testes)

**Arquivo:** `backend/src/paciente/paciente.controller.spec.ts`

**Testes implementados:**

1. ✅ **Deve chamar service.update com ID e dados corretos**

   - Verifica se controller passa parâmetros corretos

2. ✅ **Deve retornar paciente atualizado**

   - Verifica formato da resposta

3. ✅ **Deve validar dados de entrada antes de atualizar**
   - Verifica se validações são aplicadas

---

### 4️⃣ App Controller (1 teste)

**Arquivo:** `backend/src/app.controller.spec.ts`

**Teste implementado:**

1. ✅ **Deve retornar "Clinica nexus"**
   - Valida mensagem da aplicação

---

## 📦 Estrutura dos Testes

```
backend/
├── src/
│   ├── validators/
│   │   ├── validators.ts                      # Implementações centralizadas
│   │   ├── cpfValidator.spec.ts              # 7 testes
│   │   ├── emailValidator.spec.ts            # 7 testes
│   │   ├── telefoneValidator.spec.ts         # 5 testes
│   │   ├── senhaValidator.spec.ts            # 14 testes
│   │   ├── cargoValidator.spec.ts            # 6 testes
│   │   └── especializacaoValidator.spec.ts   # 7 testes
│   │
│   ├── agendamento/
│   │   ├── agendamento.service.spec.ts       # 7 testes
│   │   └── agendamento.controller.spec.ts    # 2 testes
│   │
│   ├── paciente/
│   │   ├── paciente.service.spec.ts          # 3 testes
│   │   └── paciente.controller.spec.ts       # 3 testes
│   │
│   └── app.controller.spec.ts                # 1 teste
```

---

## 🧪 Padrões de Teste Utilizados

### 1. Mocks com Jest

Todos os testes usam mocks do Jest para isolar a lógica:

```typescript
const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

(mockRepository.findOne as jest.Mock).mockResolvedValue(data);
```

### 2. Arrange-Act-Assert (AAA)

Padrão utilizado em todos os testes:

```typescript
// Arrange - Preparar dados
const updateDto = { nome: "Novo Nome" };
const pacienteAtualizado = { ...mockPaciente, ...updateDto };

// Act - Executar ação
const resultado = await service.update(1, updateDto);

// Assert - Verificar resultado
expect(resultado.nome).toBe("Novo Nome");
```

### 3. NestJS Testing Module

Para testes de service e controller:

```typescript
const module: TestingModule = await Test.createTestingModule({
  providers: [AgendamentoService /* providers */],
}).compile();

const service = module.get<AgendamentoService>(AgendamentoService);
```

---

## ✅ Validações Implementadas

### No Backend

**Agendamento:**

- ✅ Validar que apenas consultas "agendada" podem ser canceladas
- ✅ Rejeitar cancelamento de consultas "realizada"
- ✅ Rejeitar cancelamento de consultas já "cancelada"

**Paciente:**

- ✅ Verificar se paciente existe antes de atualizar
- ✅ Lançar NotFoundException se paciente não existe
- ✅ Preservar campos não atualizados

**Validadores:**

- ✅ CPF válido com dígito verificador correto
- ✅ Email com formato correto
- ✅ Telefone com 11 dígitos
- ✅ Senha com complexidade mínima
- ✅ Cargo da lista de válidos
- ✅ Especialização da lista de válidos

---

## 🔄 Frontend - Mudanças Implementadas

### Componente Consulta.jsx

**Funcionalidade adicionada:** Botão de cancelamento com confirmação

```jsx
// Novo botão adicionado
<button
  onClick={() => setMostraConfirmacao(true)}
  className="btn btn-danger btn-sm"
>
  Cancelar
</button>;

// Modal de confirmação
{
  mostraConfirmacao && (
    <div className="modal-confirmacao">
      <p>Tem certeza que deseja cancelar esta consulta?</p>
      <button onClick={confirmarCancelamento}>Sim, cancelar</button>
      <button onClick={() => setMostraConfirmacao(false)}>Não</button>
    </div>
  );
}
```

**Testes Frontend:** `frontend/src/utils/agendamentoService.test.js` (3 testes)

---

## 📈 Próximos Passos

Para expandir a cobertura de testes:

1. **Testes E2E**: Implementar testes de integração completa
2. **Testes de UI**: Expandir testes do React com React Testing Library
3. **Testes de Performance**: Verificar performance de queries
4. **Testes de Segurança**: Validar autorização em endpoints

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

**Solução:** Garantir que `backend/src/validators/validators.ts` existe com todas as implementações.

### Erro: "Jest has exited"

**Solução:** Usar flag `--forceExit` em npm test:

```bash
npm test -- --forceExit
```

### Erro: "Timeout"

**Solução:** Aumentar timeout nos testes:

```typescript
jest.setTimeout(10000); // 10 segundos
```

---

## 📚 Referências

- [Jest Documentation](https://jestjs.io/)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [TypeORM Testing](https://typeorm.io/guides/using-with-jest)

---

**Último atualizado:** 6 de dezembro de 2025

**Total de testes:** 65 ✅

**Cobertura:** Validadores, Agendamento, Paciente
