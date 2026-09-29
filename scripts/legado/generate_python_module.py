from pathlib import Path

root = Path(__file__).resolve().parent.parent
lesson_root = root / 'src' / 'modules' / 'python' / 'lessons'
lesson_root.mkdir(parents=True, exist_ok=True)

lessons = [
    {'id': 'o-que-e-python', 'title': 'O que é Python e para que serve', 'section': 'Primeiros passos', 'tempo': 8, 'level': 'iniciante', 'keywords': ['python', 'uso', 'aplicações', 'iniciante'], 'exercises': ['hello-world']},
    {'id': 'instalando-e-rodando', 'title': 'Instalando e rodando Python', 'section': 'Primeiros passos', 'tempo': 10, 'level': 'iniciante', 'keywords': ['python', 'terminal', 'vscode', 'instalação'], 'exercises': ['hello-world']},
    {'id': 'sintaxe-basica', 'title': 'Sintaxe básica do Python', 'section': 'Primeiros passos', 'tempo': 9, 'level': 'iniciante', 'keywords': ['sintaxe', 'indentação', 'comentários', 'python'], 'exercises': ['hello-world']},
    {'id': 'variaveis-e-tipos', 'title': 'Variáveis e tipos', 'section': 'Fundamentos', 'tempo': 10, 'level': 'iniciante', 'keywords': ['variáveis', 'tipos', 'int', 'float'], 'exercises': ['hello-world']},
    {'id': 'operadores', 'title': 'Operadores', 'section': 'Fundamentos', 'tempo': 10, 'level': 'iniciante', 'keywords': ['operadores', 'aritmética', 'comparação', 'lógicos'], 'exercises': ['soma-rapida']},
    {'id': 'strings', 'title': 'Strings', 'section': 'Fundamentos', 'tempo': 12, 'level': 'iniciante', 'keywords': ['strings', 'texto', 'fatiamento', 'formatação'], 'exercises': ['hello-world']},
    {'id': 'entrada-e-saida', 'title': 'Entrada e saída', 'section': 'Fundamentos', 'tempo': 10, 'level': 'iniciante', 'keywords': ['input', 'print', 'dados', 'saída'], 'exercises': ['soma-rapida']},
    {'id': 'condicionais', 'title': 'Condicionais', 'section': 'Fundamentos', 'tempo': 11, 'level': 'iniciante', 'keywords': ['if', 'elif', 'else', 'condições'], 'exercises': ['corrigir-idade']},
    {'id': 'loops', 'title': 'Loops', 'section': 'Fundamentos', 'tempo': 12, 'level': 'iniciante', 'keywords': ['loop', 'for', 'while', 'repetição'], 'exercises': ['ordem-prints']},
    {'id': 'listas', 'title': 'Listas', 'section': 'Estruturas de dados', 'tempo': 12, 'level': 'iniciante', 'keywords': ['lista', 'append', 'indexação', 'coleção'], 'exercises': ['lista-valor']},
    {'id': 'tuplas', 'title': 'Tuplas', 'section': 'Estruturas de dados', 'tempo': 8, 'level': 'iniciante', 'keywords': ['tupla', 'imutável', 'desempacotamento'], 'exercises': ['lista-valor']},
    {'id': 'sets', 'title': 'Sets', 'section': 'Estruturas de dados', 'tempo': 8, 'level': 'intermediario', 'keywords': ['set', 'conjuntos', 'unicidade'], 'exercises': ['lista-valor']},
    {'id': 'dicionarios', 'title': 'Dicionários', 'section': 'Estruturas de dados', 'tempo': 12, 'level': 'iniciante', 'keywords': ['dict', 'chaves', 'valores', 'mapa'], 'exercises': ['lista-valor']},
    {'id': 'comprehensions', 'title': 'Comprehensions', 'section': 'Estruturas de dados', 'tempo': 10, 'level': 'intermediario', 'keywords': ['comprehension', 'lista', 'dicionário'], 'exercises': ['lista-valor']},
    {'id': 'funcoes', 'title': 'Funções', 'section': 'Funções e organização', 'tempo': 12, 'level': 'iniciante', 'keywords': ['função', 'def', 'retorno', 'parâmetros'], 'exercises': ['hello-world']},
    {'id': 'funcoes-avancadas', 'title': 'Funções avançadas', 'section': 'Funções e organização', 'tempo': 12, 'level': 'intermediario', 'keywords': ['args', 'kwargs', 'lambda', 'recursão'], 'exercises': ['hello-world']},
    {'id': 'escopo', 'title': 'Escopo', 'section': 'Funções e organização', 'tempo': 10, 'level': 'intermediario', 'keywords': ['escopo', 'global', 'local', 'LEGB'], 'exercises': ['corrigir-idade']},
    {'id': 'modulos-e-pacotes', 'title': 'Módulos e pacotes', 'section': 'Funções e organização', 'tempo': 11, 'level': 'intermediario', 'keywords': ['módulo', 'import', 'pacote', 'biblioteca'], 'exercises': ['hello-world']},
    {'id': 'arquivos', 'title': 'Arquivos', 'section': 'Trabalhando com o mundo real', 'tempo': 11, 'level': 'intermediario', 'keywords': ['arquivo', 'open', 'json', 'csv'], 'exercises': ['lista-valor']},
    {'id': 'excecoes', 'title': 'Exceções', 'section': 'Trabalhando com o mundo real', 'tempo': 10, 'level': 'intermediario', 'keywords': ['try', 'except', 'erro', 'exceção'], 'exercises': ['corrigir-idade']},
    {'id': 'datas-e-tempo', 'title': 'Datas e tempo', 'section': 'Trabalhando com o mundo real', 'tempo': 9, 'level': 'intermediario', 'keywords': ['datetime', 'tempo', 'data', 'timedelta'], 'exercises': ['lista-valor']},
    {'id': 'expressoes-regulares', 'title': 'Expressões regulares', 'section': 'Trabalhando com o mundo real', 'tempo': 10, 'level': 'intermediario', 'keywords': ['regex', 'texto', 'padronização'], 'exercises': ['lista-valor']},
    {'id': 'classes-e-objetos', 'title': 'Classes e objetos', 'section': 'Programação orientada a objetos', 'tempo': 11, 'level': 'intermediario', 'keywords': ['class', 'objeto', 'atributo', 'método'], 'exercises': ['corrigir-idade']},
    {'id': 'encapsulamento-e-propriedades', 'title': 'Encapsulamento e propriedades', 'section': 'Programação orientada a objetos', 'tempo': 10, 'level': 'intermediario', 'keywords': ['property', 'encapsulamento', 'privado'], 'exercises': ['corrigir-idade']},
    {'id': 'heranca-e-polimorfismo', 'title': 'Herança e polimorfismo', 'section': 'Programação orientada a objetos', 'tempo': 11, 'level': 'intermediario', 'keywords': ['herança', 'super', 'polimorfismo'], 'exercises': ['corrigir-idade']},
    {'id': 'metodos-especiais', 'title': 'Métodos especiais', 'section': 'Programação orientada a objetos', 'tempo': 10, 'level': 'intermediario', 'keywords': ['__str__', '__repr__', 'dunder'], 'exercises': ['lista-valor']},
    {'id': 'dataclasses-e-enums', 'title': 'Dataclasses e enums', 'section': 'Programação orientada a objetos', 'tempo': 9, 'level': 'intermediario', 'keywords': ['dataclass', 'enum', 'valor'], 'exercises': ['lista-valor']},
    {'id': 'classes-abstratas-e-protocolos', 'title': 'Classes abstratas e protocolos', 'section': 'Programação orientada a objetos', 'tempo': 9, 'level': 'intermediario', 'keywords': ['ABC', 'protocol', 'contrato'], 'exercises': ['corrigir-idade']},
    {'id': 'iteradores-e-geradores', 'title': 'Iteradores e geradores', 'section': 'Python intermediário e avançado', 'tempo': 10, 'level': 'intermediario', 'keywords': ['iterador', 'yield', 'gerador'], 'exercises': ['ordem-prints']},
    {'id': 'decoradores', 'title': 'Decoradores', 'section': 'Python intermediário e avançado', 'tempo': 10, 'level': 'intermediario', 'keywords': ['decorator', '@', 'função'], 'exercises': ['ordem-prints']},
    {'id': 'context-managers', 'title': 'Context managers', 'section': 'Python intermediário e avançado', 'tempo': 8, 'level': 'intermediario', 'keywords': ['with', 'context', 'recursos'], 'exercises': ['ordem-prints']},
    {'id': 'tipagem', 'title': 'Tipagem', 'section': 'Python intermediário e avançado', 'tempo': 9, 'level': 'intermediario', 'keywords': ['typing', 'tipos', 'annotations'], 'exercises': ['soma-rapida']},
    {'id': 'programacao-funcional', 'title': 'Programação funcional', 'section': 'Python intermediário e avançado', 'tempo': 10, 'level': 'intermediario', 'keywords': ['funcional', 'map', 'filter', 'reduce'], 'exercises': ['soma-rapida']},
    {'id': 'concorrencia', 'title': 'Concorrência', 'section': 'Python intermediário e avançado', 'tempo': 11, 'level': 'avancado', 'keywords': ['threading', 'asyncio', 'processos'], 'exercises': ['ordem-prints']},
    {'id': 'testes', 'title': 'Testes', 'section': 'Qualidade e boas práticas', 'tempo': 10, 'level': 'intermediario', 'keywords': ['testes', 'pytest', 'assert'], 'exercises': ['ordem-prints']},
    {'id': 'depuracao', 'title': 'Depuração', 'section': 'Qualidade e boas práticas', 'tempo': 9, 'level': 'intermediario', 'keywords': ['debug', 'traceback', 'logging'], 'exercises': ['corrigir-idade']},
    {'id': 'boas-praticas', 'title': 'Boas práticas', 'section': 'Qualidade e boas práticas', 'tempo': 9, 'level': 'intermediario', 'keywords': ['pep8', 'clareza', 'manutenção'], 'exercises': ['hello-world']},
    {'id': 'ambientes-e-projetos', 'title': 'Ambientes e projetos', 'section': 'Qualidade e boas práticas', 'tempo': 10, 'level': 'intermediario', 'keywords': ['venv', 'requirements', 'projeto'], 'exercises': ['hello-world']},
    {'id': 'projeto-final', 'title': 'Projeto final guiado', 'section': 'Qualidade e boas práticas', 'tempo': 15, 'level': 'avancado', 'keywords': ['projeto', 'persistência', 'json'], 'exercises': ['ordem-prints']},
]

