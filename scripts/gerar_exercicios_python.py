from pathlib import Path
import json

ROOT = Path(r'C:\Users\Joao\Documents\codetrilha')
EXERCISES_DIR = ROOT / 'src' / 'modules' / 'python' / 'exercises'
MINI_DIR = ROOT / 'src' / 'modules' / 'python' / 'mini-projetos'

for directory in [EXERCISES_DIR, MINI_DIR]:
    directory.mkdir(parents=True, exist_ok=True)
    for item in directory.iterdir():
        if item.is_file():
            item.unlink()


def make_tests(expected: str, hidden_expected: str | None = None):
    tests = [
        {'entrada': '', 'esperado': expected, 'oculto': False},
        {'entrada': '', 'esperado': expected, 'oculto': False},
        {'entrada': '', 'esperado': expected, 'oculto': False},
    ]
    if hidden_expected is None:
        hidden_expected = expected
    tests.extend([
        {'entrada': '', 'esperado': hidden_expected, 'oculto': True},
        {'entrada': '', 'esperado': hidden_expected, 'oculto': True},
    ])
    return tests


def build_code(id_, titulo, topico, dificuldade, xp, aula, enunciado, starter, solution, tags, expected):
    return {
        'id': id_,
        'tipo': 'codigo',
        'titulo': titulo,
        'topico': topico,
        'dificuldade': dificuldade,
        'xp': xp,
        'dicas': [
            'Leia o problema e identifique a entrada esperada.',
            'Teste a lógica em casos simples antes de generalizar.',
            'Verifique a saída final e os tipos de dados envolvidos.'
        ],
        'solucao': solution,
        'tags': tags,
        'aulaRelacionada': aula,
        'enunciado': enunciado,
        'starterCode': starter,
        'nomeFuncao': id_.replace('-', '_'),
        'testes': make_tests(expected),
    }


def build_bug(id_, titulo, topico, dificuldade, xp, aula, enunciado, starter, solution, tags, expected):
    return {
        'id': id_,
        'tipo': 'bug',
        'titulo': titulo,
        'topico': topico,
        'dificuldade': dificuldade,
        'xp': xp,
        'dicas': [
            'Observe a condição que controla a repetição.',
            'Compare o código com o intervalo esperado no problema.',
            'Teste o comportamento em um caso mínimo antes de concluir.'
        ],
        'solucao': solution,
        'tags': tags,
        'aulaRelacionada': aula,
        'enunciado': enunciado,
        'starterCode': starter,
        'testes': make_tests(expected),
    }


def build_fill(id_, titulo, topico, dificuldade, xp, aula, enunciado, starter, solution, tags, expected):
    return {
        'id': id_,
        'tipo': 'completar',
        'titulo': titulo,
        'topico': topico,
        'dificuldade': dificuldade,
        'xp': xp,
        'dicas': [
            'Reescreva a expressão em etapas para conferir a lógica.',
            'Use as variáveis do problema e mantenha a ordem correta.',
            'Confira se a saída final segue o formato pedido.'
        ],
        'solucao': solution,
        'tags': tags,
        'aulaRelacionada': aula,
        'enunciado': enunciado,
        'starterCode': starter,
        'testes': make_tests(expected),
    }


def build_choice(id_, titulo, topico, dificuldade, xp, aula, enunciado, pergunta, alternativas, tags):
    return {
        'id': id_,
        'tipo': 'multipla-escolha',
        'titulo': titulo,
        'topico': topico,
        'dificuldade': dificuldade,
        'xp': xp,
        'dicas': [
            'Analise a ordem de execução do código.',
            'Observe como a estrutura de dados muda ao longo da execução.',
            'Escolha a alternativa que descreve o efeito real do programa.'
        ],
        'solucao': next(item['texto'] for item in alternativas if item['correta']),
        'tags': tags,
        'aulaRelacionada': aula,
        'enunciado': enunciado,
        'pergunta': pergunta,
        'alternativas': alternativas,
    }


def build_sort(id_, titulo, topico, dificuldade, xp, aula, enunciado, linhas, ordem_correta, tags):
    return {
        'id': id_,
        'tipo': 'ordenar',
        'titulo': titulo,
        'topico': topico,
        'dificuldade': dificuldade,
        'xp': xp,
        'dicas': [
            'Identifique a decisão principal do algoritmo.',
            'Coloque o fluxo antes da resposta final.',
            'Garanta que a ordem tenha a lógica correta.'
        ],
        'solucao': '\n'.join(ordem_correta),
        'tags': tags,
        'aulaRelacionada': aula,
        'enunciado': enunciado,
        'linhas': linhas,
        'ordemCorreta': ordem_correta,
    }


def build_prediction(id_, titulo, topico, dificuldade, xp, aula, enunciado, codigo, resposta, tags):
    return {
        'id': id_,
        'tipo': 'prever-saida',
        'titulo': titulo,
        'topico': topico,
        'dificuldade': dificuldade,
        'xp': xp,
        'dicas': [
            'Acompanhe a execução linha por linha.',
            'Observe a precedência de operadores e reatribuições.',
            'Confirme a sequência final de impressão.'
        ],
        'solucao': resposta,
        'tags': tags,
        'aulaRelacionada': aula,
        'enunciado': enunciado,
        'codigo': codigo,
        'respostaEsperada': resposta,
    }


