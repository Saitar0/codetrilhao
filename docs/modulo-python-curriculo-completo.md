# Módulo Python — Currículo Completo

> Trilha prática de Python: do primeiro `print` até um projeto integrador digno de portfólio.
> Cada tópico segue o mesmo ciclo: **Teoria com exemplos → Exercícios → Mini projeto**, repetido em **3 variações** (Fixação, Lógica, Mercado real).

---

## 1. Como o módulo funciona

### 1.1 Filosofia pedagógica

1. **Aprender fazendo.** Teoria curta, prática longa. Nenhum tópico termina sem o aluno ter escrito código que roda.
2. **Espiral.** Conceitos voltam em tópicos posteriores com mais profundidade (ex.: listas reaparecem em funções, arquivos, POO).
3. **Erro é parte do processo.** Cada tópico lista os erros mais comuns, para o aluno reconhecer a mensagem de erro antes de travar nela.
4. **Do exercício ao produto.** Fixação → raciocínio → cenário de trabalho. O aluno vê para que aquilo serve no mercado.
5. **Projeto sempre.** Todo tópico entrega algo que se pode mostrar, mesmo que pequeno.

### 1.2 As 3 variações

| Variação | Nome | Objetivo | Estilo dos exercícios | Mini projeto |
|---|---|---|---|---|
| **V1** | Fixação | Fixar sintaxe e conceito | Diretos, uma ideia por vez, com exemplo de entrada/saída | Simples e guiado, com passo a passo |
| **V2** | Lógica | Desenvolver raciocínio | Problemas clássicos, casos de borda, sem receita pronta | Com regras, decisões e casos especiais |
| **V3** | Mercado real | Simular trabalho de verdade | Cenários de loja, banco, RH, logística, dados sujos | Parece produto real: requisitos de cliente, validação, relatório |

### 1.3 Template padrão de cada tópico

Todo tópico do site deve ter estas seções, nesta ordem:

1. **Objetivos**: o que o aluno será capaz de fazer ao final.
2. **Pré-requisitos**: tópicos que precisam ter sido concluídos.
3. **Teoria**: subtópicos explicados em linguagem simples.
4. **Exemplo comentado**: código executável com explicação linha a linha.
5. **Erros comuns**: erro, causa e como corrigir.
6. **Exercícios V1, V2, V3**: 4 por variação, com dificuldade marcada.
7. **Mini projeto V1, V2, V3**: descrição, requisitos, critérios de aceite, desafio extra.
8. **Visão de mercado**: onde isso aparece no trabalho real.
9. **Checklist de domínio**: o aluno marca o que já sabe fazer sozinho.
10. **Quiz rápido**: 5 perguntas de múltipla escolha (a produzir na fase de conteúdo).

### 1.4 Legenda de dificuldade

- 🟢 Fácil (1 conceito, poucas linhas)
- 🟡 Médio (combina conceitos, exige planejamento)
- 🔴 Desafio (casos de borda, pensar antes de codar)

### 1.5 Critérios gerais de aceite de um mini projeto

Um mini projeto só conta como concluído quando:

- Roda sem erro com entradas válidas.
- Trata pelo menos as entradas inválidas mais óbvias (a partir do tópico 12 isso é obrigatório).
- Tem nomes de variáveis claros.
- Tem pelo menos um comentário explicando a parte mais difícil.
- O aluno consegue explicar em voz alta o que cada bloco faz.

---

## 2. Mapa da trilha

| Fase | Tópicos | Meta da fase |
|---|---|---|
| **A. Fundamentos** | 1 a 6 | Escrever programas que leem, decidem e repetem |
| **B. Estruturas de dados** | 7 a 9 | Organizar e manipular coleções de informação |
| **C. Organização de código** | 10 a 12 | Escrever código reutilizável, enxuto e resistente a falhas |
| **D. Mundo real** | 13, 14, 18 | Trabalhar com arquivos, bibliotecas, ambiente e APIs |
| **E. Pensamento de engenharia** | 15, 16, 17 | Algoritmos, orientação a objetos, testes e profissionalismo |
| **F. Integração** | Projeto final | Juntar tudo em um sistema completo |

**Ordem dos tópicos:**

1. Sintaxe e primeiros passos
2. Variáveis e tipos de dados
3. Operadores e expressões
4. Strings
5. Condicionais
6. Loops
7. Listas
8. Tuplas e sets
9. Dicionários
10. Funções
11. Compreensões e funções embutidas
12. Tratamento de erros
13. Arquivos (txt, CSV, JSON)
14. Módulos, bibliotecas e ambiente
15. Algoritmos: busca, ordenação, recursão e complexidade
16. Orientação a Objetos
17. Testes, depuração, boas práticas e Git
18. Consumindo APIs e persistência com SQLite

**Por que Funções vêm depois de Loops e Listas?** Só faz sentido criar funções quando o aluno já tem lógica para colocar dentro delas.

---

# FASE A — FUNDAMENTOS

---

## Tópico 1 — Sintaxe e primeiros passos

**Objetivos:** rodar um script Python, exibir e ler dados no terminal, entender indentação e ler uma mensagem de erro básica.
**Pré-requisitos:** nenhum.

**Teoria**
- O que é Python e o que significa "linguagem interpretada".
- Instalação e como rodar: terminal (`python arquivo.py`), editor (VS Code) e modo interativo (REPL).
- `print()`: vários argumentos, `sep`, `end`.
- Comentários (`#`) e docstrings de uma linha.
- Indentação como parte da sintaxe (4 espaços).
- `input()` sempre retorna texto.
- Conversão básica com `int()` e `float()` e operadores `+ - * /` (aprofundados nos tópicos 2 e 3).
- Anatomia de um erro: `SyntaxError`, `IndentationError`, `NameError`; ler o traceback de baixo para cima.

**Exemplo comentado**
```python
# Programa de boas-vindas
nome = input("Qual é o seu nome? ")   # input devolve sempre str
print("Olá,", nome, end="!\n")        # end troca o final da linha
print("Bem-vindo ao Python", "🐍", sep=" | ")
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `SyntaxError: unterminated string` | Aspas abertas e não fechadas | Fechar a aspa |
| `IndentationError` | Espaços misturados com tab ou alinhamento errado | Usar 4 espaços sempre |
| `NameError: name 'Print' is not defined` | Python diferencia maiúscula de minúscula | Usar `print` |

### V1 — Fixação
- 1.1 🟢 Imprimir seu nome, sua cidade e seu hobby em três linhas.
- 1.2 🟢 Imprimir a mesma frase com `sep` diferente e com `end` diferente, observando o resultado.
- 1.3 🟢 Ler o nome e a idade e imprimir "Fulano tem X anos".
- 1.4 🟡 Desenhar uma moldura de asteriscos em volta do seu nome usando apenas `print`.

**Mini projeto V1: Cartão de apresentação no terminal**
- Pergunta nome, profissão desejada e cidade.
- Imprime um cartão formatado com moldura.
- *Critérios:* mínimo de 3 entradas; saída alinhada e legível.
- *Extra:* adicionar uma citação favorita.

### V2 — Lógica
- 1.5 🟢 Código com `IndentationError` proposital: encontrar e corrigir.
- 1.6 🟡 Ler dois números e imprimir soma, diferença, produto e divisão (converter com `int`/`float`).
- 1.7 🟡 Ler o preço e a quantidade de um produto e imprimir o total (converter com `float` e `int`).
- 1.8 🔴 Mostrar o que acontece ao somar dois `input()` sem converter, e explicar por quê.

**Mini projeto V2: Conversor de moedas fixo**
- Lê valor em reais e mostra o equivalente em dólar, euro e libra com cotações definidas em variáveis no topo.
- *Critérios:* cotações fora do código de cálculo; duas casas decimais.
- *Extra:* permitir que o usuário digite a cotação do dia.

### V3 — Mercado real
- 1.9 🟡 Imprimir uma tabela de produtos com colunas alinhadas.
- 1.10 🟡 Emitir um cabeçalho de relatório com nome da empresa centralizado.
- 1.11 🟡 Ler nome e e-mail e exibir uma mensagem de confirmação de cadastro.
- 1.12 🔴 Imprimir um recibo com três itens, quantidade, preço unitário e total.

**Mini projeto V3: Gerador de recibo simples de loja**
- Cliente informa três produtos (nome, quantidade, preço).
- Programa imprime recibo com cabeçalho, itens alinhados, subtotal e total.
- *Critérios:* valores monetários com duas casas; colunas alinhadas.
- *Visão de mercado:* todo sistema de vendas, nota fiscal e relatório começa com formatação de texto.

**Checklist:** ☐ Rodo scripts pelo terminal ☐ Uso `print` com `sep` e `end` ☐ Leio dados com `input` ☐ Sei ler um traceback ☐ Sei o que é indentação em Python

---

## Tópico 2 — Variáveis e tipos de dados

**Objetivos:** criar variáveis, escolher o tipo correto, converter entre tipos e formatar saídas com f-strings.
**Pré-requisitos:** Tópico 1.

**Teoria**
- Variável como "nome que aponta para um valor".
- Tipos: `int`, `float`, `str`, `bool`, `None`.
- `type()` e `isinstance()`.
- Conversões: `int()`, `float()`, `str()`, `bool()`.
- Regras e convenções de nomes (`snake_case`, sem começar com número, sem palavras reservadas).
- f-strings, formatação de números (`:.2f`, `:,`, `:>10`).
- Constantes por convenção (`MAIUSCULAS`).
- Imprecisão de ponto flutuante (`0.1 + 0.2`) e introdução ao `Decimal`.

**Exemplo comentado**
```python
preco = 19.9
quantidade = 3
total = preco * quantidade
print(f"Total: R$ {total:.2f}")          # 59.70
print(type(preco), type(quantidade))     # float, int
print(0.1 + 0.2)                         # 0.30000000000000004 (não é bug!)
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `TypeError: can only concatenate str (not "int")` | Somar texto com número | Usar f-string ou `str()` |
| `ValueError: invalid literal for int()` | Converter texto não numérico | Validar antes (tópico 12) |
| Idade digitada "20" somada como "2020" | Faltou converter `input` | `int(input(...))` |

