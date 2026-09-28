export type ExerciseDifficulty = 'fácil' | 'médio' | 'difícil'
export type ExerciseStatus = 'nao-iniciado' | 'tentado' | 'resolvido'
export type ExerciseKind = 'codigo' | 'completar' | 'bug' | 'multipla-escolha' | 'ordenar' | 'prever-saida'

export type ExerciseTestCase = {
  entrada: string
  esperado: string
  oculto?: boolean
}

export type BaseExercise = {
  id: string
  tipo: ExerciseKind
  titulo: string
  topico: string
  dificuldade: ExerciseDifficulty
  xp: number
  dicas: string[]
  solucao: string
  tags: string[]
  aulaRelacionada: string
  enunciado: string
}

export type CodeExercise = BaseExercise & {
  tipo: 'codigo'
  starterCode: string
  testes: ExerciseTestCase[]
  nomeFuncao?: string
}

export type FillExercise = BaseExercise & {
  tipo: 'completar'
  starterCode: string
  testes: ExerciseTestCase[]
}

export type BugExercise = BaseExercise & {
  tipo: 'bug'
  starterCode: string
  testes: ExerciseTestCase[]
}

export type MultipleChoiceExercise = BaseExercise & {
  tipo: 'multipla-escolha'
  pergunta: string
  alternativas: Array<{
    texto: string
    correta: boolean
    explicacao: string
  }>
  testes?: ExerciseTestCase[]
}

export type SortExercise = BaseExercise & {
  tipo: 'ordenar'
  linhas: string[]
  ordemCorreta: string[]
  testes?: ExerciseTestCase[]
}

export type PredictionExercise = BaseExercise & {
  tipo: 'prever-saida'
  codigo: string
  respostaEsperada: string
  testes?: ExerciseTestCase[]
}

export type ExerciseDefinition =
  | CodeExercise
  | FillExercise
  | BugExercise
  | MultipleChoiceExercise
  | SortExercise
  | PredictionExercise