sections = [
    {'id': 'primeiros-passos', 'title': 'Primeiros passos', 'lessons': ['o-que-e-python', 'instalando-e-rodando', 'sintaxe-basica']},
    {'id': 'fundamentos', 'title': 'Fundamentos', 'lessons': ['variaveis-e-tipos', 'operadores', 'strings', 'entrada-e-saida', 'condicionais', 'loops']},
    {'id': 'estruturas-de-dados', 'title': 'Estruturas de dados', 'lessons': ['listas', 'tuplas', 'sets', 'dicionarios', 'comprehensions']},
    {'id': 'funcoes-e-organizacao', 'title': 'Funções e organização', 'lessons': ['funcoes', 'funcoes-avancadas', 'escopo', 'modulos-e-pacotes']},
    {'id': 'mundo-real', 'title': 'Trabalhando com o mundo real', 'lessons': ['arquivos', 'excecoes', 'datas-e-tempo', 'expressoes-regulares']},
    {'id': 'poo', 'title': 'Programação orientada a objetos', 'lessons': ['classes-e-objetos', 'encapsulamento-e-propriedades', 'heranca-e-polimorfismo', 'metodos-especiais', 'dataclasses-e-enums', 'classes-abstratas-e-protocolos']},
    {'id': 'intermediario', 'title': 'Python intermediário e avançado', 'lessons': ['iteradores-e-geradores', 'decoradores', 'context-managers', 'tipagem', 'programacao-funcional', 'concorrencia']},
    {'id': 'qualidade', 'title': 'Qualidade e boas práticas', 'lessons': ['testes', 'depuracao', 'boas-praticas', 'ambientes-e-projetos', 'projeto-final']},
]