### V1 — Fixação
- 2.1 🟢 Criar uma variável de cada tipo e imprimir o `type` de cada uma.
- 2.2 🟢 Converter `"42"` para inteiro e somar 8.
- 2.3 🟢 Usar f-string para imprimir nome, idade e altura formatada com 2 casas.
- 2.4 🟡 Ler dois números e mostrar a média com uma casa decimal.

**Mini projeto V1: Ficha de cadastro**
- Coleta nome, idade, altura, cidade e se é estudante (sim/não convertido para bool).
- Exibe uma ficha completa formatada.
- *Extra:* mostrar o tipo de cada campo ao lado.

### V2 — Lógica
- 2.5 🟢 Trocar o valor de duas variáveis sem usar variável extra (`a, b = b, a`).
- 2.6 🟡 Prever a saída de 8 expressões com tipos misturados e depois conferir no Python.
- 2.7 🟡 Explicar por que `bool("False")` é `True` e `bool("")` é `False`.
- 2.8 🔴 Mostrar 3 resultados inesperados de ponto flutuante e como corrigir com `round` e `Decimal`.

**Mini projeto V2: Calculadora de IMC**
- Lê peso e altura, calcula IMC e mostra o valor com 1 casa.
- *Critérios:* usa floats; mostra fórmula e resultado.
- *Extra:* classificar a faixa (tópico 5 dará a lógica completa).

### V3 — Mercado real
- 2.9 🟡 Calcular o valor de um produto com 10% de desconto.
- 2.10 🟡 Calcular valor final com frete fixo e imposto percentual.
- 2.11 🟡 Converter centavos (inteiro) em reais (texto formatado) e explicar por que sistemas financeiros guardam centavos como inteiro.
- 2.12 🔴 Comparar o cálculo de uma soma de 100 valores em `float` e em `Decimal`.

**Mini projeto V3: Calculadora de orçamento com impostos**
- Recebe descrição, valor unitário, quantidade, percentual de imposto e desconto.
- Mostra subtotal, imposto, desconto e total final.
- *Critérios:* uso de `Decimal` para dinheiro; saída em formato brasileiro (R$ 1.234,56).
- *Visão de mercado:* erros de arredondamento em dinheiro geram bugs reais e processos judiciais.

**Checklist:** ☐ Escolho o tipo correto ☐ Converto tipos com segurança ☐ Uso f-strings com formatação ☐ Sei por que `0.1 + 0.2` é estranho ☐ Nomeio variáveis com clareza

---

## Tópico 3 — Operadores e expressões

**Objetivos:** montar expressões aritméticas, de comparação e lógicas e prever seu resultado.
**Pré-requisitos:** Tópico 2.

**Teoria**
- Aritméticos: `+ - * / // % **`.
- Atribuição composta: `+=`, `-=`, `*=`, etc.
- Comparação: `== != < > <= >=`; encadeamento (`0 < x < 10`).
- Lógicos: `and`, `or`, `not`; curto-circuito.
- Pertencimento: `in`, `not in`. Identidade: `is`.
- Precedência e uso de parênteses para clareza.
- Truques com `%` (par/ímpar, divisibilidade, ciclos) e `//` (divisão inteira, conversões).

**Exemplo comentado**
```python
segundos = 3725
horas = segundos // 3600
minutos = (segundos % 3600) // 60
resto = segundos % 60
print(f"{horas}h {minutos}min {resto}s")   # 1h 2min 5s
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| Usar `=` no lugar de `==` | Atribuição vs comparação | Ler em voz alta: "é igual a?" |
| `x > 5 and < 10` | Sintaxe incompleta | `5 < x < 10` |
| Resultado inesperado com `not` e `and` | Precedência | Usar parênteses |

### V1 — Fixação
- 3.1 🟢 Calcular área e perímetro de um retângulo.
- 3.2 🟢 Dizer se um número é par usando `%`.
- 3.3 🟢 Comparar duas idades e imprimir `True/False` para cada operador de comparação.
- 3.4 🟡 Converter minutos em horas e minutos usando `//` e `%`.

**Mini projeto V1: Calculadora de gorjeta**
- Recebe valor da conta, percentual da gorjeta e número de pessoas.
- Mostra gorjeta, total e valor por pessoa.
- *Extra:* arredondar para cima ao centavo.

### V2 — Lógica
- 3.5 🟡 Testar divisibilidade por 3 e por 5 ao mesmo tempo.
- 3.6 🟡 Dado um número de 3 dígitos, separar centena, dezena e unidade só com `//` e `%`.
- 3.7 🟡 Verificar se um ano é bissexto em uma única expressão lógica.
- 3.8 🔴 Descobrir o dia da semana daqui a N dias sabendo o dia atual (0 a 6), usando `%`.

**Mini projeto V2: Validador de idade e elegibilidade**
- Lê idade e retorna, em `True/False`, elegibilidade para votar, dirigir, aposentar e meia-entrada.
- *Critérios:* cada regra em uma expressão lógica separada, mostrada com nome claro.
- *Extra:* combinar as regras em uma tabela final.

### V3 — Mercado real
- 3.9 🟡 Calcular valor de uma parcela sem juros dividindo em N vezes.
- 3.10 🟡 Verificar se um cliente tem direito a frete grátis (valor mínimo **e** região atendida).
- 3.11 🟡 Aplicar desconto progressivo: 5% acima de 100, 10% acima de 500 (usar expressões, sem `if` ainda).
- 3.12 🔴 Calcular juros compostos de um investimento por N meses.

**Mini projeto V3: Simulador de parcelamento com juros**
- Recebe valor, número de parcelas e taxa mensal.
- Mostra valor da parcela, total pago e quanto foi pago de juros.
- *Critérios:* fórmula de juros compostos correta; comparação lado a lado com pagamento à vista.
- *Visão de mercado:* simuladores de financiamento e cartão são produtos reais de bancos e fintechs.

**Checklist:** ☐ Uso `//` e `%` com naturalidade ☐ Combino `and/or/not` ☐ Conheço a precedência ☐ Encadeio comparações ☐ Escrevo expressões legíveis

---

## Tópico 4 — Strings

**Objetivos:** manipular, limpar, formatar e analisar texto.
**Pré-requisitos:** Tópicos 2 e 3.

**Teoria**
- Criação: aspas simples, duplas, triplas; escape (`\n`, `\t`, `\\`); raw strings.
- Indexação (positiva e negativa) e fatiamento `[início:fim:passo]`.
- Imutabilidade.
- Métodos: `upper`, `lower`, `title`, `strip`, `split`, `join`, `replace`, `find`, `count`, `startswith`, `endswith`, `isdigit`, `isalpha`.
- Operadores: `+`, `*`, `in`, `len()`.
- Formatação: f-strings avançadas, `format`, alinhamento e preenchimento.
- Unicode e acentos: `casefold`, remoção de acentos com `unicodedata`.

