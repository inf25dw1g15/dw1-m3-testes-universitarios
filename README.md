# Relatório do Trabalho Prático – Módulo 3

## Unidade Curricular: Desenvolvimento Web / Sistemas REST

## Projeto: Gestão de Testes Universitários

---

## 1. Introdução

O presente relatório descreve o desenvolvimento do projeto **Gestão de Testes Universitários**, realizado no âmbito do **Módulo 3 (M3)** da unidade curricular. Este módulo teve como principal objetivo a conceção e implementação de uma **API REST** robusta, documentada e totalmente funcional, recorrendo a **LoopBack 4**, **MySQL** e **Docker**, cumprindo rigorosamente todos os requisitos definidos no enunciado do trabalho prático.

Este projeto surge como uma evolução natural do trabalho desenvolvido no **Módulo 2 (M2)**, onde foi definida a estrutura lógica da API (recursos, endpoints e especificação OpenAPI). No M3, essa estrutura foi concretizada através de uma implementação real, com ligação efetiva à base de dados, controlo rigoroso das relações entre entidades e disponibilização de uma arquitetura multi-container.

A framework **LoopBack 4** foi escolhida por permitir a criação estruturada de APIs REST, oferecendo forte integração com bases de dados relacionais, suporte nativo ao padrão **OpenAPI 3.0** e geração automática de documentação interativa.

---

## 2. Arquitetura Geral do Sistema

A solução desenvolvida segue uma **arquitetura de serviços REST**, assente nos seguintes componentes principais:

* **API REST** desenvolvida com LoopBack 4 (Node.js)
* **Base de Dados Relacional MySQL**
* **Documentação automática da API** através de OpenAPI 3.0 (Swagger)
* **Ambiente multi-container** com Docker e Docker Compose
* **Cliente de Backoffice (React Admin)** desenvolvido como projeto independente

A API encontra-se organizada segundo uma separação clara de responsabilidades, dividindo-se em **Models** (estrutura dos dados), **Repositories** (acesso e persistência de dados) e **Controllers** (exposição dos endpoints REST). Esta organização em camadas promove a clareza do código, a reutilização e a facilidade de manutenção.

Cada componente do sistema encontra-se desacoplado, permitindo escalabilidade, manutenção simplificada e facilidade de deployment em diferentes ambientes.

---

## 3. Modelo de Dados e Base de Dados

A base de dados foi implementada em **MySQL**, respeitando o modelo relacional definido previamente no M2. Foram criadas as seguintes tabelas:

* **alunos**
* **professores**
* **disciplinas**
* **testes**
* **inscricoes**
* **resultados**

Foram ainda inseridos dados de teste realistas em todas as tabelas, permitindo validar o correto funcionamento da API e facilitar a demonstração do sistema.

### 3.1 Relações entre Tabelas

O modelo de dados contempla relações de cardinalidade fundamentais:

* **Professor (1) → (N) Disciplina**
* **Disciplina (1) → (N) Teste**
* **Aluno (1) → (N) Resultado**
* **Aluno (N) ↔ (N) Disciplina** através da tabela **inscricoes**

Todas as relações são reforçadas através de **chaves estrangeiras (foreign keys)** definidas ao nível da base de dados MySQL, garantindo integridade referencial, coerência dos dados e impedindo a eliminação de registos que possuam dependências associadas.

---

## 4. API REST – Implementação com LoopBack 4

A API foi desenvolvida utilizando o **framework LoopBack 4**, permitindo:

* Criação de **Models** alinhados com a estrutura da base de dados
* Implementação de **Repositories** para acesso aos dados
* Desenvolvimento de **Controllers REST** para cada recurso

A API suporta ainda **filtros através de parâmetros HTTP**, permitindo a realização de consultas mais específicas, como filtragem por campos, paginação e ordenação, reforçando a flexibilidade e reutilização dos endpoints.

### 4.1 Recursos Disponibilizados

A API disponibiliza **seis recursos distintos**, ultrapassando o mínimo exigido pelo enunciado:

* `/alunos`
* `/professores`
* `/disciplinas`
* `/testes`
* `/inscricoes`
* `/resultados`

### 4.2 Operações CRUD

Para cada recurso principal foram implementadas operações CRUD completas, recorrendo a **pelo menos quatro verbos HTTP**:

