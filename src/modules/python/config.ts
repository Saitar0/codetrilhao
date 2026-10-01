import type { ModuleConfig } from '../types'

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
      id: 'a-fundamentos',
      title: 'A. Fundamentos',
      lessons: ['o-que-e-python', 'o-que-e-python-introducao', 'o-que-e-python-conceito', 'o-que-e-python-aplicacao', 'instalando-e-rodando', 'instalando-e-rodando-introducao', 'instalando-e-rodando-conceito-principal', 'instalando-e-rodando-aplicacao-pratica', 'instalando-e-rodando-no-mercado-de-trabalho', 'sintaxe-basica', 'sintaxe-basica-introducao', 'sintaxe-basica-conceito-principal', 'sintaxe-basica-aplicacao-pratica', 'sintaxe-basica-no-mercado-de-trabalho', 'entrada-e-saida', 'entrada-e-saida-introducao', 'entrada-e-saida-conceito-principal', 'entrada-e-saida-aplicacao-pratica', 'entrada-e-saida-no-mercado-de-trabalho', 'variaveis-e-tipos', 'variaveis-e-tipos-introducao', 'variaveis-e-tipos-conceito-principal', 'variaveis-e-tipos-aplicacao-pratica', 'variaveis-e-tipos-no-mercado-de-trabalho', 'operadores', 'operadores-introducao', 'operadores-conceito-principal', 'operadores-aplicacao-pratica', 'operadores-no-mercado-de-trabalho', 'strings', 'strings-introducao', 'strings-conceito-principal', 'strings-aplicacao-pratica', 'strings-no-mercado-de-trabalho', 'condicionais', 'condicionais-introducao', 'condicionais-conceito-principal', 'condicionais-aplicacao-pratica', 'condicionais-no-mercado-de-trabalho', 'loops', 'loops-introducao', 'loops-conceito-principal', 'loops-aplicacao-pratica', 'loops-no-mercado-de-trabalho'],
    },
    {
      id: 'b-estruturas-de-dados',
      title: 'B. Estruturas de dados',
      lessons: ['listas', 'listas-introducao', 'listas-conceito-principal', 'listas-aplicacao-pratica', 'listas-no-mercado-de-trabalho', 'tuplas', 'tuplas-introducao', 'tuplas-conceito-principal', 'tuplas-aplicacao-pratica', 'tuplas-no-mercado-de-trabalho', 'sets', 'sets-introducao', 'sets-conceito-principal', 'sets-aplicacao-pratica', 'sets-no-mercado-de-trabalho', 'dicionarios', 'dicionarios-introducao', 'dicionarios-conceito-principal', 'dicionarios-aplicacao-pratica', 'dicionarios-no-mercado-de-trabalho'],
    },
    {
      id: 'c-organizacao-de-codigo',
      title: 'C. Organização de código',
      lessons: ['funcoes', 'funcoes-introducao', 'funcoes-conceito-principal', 'funcoes-aplicacao-pratica', 'funcoes-no-mercado-de-trabalho', 'funcoes-avancadas', 'funcoes-avancadas-introducao', 'funcoes-avancadas-conceito-principal', 'funcoes-avancadas-aplicacao-pratica', 'funcoes-avancadas-no-mercado-de-trabalho', 'escopo', 'escopo-introducao', 'escopo-conceito-principal', 'escopo-aplicacao-pratica', 'escopo-no-mercado-de-trabalho', 'comprehensions', 'comprehensions-introducao', 'comprehensions-conceito-principal', 'comprehensions-aplicacao-pratica', 'comprehensions-no-mercado-de-trabalho', 'funcoes-embutidas', 'funcoes-embutidas-introducao', 'funcoes-embutidas-conceito-principal', 'funcoes-embutidas-aplicacao-pratica', 'funcoes-embutidas-no-mercado-de-trabalho', 'iteradores-e-geradores', 'iteradores-e-geradores-introducao', 'iteradores-e-geradores-conceito-principal', 'iteradores-e-geradores-aplicacao-pratica', 'iteradores-e-geradores-no-mercado-de-trabalho', 'excecoes', 'excecoes-introducao', 'excecoes-conceito-principal', 'excecoes-aplicacao-pratica', 'excecoes-no-mercado-de-trabalho'],
    },
    {
      id: 'd-mundo-real',
      title: 'D. Mundo real',
      lessons: ['arquivos', 'arquivos-introducao', 'arquivos-conceito-principal', 'arquivos-aplicacao-pratica', 'arquivos-no-mercado-de-trabalho', 'modulos-e-pacotes', 'modulos-e-pacotes-introducao', 'modulos-e-pacotes-conceito-principal', 'modulos-e-pacotes-aplicacao-pratica', 'modulos-e-pacotes-no-mercado-de-trabalho', 'ambientes-e-projetos', 'ambientes-e-projetos-introducao', 'ambientes-e-projetos-conceito-principal', 'ambientes-e-projetos-aplicacao-pratica', 'ambientes-e-projetos-no-mercado-de-trabalho', 'datas-e-tempo', 'datas-e-tempo-introducao', 'datas-e-tempo-conceito-principal', 'datas-e-tempo-aplicacao-pratica', 'datas-e-tempo-no-mercado-de-trabalho', 'apis-e-requests', 'apis-e-requests-introducao', 'apis-e-requests-conceito-principal', 'apis-e-requests-aplicacao-pratica', 'apis-e-requests-no-mercado-de-trabalho', 'sqlite-basico', 'sqlite-basico-introducao', 'sqlite-basico-conceito-principal', 'sqlite-basico-aplicacao-pratica', 'sqlite-basico-no-mercado-de-trabalho'],
    },
    {
      id: 'e-pensamento-de-engenharia',
      title: 'E. Pensamento de engenharia',
      lessons: ['algoritmos-busca-e-ordenacao', 'algoritmos-busca-e-ordenacao-introducao', 'algoritmos-busca-e-ordenacao-conceito-principal', 'algoritmos-busca-e-ordenacao-aplicacao-pratica', 'algoritmos-busca-e-ordenacao-no-mercado-de-trabalho', 'recursao-e-complexidade', 'recursao-e-complexidade-introducao', 'recursao-e-complexidade-conceito-principal', 'recursao-e-complexidade-aplicacao-pratica', 'recursao-e-complexidade-no-mercado-de-trabalho', 'classes-e-objetos', 'classes-e-objetos-introducao', 'classes-e-objetos-conceito-principal', 'classes-e-objetos-aplicacao-pratica', 'classes-e-objetos-no-mercado-de-trabalho', 'encapsulamento-e-propriedades', 'encapsulamento-e-propriedades-introducao', 'encapsulamento-e-propriedades-conceito-principal', 'encapsulamento-e-propriedades-aplicacao-pratica', 'encapsulamento-e-propriedades-no-mercado-de-trabalho', 'heranca-e-polimorfismo', 'heranca-e-polimorfismo-introducao', 'heranca-e-polimorfismo-conceito-principal', 'heranca-e-polimorfismo-aplicacao-pratica', 'heranca-e-polimorfismo-no-mercado-de-trabalho', 'metodos-especiais', 'metodos-especiais-introducao', 'metodos-especiais-conceito-principal', 'metodos-especiais-aplicacao-pratica', 'metodos-especiais-no-mercado-de-trabalho', 'dataclasses-e-enums', 'dataclasses-e-enums-introducao', 'dataclasses-e-enums-conceito-principal', 'dataclasses-e-enums-aplicacao-pratica', 'dataclasses-e-enums-no-mercado-de-trabalho', 'testes', 'testes-introducao', 'testes-conceito-principal', 'testes-aplicacao-pratica', 'testes-no-mercado-de-trabalho', 'depuracao', 'depuracao-introducao', 'depuracao-conceito-principal', 'depuracao-aplicacao-pratica', 'depuracao-no-mercado-de-trabalho', 'boas-praticas', 'boas-praticas-introducao', 'boas-praticas-conceito-principal', 'boas-praticas-aplicacao-pratica', 'boas-praticas-no-mercado-de-trabalho', 'git-basico', 'git-basico-introducao', 'git-basico-conceito-principal', 'git-basico-aplicacao-pratica', 'git-basico-no-mercado-de-trabalho'],
    },
    {
      id: 'f-projeto-final',
      title: 'F. Projeto final',
      lessons: ['projeto-final', 'projeto-final-introducao', 'projeto-final-conceito-principal', 'projeto-final-aplicacao-pratica', 'projeto-final-no-mercado-de-trabalho'],
    },
    {
      id: 'aprofundamento',
      title: 'Aprofundamento',
      lessons: ['expressoes-regulares', 'expressoes-regulares-introducao', 'expressoes-regulares-conceito-principal', 'expressoes-regulares-aplicacao-pratica', 'expressoes-regulares-no-mercado-de-trabalho', 'decoradores', 'decoradores-introducao', 'decoradores-conceito-principal', 'decoradores-aplicacao-pratica', 'decoradores-no-mercado-de-trabalho', 'context-managers', 'context-managers-introducao', 'context-managers-conceito-principal', 'context-managers-aplicacao-pratica', 'context-managers-no-mercado-de-trabalho', 'tipagem', 'tipagem-introducao', 'tipagem-conceito-principal', 'tipagem-aplicacao-pratica', 'tipagem-no-mercado-de-trabalho', 'programacao-funcional', 'programacao-funcional-introducao', 'programacao-funcional-conceito-principal', 'programacao-funcional-aplicacao-pratica', 'programacao-funcional-no-mercado-de-trabalho', 'concorrencia', 'concorrencia-introducao', 'concorrencia-conceito-principal', 'concorrencia-aplicacao-pratica', 'concorrencia-no-mercado-de-trabalho', 'classes-abstratas-e-protocolos', 'classes-abstratas-e-protocolos-introducao', 'classes-abstratas-e-protocolos-conceito-principal', 'classes-abstratas-e-protocolos-aplicacao-pratica', 'classes-abstratas-e-protocolos-no-mercado-de-trabalho'],
    },
  ],
}