items = [
    build_code('ola-nome', 'Olá, nome!', 'Funções', 'fácil', 10, 'funcoes', 'Crie uma função chamada ola_nome(nome) que retorna a mensagem "Olá, <nome>!". Exemplo: ola_nome("Ana") -> "Olá, Ana!".', 'def ola_nome(nome):\n    return ""\n\nprint(ola_nome("Ana"))', 'def ola_nome(nome):\n    return f"Olá, {nome}!"\n\nprint(ola_nome("Ana"))', ['função', 'saída', 'iniciante'], 'Olá, Ana!'),
    build_code('area-retangulo', 'Área do retângulo', 'Funções', 'fácil', 10, 'funcoes', 'Escreva a função area_retangulo(base, altura) para calcular a área. Exemplo: area_retangulo(6, 4) -> 24.', 'def area_retangulo(base, altura):\n    return 0\n\nprint(area_retangulo(6, 4))', 'def area_retangulo(base, altura):\n    return base * altura\n\nprint(area_retangulo(6, 4))', ['matemática', 'função', 'área'], '24'),
    build_fill('media-3-notas', 'Média de 3 notas', 'Operadores', 'fácil', 10, 'operadores', 'Preencha os espaços para calcular a média de 3 notas. Exemplo: 7, 8 e 9 -> 8.0.', 'nota1 = 7\nnota2 = 8\nnota3 = 9\nmedia = (nota1 + nota2 + nota3) / 3\nprint(media)', 'nota1 = 7\nnota2 = 8\nnota3 = 9\nmedia = (nota1 + nota2 + nota3) / 3\nprint(media)', ['média', 'notas', 'cálculo'], '8.0'),
    build_prediction('divisao-inteira', 'Operações com inteiros', 'Operadores', 'fácil', 10, 'operadores', 'Qual será a saída do código abaixo?', 'print(7 // 2)\nprint(7 % 2)\nprint(2 ** 3)', '3\n1\n8', ['divisão', 'módulo', 'potência']),
    build_code('eh-par', 'É par?', 'Condicionais', 'fácil', 10, 'condicionais', 'Crie a função eh_par(n) que devolve True se o número for par. Exemplo: eh_par(8) -> True.', 'def eh_par(n):\n    return False\n\nprint(eh_par(8))', 'def eh_par(n):\n    return n % 2 == 0\n\nprint(eh_par(8))', ['par', 'bool', 'condição'], 'True'),
    build_code('inverter-texto', 'Inverter texto', 'Strings', 'fácil', 10, 'strings', 'Faça inverter_texto(s) usando fatiamento. Exemplo: inverter_texto("python") -> "nohtyp".', 'def inverter_texto(s):\n    return s\n\nprint(inverter_texto("python"))', 'def inverter_texto(s):\n    return s[::-1]\n\nprint(inverter_texto("python"))', ['string', 'fatiamento', 'invertido'], 'nohtyp'),
    build_code('contar-vogais', 'Contar vogais', 'Strings', 'fácil', 10, 'strings', 'Escreva contar_vogais(s) para devolver quantas vogais existem na palavra. Exemplo: contar_vogais("banana") -> 3.', 'def contar_vogais(s):\n    return 0\n\nprint(contar_vogais("banana"))', 'def contar_vogais(s):\n    return sum(1 for letra in s.lower() if letra in "aeiou")\n\nprint(contar_vogais("banana"))', ['vogais', 'string', 'contagem'], '3'),
    build_bug('loop-contar-ate-5', 'Corrigir loop', 'Loops', 'fácil', 10, 'loops', 'Corrija a condição para contar de 1 a 5 sem travar o programa.', 'contador = 1\nwhile contador <= 5:\n    print(contador)\n    contador = contador + 1', 'contador = 1\nwhile contador <= 5:\n    print(contador)\n    contador = contador + 1', ['loop', 'while', 'contador'], '1\n2\n3\n4\n5'),
    build_code('maior-de-tres', 'Maior de três', 'Condicionais', 'fácil', 10, 'condicionais', 'Implemente maior_de_tres(a, b, c) sem usar max(). Exemplo: maior_de_tres(6, 9, 4) -> 9.', 'def maior_de_tres(a, b, c):\n    return 0\n\nprint(maior_de_tres(6, 9, 4))', 'def maior_de_tres(a, b, c):\n    maior = a\n    if b > maior:\n        maior = b\n    if c > maior:\n        maior = c\n    return maior\n\nprint(maior_de_tres(6, 9, 4))', ['comparação', 'condição', 'máximo'], '9'),
    build_choice('lista-funcao', 'Lista dentro de função', 'Listas', 'fácil', 10, 'listas', 'O que acontece ao modificar uma lista dentro de uma função?', 'def adicionar_item(valor, itens):\n    itens.append(valor)\n\nlista = [1, 2]\nadicionar_item(3, lista)\nprint(lista)', [{'texto': 'A lista original é modificada.', 'correta': True, 'explicacao': 'Listas são mutáveis e a função recebe a mesma referência.'}, {'texto': 'A lista original não muda.', 'correta': False, 'explicacao': 'Isso só acontece com objetos imutáveis.'}, {'texto': 'A função cria uma cópia automática.', 'correta': False, 'explicacao': 'Python não cria cópia automática de listas.'}, {'texto': 'O código gera erro.', 'correta': False, 'explicacao': 'append em lista é uma operação válida.'}], ['lista', 'referência', 'mutável']),
    build_code('soma-lista', 'Soma da lista', 'Listas', 'fácil', 10, 'listas', 'Escreva soma_lista(numeros) sem usar sum(). Exemplo: soma_lista([2, 4, 6]) -> 12.', 'def soma_lista(numeros):\n    return 0\n\nprint(soma_lista([2, 4, 6]))', 'def soma_lista(numeros):\n    total = 0\n    for numero in numeros:\n        total += numero\n    return total\n\nprint(soma_lista([2, 4, 6]))', ['lista', 'loop', 'soma'], '12'),
    build_sort('positivo-negativo-zero', 'Positivo, negativo ou zero', 'Condicionais', 'fácil', 10, 'condicionais', 'Ordene as linhas para ler um número e informar se ele é positivo, negativo ou zero.', ['numero = int(input("Digite um número: "))', 'if numero > 0:', '    print("positivo")', 'elif numero < 0:', '    print("negativo")', 'else:', '    print("zero")'], ['numero = int(input("Digite um número: "))', 'if numero > 0:', '    print("positivo")', 'elif numero < 0:', '    print("negativo")', 'else:', '    print("zero")'], ['condição', 'entrada', 'fluxo']),
    build_code('tabuada', 'Tabuada', 'Loops', 'fácil', 10, 'loops', 'Crie tabuada(n) para devolver resultados de n*1 até n*10. Exemplo: tabuada(3) -> [3, 6, 9, 12, 15, 18, 21, 24, 27, 30].', 'def tabuada(n):\n    return []\n\nprint(tabuada(3))', 'def tabuada(n):\n    return [n * i for i in range(1, 11)]\n\nprint(tabuada(3))', ['tabuada', 'lista', 'loop'], '[3, 6, 9, 12, 15, 18, 21, 24, 27, 30]'),
    build_code('celsius-para-fahrenheit', 'Converter para Fahrenheit', 'Funções', 'fácil', 10, 'funcoes', 'Crie celsius_para_fahrenheit(c) com a fórmula (c * 9/5) + 32. Exemplo: 0 -> 32.0.', 'def celsius_para_fahrenheit(c):\n    return 0\n\nprint(celsius_para_fahrenheit(0))', 'def celsius_para_fahrenheit(c):\n    return (c * 9 / 5) + 32\n\nprint(celsius_para_fahrenheit(0))', ['temperatura', 'conversão', 'matemática'], '32.0'),
    build_code('remover-duplicatas', 'Remover duplicatas', 'Listas', 'fácil', 10, 'listas', 'Escreva remover_duplicatas(lista) preservando a ordem. Exemplo: remover_duplicatas([3, 1, 3, 2, 1]) -> [3, 1, 2].', 'def remover_duplicatas(lista):\n    return []\n\nprint(remover_duplicatas([3, 1, 3, 2, 1]))', 'def remover_duplicatas(lista):\n    resultado = []\n    for item in lista:\n        if item not in resultado:\n            resultado.append(item)\n    return resultado\n\nprint(remover_duplicatas([3, 1, 3, 2, 1]))', ['lista', 'duplicata', 'ordem'], '[3, 1, 2]'),
    build_code('eh-palindromo', 'Palíndromo', 'Strings', 'médio', 20, 'strings', 'Crie eh_palindromo(texto) ignorando espaços e maiúsculas. Exemplo: eh_palindromo("Ame a ema") -> True.', 'def eh_palindromo(texto):\n    return False\n\nprint(eh_palindromo("Ame a ema"))', 'def eh_palindromo(texto):\n    texto_limpo = "".join(letra.lower() for letra in texto if letra != " ")\n    return texto_limpo == texto_limpo[::-1]\n\nprint(eh_palindromo("Ame a ema"))', ['palíndromo', 'string', 'comparação'], 'True'),
    build_code('fizzbuzz', 'FizzBuzz', 'Loops', 'médio', 20, 'loops', 'Implemente fizzbuzz(n) para retornar uma lista de 1 até n com Fizz, Buzz e FizzBuzz.', 'def fizzbuzz(n):\n    return []\n\nprint(fizzbuzz(15))', 'def fizzbuzz(n):\n    resultado = []\n    for numero in range(1, n + 1):\n        if numero % 3 == 0 and numero % 5 == 0:\n            resultado.append("FizzBuzz")\n        elif numero % 3 == 0:\n            resultado.append("Fizz")\n        elif numero % 5 == 0:\n            resultado.append("Buzz")\n        else:\n            resultado.append(numero)\n    return resultado\n\nprint(fizzbuzz(15))', ['lógica', 'lista', 'loop'], "[1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']"),
    build_code('contar-palavras', 'Contar palavras', 'Dicionários', 'médio', 20, 'dicionarios', 'Crie contar_palavras(frase) para devolver um dicionário palavra -> quantidade. Exemplo: contar_palavras("um dois um") -> {"um": 2, "dois": 1}.', 'def contar_palavras(frase):\n    return {}\n\nprint(contar_palavras("um dois um"))', 'def contar_palavras(frase):\n    palavras = frase.lower().split()\n    contador = {}\n    for palavra in palavras:\n        contador[palavra] = contador.get(palavra, 0) + 1\n    return contador\n\nprint(contar_palavras("um dois um"))', ['dicionário', 'texto', 'frequência'], "{'um': 2, 'dois': 1}"),
    build_bug('arg-mutavel', 'Parâmetro mutável', 'Funções', 'médio', 20, 'funcoes-avancadas', 'Corrija a função que usa uma lista como argumento padrão e acumula dados entre chamadas.', 'def registrar(nome, itens=[]):\n    itens.append(nome)\n    return itens\n\nprint(registrar("Ana"))', 'def registrar(nome, itens=None):\n    if itens is None:\n        itens = []\n    itens.append(nome)\n    return itens\n\nprint(registrar("Ana"))', ['argumento', 'lista', 'mutável'], "['Ana']"),
    build_code('fibonacci', 'Fibonacci', 'Loops', 'médio', 20, 'iteradores-e-geradores', 'Crie fibonacci(n) para devolver os n primeiros termos da sequência. Exemplo: fibonacci(5) -> [0, 1, 1, 2, 3].', 'def fibonacci(n):\n    return []\n\nprint(fibonacci(5))', 'def fibonacci(n):\n    sequencia = []\n    a, b = 0, 1\n    for _ in range(n):\n        sequencia.append(a)\n        a, b = b, a + b\n    return sequencia\n\nprint(fibonacci(5))', ['sequência', 'lista', 'matemática'], '[0, 1, 1, 2, 3]'),
    build_code('numeros-primos', 'Números primos', 'Loops', 'médio', 20, 'loops', 'Implemente numeros_primos(limite) para devolver os primos até o limite. Exemplo: numeros_primos(10) -> [2, 3, 5, 7].', 'def numeros_primos(limite):\n    return []\n\nprint(numeros_primos(10))', 'def numeros_primos(limite):\n    primos = []\n    for numero in range(2, limite + 1):\n        eh_primo = True\n        for divisor in range(2, int(numero ** 0.5) + 1):\n            if numero % divisor == 0:\n                eh_primo = False\n                break\n        if eh_primo:\n            primos.append(numero)\n    return primos\n\nprint(numeros_primos(10))', ['primos', 'loop', 'matemática'], '[2, 3, 5, 7]'),
    build_code('agrupar-por-tamanho', 'Agrupar por tamanho', 'Dicionários', 'médio', 20, 'dicionarios', 'Crie agrupar_por_tamanho(palavras) para agrupar por tamanho da palavra. Exemplo: agrupar_por_tamanho(["lua", "sol", "casa"]) -> {3: ["lua", "sol"], 4: ["casa"]}.', 'def agrupar_por_tamanho(palavras):\n    return {}\n\nprint(agrupar_por_tamanho(["lua", "sol", "casa"]))', 'def agrupar_por_tamanho(palavras):\n    grupos = {}\n    for palavra in palavras:\n        grupos.setdefault(len(palavra), []).append(palavra)\n    return grupos\n\nprint(agrupar_por_tamanho(["lua", "sol", "casa"]))', ['dicionário', 'lista', 'tamanho'], "{3: ['lua', 'sol'], 4: ['casa']}"),
    build_fill('quadrados-pares', 'Quadrados dos pares', 'Comprehensions', 'médio', 20, 'comprehensions', 'Complete a list comprehension para gerar os quadrados dos pares de 1 a 20.', 'quadrados = [x ** 2 for x in range(1, 21) if x % 2 == 0]\nprint(quadrados)', 'quadrados = [x ** 2 for x in range(1, 21) if x % 2 == 0]\nprint(quadrados)', ['comprehension', 'lista', 'pares'], '[4, 16, 36, 64, 100, 144, 196, 256, 324, 400]'),
    build_code('interseccao-ordenada', 'Interseção ordenada', 'Sets', 'médio', 20, 'sets', 'Crie interseccao(a, b) usando sets e devolva uma lista ordenada. Exemplo: interseccao([5, 1, 8], [8, 1, 3]) -> [1, 8].', 'def interseccao(a, b):\n    return []\n\nprint(interseccao([5, 1, 8], [8, 1, 3]))', 'def interseccao(a, b):\n    return sorted(set(a) & set(b))\n\nprint(interseccao([5, 1, 8], [8, 1, 3]))', ['set', 'lista', 'ordenação'], '[1, 8]'),
    build_code('validar-senha', 'Validar senha', 'Strings', 'médio', 20, 'strings', 'Crie validar_senha(s) para checar se a senha tem 8+ caracteres, maiúscula, minúscula e dígito.', 'def validar_senha(s):\n    return False\n\nprint(validar_senha("Abc12345"))', 'def validar_senha(s):\n    if len(s) < 8:\n        return False\n    return any(letra.isupper() for letra in s) and any(letra.islower() for letra in s) and any(letra.isdigit() for letra in s)\n\nprint(validar_senha("Abc12345"))', ['senha', 'validação', 'string'], 'True'),
    build_prediction('closure-contador', 'Closure contador', 'Escopo', 'médio', 20, 'escopo', 'Qual será a saída do código abaixo?', 'def contador():\n    total = 0\n    def adicionar():\n        nonlocal total\n        total += 1\n        return total\n    return adicionar\n\ninc = contador()\nprint(inc())\nprint(inc())\nprint(inc())', '1\n2\n3', ['closure', 'escopo', 'nonlocal']),
    build_code('dividir-seguro', 'Divisão segura', 'Exceções', 'médio', 20, 'excecoes', 'Implemente dividir_seguro(a, b) tratanto ZeroDivisionError e TypeError com mensagens úteis.', 'def dividir_seguro(a, b):\n    return 0\n\nprint(dividir_seguro(10, 2))', 'def dividir_seguro(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Erro: divisão por zero."\n    except TypeError:\n        return "Erro: use números válidos."\n\nprint(dividir_seguro(10, 2))', ['exceção', 'divisão', 'tratamento'], '5.0'),
    build_code('rotacionar-direita', 'Rotação à direita', 'Listas', 'médio', 20, 'listas', 'Crie rotacionar(lista, k) para deslocar os itens para a direita. Exemplo: rotacionar([1, 2, 3, 4], 2) -> [3, 4, 1, 2].', 'def rotacionar(lista, k):\n    return []\n\nprint(rotacionar([1, 2, 3, 4], 2))', 'def rotacionar(lista, k):\n    k = k % len(lista)\n    return lista[-k:] + lista[:-k] if k else lista[:]\n\nprint(rotacionar([1, 2, 3, 4], 2))', ['lista', 'rotação', 'deslocamento'], '[3, 4, 1, 2]'),
    build_code('ordenar-por-nota', 'Ordenar alunos', 'Listas', 'médio', 20, 'dicionarios', 'Crie ordenar_por_nota(alunos) para ordenar por nota descendente e nome ascendente.', 'def ordenar_por_nota(alunos):\n    return []\n\nprint(ordenar_por_nota([("Ana", 7), ("Beto", 9), ("Caio", 9)]))', 'def ordenar_por_nota(alunos):\n    return sorted(alunos, key=lambda item: (-item[1], item[0]))\n\nprint(ordenar_por_nota([("Ana", 7), ("Beto", 9), ("Caio", 9)]))', ['ordenação', 'tupla', 'lista'], "[('Beto', 9), ('Caio', 9), ('Ana', 7)]"),
    build_sort('gerenciador-arquivos', 'Gerenciador de arquivos', 'Arquivos', 'médio', 20, 'arquivos', 'Ordene as linhas para abrir um arquivo e tratar a ausência do arquivo.', ['try:', '    with open("dados.txt", "r", encoding="utf-8") as arquivo:', '        print(arquivo.read())', 'except FileNotFoundError:', '    print("Arquivo não encontrado")'], ['try:', '    with open("dados.txt", "r", encoding="utf-8") as arquivo:', '        print(arquivo.read())', 'except FileNotFoundError:', '    print("Arquivo não encontrado")'], ['arquivo', 'with', 'tratamento']),
    build_code('conta-bancaria', 'Conta bancária', 'POO', 'médio', 20, 'classes-e-objetos', 'Crie a classe ContaBancaria com depositar, sacar e extrato. Se o saque exceder o saldo, levante ValueError.', 'class ContaBancaria:\n    def __init__(self, saldo=0):\n        self.saldo = saldo\n\n    def depositar(self, valor):\n        pass\n\n    def sacar(self, valor):\n        pass\n\n    def extrato(self):\n        return self.saldo\n\nconta = ContaBancaria(50)\nconta.depositar(50)\nconta.sacar(30)\nprint(conta.extrato())', 'class ContaBancaria:\n    def __init__(self, saldo=0):\n        self.saldo = saldo\n\n    def depositar(self, valor):\n        self.saldo += valor\n\n    def sacar(self, valor):\n        if valor > self.saldo:\n            raise ValueError("Saldo insuficiente")\n        self.saldo -= valor\n\n    def extrato(self):\n        return self.saldo\n\nconta = ContaBancaria(50)\nconta.depositar(50)\nconta.sacar(30)\nprint(conta.extrato())', ['poo', 'saldo', 'classe'], '70'),
    build_code('retangulo', 'Retângulo', 'POO', 'médio', 20, 'classes-e-objetos', 'Crie a classe Retangulo com __str__, __eq__ e propriedade area.', 'class Retangulo:\n    def __init__(self, largura, altura):\n        self.largura = largura\n        self.altura = altura\n\n    @property\n    def area(self):\n        return 0\n\n    def __str__(self):\n        return ""\n\n    def __eq__(self, outro):\n        return False\n\nprint(Retangulo(2, 3).area)\nprint(Retangulo(2, 3))', 'class Retangulo:\n    def __init__(self, largura, altura):\n        self.largura = largura\n        self.altura = altura\n\n    @property\n    def area(self):\n        return self.largura * self.altura\n\n    def __str__(self):\n        return f"Retangulo({self.largura}, {self.altura})"\n\n    def __eq__(self, outro):\n        return isinstance(outro, Retangulo) and self.largura == outro.largura and self.altura == outro.altura\n\nprint(Retangulo(2, 3).area)\nprint(Retangulo(2, 3))', ['poo', 'propriedade', 'comparação'], '6\nRetangulo(2, 3)'),
    build_code('contagem-regressiva', 'Contagem regressiva', 'Geradores', 'médio', 20, 'iteradores-e-geradores', 'Crie um gerador contagem_regressiva(n) com yield. Exemplo: list(contagem_regressiva(3)) -> [3, 2, 1].', 'def contagem_regressiva(n):\n    yield 0\n\nprint(list(contagem_regressiva(3)))', 'def contagem_regressiva(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(contagem_regressiva(3)))', ['yield', 'gerador', 'contador'], '[3, 2, 1]'),
    build_choice('is-vs-igualdade', 'Diferença entre is e ==', 'Objetos', 'médio', 20, 'metodos-especiais', 'Qual afirmação está correta?', 'a = [1, 2]\nb = [1, 2]\nprint(a == b)\nprint(a is b)', [{'texto': '== compara valor; is compara identidade.', 'correta': True, 'explicacao': '== usa __eq__ e is compara se duas variáveis apontam para o mesmo objeto.'}, {'texto': '== compara identidade; is compara valor.', 'correta': False, 'explicacao': 'Essa ordem está invertida.'}, {'texto': 'Ambos comparam apenas endereço de memória.', 'correta': False, 'explicacao': '== geralmente compara conteúdo.'}, {'texto': 'A expressão sempre é False.', 'correta': False, 'explicacao': 'Listas com mesmo conteúdo retornam True em ==.'}], ['objetos', 'comparação', 'identidade']),
    build_code('flatten', 'Achatar lista', 'Listas', 'médio', 20, 'listas', 'Crie flatten(lista_aninhada) para achatar até 2 níveis. Exemplo: flatten([[1, 2], [3, 4]]) -> [1, 2, 3, 4].', 'def flatten(lista_aninhada):\n    return []\n\nprint(flatten([[1, 2], [3, 4]]))', 'def flatten(lista_aninhada):\n    resultado = []\n    for item in lista_aninhada:\n        if isinstance(item, list):\n            resultado.extend(item)\n        else:\n            resultado.append(item)\n    return resultado\n\nprint(flatten([[1, 2], [3, 4]]))', ['lista', 'aninhada', 'flatten'], '[1, 2, 3, 4]'),
    build_code('anagramas', 'Anagramas', 'Dicionários', 'difícil', 40, 'dicionarios', 'Implemente anagramas(palavras) para agrupar palavras que são anagramas.', 'def anagramas(palavras):\n    return []\n\nprint(anagramas(["amor", "roma", "mora", "casa"]))', 'def anagramas(palavras):\n    grupos = {}\n    for palavra in palavras:\n        chave = "".join(sorted(palavra.lower()))\n        grupos.setdefault(chave, []).append(palavra)\n    return list(grupos.values())\n\nprint(anagramas(["amor", "roma", "mora", "casa"]))', ['anagrama', 'dicionário', 'agrupamento'], "[['amor', 'roma', 'mora'], ['casa']]"),
    build_code('parenteses-balanceados', 'Parênteses balanceados', 'Estruturas de dados', 'difícil', 40, 'strings', 'Crie parenteses_balanceados(s) para validar () [] {} com pilha.', 'def parenteses_balanceados(s):\n    return False\n\nprint(parenteses_balanceados("{[()]}"))', 'def parenteses_balanceados(s):\n    pares = {"}": "{", ")": "(", "]": "["}\n    pilha = []\n    for caractere in s:\n        if caractere in "([{":\n            pilha.append(caractere)\n        elif caractere in ")]}":\n            if not pilha or pilha.pop() != pares[caractere]:\n                return False\n    return not pilha\n\nprint(parenteses_balanceados("{[()]}"))', ['pilha', 'validação', 'parênteses'], 'True'),
    build_code('cronometro', 'Decorador cronômetro', 'Decoradores', 'difícil', 40, 'decoradores', 'Crie um decorador cronometro que mede o tempo de execução de uma função.', 'import time\n\ndef cronometro(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@cronometro\ndef saudacao():\n    return "ok"\n\nprint(saudacao())', 'import time\n\ndef cronometro(func):\n    def wrapper(*args, **kwargs):\n        inicio = time.perf_counter()\n        resultado = func(*args, **kwargs)\n        fim = time.perf_counter()\n        print(f"Tempo: {fim - inicio:.6f}s")\n        return resultado\n    return wrapper\n\n@cronometro\ndef saudacao():\n    return "ok"\n\nprint(saudacao())', ['decorador', 'tempo', 'função'], 'ok'),
    build_code('cache-simples', 'Cache simples', 'Memoização', 'difícil', 40, 'decoradores', 'Crie um decorador cache_simples para memoizar resultados e testar fibonacci recursivo.', 'def cache_simples(func):\n    return func\n\n@cache_simples\ndef fibonacci(n):\n    if n < 2:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(7))', 'def cache_simples(func):\n    cache = {}\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper\n\n@cache_simples\ndef fibonacci(n):\n    if n < 2:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(7))', ['memoização', 'decorador', 'cache'], '13'),
    build_code('fila', 'Classe Fila', 'POO', 'difícil', 40, 'classes-e-objetos', 'Crie a classe Fila com __len__, __iter__ e __bool__.', 'class Fila:\n    def __init__(self, itens=None):\n        self.itens = itens or []\n\n    def __len__(self):\n        return 0\n\n    def __iter__(self):\n        return iter(self.itens)\n\n    def __bool__(self):\n        return False\n\nfilas = Fila([1, 2])\nprint(len(filas))\nprint(bool(filas))', 'class Fila:\n    def __init__(self, itens=None):\n        self.itens = itens or []\n\n    def __len__(self):\n        return len(self.itens)\n\n    def __iter__(self):\n        return iter(self.itens)\n\n    def __bool__(self):\n        return bool(self.itens)\n\nfilas = Fila([1, 2])\nprint(len(filas))\nprint(bool(filas))', ['classe', 'iterável', 'bool'], '2\nTrue'),
    build_code('vetor2d', 'Vetor 2D', 'POO', 'difícil', 40, 'metodos-especiais', 'Crie a classe Vetor2D com operações de soma, subtração, multiplicação por escalar e módulo.', 'class Vetor2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, outro):\n        return self\n\n    def __sub__(self, outro):\n        return self\n\n    def __mul__(self, escalar):\n        return self\n\n    def __abs__(self):\n        return 0\n\n    def __repr__(self):\n        return str((self.x, self.y))\n\nprint(repr(Vetor2D(2, 3) + Vetor2D(1, 1)))\nprint(abs(Vetor2D(3, 4)))', 'class Vetor2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, outro):\n        return Vetor2D(self.x + outro.x, self.y + outro.y)\n\n    def __sub__(self, outro):\n        return Vetor2D(self.x - outro.x, self.y - outro.y)\n\n    def __mul__(self, escalar):\n        return Vetor2D(self.x * escalar, self.y * escalar)\n\n    def __abs__(self):\n        return (self.x ** 2 + self.y ** 2) ** 0.5\n\n    def __repr__(self):\n        return f"({self.x}, {self.y})"\n\nprint(repr(Vetor2D(2, 3) + Vetor2D(1, 1)))\nprint(abs(Vetor2D(3, 4)))', ['vetor', 'operação', 'poo'], '(3, 4)\n5.0'),
    build_code('merge-intervalos', 'Mesclar intervalos', 'Algoritmos', 'difícil', 40, 'listas', 'Implemente merge_intervalos(intervalos) para unir intervalos sobrepostos.', 'def merge_intervalos(intervalos):\n    return []\n\nprint(merge_intervalos([(1, 3), (2, 6), (8, 10)]))', 'def merge_intervalos(intervalos):\n    if not intervalos:\n        return []\n    ordenados = sorted(intervalos)\n    mesclados = [list(ordenados[0])]\n    for inicio, fim in ordenados[1:]:\n        if inicio <= mesclados[-1][1]:\n            mesclados[-1][1] = max(mesclados[-1][1], fim)\n        else:\n            mesclados.append([inicio, fim])\n    return [tuple(item) for item in mesclados]\n\nprint(merge_intervalos([(1, 3), (2, 6), (8, 10)]))', ['intervalo', 'algoritmo', 'lista'], '[(1, 6), (8, 10)]'),
    build_code('romano-para-inteiro', 'Números romanos', 'Strings', 'difícil', 40, 'strings', 'Crie romano_para_inteiro(s) e inteiro_para_romano(n) para converter entre sistemas.', 'def romano_para_inteiro(s):\n    return 0\n\ndef inteiro_para_romano(n):\n    return ""\n\nprint(romano_para_inteiro("XIV"))', 'valores = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}\n\ndef romano_para_inteiro(s):\n    total = 0\n    for i, simbolo in enumerate(s):\n        if i + 1 < len(s) and valores[simbolo] < valores[s[i + 1]]:\n            total -= valores[simbolo]\n        else:\n            total += valores[simbolo]\n    return total\n\ndef inteiro_para_romano(n):\n    mapa = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"), (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]\n    romano = ""\n    for valor, simbolo in mapa:\n        while n >= valor:\n            romano += simbolo\n            n -= valor\n    return romano\n\nprint(romano_para_inteiro("XIV"))', ['romano', 'conversão', 'algoritmo'], '14'),
    build_code('primos-infinito', 'Gerador infinito', 'Geradores', 'difícil', 40, 'iteradores-e-geradores', 'Crie um gerador primos() infinito e use itertools.islice nos testes.', 'import itertools\n\ndef primos():\n    yield 2\n\nprint(list(itertools.islice(primos(), 5)))', 'import itertools\n\ndef primos():\n    numero = 2\n    while True:\n        eh_primo = True\n        for divisor in range(2, int(numero ** 0.5) + 1):\n            if numero % divisor == 0:\n                eh_primo = False\n                break\n        if eh_primo:\n            yield numero\n        numero += 1\n\nprint(list(itertools.islice(primos(), 5)))', ['gerador', 'primos', 'itertools'], '[2, 3, 5, 7, 11]'),
    build_code('temporizador', 'Temporizador', 'Context managers', 'difícil', 40, 'context-managers', 'Crie a classe Temporizador com __enter__ e __exit__.', 'class Temporizador:\n    def __enter__(self):\n        return self\n\n    def __exit__(self, exc_type, exc, tb):\n        return False\n\nwith Temporizador() as t:\n    print("inicio")', 'class Temporizador:\n    def __enter__(self):\n        import time\n        self.inicio = time.perf_counter()\n        return self\n\n    def __exit__(self, exc_type, exc, tb):\n        import time\n        self.tempo = time.perf_counter() - self.inicio\n        print(f"Tempo: {self.tempo:.6f}s")\n        return False\n\nwith Temporizador() as t:\n    print("inicio")', ['contexto', 'tempo', 'with'], 'inicio'),
    build_bug('deepcopy', 'Cópia rasa', 'Listas', 'difícil', 40, 'listas', 'Corrija a cópia rasa de lista aninhada usando deepcopy.', 'from copy import deepcopy\n\nlista = [[1, 2], [3, 4]]\ncopia = lista\ncopia[0].append(9)\nprint(lista)', 'from copy import deepcopy\n\nlista = [[1, 2], [3, 4]]\ncopia = deepcopy(lista)\ncopia[0].append(9)\nprint(lista)\nprint(copia)', ['deepcopy', 'copiar', 'listas'], '[[1, 2], [3, 4]]'),
    build_code('top-n-palavras', 'Top N palavras', 'Contadores', 'difícil', 40, 'dicionarios', 'Crie top_n_palavras(texto, n) usando Counter e desempate alfabético.', 'from collections import Counter\n\ndef top_n_palavras(texto, n):\n    return []\n\nprint(top_n_palavras("um dois um tres trei tres", 2))', 'from collections import Counter\n\ndef top_n_palavras(texto, n):\n    frequencia = Counter(texto.lower().split())\n    return sorted(frequencia.items(), key=lambda item: (-item[1], item[0]))[:n]\n\nprint(top_n_palavras("um dois um tres trei tres", 2))', ['Counter', 'frequência', 'texto'], "[('tres', 2), ('um', 2)]"),
    build_code('calculadora', 'Calculadora sem eval', 'Algoritmos', 'difícil', 40, 'operadores', 'Crie calculadora(expressao) sem usar eval, resolvendo expressões simples como 3 + 4 * 2.', 'def calculadora(expressao):\n    return 0\n\nprint(calculadora("3 + 4 * 2"))', 'def calculadora(expressao):\n    tokens = expressao.replace(" ", "")\n    numero = 0\n    operador = "+"\n    for token in tokens:\n        if token in "+-*/":\n            operador = token\n        else:\n            valor = int(token)\n            if operador == "+":\n                numero += valor\n            elif operador == "-":\n                numero -= valor\n            elif operador == "*":\n                numero *= valor\n            elif operador == "/":\n                numero /= valor\n    return numero\n\nprint(calculadora("3 + 4 * 2"))', ['calculadora', 'expressão', 'algoritmo'], '11'),
    build_code('produto-dataclass', 'Dataclass Produto', 'Dataclasses', 'difícil', 40, 'dataclasses-e-enums', 'Crie Produto com dataclass, validação em __post_init__ e ordenação por preço.', 'from dataclasses import dataclass\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n    quantidade: int\n\n    def __post_init__(self):\n        pass\n\nproduto = Produto("Mouse", 50, 2)\nprint(produto.preco)', 'from dataclasses import dataclass\n\n@dataclass(order=True)\nclass Produto:\n    nome: str\n    preco: float\n    quantidade: int\n\n    def __post_init__(self):\n        if self.preco <= 0:\n            raise ValueError("Preço deve ser maior que zero")\n        if self.quantidade < 0:\n            raise ValueError("Quantidade não pode ser negativa")\n\nproduto = Produto("Mouse", 50, 2)\nprint(produto.preco)', ['dataclass', 'validação', 'ordenação'], '50'),
    build_code('forca', 'Jogo da forca', 'Funções', 'difícil', 40, 'projeto-final', 'Crie a função jogo_da_forca(palavra, tentativas) que devolve máscara, vidas, venceu e perdeu.', 'def jogo_da_forca(palavra, tentativas):\n    return {"mascara": "", "vidas": 0, "venceu": False, "perdeu": False}\n\nprint(jogo_da_forca("python", ["p", "y"]))', 'def jogo_da_forca(palavra, tentativas):\n    letras_descobertas = set()\n    for letra in tentativas:\n        if letra in palavra:\n            letras_descobertas.add(letra)\n    mascara = "".join(letra if letra in letras_descobertas else "_" for letra in palavra)\n    vidas = 6 - sum(1 for letra in tentativas if letra not in palavra)\n    return {"mascara": mascara, "vidas": max(0, vidas), "venceu": mascara == palavra, "perdeu": vidas <= 0}\n\nprint(jogo_da_forca("python", ["p", "y"]))', ['jogo', 'estado', 'função'], "{'mascara': 'py_____', 'vidas': 6, 'venceu': False, 'perdeu': False}"),
]