* `POST` – Criar recursos
* `GET` – Obter recursos
* `PATCH` – Atualizar parcialmente
* `PUT` – Substituir totalmente
* `DELETE` – Remover recursos

---

## 5. Endpoints de Relações

Para além dos endpoints CRUD básicos, foram implementados endpoints específicos para navegação entre recursos relacionados, nomeadamente:

* `GET /alunos/{id}/inscricoes`
* `GET /alunos/{id}/resultados`
* `GET /professores/{id}/disciplinas`
* `GET /disciplinas/{id}/testes`

Esta abordagem evita a duplicação de dados, melhora a legibilidade da API e segue boas práticas REST ao expor relações através de caminhos semânticos e intuitivos.

---

## 6. Documentação da API – OpenAPI 3.0

A API encontra-se totalmente documentada utilizando **OpenAPI 3.0**, com geração automática do Swagger através do LoopBack.

Foram cuidadosamente configurados:

* **Títulos (summary)** claros e explícitos para cada endpoint
* **Descrições funcionais** adequadas ao contexto académico
* Estruturas JSON bem definidas e coerentes

A documentação interativa permite que qualquer utilizador compreenda, teste e explore a API sem necessidade de consultar o código-fonte.

---

## 7. Testes da API

A API foi testada recorrendo a diferentes ferramentas:

* **Swagger UI** (`/explorer`)
* **Postman**, através da importação direta do ficheiro `openapi.json`

Foram validados:

* Funcionamento correto das operações CRUD
* Funcionamento das relações entre recursos
* Respeito pelas restrições de integridade definidas na base de dados
* Respostas adequadas a pedidos inválidos ou inconsistentes

---

## 8. Docker e Ambiente Multi-Container

Um dos requisitos centrais do projeto foi a disponibilização de uma **configuração multi-container**, totalmente automatizada.

### 8.1 Containers Criados

* **Container MySQL** – responsável pela base de dados
* **Container Node.js / LoopBack** – responsável pela API REST

Cada serviço corre no seu próprio container, garantindo isolamento, independência e facilidade de manutenção.

### 8.2 Docker Compose

Foi criado um ficheiro `docker-compose.yml` que permite iniciar todo o sistema com um único comando:

```bash
docker compose up
```

A comunicação entre containers é realizada através de **variáveis de ambiente**, permitindo configurar dinamicamente a ligação da API à base de dados sem alterações no código-fonte.

---

## 9. Cliente de Backoffice – React Admin

O cliente de backoffice foi desenvolvido utilizando **React Admin**, num **projeto separado**, conforme boas práticas e indicação do docente.

Este cliente consome a API REST desenvolvida no M3, permitindo:

* Gestão visual de alunos, professores, disciplinas, testes e resultados
* Criação, edição e remoção de registos
* Consulta de dados em tempo real

Foi ainda desenvolvido um **dashboard inicial**, apresentando indicadores globais (como o número total de alunos, professores, disciplinas e testes), permitindo uma visão geral rápida e intuitiva do sistema.

---

## 10. Controlo de Versões

O desenvolvimento do projeto foi suportado por um sistema de controlo de versões (**Git**), permitindo a gestão do código-fonte, rastreabilidade de alterações e colaboração entre os elementos do grupo. O repositório contém toda a estrutura necessária para execução do sistema.

---

## 11. Conclusão

O projeto **Gestão de Testes Universitários** cumpre integralmente todos os requisitos definidos no enunciado do Módulo 3, nomeadamente:

* Arquitetura REST
* CRUD completo
* Múltiplos recursos
* Relações de cardinalidade 1:N e N:M
* Utilização de JSON como formato de troca de dados
* Documentação OpenAPI 3.0
* Postman Collection
* MySQL como SGBD
* Cliente de backoffice
* Configuração multi-container com Docker

Adicionalmente, foram seguidas boas práticas de desenvolvimento, organização clara do código, documentação rigorosa e foco na robustez e escalabilidade da solução.

Este trabalho demonstra uma compreensão sólida dos conceitos abordados ao longo da unidade curricular e resulta num sistema funcional, bem estruturado e pronto para utilização em contexto real.

---

**Fim do Relatório**