descriptions = {
    'o-que-e-python': 'Entenda por que Python é uma linguagem acessível, versátil e muito usada em automação, web e ciência de dados.',
    'instalando-e-rodando': 'Veja como instalar Python, abrir o terminal e executar seu primeiro código localmente.',
    'sintaxe-basica': 'Aprenda a sintaxe do Python com indentação, comentários e a estrutura mínima de um programa.',
    'variaveis-e-tipos': 'Descubra variáveis, tipos básicos e como armazenar informação com clareza.',
    'operadores': 'Use operadores matemáticos, lógicos e de comparação para construir expressões.',
    'strings': 'Manipule textos com concatenação, slicing e formatação.',
    'entrada-e-saida': 'Leia dados do usuário e imprima mensagens e resultados de forma legível.',
    'condicionais': 'Tome decisões em seu código com if, elif e else.',
    'loops': 'Repita trechos do código com loops de forma controlada.',
    'listas': 'Organize coleções ordenadas com listas e métodos essenciais.',
    'tuplas': 'Trabalhe com sequências imutáveis para dados fixos.',
    'sets': 'Use conjuntos para remover duplicatas e comparar grupos de dados.',
    'dicionarios': 'Agrupe dados em chave e valor para modelar estruturas reais.',
    'comprehensions': 'Crie listas e dicionários de maneira concisa e expressiva.',
    'funcoes': 'Organize seu código em blocos reutilizáveis com funções.',
    'funcoes-avancadas': 'Aprofunde o uso de argumentos variáveis, lambdas e recursão.',
    'escopo': 'Entenda como as variáveis são acessadas em diferentes blocos.',
    'modulos-e-pacotes': 'Reaproveite funcionalidades usando módulos e bibliotecas.',
    'arquivos': 'Leia, escreva e persista dados em arquivos reais.',
    'excecoes': 'Capture erros com segurança para deixar o código mais robusto.',
    'datas-e-tempo': 'Manipule datas, horários e intervalos de tempo.',
    'expressoes-regulares': 'Valide padrões em textos e extraia informações úteis.',
    'classes-e-objetos': 'Modela entidades e comportamentos com classes e objetos.',
    'encapsulamento-e-propriedades': 'Proteja o estado interno e exponha acesso controlado.',
    'heranca-e-polimorfismo': 'Reaproveite lógica e adapte comportamento por herança.',
    'metodos-especiais': 'Ajuste a representação de objetos com métodos especiais.',
    'dataclasses-e-enums': 'Crie estruturas mais claras com dataclasses e enumerações.',
    'classes-abstratas-e-protocolos': 'Defina contratos e interfaces para organizar código maior.',
    'iteradores-e-geradores': 'Use iteradores e geradores para trabalhar sob demanda.',
    'decoradores': 'Adicione comportamento extra a funções sem duplicar código.',
    'context-managers': 'Controle elementos de recursos com a sintaxe do with.',
    'tipagem': 'Comunique melhor o tipo de suas entradas e saídas com type hints.',
    'programacao-funcional': 'Aplique conceitos funcionais e transformações declarativas.',
    'concorrencia': 'Entenda threads, asyncio e processos em cenários distintos.',
    'testes': 'Valide o comportamento da sua aplicação com testes automatizados.',
    'depuracao': 'Leia tracebacks e use ferramentas de observação para corrigir problemas.',
    'boas-praticas': 'Escreva código mais legível, sustentável e fácil de manter.',
    'ambientes-e-projetos': 'Organize o projeto e isole dependências com ambientes virtuais.',
    'projeto-final': 'Integre vários conceitos em um projeto guiado de gerenciador de tarefas.',
}