**Exemplo comentado**
```python
email = "  MARIA.SILVA@Empresa.com  "
limpo = email.strip().lower()
usuario, dominio = limpo.split("@")
print(usuario, dominio)        # maria.silva empresa.com
print(limpo[::-1])             # texto invertido
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `IndexError: string index out of range` | Índice maior que o tamanho | Usar `len()` para checar |
| `TypeError: 'str' object does not support item assignment` | Strings são imutáveis | Criar nova string |
| `.replace()` "não funciona" | Não guardou o retorno | `texto = texto.replace(...)` |

### V1 — Fixação
- 4.1 🟢 Contar quantas letras tem uma palavra e mostrar a primeira e a última.
- 4.2 🟢 Inverter um texto com fatiamento.
- 4.3 🟢 Colocar um nome em maiúsculas, minúsculas e formato título.
- 4.4 🟡 Substituir todos os espaços de uma frase por hífens.

**Mini projeto V1: Formatador de nome**
- Recebe um nome digitado bagunçado ("  jOÃO   da silva ").
- Devolve limpo, em formato título, e o nome abreviado ("J. da Silva").
- *Extra:* gerar as iniciais.

### V2 — Lógica
- 4.5 🟡 Verificar se uma palavra é palíndromo (ignorando maiúsculas e espaços).
- 4.6 🟡 Contar vogais e consoantes de uma frase.
- 4.7 🟡 Verificar se duas palavras são anagramas.
- 4.8 🔴 Comprimir texto: `"aaabbc"` vira `"a3b2c1"`.

**Mini projeto V2: Verificador de senha forte**
- Regras: mínimo 8 caracteres, letra maiúscula, minúscula, número e símbolo.
- Mostra quais critérios faltaram e uma pontuação de força.
- *Critérios:* lista de motivos, não só "senha fraca".
- *Extra:* detectar senhas comuns ("123456", "senha").

### V3 — Mercado real
- 4.9 🟡 Limpar uma lista de nomes de clientes com espaços e caixas inconsistentes.
- 4.10 🟡 Extrair o DDD e o número de um telefone em vários formatos.
- 4.11 🟡 Mascarar CPF e cartão de crédito (`***.456.789-**`).
- 4.12 🔴 Padronizar endereços ("R.", "Rua", "rua") para um único formato.

**Mini projeto V3: Gerador de e-mail corporativo e slug de URL**
- A partir do nome completo do funcionário gera e-mail (`nome.sobrenome@empresa.com`), tratando acentos e nomes compostos.
- A partir do título de um artigo gera slug (`"Aprenda Python Rápido!"` vira `aprenda-python-rapido`).
- *Critérios:* remove acentos e símbolos; trata espaços duplicados.
- *Visão de mercado:* limpeza e padronização de texto é a maior parte do trabalho com dados.

**Checklist:** ☐ Fatio strings ☐ Uso os principais métodos ☐ Sei que strings são imutáveis ☐ Limpo texto sujo ☐ Formato saídas com f-strings

---

## Tópico 5 — Condicionais

**Objetivos:** fazer o programa tomar decisões com clareza e sem repetição desnecessária.
**Pré-requisitos:** Tópicos 3 e 4.

**Teoria**
- `if`, `elif`, `else`; indentação dos blocos.
- Condições compostas e aninhadas; quando evitar aninhamento (retorno antecipado, "guard clauses").
- Operador ternário: `x if condição else y`.
- *Truthy* e *falsy*: `0`, `""`, `[]`, `None`, `False`.
- `match/case` (Python 3.10+) para múltiplas opções.
- Ordem das condições importa: das mais específicas às mais gerais.

**Exemplo comentado**
```python
nota = float(input("Nota: "))
if nota >= 7:
    situacao = "Aprovado"
elif nota >= 5:
    situacao = "Recuperação"
else:
    situacao = "Reprovado"
print(situacao)
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| Sempre cai no primeiro `if` | Condições em ordem errada | Ordenar do mais específico ao geral |
| `if x = 5` | Atribuição no lugar de comparação | Usar `==` |
| `else` "sem par" | Indentação diferente do `if` | Alinhar |

### V1 — Fixação
- 5.1 🟢 Dizer o maior de dois números.
- 5.2 🟢 Classificar uma nota em aprovado ou reprovado.
- 5.3 🟢 Dizer se uma pessoa é criança, adolescente, adulta ou idosa.
- 5.4 🟡 Ler um número e dizer se é positivo, negativo ou zero.

**Mini projeto V1: Boletim escolar**
- Lê nome e 4 notas, calcula a média e mostra a situação.
- *Critérios:* três faixas (aprovado, recuperação, reprovado).
- *Extra:* adicionar frequência: reprova por falta mesmo com média boa.

### V2 — Lógica
- 5.5 🟡 Ordenar três números sem usar `sort`.
- 5.6 🟡 Classificar triângulo (equilátero, isósceles, escaleno) e checar se os lados formam triângulo.
- 5.7 🟡 Dizer o signo a partir do dia e do mês.
- 5.8 🔴 Resolver equação de 2º grau tratando 0, 1 ou 2 raízes reais.

**Mini projeto V2: Pedra, papel e tesoura (1 rodada)**
- Usuário escolhe, computador escolhe (`random`), programa decide o vencedor.
- *Critérios:* tratar empate; tratar escolha inválida.
- *Extra:* usar `match/case`.

### V3 — Mercado real
- 5.9 🟡 Calcular frete por região e faixa de peso.
- 5.10 🟡 Definir faixa de imposto de renda simplificada (tabela progressiva).
- 5.11 🟡 Validar acesso: perfil (admin, editor, leitor) x ação (ver, editar, apagar).
- 5.12 🔴 Aprovar ou negar um pedido segundo várias regras combinadas.

**Mini projeto V3: Análise de crédito simplificada**
- Entrada: renda, idade, dívidas, tempo de emprego, score.
- Saída: aprovado, negado ou análise manual, com **motivo** da decisão e limite sugerido.
- *Critérios:* cada regra em separado e explicada; nenhuma decisão "sem justificativa".
- *Visão de mercado:* motores de regras (crédito, seguro, antifraude) são feitos de condicionais bem organizadas.

**Checklist:** ☐ Uso `elif` em cadeia ☐ Evito aninhamento excessivo ☐ Conheço truthy/falsy ☐ Uso ternário quando cabe ☐ Justifico decisões na saída

---

## Tópico 6 — Loops (`for` e `while`)

**Objetivos:** repetir processos com segurança, escolhendo o loop certo e evitando loops infinitos.
**Pré-requisitos:** Tópico 5.

**Teoria**
- `for` com `range(início, fim, passo)` e sobre strings.
- `while` e condição de parada.
- `break`, `continue` e `else` em loops.
- Loops aninhados (tabelas, padrões, matrizes).
- Acumuladores e contadores; padrão "flag".
- Loop infinito intencional (`while True` + `break`) e acidental.
- `enumerate` e `zip` (introdução).

**Exemplo comentado**
```python
soma = 0
while True:
    valor = input("Digite um número (ou 'fim'): ")
    if valor == "fim":
        break
    soma += float(valor)
print("Soma:", soma)
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| Loop que nunca termina | Variável de controle não muda | Atualizar dentro do loop |
| Um item a menos/mais (off-by-one) | `range` não inclui o final | `range(1, n + 1)` |
| Acumulador com valor errado | Não inicializado fora do loop | `soma = 0` antes |

### V1 — Fixação
- 6.1 🟢 Contagem regressiva de 10 a 0.
- 6.2 🟢 Imprimir a tabuada de um número.
- 6.3 🟢 Somar os números de 1 a N.
- 6.4 🟡 Imprimir os números pares entre 1 e 100.

**Mini projeto V1: Gerador de tabuadas**
- Pede um número e mostra a tabuada de 1 a 10 formatada.
- *Extra:* gerar tabuadas de vários números em sequência.

### V2 — Lógica
- 6.5 🟡 Calcular fatorial de N.
- 6.6 🟡 Gerar os N primeiros termos de Fibonacci.
- 6.7 🟡 Verificar se um número é primo e listar os primos até N.
- 6.8 🔴 Desenhar triângulo, pirâmide e losango de asteriscos.

**Mini projeto V2: Adivinhe o número com dicas**
- Computador sorteia entre 1 e 100; usuário chuta com dicas "maior/menor".
- *Critérios:* contador de tentativas; limite máximo de tentativas; opção de jogar novamente.
- *Extra:* busca binária automática que resolve em no máximo 7 tentativas.

### V3 — Mercado real
- 6.9 🟡 Somar valores digitados até o usuário encerrar.
- 6.10 🟡 Repetir um menu até o usuário escolher "sair".
- 6.11 🟡 Simular crescimento de uma dívida ou investimento mês a mês.
- 6.12 🔴 Gerar 100 números de pedido únicos e sequenciais com prefixo e ano.

**Mini projeto V3: Caixa registradora**
- Cliente adiciona itens (nome, preço, quantidade) até finalizar.
- Mostra cupom com itens, subtotal, desconto e total; pede valor pago e calcula troco.
- *Critérios:* menu com "adicionar", "remover último", "finalizar"; validar quantidade e preço positivos.
- *Visão de mercado:* PDV (ponto de venda) é um dos sistemas mais comuns em pequenas empresas.

**Checklist:** ☐ Escolho `for` ou `while` corretamente ☐ Uso `break` e `continue` ☐ Evito loop infinito ☐ Uso acumuladores ☐ Faço loops aninhados

---

# FASE B — ESTRUTURAS DE DADOS

---

## Tópico 7 — Listas

**Objetivos:** guardar, percorrer, buscar, ordenar e modificar coleções de dados.
**Pré-requisitos:** Tópico 6.

**Teoria**
- Criação, indexação e fatiamento (igual a strings, mas listas são mutáveis).
- Métodos: `append`, `extend`, `insert`, `remove`, `pop`, `index`, `count`, `sort`, `reverse`, `clear`.
- `sorted()` vs `.sort()`; `reverse=True`; `key=`.
- Percorrer com `for`, `enumerate`, `zip`.
- Listas de listas (matrizes).
- **Cópia vs referência:** `b = a` não copia; usar `a.copy()` ou `a[:]`.
- `len`, `sum`, `min`, `max`, `in`.

**Exemplo comentado**
```python
compras = ["arroz", "feijão"]
compras.append("café")
for i, item in enumerate(compras, start=1):
    print(f"{i}. {item}")

a = [1, 2, 3]
b = a          # mesma lista!
b.append(4)
print(a)       # [1, 2, 3, 4]
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `IndexError: list index out of range` | Índice inexistente | Checar com `len` |
| Alterar lista enquanto percorre | Pula elementos | Percorrer uma cópia |
| `lista = lista.sort()` vira `None` | `sort` não retorna nada | Usar `sorted` ou não atribuir |

