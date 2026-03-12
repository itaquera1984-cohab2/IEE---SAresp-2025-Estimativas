import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, 'src');
const MAX_LENGTH = 50;

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function suggestName(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  
  if (base.length <= MAX_LENGTH) return filename;
  
  // Estratégia de abreviação: Pega os primeiros 20 caracteres e os últimos 15
  const newBase = base.substring(0, 20) + '...' + base.substring(base.length - 15);
  return newBase + ext;
}

function findAndRename() {
  const filesToRename = [];
  
  walkDir(SRC_DIR, (filePath) => {
    const filename = path.basename(filePath);
    if (filename.length > MAX_LENGTH) {
      filesToRename.push({
        oldPath: filePath,
        oldName: filename,
        newName: suggestName(filename),
        oldBase: path.basename(filename, path.extname(filename)),
        newBase: path.basename(suggestName(filename), path.extname(filename))
      });
    }
  });

  if (filesToRename.length === 0) {
    console.log('✅ Nenhum arquivo com nome superior a 50 caracteres encontrado na pasta /src.');
    return;
  }

  console.log(`⚠️ Encontrados ${filesToRename.length} arquivos com nomes longos:\n`);
  
  filesToRename.forEach(({ oldPath, oldName, newName, oldBase, newBase }) => {
    console.log(`- Original: ${oldName}`);
    console.log(`  Sugerido: ${newName}`);
    
    // Atualiza as referências em todos os outros arquivos
    walkDir(SRC_DIR, (targetPath) => {
      let content = fs.readFileSync(targetPath, 'utf8');
      
      // Regex simples para encontrar imports/exports do arquivo antigo
      // Procura por strings de importação que terminam com o nome base antigo
      const regex = new RegExp(`(['"\`])((?:\\.\\/|\\.\\.\\/)+.*)${oldBase}(['"\`])`, 'g');
      
      if (regex.test(content)) {
        content = content.replace(regex, `$1$2${newBase}$3`);
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log(`  -> Referências atualizadas em: ${path.relative(SRC_DIR, targetPath)}`);
      }
    });

    // Renomeia o arquivo
    const newPath = path.join(path.dirname(oldPath), newName);
    
    // ATENÇÃO: Descomente a linha abaixo para efetivamente renomear o arquivo
    // fs.renameSync(oldPath, newPath);
    console.log(`  -> Arquivo renomeado (Simulação - Descomente fs.renameSync no script para aplicar definitivamente)\n`);
  });
}

findAndRename();