examples = {
    'o-que-e-python': ['print("Olá, CodeTrilha!")', 'nome = "Ana"\nprint(f"Bem-vinda, {nome}!")', 'for area in ["web", "dados", "IA"]:\n    print(area)'],
    'instalando-e-rodando': ['python --version', 'print("Python instalado com sucesso")', 'valor = 2 + 2\nprint(valor)'],
    'sintaxe-basica': ['idade = 18\nif idade >= 18:\n    print("Maior de idade")', 'nome = "Maria"\nprint(nome)', 'for numero in range(3):\n    print(numero)'],
    'variaveis-e-tipos': ['idade = 28\nprint(type(idade))', 'nome = "João"\npeso = 72.5\nprint(nome, peso)', 'ativo = True\nprint(type(ativo))'],
    'operadores': ['print(10 + 3)', 'print(10 > 3 and 5 < 9)', 'resultado = (2 + 3) * 4\nprint(resultado)'],
    'strings': ['texto = "CodeTrilha"\nprint(texto[0])', 'nome = "Ana"\nprint(nome.upper())', 'frase = "Python é incrível"\nprint(frase[:6])'],
    'entrada-e-saida': ['nome = input("Seu nome: ")\nprint(f"Olá, {nome}!")', 'idade = int(input("Idade: "))\nprint(idade + 1)', 'print("A", "B", "C", sep=" | ")'],
    'condicionais': ['idade = 20\nif idade >= 18:\n    print("Pode entrar")\nelse:\n    print("Não pode")', 'nota = 7\nif nota >= 7:\n    print("Aprovado")\nelse:\n    print("Reprovado")', 'opcao = "s"\nif opcao == "s":\n    print("Sim")'],
    'loops': ['for i in range(3):\n    print(i)', 'contador = 0\nwhile contador < 3:\n    print(contador)\n    contador += 1', 'for numero in range(1, 6):\n    if numero % 2 == 0:\n        continue\n    print(numero)'],
    'listas': ['frutas = ["maçã", "banana"]\nprint(frutas[0])', 'numeros = [1, 2, 3]\nnumeros.append(4)\nprint(numeros)', 'itens = ["pão", "leite"]\nprint(len(itens))'],
    'tuplas': ['ponto = (10, 20)\nprint(ponto[0])', 'nome, idade = "Ana", 29\nprint(nome, idade)', 'dados = ("Rio", "SP")\nprint(dados)'],
    'sets': ['frutas = {"maçã", "banana", "maçã"}\nprint(frutas)', 'a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a | b)', 'print({1, 2, 3} & {2, 3, 4})'],
    'dicionarios': ['cliente = {"nome": "Ana", "idade": 29}\nprint(cliente["nome"])', 'estoque = {"pão": 4, "leite": 3}\nprint(estoque)', 'dados = {"curso": "Python"}\ndados["nivel"] = "iniciante"\nprint(dados)'],
    'comprehensions': ['quadrados = [n * n for n in range(5)]\nprint(quadrados)', 'pares = [n for n in range(10) if n % 2 == 0]\nprint(pares)', 'dobros = {n: n * 2 for n in range(3)}\nprint(dobros)'],
    'funcoes': ['def saudacao(nome):\n    return f"Olá, {nome}!"\nprint(saudacao("Lia"))', 'def soma(a, b):\n    return a + b\nprint(soma(2, 3))', 'def dobro(x):\n    return x * 2\nprint(dobro(5))'],
    'funcoes-avancadas': ['def mostrar(*args):\n    print(args)', 'def resumo(**kwargs):\n    print(kwargs)', 'print(list(map(lambda x: x * 2, [1, 2, 3])))'],
    'escopo': ['valor = "global"\n\ndef mostrar():\n    valor = "local"\n    print(valor)\n\nmostrar()\nprint(valor)', 'contador = 5\n\ndef aumentar():\n    global contador\n    contador += 1\n    print(contador)\n\naumentar()', 'def teste():\n    x = 10\n    return x\nprint(teste())'],
    'modulos-e-pacotes': ['import math\nprint(math.sqrt(16))', 'import random\nprint(random.randint(1, 10))', 'from datetime import datetime\nprint(datetime.now())'],
    'arquivos': ['with open("dados.txt", "w", encoding="utf-8") as arquivo:\n    arquivo.write("Python")', 'with open("dados.txt", "r", encoding="utf-8") as arquivo:\n    print(arquivo.read())', 'import json\njson.dumps({"curso": "Python"})'],
    'excecoes': ['try:\n    int("abc")\nexcept ValueError:\n    print("Entrada inválida")', 'def dividir(a, b):\n    return a / b\n\ntry:\n    print(dividir(10, 0))\nexcept ZeroDivisionError:\n    print("Não é possível dividir por zero")', 'valor = 0\nif valor == 0:\n    raise ValueError("valor não pode ser zero")'],
    'datas-e-tempo': ['from datetime import datetime\nprint(datetime.now())', 'from datetime import timedelta\nprint(timedelta(days=2))', 'from datetime import datetime\nprint(datetime.strptime("2025-01-01", "%Y-%m-%d"))'],
    'expressoes-regulares': ['import re\nprint(re.findall(r"\\d+", "123 abc 456"))', 'import re\nprint(bool(re.search(r"@", "a@b.com")))', 'import re\nprint(re.sub(r"\\s+", "-", "a  b"))'],
    'classes-e-objetos': ['class Pessoa:\n    def __init__(self, nome):\n        self.nome = nome\n\npessoa = Pessoa("Ana")\nprint(pessoa.nome)', 'class Carrinho:\n    def __init__(self):\n        self.itens = []\n\ncar = Carrinho()\nprint(car.itens)', 'class Produto:\n    pass\nprint(Produto())'],
    'encapsulamento-e-propriedades': ['class Conta:\n    def __init__(self, saldo):\n        self._saldo = saldo\n\n    @property\n    def saldo(self):\n        return self._saldo\n\nconta = Conta(100)\nprint(conta.saldo)', 'class Pessoa:\n    def __init__(self, nome):\n        self._nome = nome\n\n    @property\n    def nome(self):\n        return self._nome\n\nprint(Pessoa("Lia").nome)', 'class Numero:\n    def __init__(self, valor):\n        self._valor = valor\n\n    @property\n    def valor(self):\n        return self._valor'],
    'heranca-e-polimorfismo': ['class Animal:\n    def falar(self):\n        return "som"\n\nclass Cachorro(Animal):\n    def falar(self):\n        return "au au"\n\nprint(Cachorro().falar())', 'class Pessoa:\n    def __init__(self, nome):\n        self.nome = nome\n\nclass Cliente(Pessoa):\n    pass\n\nprint(Cliente("Ana").nome)', 'class Forma:\n    def area(self):\n        return 0\n\nclass Quadrado(Forma):\n    def __init__(self, lado):\n        self.lado = lado\n    def area(self):\n        return self.lado * self.lado\n\nprint(Quadrado(4).area())'],
    'metodos-especiais': ['class Produto:\n    def __init__(self, nome):\n        self.nome = nome\n    def __str__(self):\n        return self.nome\nprint(str(Produto("Mouse")))', 'class Caixa:\n    def __init__(self, valor):\n        self.valor = valor\n    def __len__(self):\n        return self.valor\nprint(len(Caixa(3)))', 'class Lista:\n    def __init__(self, itens):\n        self.itens = itens\n    def __getitem__(self, index):\n        return self.itens[index]\nprint(Lista([1,2,3])[1])'],
    'dataclasses-e-enums': ['from dataclasses import dataclass\n@dataclass\nclass Item:\n    nome: str\n    preco: float\nprint(Item("Caneta", 4.9))', 'from enum import Enum\nclass Status(Enum):\n    PENDENTE = "pendente"\n    CONCLUIDO = "concluido"\nprint(Status.PENDENTE)', 'from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Produto:\n    nome: str\nprint(Produto("Mouse"))'],
    'classes-abstratas-e-protocolos': ['from abc import ABC, abstractmethod\nclass Animal(ABC):\n    @abstractmethod\n    def falar(self):\n        pass\nclass Gato(Animal):\n    def falar(self):\n        return "miau"\nprint(Gato().falar())', 'from typing import Protocol\nclass Pagavel(Protocol):\n    def pagar(self, valor: float) -> None: ...\nprint(Pagavel)', 'class Boleto:\n    def pagar(self, valor: float) -> None:\n        print(valor)'],
    'iteradores-e-geradores': ['lista = [1, 2, 3]\nit = iter(lista)\nprint(next(it))', 'def numeros():\n    for i in range(3):\n        yield i\nprint(list(numeros()))', 'gen = (n * 2 for n in range(3))\nprint(list(gen))'],
    'decoradores': ['def logar(func):\n    def wrapper(*args, **kwargs):\n        print(" Chamada ")\n        return func(*args, **kwargs)\n    return wrapper\n@logar\ndef saudacao():\n    print("Olá")\nsaudacao()', 'def repetir(vezes):\n    def decorador(func):\n        def wrapper(*args, **kwargs):\n            for _ in range(vezes):\n                func(*args, **kwargs)\n        return wrapper\n    return decorador\n@repetir(2)\ndef ola():\n    print("Oi")\nola()'],
    'context-managers': ['with open("arquivo.txt", "w", encoding="utf-8") as f:\n    f.write("texto")', 'from contextlib import contextmanager\n@contextmanager\ndef abrir():\n    print("abrindo")\n    yield\n    print("fechando")\nwith abrir():\n    print("uso")', 'class Recurso:\n    def __enter__(self):\n        print("enter")\n        return self\n    def __exit__(self, exc_type, exc, tb):\n        print("exit")\nwith Recurso():\n    print("executando")'],
    'tipagem': ['def soma(a: int, b: int) -> int:\n    return a + b\nprint(soma(2, 3))', 'from typing import Optional\ndef nome_usuario(nome: str | None) -> str:\n    return nome or "anônimo"\nprint(nome_usuario(None))', 'from typing import TypedDict\nclass Cliente(TypedDict):\n    nome: str\n    idade: int\nprint(Cliente(nome="Ana", idade=30))'],
    'programacao-funcional': ['from functools import reduce\nprint(reduce(lambda a, b: a + b, [1, 2, 3]))', 'numeros = [1, 2, 3, 4]\nprint(list(map(lambda x: x * 2, numeros)))', 'print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))'],
    'concorrencia': ['import threading\n\ndef tarefa():\n    print("thread")\n\nthreading.Thread(target=tarefa).start()', 'import asyncio\nasync def main():\n    print("iniciando")\n    await asyncio.sleep(0.1)\n    print("finalizando")\nasyncio.run(main())', 'from multiprocessing import Process\ndef func():\n    print("processo")\nProcess(target=func).start()'],
    'testes': ['def soma(a, b):\n    return a + b\nassert soma(2, 3) == 5\nprint("ok")', 'import unittest\nclass Teste(unittest.TestCase):\n    def test_ok(self):\n        self.assertEqual(2 + 2, 4)\nprint("teste ok")', 'assert abs(-5) == 5'],
    'depuracao': ['def dividir(a, b):\n    return a / b\nprint(dividir(10, 2))', 'itens = [1, 2, 3]\nprint(f"itens: {itens}")', 'import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.info("Execução iniciada")'],
    'boas-praticas': ['valor_total = 120.45\nif valor_total > 100:\n    print("Frete grátis")', 'def calcular_total(preco, quantidade):\n    return preco * quantidade\nprint(calcular_total(12, 3))', 'import this'],
    'ambientes-e-projetos': ['python -m venv .venv', 'requirements.txt\nflask==3.0.0', '[project]\nname = "meu-projeto"'],
    'projeto-final': ['import json\nfrom pathlib import Path\n\nARQUIVO = Path("tarefas.json")\nprint(ARQUIVO)', 'def menu():\n    print("1. Adicionar")\n    print("2. Listar")\nmenu()', 'def validar(texto):\n    if not texto.strip():\n        raise ValueError("Texto vazio")\n    return texto.strip()\nprint(validar(" Estudar "))'],
}