### V1 — Fixação
- 7.1 🟢 Somar todos os elementos e calcular a média.
- 7.2 🟢 Achar maior e menor sem usar `max`/`min`.
- 7.3 🟢 Inverter uma lista de três maneiras diferentes.
- 7.4 🟡 Separar uma lista em pares e ímpares.

**Mini projeto V1: Lista de compras**
- Menu para adicionar, remover, listar e limpar itens.
- *Extra:* marcar item como comprado.

### V2 — Lógica
- 7.5 🟡 Remover duplicatas preservando a ordem.
- 7.6 🟡 Rotacionar uma lista N posições.
- 7.7 🟡 Mesclar duas listas já ordenadas em uma ordenada.
- 7.8 🔴 Achar o segundo maior valor em uma passada, sem ordenar.

**Mini projeto V2: Ranking de pontuação**
- Registra jogadores e pontos, mantém o top 5 ordenado, mostra posição de um jogador.
- *Critérios:* desempate por ordem de chegada; atualizar pontuação existente.
- *Extra:* histórico das últimas 10 partidas.

### V3 — Mercado real
- 7.9 🟡 Calcular total e média de vendas por mês.
- 7.10 🟡 Encontrar produtos abaixo do estoque mínimo.
- 7.11 🟡 Ordenar lista de clientes por nome, depois por valor gasto.
- 7.12 🔴 Paginar uma lista longa (mostrar de 10 em 10).

**Mini projeto V3: Controle de estoque em listas**
- Listas paralelas (nomes, quantidades, preços) ou lista de listas.
- Funções: entrada, saída, alerta de mínimo, valor total do estoque.
- *Critérios:* não permitir estoque negativo; relatório final ordenado.
- *Visão de mercado:* aqui o aluno vai perceber que listas paralelas ficam difíceis, preparando o terreno para dicionários.

**Checklist:** ☐ Uso métodos de lista ☐ Fatio listas ☐ Entendo cópia vs referência ☐ Ordeno com `key` ☐ Percorro com `enumerate`

---

## Tópico 8 — Tuplas e sets

**Objetivos:** escolher a estrutura certa: lista, tupla ou conjunto.
**Pré-requisitos:** Tópico 7.

**Teoria**
- Tupla: imutável, desempacotamento, retorno múltiplo, uso como "registro" leve.
- Set: sem duplicatas, sem ordem, busca muito rápida.
- Operações: `|` união, `&` interseção, `-` diferença, `^` diferença simétrica.
- `add`, `discard`, `remove`, `frozenset`.
- Quando usar cada estrutura (tabela comparativa).

| Estrutura | Ordenada | Mutável | Duplicatas | Uso típico |
|---|---|---|---|---|
| lista | sim | sim | sim | coleção que muda |
| tupla | sim | não | sim | registro fixo, coordenadas |
| set | não | sim | não | unicidade, comparação |

**Exemplo comentado**
```python
turma_a = {"Ana", "Bruno", "Carla"}
turma_b = {"Bruno", "Diego"}
print(turma_a & turma_b)   # {'Bruno'} → em comum
print(turma_a - turma_b)   # só na A
x, y = (10, 20)            # desempacotamento
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `TypeError: 'tuple' object does not support item assignment` | Tupla é imutável | Criar nova tupla |
| `{}` vira dicionário, não set | Sintaxe ambígua | `set()` para vazio |
| Esperar ordem no set | Set não é ordenado | Converter para lista e ordenar |

### V1 — Fixação
- 8.1 🟢 Criar tupla com nome e idade e desempacotar.
- 8.2 🟢 Remover duplicatas de uma lista com `set`.
- 8.3 🟢 Testar se um item pertence a um set.
- 8.4 🟡 Trocar dois valores usando tuplas.

**Mini projeto V1: Agenda de coordenadas**
- Guarda lugares como tuplas `(nome, latitude, longitude)` e lista todos.
- *Extra:* calcular distância simples entre dois pontos.

### V2 — Lógica
- 8.5 🟡 Descobrir letras em comum entre duas palavras.
- 8.6 🟡 Descobrir quem está só na lista A, só na B e em ambas.
- 8.7 🟡 Verificar se uma lista tem duplicatas.
- 8.8 🔴 Achar o primeiro caractere que não se repete em um texto.

**Mini projeto V2: Comparador de listas de amigos**
- Recebe duas listas e mostra amigos em comum, exclusivos de cada um e sugestão de "quem apresentar a quem".
- *Critérios:* nomes normalizados (maiúsculas/minúsculas, espaços).

### V3 — Mercado real
- 8.9 🟡 Achar clientes que compraram em janeiro e não em fevereiro.
- 8.10 🟡 Detectar e-mails duplicados em uma base.
- 8.11 🟡 Cruzar lista de inscritos com lista de presentes de um evento.
- 8.12 🔴 Identificar registros que estão em duas bases, mas com divergência de dados.

**Mini projeto V3: Verificador de e-mails duplicados para campanha**
- Entra: lista de e-mails de várias fontes.
- Sai: lista única normalizada, quantidade de duplicatas, e-mails inválidos separados.
- *Visão de mercado:* deduplicação é rotina em marketing, CRM e engenharia de dados.

**Checklist:** ☐ Sei quando usar tupla ☐ Sei quando usar set ☐ Uso união, interseção e diferença ☐ Desempacoto valores ☐ Removo duplicatas

---

## Tópico 9 — Dicionários

**Objetivos:** modelar informação como pares chave-valor, base de qualquer dado real.
**Pré-requisitos:** Tópicos 7 e 8.

**Teoria**
- Criação, acesso, inserção, atualização, remoção.
- `get`, `setdefault`, `pop`, `update`, `in`.
- Percorrer: `keys`, `values`, `items`.
- Dicionário aninhado e lista de dicionários (formato de JSON e de APIs).
- Contagem de frequência; agrupar itens por chave (`defaultdict`, `Counter`).
- Chaves precisam ser imutáveis.
- Ordenar dicionário por valor.

**Exemplo comentado**
```python
aluno = {"nome": "Ana", "notas": [8, 9.5], "ativo": True}
aluno["curso"] = "Python"
print(aluno.get("email", "sem e-mail"))
for chave, valor in aluno.items():
    print(chave, "→", valor)

frases = "a b a c b a".split()
freq = {}
for p in frases:
    freq[p] = freq.get(p, 0) + 1
print(freq)   # {'a': 3, 'b': 2, 'c': 1}
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `KeyError` | Chave inexistente | Usar `.get()` ou `in` |
| Alterar dict enquanto percorre | `RuntimeError` | Percorrer `list(d.items())` |
| Usar lista como chave | Não é hashable | Usar tupla |

### V1 — Fixação
- 9.1 🟢 Criar um dicionário de um produto e imprimir cada campo.
- 9.2 🟢 Adicionar, alterar e remover uma chave.
- 9.3 🟢 Percorrer e imprimir "chave: valor".
- 9.4 🟡 Verificar se uma chave existe antes de acessá-la.

**Mini projeto V1: Agenda de contatos**
- Guarda nome, telefone e e-mail; busca por nome, lista todos, edita e remove.
- *Extra:* busca por parte do nome.

### V2 — Lógica
- 9.5 🟡 Contar quantas vezes cada palavra aparece em um texto.
- 9.6 🟡 Inverter um dicionário (valores viram chaves).
- 9.7 🟡 Agrupar nomes pela primeira letra.
- 9.8 🔴 Mesclar dois dicionários somando valores de chaves repetidas.

**Mini projeto V2: Contador de votos**
- Eleição simples com candidatos; computa, mostra resultado com percentual e vencedor.
- *Critérios:* voto nulo e branco; tratar empate.
- *Extra:* segundo turno automático.

### V3 — Mercado real
- 9.9 🟡 Representar um pedido com cliente e lista de itens (aninhado).
- 9.10 🟡 Calcular total de cada pedido e total geral.
- 9.11 🟡 Agrupar vendas por vendedor e por mês.
- 9.12 🔴 Percorrer uma estrutura tipo resposta de API (dicionário dentro de lista dentro de dicionário) e extrair campos.

**Mini projeto V3: Cadastro de produtos com busca e relatório**
- Cada produto: código, nome, categoria, preço, estoque.
- Funções: cadastrar, buscar por código/nome, filtrar por categoria, relatório por categoria com totais.
- *Critérios:* código único; preço positivo; relatório ordenado por valor.
- *Visão de mercado:* JSON é a "língua franca" entre sistemas; dominar dicionários é dominar dados.

**Checklist:** ☐ Modelo dados com dict ☐ Uso `get` com segurança ☐ Percorro `items()` ☐ Trabalho com aninhados ☐ Conto e agrupo dados

---

# FASE C — ORGANIZAÇÃO DE CÓDIGO

---

## Tópico 10 — Funções

**Objetivos:** dividir programas em partes reutilizáveis, testáveis e legíveis.
**Pré-requisitos:** Tópicos 5 a 9.

**Teoria**
- `def`, parâmetros, argumentos, `return`.
- Diferença entre `print` e `return`.
- Valores padrão; argumentos nomeados; `*args` e `**kwargs`.
- Escopo: local, global; por que evitar `global`.
- Funções que chamam funções; funções puras vs com efeito colateral.
- Docstrings e *type hints* (`def soma(a: int, b: int) -> int`).
- `lambda` (uso pontual).
- **Armadilha:** valor padrão mutável (`def f(x, lista=[])`).
- Recursão básica (aprofundada no tópico 15).

