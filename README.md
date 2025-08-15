# HabbitFlow
![My Skills](https://skillicons.dev/icons?i=dotnet,mysql,cs,nodejs,typescript,angular,cypress)

---

## Descrição

HabbitFlow é um sistema para organização pessoal com foco em criação de hábitos, rotina e produtividade.  
O usuário pode cadastrar tarefas, compromissos, subtarefas e categorias que serão listadas de forma separada.
Todo o sistema possui autenticação por usuário (multi-tenant), de modo que cada usuário acessa apenas suas próprias informações.

---

## Funcionalidades

### Cadastro de Tarefa
- título  
- subtarefas  
- data de criação  
- data de conclusão  
- percentual concluído  

#### SubTarefa
- título  
- finalizada (status)  
- tarefa vinculada  

---

### Cadastro de Compromisso
- assunto  
- data  
- hora de início  
- hora de término  
- local (caso presencial)  
- link (caso remoto)  
- contato (opcional)  

---

### Cadastro de Categoria
- título  
- tarefas vinculadas  

---

## Entregáveis (versão final):
- API .NET funcional com CRUD completo (Tarefa, Compromisso, Categoria, SubTarefa)
- Autenticação e Autorização por JWT
- Painel Frontend Angular com telas para listar, cadastrar, editar e remover todas as entidades
- Testes automáticos no backend e testes E2E com Cypress no frontend

---

## Requisitos para Execução

- .NET SDK (recomendado .NET 8.0 ou superior) para compilação e execução do back-end.
- Node.js v20+ (para o front-end)
- Angular v18 (para o front-end)

---

## Executando o Back-End

Vá para a pasta do projeto da WebAPI:

```bash
cd HabbitFlow.Server\HabbitFlow.WebApi
```

Execute o projeto:
```bash
dotnet run
```
A API poderá ser acessada no endereço https://localhost:7777/api.
A documentação OpenAPI também estará disponível em: https://localhost:7777/swagger.