for existing in lesson_root.glob('*.mdx'):
    existing.unlink()

for lesson in lessons:
    lesson_id = lesson['id']
    title = lesson['title']
    desc = descriptions.get(lesson_id, 'Aprofunde o tema com prática e atenção.')
    exs = examples.get(lesson_id, ['print("Exemplo prático")', 'valor = 42\nprint(valor)', 'resultado = "Python"\nprint(f"Aprendendo: {resultado}")'])
    while len(exs) < 3:
        exs.append('print("Exemplo prático")')
    exs = exs[:3]

    body_lines = [
        '# ' + title,
        '',
        desc,
        '',
        '<Callout type="importante" title="Objetivo da aula">',
        '  Neste bloco, você vai entender o conceito principal, ver exemplos práticos e testar a lógica em pequenos passos.',
        '</Callout>',
        '',
        '<CodeBlock title="exemplo_1.py" code={`' + exs[0] + '`} />',
        '<CodeBlock title="exemplo_2.py" code={`' + exs[1] + '`} />',
        '<CodeBlock title="exemplo_3.py" code={`' + exs[2] + '`} />',
        '',
        '<Quiz questions={[{ question: "Qual é a ideia central desta aula?", options: ["memorizar sintaxe sem testar", "entender o conceito e aplicar em contexto", "evitar prática", "ignorar exemplos"], correctIndex: 1, explanation: "A aula enfoca compreensão e aplicação prática." }, { question: "Qual hábito é mais útil?", options: ["testar pequenos trechos", "copiar sem entender", "ignorar erros", "nunca revisar o código"], correctIndex: 0, explanation: "Testar pequenas partes ajuda a confirmar o comportamento." }, { question: "Qual frase melhor resume a prática em Python?", options: ["clareza e execução", "complexidade por padrão", "evitar leitura", "nomear tudo ao acaso"], correctIndex: 0, explanation: "Python valoriza clareza e execução objetiva." }]} />',
        '',
        '<Resumo>',
        '  <li>Entenda o conceito antes de memorizar a sintaxe.</li>',
        '  <li>Teste pequenos exemplos e avalie o resultado.</li>',
        '  <li>Aplica a ideia em cenários reais para fixar o conhecimento.</li>',
        '</Resumo>',
        '',
        '<Desafio>',
        '  Aplique esse tema em um mini cenário do dia a dia e confirme o resultado com um código simples e legível.',
        '</Desafio>',
    ]

    body = '\n'.join(body_lines)

    frontmatter = (
        '---\n'
        f'titulo: "{title}"\n'
        f'descricao: "{desc}"\n'
        f'secao: "{lesson["section"]}"\n'
        f'ordem: {lessons.index(lesson) + 1}\n'
        f'tempo: {lesson["tempo"]}\n'
        f'nivel: "{lesson["level"]}"\n'
        f'palavrasChave: {lesson["keywords"]}\n'
        f'exercicios: {lesson["exercises"]}\n'
        '---\n\n'
    )

    file_path = lesson_root / f'{lesson_id}.mdx'
    file_path.write_text(frontmatter + body + '\n', encoding='utf-8')