for exercise in items:
    (EXERCISES_DIR / f"{exercise['id']}.json").write_text(json.dumps(exercise, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

mini_projects = [
    ('agenda-de-contatos', 'Agenda de contatos', 'Crie uma agenda com dicionários, busca e persistência em JSON.', ['Use um dicionário para cada contato.', 'Permita adicionar, listar e buscar contatos.', 'Salve os dados em JSON para manter a agenda persistente.']),
    ('jogo-de-adivinhacao', 'Jogo de adivinhação', 'Crie um jogo que sorteia um número e dá dicas ao jogador.', ['Use random.randint para gerar um número.', 'Compare a tentativa do jogador com o valor sorteado.', 'Acumule tentativas e termine quando o jogador acertar.']),
    ('conversor-de-moedas', 'Conversor de moedas', 'Crie conversões entre moedas com tratamento de erro.', ['Valide se o valor informado é numérico.', 'Trate exceções com mensagens claras.', 'Mostre o valor convertido em um formato legível.']),
    ('analise-de-notas', 'Analisador de notas', 'Calcule média, mediana, maior e menor nota da turma.', ['Receba uma lista de notas', 'Organize a lógica em funções pequenas.', 'Mostre todos os resultados em uma saída clara.'])
]

for slug, title, description, checklist in mini_projects:
    mdx = f'''---
title: "{title}"
description: "{description}"
---

# {title}

## Objetivo
{description}

## Checklist de autoavaliação
- [ ] O programa aceita entradas do usuário corretamente.
- [ ] As funções principais estão organizadas por responsabilidade.
- [ ] A saída final é legível e útil.
- [ ] Os erros de entrada são tratados com mensagens claras.

## Dicas
{chr(10).join(f'- {item}' for item in checklist)}
'''
    (MINI_DIR / f'{slug}.mdx').write_text(mdx, encoding='utf-8')

print(f'Gerados {len(items)} exercícios em {EXERCISES_DIR}')
print(f'Gerados {len(mini_projects)} mini-projetos em {MINI_DIR}')
