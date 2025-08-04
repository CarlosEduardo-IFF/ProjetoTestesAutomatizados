# Projeto de Testes Automatizados

Este projeto foi desenvolvido como parte da disciplina de **Testes Automatizados**. Seu principal objetivo é implementar um **caso de uso de listagem (GetAll)** de objetos do sistema.
---

## Estrutura

O projeto segue uma arquitetura em camadas, separando as responsabilidades entre entidades, casos de uso, repositórios e controladores. O foco principal é garantir a confiabilidade e a manutenibilidade do código por meio de testes automatizados.

---

## Executando o Projeto

### Opção Recomendada: Docker Compose

Antes de iniciar, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

**Para rodar tudo (aplicação + testes):**
```cmd
docker-compose up
```

**Para rodar apenas os testes:**
```cmd
docker-compose up tests
```

**Para rodar apenas a aplicação:**
```cmd
docker-compose up app
```

### Executando Localmente (sem Docker)

**Para iniciar a aplicação:**
```cmd
npm run start:dev
```

**Para executar apenas os testes:**
```cmd
npm run start:test
```
