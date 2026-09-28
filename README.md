# CodeTrilha

Plataforma de ensino de programação em português do Brasil, com trilha de Python, aulas em MDX, exercícios interativos e execução de Python no navegador.

## Stack

- React + Vite + TypeScript
- React Router
- Zustand para progresso local
- MDX para aulas
- Pyodide para execução de Python no navegador

## Como rodar

```bash
npm install
npm run dev
```

A aplicação fica disponível em http://localhost:5173.

## Scripts úteis

```bash
npm run dev
npm run build
npm run lint
npm run validar:exercicios
```

## Estrutura principal

```text
src/
  app/
  components/
  lib/
  modules/
  store/
  workers/
scripts/
```

## Como adicionar um módulo

1. Crie a pasta `src/modules/<nome-do-modulo>/`
2. Adicione `config.ts` com `id`, `name`, `description`, `color`, `trilha` e `status`
3. Crie as aulas em `src/modules/<nome-do-modulo>/lessons/*.mdx`
4. Registre o módulo em `src/modules/index.ts` se necessário

## Como adicionar uma aula

1. Crie o arquivo `.mdx` em `src/modules/<modulo>/lessons/`
2. Use frontmatter com campos como:

```mdx
---
titulo: "Introdução"
descricao: "Explicação inicial"
secao: "Fundamentos"
tempo: 10
nivel: "iniciante"
palavrasChave: ['python', 'variavel']
exercicios: ['exemplo-1']
---

# Introdução

Texto da aula...
```

3. Atualize a ordem no `config.ts` do módulo.

## Como adicionar um exercício

1. Crie um JSON em `src/modules/<modulo>/exercises/`
2. Use o formato esperado do projeto:

```json
{
  "id": "variaveis",
  "titulo": "Variáveis",
  "tipo": "codigo",
  "dificuldade": "fácil",
  "topico": "Fundamentos",
  "xp": 10,
  "enunciado": "Crie uma variável e imprima seu valor.",
  "starterCode": "nome = \"CodeTrilha\"\nprint(nome)",
  "solucao": "nome = \"CodeTrilha\"\nprint(nome)",
  "dicas": ["Use a função print"],
  "tags": ["variavel", "python"]
}
```

3. Rode:

```bash
npm run validar:exercicios
```

## Observações

- O progresso e preferências ficam no `localStorage` do navegador.
- A execução de Python acontece no navegador via Pyodide.
- O projeto foi organizando para ser expandido por módulos e aulas em configuração centralizada.
