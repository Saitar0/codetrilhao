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
      lessons: ['o-que-e-python', 'instalando-e-rodando', 'sintaxe-basica', 'entrada-e-saida', 'variaveis-e-tipos', 'operadores', 'strings', 'condicionais', 'loops'],
    },
    {
      id: 'b-estruturas-de-dados',
      title: 'B. Estruturas de dados',
      lessons: ['listas', 'tuplas', 'sets', 'dicionarios'],
    },
    {
      id: 'c-organizacao-de-codigo',
      title: 'C. Organização de código',
      lessons: ['funcoes', 'funcoes-avancadas', 'escopo', 'comprehensions', 'funcoes-embutidas', 'iteradores-e-geradores', 'excecoes'],
    },
    {
      id: 'd-mundo-real',
      title: 'D. Mundo real',
      lessons: ['arquivos', 'modulos-e-pacotes', 'ambientes-e-projetos', 'datas-e-tempo', 'apis-e-requests', 'sqlite-basico'],
    },
    {
      id: 'e-pensamento-de-engenharia',
      title: 'E. Pensamento de engenharia',
      lessons: ['algoritmos-busca-e-ordenacao', 'recursao-e-complexidade', 'classes-e-objetos', 'encapsulamento-e-propriedades', 'heranca-e-polimorfismo', 'metodos-especiais', 'dataclasses-e-enums', 'testes', 'depuracao', 'boas-praticas', 'git-basico'],
    },
    {
      id: 'f-projeto-final',
      title: 'F. Projeto final',
      lessons: ['projeto-final'],
    },
    {
      id: 'aprofundamento',
      title: 'Aprofundamento',
      lessons: ['expressoes-regulares', 'decoradores', 'context-managers', 'tipagem', 'programacao-funcional', 'concorrencia', 'classes-abstratas-e-protocolos'],
    },
  ],
}