**Exemplo comentado**
```python
def calcular_desconto(preco: float, percentual: float = 10) -> float:
    """Retorna o preço após aplicar o desconto percentual."""
    return preco * (1 - percentual / 100)

print(calcular_desconto(200))       # 180.0
print(calcular_desconto(200, 25))   # 150.0
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| Função retorna `None` | Faltou `return` | Retornar o valor |
| `UnboundLocalError` | Modificar variável global sem declarar | Passar por parâmetro |
| Lista acumula entre chamadas | Default mutável | `lista=None` e criar dentro |

### V1 — Fixação
- 10.1 🟢 Função que recebe nome e retorna saudação.
- 10.2 🟢 Função que calcula média de uma lista.
- 10.3 🟢 Função com parâmetro padrão.
- 10.4 🟡 Função que retorna maior, menor e média (retorno múltiplo).

**Mini projeto V1: Mini calculadora com menu**
- Uma função por operação, um menu em loop.
- *Extra:* histórico das últimas operações.

### V2 — Lógica
- 10.5 🟡 Função `eh_primo(n)` reutilizada para listar primos.
- 10.6 🟡 Função recursiva para fatorial e soma de dígitos.
- 10.7 🟡 Função com `*args` que aceita quantidade variável de números.
- 10.8 🔴 Função que valida CPF (dígitos verificadores).

**Mini projeto V2: Validador de CPF e CNPJ**
- Funções: limpar máscara, checar tamanho, calcular dígitos, validar, formatar.
- *Critérios:* rejeitar sequências repetidas (`111.111.111-11`); cada etapa em função separada.
- *Extra:* gerador de CPFs válidos para testes.

### V3 — Mercado real
- 10.9 🟡 Funções `calcular_inss`, `calcular_irrf`, `calcular_liquido` (tabelas simplificadas).
- 10.10 🟡 Função de frete que recebe peso, região e serviço.
- 10.11 🟡 Função que formata dinheiro no padrão brasileiro.
- 10.12 🔴 Função que gera relatório de vendas a partir de lista de dicionários.

**Mini projeto V3: Sistema de folha de pagamento**
- Entrada: funcionários com salário bruto, dependentes e benefícios.
- Saída: holerite com proventos, descontos e líquido, para todos e individual.
- *Critérios:* cada cálculo em função com docstring; nenhum número "mágico" solto (usar constantes).
- *Visão de mercado:* regras de negócio bem isoladas em funções são o que torna um sistema fácil de manter e de auditar.

**Checklist:** ☐ Separo responsabilidades ☐ Uso `return` corretamente ☐ Entendo escopo ☐ Escrevo docstrings ☐ Evito default mutável

---

## Tópico 11 — Compreensões e funções embutidas

**Objetivos:** escrever código Python "idiomático": curto, claro e eficiente.
**Pré-requisitos:** Tópicos 7 a 10.

**Teoria**
- List, dict e set comprehensions; com condição `if`.
- Quando **não** usar (lógica complexa, várias linhas).
- Geradores (`(x for x in ...)`) e por que economizam memória.
- `map`, `filter`, `sorted(key=..., reverse=...)`.
- `zip`, `enumerate`, `any`, `all`, `min`, `max`, `sum`, `reversed`.
- `lambda` com `sorted`/`max`/`min`.

**Exemplo comentado**
```python
numeros = [1, 2, 3, 4, 5, 6]
quadrados_pares = [n**2 for n in numeros if n % 2 == 0]   # [4, 16, 36]

vendas = [{"v": "Ana", "valor": 300}, {"v": "Rui", "valor": 500}]
melhor = max(vendas, key=lambda x: x["valor"])
print(melhor["v"])   # Rui
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| Comprehension ilegível | Lógica demais em uma linha | Voltar para o `for` normal |
| Gerador "esvazia" | Só pode ser percorrido uma vez | Converter em lista se precisar reusar |
| `sorted` com dicts falha | Falta `key` | `key=lambda x: x["campo"]` |

### V1 — Fixação
- 11.1 🟢 Converter um `for` que cria lista de quadrados em comprehension.
- 11.2 🟢 Filtrar apenas os números pares de uma lista.
- 11.3 🟢 Usar `zip` para combinar nomes e notas.
- 11.4 🟡 Usar `any` e `all` em uma lista de notas.

**Mini projeto V1: Tabela de quadrados e cubos**
- Gera uma tabela de 1 a N com quadrado, cubo e se o número é par.
- *Extra:* exportar a tabela como lista de dicionários.

### V2 — Lógica
- 11.5 🟡 Achatar uma lista de listas.
- 11.6 🟡 Criar um dicionário `palavra → tamanho` com dict comprehension.
- 11.7 🟡 Ordenar lista de tuplas por segundo elemento e depois por primeiro.
- 11.8 🔴 Transpor uma matriz com `zip`.

**Mini projeto V2: Analisador de notas de turma**
- Recebe alunos e notas; mostra média da turma, aprovados, maior nota, ranking, alunos acima da média.
- *Critérios:* uso de comprehensions e `sorted` com `key`; nada de contadores manuais quando existir função pronta.

### V3 — Mercado real
- 11.9 🟡 Totalizar vendas de uma lista de pedidos com `sum` e generator.
- 11.10 🟡 Filtrar pedidos acima de um valor e de um período.
- 11.11 🟡 Extrair uma coluna de uma lista de dicionários.
- 11.12 🔴 Calcular top 3 produtos mais vendidos.

**Mini projeto V3: Relatório de vendas por vendedor**
- Base com 30+ vendas (vendedor, produto, valor, data).
- Relatório: total por vendedor, ticket médio, melhor vendedor, produtos mais vendidos, dias de pico.
- *Visão de mercado:* transformações em lote são a base de qualquer análise de dados e ETL.

**Checklist:** ☐ Escrevo comprehensions legíveis ☐ Sei quando não usá-las ☐ Uso `sorted` com `key` ☐ Uso `zip`/`enumerate` ☐ Entendo geradores

---

## Tópico 12 — Tratamento de erros

**Objetivos:** construir programas que não quebram diante de entradas ruins e que informam o que deu errado.
**Pré-requisitos:** Tópico 10.

**Teoria**
- `try`, `except`, `else`, `finally`.
- Capturar exceções específicas (evitar `except:` genérico).
- Exceções comuns: `ValueError`, `TypeError`, `KeyError`, `IndexError`, `ZeroDivisionError`, `FileNotFoundError`.
- `raise` e exceções personalizadas (`class SaldoInsuficiente(Exception)`).
- Validar antes (LBYL) vs tentar e tratar (EAFP).
- Loop de validação de entrada.
- Registro de erros (`logging` básico).
- Regra de ouro: nunca engolir erro silenciosamente.

**Exemplo comentado**
```python
def ler_inteiro(msg):
    while True:
        try:
            return int(input(msg))
        except ValueError:
            print("Digite um número inteiro válido.")

idade = ler_inteiro("Idade: ")
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `except:` sem tipo | Esconde bugs reais | Capturar o tipo específico |
| `try` gigante | Difícil achar a origem | Envolver só a linha de risco |
| `pass` no `except` | Falha silenciosa | Registrar ou informar |

### V1 — Fixação
- 12.1 🟢 Capturar `ValueError` ao converter texto para número.
- 12.2 🟢 Capturar `ZeroDivisionError` em uma divisão.
- 12.3 🟢 Usar `finally` para imprimir "fim" sempre.
- 12.4 🟡 Capturar `KeyError` ao consultar um dicionário.

**Mini projeto V1: Calculadora à prova de falhas**
- Refaz a calculadora do tópico 10 sem nunca quebrar, com mensagens amigáveis.

### V2 — Lógica
- 12.5 🟡 Função `ler_float(msg, minimo, maximo)` que repete até acertar.
- 12.6 🟡 Criar exceção personalizada e lançá-la com `raise`.
- 12.7 🟡 Encadear dois `except` diferentes com mensagens distintas.
- 12.8 🔴 Tratar entrada com vírgula decimal ("3,5") e converter corretamente.

**Mini projeto V2: Formulário que não aceita dados inválidos**
- Pede nome, e-mail, idade e CPF; só avança quando cada campo é válido.
- *Critérios:* mensagens específicas para cada erro; nenhuma exceção vaza para o usuário.

### V3 — Mercado real
- 12.9 🟡 Processar uma lista de valores e ignorar (com log) os inválidos.
- 12.10 🟡 Sacar de uma conta com `SaldoInsuficienteError`.
- 12.11 🟡 Registrar erros em arquivo com `logging`.
- 12.12 🔴 Tentar novamente (retry) uma operação falha até 3 vezes.

**Mini projeto V3: Processador de pedidos que registra erros e continua**
- Lê uma lista de pedidos, alguns com dados inválidos (preço negativo, produto inexistente, quantidade zero).
- Processa os válidos, registra os inválidos em log com motivo, gera resumo (processados x rejeitados).
- *Visão de mercado:* em produção, um erro em um registro não pode derrubar o lote inteiro.

**Checklist:** ☐ Uso `try/except` específico ☐ Crio exceções próprias ☐ Valido entradas em loop ☐ Uso `logging` ☐ Não engulo erros

---

# FASE D — MUNDO REAL

---

## Tópico 13 — Arquivos (txt, CSV, JSON)

**Objetivos:** persistir e ler dados de arquivos, os formatos mais usados no dia a dia.
**Pré-requisitos:** Tópicos 9 e 12.

**Teoria**
- `open`, modos `r`, `w`, `a`, `x`, `encoding="utf-8"`.
- `with` (fecha o arquivo automaticamente).
- `read`, `readline`, `readlines`, percorrer linha a linha.
- `pathlib.Path`: caminhos, existência, criar pastas.
- CSV: `csv.reader`, `csv.DictReader`, `csv.writer`, delimitador `;`.
- JSON: `json.load`, `json.dump`, `indent`, `ensure_ascii=False`.
- Escolher formato: txt (simples), CSV (tabelas), JSON (estruturas aninhadas).
- Cuidados: sobrescrever sem querer, arquivo inexistente, encoding.

**Exemplo comentado**
```python
import json
from pathlib import Path

