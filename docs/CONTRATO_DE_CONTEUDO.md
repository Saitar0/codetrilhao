# Contrato de conteúdo — CodeTrilha

## 1. Fonte da verdade
- O currículo está em `docs/modulo-python-curriculo-completo.md`. Para cada tópico, implemente **tudo** o que a seção dele lista (teoria, exemplo, erros comuns, os 12 exercícios, os 3 mini projetos, visão de mercado, checklist). Pode **expandir**, nunca omitir nem reordenar.
- Idioma: português do Brasil, segunda pessoa ("você"), tom direto e amigável, sem enrolação. Termos técnicos em inglês entram entre parênteses na primeira ocorrência.
- Python alvo: 3.11+ (o runner é Pyodide). **Todo código exibido precisa ter sido executado** com `python3` antes de ser escrito no arquivo, e a saída mostrada precisa ser a real.

## 2. Contrato de aula (`lessons/<slug>.mdx`)
Frontmatter obrigatório:
```yaml
---
titulo: "..."
descricao: "1 frase específica, sem clichê"
secao: "<título exato da seção na trilha>"
ordem: <posição na trilha, sequencial, começando em 1>
topico: <número do tópico do currículo>
fase: "A"
tempo: <15 a 35, minutos reais de leitura + prática>
nivel: "iniciante" | "intermediario"
palavrasChave: ['...', '...']
exercicios: []   # preenchido no prompt B
---
```
Estrutura do corpo, nesta ordem:
1. `# Título` e um gancho de 3 a 4 linhas com uma situação real (não "nesta aula você vai aprender").
2. `<Callout type="importante" title="O que você vai aprender">` com 3 a 5 objetivos concretos (vindos de "Objetivos").
3. Um `##` por subtópico da "Teoria". Cada um com explicação curta, ao menos 1 `<CodeBlock>` executável e a saída esperada. Use `<Playground>` em pelo menos 2 experimentos e `<StepThrough>` em pelo menos 1 execução passo a passo (loops, recursão, referências).
4. Um `<Callout type="erro-comum">` para **cada linha** da tabela "Erros comuns", mostrando o código que gera o erro, a mensagem real e a correção.
5. Ao menos 1 `<Tabela>` comparativa e ao menos 3 `<Glossario>` inline.
6. Seção "No mercado de trabalho" (vinda de "Visão de mercado").
7. `<Quiz>` com 3 a 5 perguntas **específicas do tópico**, alternativas plausíveis, explicação que ensina, e ao menos 1 pergunta do tipo "o que este código imprime?".
8. `<Resumo>` (5 a 8 itens), checklist de domínio (do currículo) e `<Desafio>` apontando para os exercícios e mini projetos do tópico.
Tamanho: 900 a 1.600 palavras de texto (sem contar código) e 6 a 12 blocos de código por aula. Se o tópico tem várias aulas, cada uma tem seu Quiz, Resumo e Desafio.
Use **apenas** componentes exportados por `src/components/lesson/MdxComponents.tsx` (leia o arquivo e confira as props antes de escrever).

## 3. Contrato de exercício (`exercises/tNN-vX-SS-slug.json`)
- Campos: `id` (= nome do arquivo), `tipo`, `titulo`, `topico` (nome do tópico), `topicoNumero`, `variacao` ("V1" | "V2" | "V3"), `dificuldade`, `xp` (10/20/30), `dicas`, `solucao`, `tags`, `aulaRelacionada` (slug de aula **existente**), `enunciado`, e os campos do tipo (`starterCode`, `testes`, `pergunta`, `alternativas`, `linhas`, `ordemCorreta`, `codigo`, `respostaEsperada`).
- **Escolha do tipo:** o padrão é `codigo`. Use `bug` quando o enunciado pedir para corrigir, `prever-saida` quando pedir para prever/explicar a saída, `multipla-escolha` para perguntas conceituais, `ordenar` para reorganizar linhas, `completar` para lacunas. **Os 12 enunciados do currículo são obrigatórios**; só o formato muda.
- **Enunciado:** contexto em 1 frase, o que fazer, exemplo de entrada e saída, restrições. Nada de "leia o problema".
- **Dicas:** exatamente 3, progressivas (1: direção do raciocínio, 2: estratégia/ferramenta, 3: quase a solução, sem entregar o código completo). Nunca genéricas.
- **Solução:** código completo, comentado, que passa em **todos** os testes.
- **Testes (tipos com código):** mínimo 5, sendo ao menos 3 visíveis e 2 ocultos; todos **distintos**; cobrindo caso normal, borda (vazio, zero, negativo, um elemento) e entrada inesperada quando fizer sentido. Duas formas de teste, combináveis:
  - `{ "entrada": "Ana\n30", "esperado": "Ana tem 30 anos" }` para programas que usam `input()`.
  - `{ "chamada": "ola_nome('Bia')", "esperado": "Olá, Bia!" }` para funções: o runner executa o código e imprime o resultado da expressão. Nesse caso o `starterCode` traz **só a definição da função**, sem `print` de demonstração.
- `random`, data/hora atual e tempo de execução não são determinísticos: teste **propriedades** (`"chamada": "len(gerar_senha(12)) == 12"`, `"esperado": "True"`), ou fixe `random.seed` dentro do teste.
- O `starterCode` **não pode passar** em todos os testes (senão o exercício é trivial).

## 4. Contrato de mini projeto (`mini-projetos/tNN-vX-slug.mdx`)
Frontmatter: `titulo`, `descricao`, `topico`, `topicoNome`, `variacao`, `tempo` (minutos), `nivel`, `execucao` ("navegador" ou "local"), `palavrasChave`.
Seções: Contexto (historinha realista) → O que você vai construir (exemplo de execução **real**) → Requisitos numerados → Critérios de aceite (checklist) → Guia (V1: passo a passo detalhado com dicas; V2: marcos sem código pronto; V3: histórias de usuário, arquitetura sugerida e casos de teste, sem código) → Código inicial (`<Playground>` quando `execucao: "navegador"`) → Desafio extra → Visão de mercado → Autoavaliação → Solução de referência dentro de `<details>` (código **executado**, com a saída real usada no exemplo).
Dados de exemplo (CSV, JSON) entram como texto no código inicial e são gravados no sistema de arquivos em memória.

## 5. Proibições
- Frases do gerador antigo: "Aplique esse tema em um mini cenário do dia a dia", "Leia o problema e identifique a entrada esperada", "Qual é a ideia central desta aula?", "Teste a lógica em casos simples antes de generalizar".
- `TODO`, `lorem ipsum`, placeholders, saídas inventadas, testes repetidos, dicas genéricas.
- Código que só funciona com `pip`, rede real, `pytest` ou `git` em exercícios do tipo executável no navegador.
- Alterar arquivos fora do escopo do prompt, refatorar sem pedido, corrigir erros de lint anteriores (apenas reporte).

## 6. Ritual de entrega (todo prompt termina assim)
1. Rodar os validadores indicados no prompt e `npm run build`.
2. Listar arquivos criados/alterados, contagens (aulas, exercícios por variação e tipo, projetos) e qualquer decisão tomada.
3. Fazer **um commit** com mensagem no formato `conteudo(python): t06 aulas de loops`. **Não fazer push.**
4. Se algo do currículo estiver ambíguo, decidir da forma mais simples e registrar a decisão no relatório.