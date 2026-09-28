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
npm run test
npm run validar:exercicios
```

## Pyodide local / assets

The project expects Pyodide assets under `public/assets/pyodide/`. When running `vite` the `public` folder is served as-is. If you need to include a local copy of Pyodide for offline testing, place the `pyodide` folder at `public/assets/pyodide/`.

If network issues occur, the loader has retry logic and the demo UI shows friendly errors and a retry button.

### Quick verification steps

1. Install and run dev server:

```bash
npm ci
npm run dev
```

2. Open http://localhost:5173 and go to the Demo section.
3. If Pyodide fails to load, click "Tentar novamente" in the demo panel.

## PR checklist (maintainers)

- [ ] npm ci completes successfully.
- [ ] npm run build finishes without errors.
- [ ] npm run lint returns 0 errors.
- [ ] Demo executes example code and shows output.


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