arq = Path("dados.json")
dados = json.loads(arq.read_text(encoding="utf-8")) if arq.exists() else []
dados.append({"tarefa": "estudar", "feito": False})
arq.write_text(json.dumps(dados, indent=2, ensure_ascii=False), encoding="utf-8")
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `FileNotFoundError` | Caminho errado ou diretório de execução diferente | Usar `Path` e checar `exists()` |
| Acentos quebrados | Encoding incorreto | `encoding="utf-8"` |
| Dados apagados | Modo `w` sobrescreve | Usar `a` ou ler antes |

### V1 — Fixação
- 13.1 🟢 Gravar 3 linhas em um `.txt` e lê-las de volta.
- 13.2 🟢 Adicionar uma linha ao final sem apagar o conteúdo.
- 13.3 🟢 Contar as linhas de um arquivo.
- 13.4 🟡 Salvar e carregar um dicionário em JSON.

**Mini projeto V1: Diário simples em arquivo**
- Cada entrada com data e texto, adicionada ao arquivo; opção de ler tudo.

### V2 — Lógica
- 13.5 🟡 Contar palavras e as 5 mais frequentes em um `.txt`.
- 13.6 🟡 Converter CSV em JSON e vice-versa.
- 13.7 🟡 Mesclar dois arquivos CSV sem duplicar linhas.
- 13.8 🔴 Ler um arquivo grande linha a linha sem carregar tudo na memória.

**Mini projeto V2: Lista de tarefas persistente**
- Adiciona, conclui, remove, filtra; salva em JSON e recarrega ao abrir.
- *Critérios:* tratar arquivo inexistente e JSON corrompido.
- *Extra:* backup automático antes de salvar.

### V3 — Mercado real
- 13.9 🟡 Ler planilha CSV de vendas com `;` e acentos.
- 13.10 🟡 Limpar linhas inválidas e salvar um CSV "limpo".
- 13.11 🟡 Gerar CSV de relatório mensal.
- 13.12 🔴 Consolidar vários CSVs de uma pasta em um único relatório.

**Mini projeto V3: Analisador de vendas a partir de CSV**
- Lê CSV real (fornecido pela plataforma, com problemas propositais: valores vazios, datas em formatos diferentes).
- Limpa, calcula totais por período/produto/vendedor e gera relatório em CSV e em texto.
- *Visão de mercado:* automatizar tarefas de planilha é um dos usos mais valorizados de Python em empresas.

**Checklist:** ☐ Uso `with` ☐ Leio e gravo CSV ☐ Leio e gravo JSON ☐ Uso `pathlib` ☐ Trato arquivo ausente

---

## Tópico 14 — Módulos, bibliotecas e ambiente

**Objetivos:** organizar código em vários arquivos e usar bibliotecas de terceiros com ambiente isolado.
**Pré-requisitos:** Tópicos 10 e 13.

**Teoria**
- `import`, `from ... import`, `as`; `if __name__ == "__main__":`.
- Biblioteca padrão: `random`, `datetime`, `math`, `os`, `sys`, `collections`, `itertools`, `statistics`, `pathlib`.
- Criar módulo próprio e pacote (`__init__.py`).
- `pip install`, `pip list`, `pip freeze`, `requirements.txt`.
- Ambiente virtual: `python -m venv .venv`, ativar, desativar; por que nunca instalar tudo globalmente.
- Datas e horas: `datetime`, `timedelta`, formatação `strftime`, fuso horário.
- Ler documentação oficial (habilidade essencial).

**Exemplo comentado**
```python
# utils.py
def formatar_real(v):
    return f"R$ {v:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

# main.py
from datetime import datetime, timedelta
from utils import formatar_real

vencimento = datetime.now() + timedelta(days=30)
print(formatar_real(1234.5), vencimento.strftime("%d/%m/%Y"))
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `ModuleNotFoundError` | Biblioteca não instalada ou venv errado | Ativar venv e `pip install` |
| Import circular | Dois módulos se importam | Reorganizar dependências |
| Arquivo com nome de biblioteca (`random.py`) | Sombreia o módulo real | Renomear |

### V1 — Fixação
- 14.1 🟢 Sortear um número, uma escolha de lista e embaralhar uma lista com `random`.
- 14.2 🟢 Mostrar a data e hora atuais formatadas.
- 14.3 🟢 Usar `math` para raiz, potência, arredondamento.
- 14.4 🟡 Criar um módulo com 2 funções e importá-lo em outro arquivo.

**Mini projeto V1: Gerador de senhas aleatórias**
- Tamanho e tipos de caracteres escolhidos pelo usuário; usa `secrets` (mais seguro que `random`).
- *Extra:* gerar 5 opções.

### V2 — Lógica
- 14.5 🟡 Calcular a idade exata em anos, meses e dias.
- 14.6 🟡 Descobrir quantos dias faltam para o próximo aniversário.
- 14.7 🟡 Dividir um programa grande em 3 módulos.
- 14.8 🔴 Calcular dias úteis entre duas datas (sem fins de semana).

**Mini projeto V2: Jogo da forca modularizado**
- Arquivos: `palavras.py` (banco de palavras), `jogo.py` (lógica), `interface.py` (entrada e saída), `main.py`.
- *Critérios:* lógica separada da interface; adicionar nova lista de palavras sem tocar no código do jogo.

### V3 — Mercado real
- 14.9 🟡 Criar venv, instalar uma biblioteca e gerar `requirements.txt`.
- 14.10 🟡 Usar uma biblioteca externa (ex.: `rich` para tabelas coloridas).
- 14.11 🟡 Calcular vencimentos de parcelas em datas úteis.
- 14.12 🔴 Ler variáveis de ambiente (`os.environ`) para configurar o programa.

**Mini projeto V3: Consulta de CEP ou clima com `requests`**
- Digita um CEP (ViaCEP) ou uma cidade (API de clima gratuita) e recebe endereço/clima formatado.
- *Critérios:* venv e `requirements.txt` incluídos; tratar falha de rede e resposta inválida; sem chave de API no código.
- *Visão de mercado:* quase todo sistema consome bibliotecas e APIs de terceiros.

**Checklist:** ☐ Importo módulos ☐ Crio módulo próprio ☐ Uso venv ☐ Instalo com `pip` ☐ Trabalho com datas

---

# FASE E — PENSAMENTO DE ENGENHARIA

---

## Tópico 15 — Algoritmos: busca, ordenação, recursão e complexidade

**Objetivos:** resolver problemas de forma estruturada e entender o custo das soluções.
**Pré-requisitos:** Tópicos 6 a 11.

**Teoria**
- Como decompor um problema: entrada → processamento → saída; escrever em português antes de codar (pseudocódigo).
- Busca linear e busca binária.
- Ordenação: bubble, selection e insertion (didáticos); `sorted` (Timsort) no dia a dia.
- Recursão: caso base, caso recursivo, pilha de chamadas; quando iterar é melhor.
- Introdução à complexidade: O(1), O(n), O(log n), O(n²), com exemplos práticos.
- Contagem de tempo com `time.perf_counter()`.
- Estruturas úteis: pilha e fila (`list`, `collections.deque`).

**Exemplo comentado**
```python
def busca_binaria(lista, alvo):
    ini, fim = 0, len(lista) - 1
    while ini <= fim:
        meio = (ini + fim) // 2
        if lista[meio] == alvo:
            return meio
        if lista[meio] < alvo:
            ini = meio + 1
        else:
            fim = meio - 1
    return -1
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `RecursionError` | Falta caso base | Definir condição de parada |
| Busca binária em lista desordenada | Pré-condição ignorada | Ordenar antes |
| Loop infinito na busca binária | Atualização errada de `ini`/`fim` | Rever limites |

### V1 — Fixação
- 15.1 🟢 Implementar busca linear.
- 15.2 🟢 Implementar busca binária em lista ordenada.
- 15.3 🟢 Implementar bubble sort.
- 15.4 🟡 Medir o tempo de busca linear vs binária em 1 milhão de itens.

**Mini projeto V1: Comparador de algoritmos de ordenação**
- Roda 3 ordenações em listas de tamanhos diferentes e imprime uma tabela de tempos.

### V2 — Lógica
- 15.5 🟡 Fibonacci recursivo vs iterativo vs com cache (`functools.lru_cache`).
- 15.6 🟡 Torre de Hanói recursiva.
- 15.7 🟡 Verificar parênteses balanceados usando pilha.
- 15.8 🔴 Gerar todas as permutações de uma string.