config_text = '''import type { ModuleConfig } from '../types'

export const pythonModule: ModuleConfig = {
  id: 'python',
  name: 'Python',
  description:
    'Fundamentos essenciais de Python, lógica, estruturas e exercícios práticos.',
  color: '#3776AB',
  accent: '#FFD43B',
  icon: 'python',
  status: 'available',
  trilha: [
    {
      id: 'primeiros-passos',
      title: 'Primeiros passos',
      lessons: ['o-que-e-python', 'instalando-e-rodando', 'sintaxe-basica'],
    },
    {
      id: 'fundamentos',
      title: 'Fundamentos',
      lessons: ['variaveis-e-tipos', 'operadores', 'strings', 'entrada-e-saida', 'condicionais', 'loops'],
    },
    {
      id: 'estruturas-de-dados',
      title: 'Estruturas de dados',
      lessons: ['listas', 'tuplas', 'sets', 'dicionarios', 'comprehensions'],
    },
    {
      id: 'funcoes-e-organizacao',
      title: 'Funções e organização',
      lessons: ['funcoes', 'funcoes-avancadas', 'escopo', 'modulos-e-pacotes'],
    },
    {
      id: 'mundo-real',
      title: 'Trabalhando com o mundo real',
      lessons: ['arquivos', 'excecoes', 'datas-e-tempo', 'expressoes-regulares'],
    },
    {
      id: 'poo',
      title: 'Programação orientada a objetos',
      lessons: ['classes-e-objetos', 'encapsulamento-e-propriedades', 'heranca-e-polimorfismo', 'metodos-especiais', 'dataclasses-e-enums', 'classes-abstratas-e-protocolos'],
    },
    {
      id: 'intermediario',
      title: 'Python intermediário e avançado',
      lessons: ['iteradores-e-geradores', 'decoradores', 'context-managers', 'tipagem', 'programacao-funcional', 'concorrencia'],
    },
    {
      id: 'qualidade',
      title: 'Qualidade e boas práticas',
      lessons: ['testes', 'depuracao', 'boas-praticas', 'ambientes-e-projetos', 'projeto-final'],
    },
  ],
}
'''

(root / 'src' / 'modules' / 'python' / 'config.ts').write_text(config_text, encoding='utf-8')

print(f'Generated {len(lessons)} lesson files in {lesson_root}')
print(f'Config updated at {root / "src" / "modules" / "python" / "config.ts"}')
