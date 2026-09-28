import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const exercisesDir = path.join(root, 'src', 'modules', 'python', 'exercises');
const files = fs.readdirSync(exercisesDir).filter((name) => name.endsWith('.json')).sort();

if (files.length !== 50) {
  console.error(`Quantidade esperada: 50. Encontrada: ${files.length}`);
  process.exit(1);
}

for (const file of files) {
  const fullPath = path.join(exercisesDir, file);
  const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  if (!json.id || !json.tipo || !json.titulo || !json.aulaRelacionada || !json.enunciado || !Array.isArray(json.tags)) {
    console.error(`Arquivo inválido: ${file}`);
    process.exit(1);
  }

  if (json.tipo === 'codigo' || json.tipo === 'bug' || json.tipo === 'completar') {
    if (!json.starterCode || !json.solucao || !Array.isArray(json.testes)) {
      console.error(`Arquivo sem starterCode, solucao ou testes: ${file}`);
      process.exit(1);
    }
    if (json.testes.length < 5) {
      console.error(`Arquivo com menos de 5 testes: ${file}`);
      process.exit(1);
    }
    const visible = json.testes.filter((test) => !test.oculto);
    if (visible.length < 3) {
      console.error(`Arquivo com menos de 3 testes visíveis: ${file}`);
      process.exit(1);
    }
    const hidden = json.testes.filter((test) => test.oculto);
    if (hidden.length < 2) {
      console.error(`Arquivo com menos de 2 testes ocultos: ${file}`);
      process.exit(1);
    }
  }

  if (json.tipo === 'multipla-escolha') {
    if (!json.pergunta || !Array.isArray(json.alternativas) || json.alternativas.length < 2) {
      console.error(`Questão de múltipla escolha inválida: ${file}`);
      process.exit(1);
    }
  }

  if (json.tipo === 'ordenar') {
    if (!Array.isArray(json.linhas) || !Array.isArray(json.ordemCorreta) || json.linhas.length === 0) {
      console.error(`Exercício de ordenação inválido: ${file}`);
      process.exit(1);
    }
  }

  if (json.tipo === 'prever-saida') {
    if (!json.codigo || !json.respostaEsperada) {
      console.error(`Exercício de previsão inválido: ${file}`);
      process.exit(1);
    }
  }
}

console.log(`Validação OK: ${files.length} exercícios válidos em ${exercisesDir}`);
