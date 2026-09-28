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