**Mini projeto V2: Resolvedor de labirinto no terminal**
- Labirinto como matriz; encontra caminho por busca em profundidade ou largura.
- *Extra:* mostrar o caminho desenhado.

### V3 — Mercado real
- 15.9 🟡 Achar dois números da lista que somam um alvo (problema clássico de entrevista) em O(n).
- 15.10 🟡 Encontrar duplicatas em uma lista grande de pedidos com eficiência.
- 15.11 🟡 Implementar fila de atendimento com prioridade.
- 15.12 🔴 Ordenar pedidos por múltiplos critérios (prioridade, prazo, valor).

**Mini projeto V3: Simulador de fila de atendimento**
- Clientes chegam com prioridade (normal, preferencial, VIP); guichês atendem; relatório de tempo médio de espera.
- *Visão de mercado:* filas, ordenação por prioridade e otimização de busca são a base de logística, suporte e entrevistas técnicas.

**Checklist:** ☐ Decomponho problemas ☐ Implemento buscas ☐ Escrevo recursão com caso base ☐ Entendo Big-O básico ☐ Meço tempo de execução

---

## Tópico 16 — Orientação a Objetos

**Objetivos:** modelar entidades do mundo real como classes, com dados e comportamentos juntos.
**Pré-requisitos:** Tópicos 9, 10 e 12.

**Teoria**
- Classe, objeto (instância), `__init__`, `self`.
- Atributos de instância e de classe; métodos.
- `__str__` e `__repr__`; métodos "mágicos" (`__eq__`, `__lt__`, `__len__`).
- Encapsulamento: convenção `_privado`, `@property` e setters com validação.
- Herança, `super()`, sobrescrita, polimorfismo.
- Composição vs herança ("tem um" x "é um").
- `@classmethod`, `@staticmethod`.
- `dataclasses` para classes de dados.
- Princípios de projeto: responsabilidade única, baixo acoplamento.

**Exemplo comentado**
```python
class ContaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self._saldo = saldo

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        self._saldo += valor

    @property
    def saldo(self):
        return self._saldo

    def __str__(self):
        return f"{self.titular}: R$ {self._saldo:.2f}"
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| `TypeError: missing 1 required positional argument: 'self'` | Método chamado na classe, não no objeto | Instanciar primeiro |
| Atributo compartilhado entre objetos | Lista criada como atributo de classe | Criar em `__init__` |
| Herança para tudo | Hierarquia rígida | Preferir composição |

### V1 — Fixação
- 16.1 🟢 Criar classe `Pessoa` com nome, idade e método `apresentar`.
- 16.2 🟢 Criar 3 objetos e listá-los.
- 16.3 🟢 Implementar `__str__`.
- 16.4 🟡 Criar classe `Retangulo` com métodos de área e perímetro.

**Mini projeto V1: Cadastro de pets**
- Classe `Pet` (nome, espécie, idade); lista de pets; buscar, adicionar, remover.

### V2 — Lógica
- 16.5 🟡 Herança: `Animal` → `Cachorro`, `Gato` com método `emitir_som` polimórfico.
- 16.6 🟡 Classe `Fracao` com `__add__`, `__eq__`, `__str__`.
- 16.7 🟡 Classe `Pilha` com `push`, `pop`, `topo`, `vazia`.
- 16.8 🔴 Classe `Baralho` com `embaralhar` e `distribuir`, usando composição de `Carta`.

**Mini projeto V2: Biblioteca com livros e empréstimos**
- Classes: `Livro`, `Usuario`, `Emprestimo`, `Biblioteca`.
- Regras: limite de 3 livros por usuário, prazo de devolução, multa por atraso.
- *Critérios:* cada classe com uma responsabilidade; validações com exceções.

### V3 — Mercado real
- 16.9 🟡 Modelar `Produto` e `Pedido` com itens e total calculado.
- 16.10 🟡 Hierarquia de funcionários (`CLT`, `PJ`, `Estagiario`) com cálculo de pagamento polimórfico.
- 16.11 🟡 Classe com `@property` que valida e-mail e idade.
- 16.12 🔴 Salvar e carregar objetos em JSON (serialização).

**Mini projeto V3: Conta bancária completa**
- Classes: `Cliente`, `Conta` (corrente, poupança), `Transacao`.
- Regras: depósito, saque, transferência, limite, rendimento da poupança, extrato com data.
- *Critérios:* exceções específicas; saldo nunca negativo sem cheque especial; histórico imutável.
- *Visão de mercado:* modelagem de domínio é o que se cobra em qualquer vaga de backend.

**Checklist:** ☐ Crio classes e objetos ☐ Uso herança e composição ☐ Uso `@property` ☐ Implemento `__str__`/`__repr__` ☐ Modelo um domínio real

---

## Tópico 17 — Testes, depuração, boas práticas e Git

**Objetivos:** entregar código que outras pessoas conseguem ler, testar e manter.
**Pré-requisitos:** Tópicos 10, 12 e 16.

**Teoria**
- PEP 8: nomes, espaçamento, tamanho de linha; ferramentas `ruff`/`black`.
- Legibilidade: funções curtas, nomes descritivos, evitar números mágicos.
- Comentários úteis (o "porquê", não o "o quê").
- Depuração: `print` estratégico, `breakpoint()`, debugger do VS Code, método científico (hipótese → teste).
- Testes automatizados com `pytest`: `assert`, casos normais, casos de borda, casos de erro (`pytest.raises`), fixtures.
- Ideia de TDD (escrever o teste antes).
- Git básico: `init`, `add`, `commit`, `status`, `log`, `branch`, `merge`, `.gitignore`; mensagens de commit claras.
- GitHub: repositório remoto, `push`, `pull`, README.
- Refatoração: melhorar o código sem mudar seu comportamento.

**Exemplo comentado**
```python
# test_calculos.py
import pytest
from calculos import dividir

def test_divisao_normal():
    assert dividir(10, 2) == 5

def test_divisao_por_zero():
    with pytest.raises(ZeroDivisionError):
        dividir(1, 0)
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| Teste que sempre passa | Sem `assert` real ou testa o que não deve | Conferir se o teste falha quando o código está errado |
| Commit gigante "ajustes" | Sem disciplina | Commits pequenos e descritivos |
| Subir `.venv` e senhas ao Git | Falta de `.gitignore` | Configurar antes do primeiro commit |

### V1 — Fixação
- 17.1 🟢 Reescrever um trecho com nomes ruins (`x`, `a1`) usando nomes claros.
- 17.2 🟢 Escrever 3 testes para a função `somar`.
- 17.3 🟢 Fazer `git init`, primeiro commit e ver o `log`.
- 17.4 🟡 Achar o bug em um código proposital usando `print` e depois o debugger.

**Mini projeto V1: Refatorar a calculadora do tópico 10**
- Aplicar PEP 8, nomes claros, docstrings, remover duplicação.
- Entrega: antes e depois lado a lado.

### V2 — Lógica
- 17.5 🟡 Escrever testes cobrindo casos de borda (zero, negativo, vazio, muito grande).
- 17.6 🟡 Praticar TDD: escrever o teste antes de `eh_primo`.
- 17.7 🟡 Criar branch, fazer alteração e mesclar.
- 17.8 🔴 Achar e corrigir um bug intermitente guiado por testes.

**Mini projeto V2: Suíte de testes do validador de CPF**
- Mínimo de 15 testes: válidos, inválidos, com e sem máscara, tamanhos errados, repetidos.
- *Critérios:* cobertura de todos os ramos da função (`pytest --cov`).

### V3 — Mercado real
- 17.9 🟡 Escrever README com instalação, uso e exemplos.
- 17.10 🟡 Configurar `.gitignore`, `requirements.txt` e estrutura de pastas.
- 17.11 🟡 Simular *pull request*: revisar o código de outro aluno seguindo checklist.
- 17.12 🔴 Configurar GitHub Actions para rodar os testes a cada push (opcional).

**Mini projeto V3: Repositório profissional**
- Pega um projeto anterior (ex.: folha de pagamento) e o entrega como repositório no GitHub: README claro, estrutura em pastas, testes, `requirements.txt`, histórico de commits limpo.
- *Visão de mercado:* o GitHub é o portfólio; qualidade de entrega diferencia candidatos.

**Checklist:** ☐ Sigo PEP 8 ☐ Depuro com método ☐ Escrevo testes com `pytest` ☐ Uso Git no dia a dia ☐ Escrevo README

---

## Tópico 18 — Consumindo APIs e persistência com SQLite

**Objetivos:** buscar dados da internet e armazenar dados de forma estruturada, preparando a transição para Flask e Django.
**Pré-requisitos:** Tópicos 9, 12, 13, 14 e 16.

**Teoria**
- O que é uma API REST: URL, método (`GET`, `POST`), status HTTP (200, 404, 500), JSON.
- `requests`: `get`, `params`, `headers`, `timeout`, `raise_for_status()`.
- Tratar falhas: rede, tempo esgotado, JSON inválido, limite de requisições.
- Segurança básica: chaves de API em variáveis de ambiente, nunca no código.
- Banco de dados relacional em 10 minutos: tabela, linha, coluna, chave primária.
- `sqlite3`: `connect`, `cursor`, `execute`, `commit`, `fetchall`.
- SQL essencial: `CREATE TABLE`, `INSERT`, `SELECT`, `WHERE`, `ORDER BY`, `UPDATE`, `DELETE`, `JOIN` (introdução).
- **Injeção de SQL:** sempre usar parâmetros (`?`), nunca concatenar texto.
- Padrão simples de repositório: isolar o acesso ao banco em uma classe.

**Exemplo comentado**
```python
import sqlite3, requests

r = requests.get("https://viacep.com.br/ws/01001000/json/", timeout=10)
r.raise_for_status()
dados = r.json()

con = sqlite3.connect("enderecos.db")
con.execute("CREATE TABLE IF NOT EXISTS ceps (cep TEXT PRIMARY KEY, cidade TEXT)")
con.execute("INSERT OR REPLACE INTO ceps VALUES (?, ?)", (dados["cep"], dados["localidade"]))
con.commit()
```

**Erros comuns**
| Erro | Causa | Correção |
|---|---|---|
| Programa trava esperando resposta | Sem `timeout` | Sempre definir `timeout` |
| Dados "somem" do banco | Faltou `commit` | Commitar ou usar `with con:` |
| SQL construído com f-string | Vulnerável a injeção | Usar `?` e tupla de parâmetros |

### V1 — Fixação
- 18.1 🟢 Fazer um `GET` em uma API pública e imprimir o JSON.
- 18.2 🟢 Extrair 3 campos específicos do JSON.
- 18.3 🟢 Criar um banco SQLite e uma tabela.
- 18.4 🟡 Inserir 5 linhas e listá-las.

**Mini projeto V1: Cotação de moedas no terminal**
- Consulta uma API pública de câmbio e mostra cotação de 3 moedas.
- *Extra:* salvar a consulta em arquivo.

### V2 — Lógica
- 18.5 🟡 Tratar status 404 e timeout com mensagens diferentes.
- 18.6 🟡 Fazer `UPDATE` e `DELETE` com `WHERE` seguro.
- 18.7 🟡 Consulta com `ORDER BY`, `LIMIT` e filtro.
- 18.8 🔴 Demonstrar uma injeção de SQL em um exemplo vulnerável e corrigir.

**Mini projeto V2: Agenda de contatos com SQLite**
- Reescreve a agenda do tópico 9 usando banco; busca, edição, remoção e ordenação.
- *Critérios:* consultas parametrizadas; camada de acesso ao banco separada da interface.

### V3 — Mercado real
- 18.9 🟡 Guardar histórico de consultas de uma API com data e hora.
- 18.10 🟡 Criar 2 tabelas relacionadas (clientes e pedidos) e fazer um `JOIN`.
- 18.11 🟡 Cachear respostas de API no banco para evitar chamadas repetidas.
- 18.12 🔴 Sincronizar dados de uma API com o banco local (inserir novos, atualizar alterados).

**Mini projeto V3: Monitor de preços/clima com histórico**
- Consulta uma API a cada execução, grava no SQLite, mostra evolução e variação percentual.
- *Critérios:* tratar todas as falhas de rede; chave em variável de ambiente; relatório dos últimos 7 registros.
- *Visão de mercado:* integrar API + banco é o coração de qualquer backend; este tópico é a ponte direta para Flask e Django.

**Checklist:** ☐ Consumo APIs com `requests` ☐ Trato falhas de rede ☐ Uso SQLite ☐ Escrevo SQL básico ☐ Evito injeção de SQL

---

# FASE F — PROJETO FINAL DO MÓDULO

## Projeto integrador

O aluno escolhe **uma** das opções e entrega um sistema de terminal completo.

| Opção | Descrição |
|---|---|
| **A. Gerenciador de finanças pessoais** | Receitas, despesas, categorias, saldo, relatório mensal, metas de economia |
| **B. Sistema de estoque e vendas** | Produtos, entradas, saídas, alertas de mínimo, relatório de vendas e lucro |
| **C. Gerenciador de tarefas com prioridades** | Projetos, tarefas, prazos, prioridade, filtros, estatísticas de produtividade |

### Requisitos obrigatórios

1. Menu interativo em loop, com opção de sair.
2. Uso de **classes** para as entidades principais.
3. **Funções** bem separadas e com docstring.
4. Persistência em **SQLite** ou **JSON**.
5. **Tratamento de erros** em toda entrada do usuário e em toda operação de arquivo/banco.
6. Pelo menos um **relatório** (texto formatado ou CSV exportado).
7. **Testes** com `pytest` para as regras de negócio principais (mínimo 10 testes).
8. Código organizado em **módulos** (pelo menos 4 arquivos).
9. **README** com instalação, uso e exemplo.
10. Repositório **Git** com histórico de commits coerente.

### Desafios opcionais (nível avançado)
- Consumir uma API externa (ex.: cotação de moedas nas finanças, preços em estoque).
- Exportar relatório em PDF ou Excel.
- Interface com `rich` ou `textual`.
- Empacotar como executável.

### Rubrica de avaliação (100 pontos)

| Critério | Pontos |
|---|---|
| Funcionamento correto (requisitos atendidos) | 25 |
| Organização do código (módulos, funções, classes) | 20 |
| Tratamento de erros e validações | 15 |
| Testes automatizados | 15 |
| Legibilidade e boas práticas (PEP 8, nomes, docstrings) | 10 |
| Documentação (README) e uso de Git | 10 |
| Criatividade e funcionalidades extras | 5 |

**Níveis:** 0–59 Em desenvolvimento · 60–79 Competente · 80–94 Avançado · 95–100 Excelente.

---

# ANEXOS

## Anexo A — Ritmo sugerido

| Fase | Tópicos | Duração sugerida (1h/dia) |
|---|---|---|
| A. Fundamentos | 1 a 6 | 4 a 5 semanas |
| B. Estruturas de dados | 7 a 9 | 2 a 3 semanas |
| C. Organização de código | 10 a 12 | 3 semanas |
| D. Mundo real | 13, 14, 18 | 3 a 4 semanas |
| E. Engenharia | 15, 16, 17 | 4 semanas |
| F. Projeto final | — | 2 a 3 semanas |
| **Total** | | **cerca de 4 a 5 meses** |

## Anexo B — Recursos para o site

**Sugestões de mecânicas de engajamento**
- Barra de progresso por tópico e por fase (ex.: 7/18 tópicos).
- Selo por tópico concluído e por fase concluída.
- Editor de código embutido com execução (Pyodide roda Python no navegador, sem servidor).
- Testes automáticos nos exercícios (o aluno vê ✔ ou ✘ na hora).
- Dicas em 3 níveis por exercício: dica leve, dica forte, solução comentada.
- Revisão espaçada: reaparecem exercícios de tópicos antigos após alguns dias.
- Portfólio: os mini projetos concluídos ficam salvos e exportáveis.

**Regras de desbloqueio sugeridas**
- Exercícios V1 liberados após ler a teoria.
- V2 liberado após concluir 3 de 4 exercícios V1.
- V3 liberado após concluir 3 de 4 exercícios V2.
- Próximo tópico liberado após concluir o mini projeto V1 (V2 e V3 podem ficar como "aprofundamento").

## Anexo C — Estrutura de dados sugerida (JSON) para o site

```json
{
  "modulo": "python",
  "topicos": [
    {
      "id": 6,
      "slug": "loops",
      "titulo": "Loops (for e while)",
      "fase": "A",
      "prerequisitos": [5],
      "objetivos": ["Repetir processos com for e while", "Evitar loops infinitos"],
      "teoria": [
        { "titulo": "for e range", "conteudo_md": "..." },
        { "titulo": "while e break", "conteudo_md": "..." }
      ],
      "erros_comuns": [
        { "erro": "Loop infinito", "causa": "Variável de controle não muda", "correcao": "Atualizar dentro do loop" }
      ],
      "variacoes": [
        {
          "nivel": "V1",
          "nome": "Fixação",
          "exercicios": [
            {
              "id": "6.1",
              "dificuldade": "facil",
              "enunciado_md": "Imprima uma contagem regressiva de 10 a 0.",
              "dicas": ["Use range com passo negativo", "range(10, -1, -1)"],
              "testes": [{ "entrada": "", "saida_esperada": "10\n9\n..." }],
              "solucao_md": "..."
            }
          ],
          "mini_projeto": {
            "titulo": "Gerador de tabuadas",
            "descricao_md": "...",
            "requisitos": ["Pedir um número", "Mostrar a tabuada de 1 a 10"],
            "criterios_aceite": ["Roda sem erro", "Saída formatada"],
            "extra": ["Tabuadas de vários números"]
          }
        }
      ],
      "visao_mercado_md": "...",
      "checklist": ["Escolho for ou while corretamente", "Uso break e continue"],
      "quiz": []
    }
  ]
}
```

## Anexo D — Próximas etapas de produção de conteúdo

Este documento é o **mapa completo**. Para cada tópico, o próximo passo é produzir o conteúdo final:

1. Texto de teoria completo (com mais exemplos e analogias).
2. Enunciados detalhados dos 12 exercícios com entrada/saída de exemplo.
3. Gabarito comentado e testes automáticos para cada exercício.
4. Enunciado completo, passo a passo e solução de referência de cada mini projeto.
5. Quiz de 5 perguntas.

**Sugestão de blocos de produção:** 1–3, 4–6, 7–9, 10–12, 13–15, 16–18, projeto final.
