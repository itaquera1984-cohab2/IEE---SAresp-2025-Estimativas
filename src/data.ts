export interface SchoolData {
  id: number;
  name: string;
  iee2024: number;
  ieeEstimado1: number;
  ieeEstimado2: number;
  meta2026: number;
  ratio2ndYear: number;
  ratio5thYear: number;
}

export interface ProcessedSchool extends SchoolData {
  ieeAtual: number;
  efficiencyPercent: number;
  isAwarded: boolean;
  awardStatus: string;
  evolucao: "Crescimento" | "Queda" | "Estável";
  remainingPercent: number;
  bottleneck: string;
  vizSuggestion: string;
}

const realSchoolsData = [
  // Bloco 1
  { name: "EM Dulce Pedrosa", iee2024: 8.92, ieeEstimado1: 8.33, ieeEstimado2: 8.33, meta2026: 9.45 },
  { name: "EM Padre Zezinho", iee2024: 7.92, ieeEstimado1: 7.82, ieeEstimado2: 7.82, meta2026: 8.39 },
  { name: "EM Isabel do Carmo", iee2024: 7.59, ieeEstimado1: 7.77, ieeEstimado2: 7.77, meta2026: 8.04 },
  { name: "EM Moacyr de Almeida", iee2024: 8.04, ieeEstimado1: 7.00, ieeEstimado2: 7.00, meta2026: 8.52 },
  { name: "EM Francisco de Assis", iee2024: 7.22, ieeEstimado1: 7.35, ieeEstimado2: 7.35, meta2026: 7.65 },
  // Bloco 2
  { name: "EM Lauro Vicente de Azevedo", iee2024: 6.45, ieeEstimado1: 7.15, ieeEstimado2: 7.53, meta2026: 6.58 },
  { name: "EM Maria Aparecida Vasques", iee2024: 7.84, ieeEstimado1: 7.14, ieeEstimado2: 7.51, meta2026: 8.31 },
  { name: "EM Félix Adib", iee2024: 7.04, ieeEstimado1: 7.13, ieeEstimado2: 7.51, meta2026: 7.23 },
  { name: "EM Orlando Pires", iee2024: 7.22, ieeEstimado1: 6.84, ieeEstimado2: 7.20, meta2026: 7.47 },
  { name: "EM Abdias Jr. Santiago", iee2024: 6.83, ieeEstimado1: 6.84, ieeEstimado2: 7.20, meta2026: 7.20 },
  // Bloco 3
  { name: "EM Padre Mario Antonio (Mario Antonio Bonotti)", iee2024: 7.40, ieeEstimado1: 7.06, ieeEstimado2: 7.43, meta2026: 7.84 },
  { name: "EM Zara Mine Renoldi (Maria Zara)", iee2024: 6.64, ieeEstimado1: 7.06, ieeEstimado2: 7.43, meta2026: 6.88 },
  { name: "EM Augusto Cesar Ribeiro", iee2024: 7.15, ieeEstimado1: 7.06, ieeEstimado2: 7.44, meta2026: 7.42 },
  { name: "EM Alexandre Machado", iee2024: 6.38, ieeEstimado1: 6.96, ieeEstimado2: 7.33, meta2026: 6.47 },
  { name: "EM Yvone Apparecida (Yvone Ap. Arantes Corrêa)", iee2024: 7.84, ieeEstimado1: 7.02, ieeEstimado2: 7.39, meta2026: 8.31 },
  // Bloco 4
  { name: "EM André Franco Montoro", iee2024: 7.39, ieeEstimado1: 6.76, ieeEstimado2: 7.12, meta2026: 7.83 },
  { name: "EM Ângelo Paz da Silva", iee2024: 7.54, ieeEstimado1: 6.77, ieeEstimado2: 7.13, meta2026: 7.99 },
  { name: "EM José Gonçalves", iee2024: 6.96, ieeEstimado1: 6.74, ieeEstimado2: 7.10, meta2026: 7.04 },
  { name: "EM Maria Madureira Salgado", iee2024: 6.99, ieeEstimado1: 6.72, ieeEstimado2: 7.08, meta2026: 7.40 },
  { name: "EM Gilda Piorini", iee2024: 7.35, ieeEstimado1: 6.70, ieeEstimado2: 7.05, meta2026: 7.79 },
  // Bloco 5
  { name: "EM João Cesário", iee2024: 7.15, ieeEstimado1: 6.63, ieeEstimado2: 6.98, meta2026: 7.57 },
  { name: "EM Madalena Caltabiano", iee2024: 7.44, ieeEstimado1: 6.60, ieeEstimado2: 6.95, meta2026: 7.88 },
  { name: "EM Julieta Reale", iee2024: 6.63, ieeEstimado1: 6.58, ieeEstimado2: 6.92, meta2026: 7.02 },
  { name: "EM Maria Ap. Camargo (M.A. Camargo de Souza)", iee2024: 6.87, ieeEstimado1: 6.54, ieeEstimado2: 6.89, meta2026: 7.54 },
  { name: "EM João Kolenda", iee2024: 7.00, ieeEstimado1: 6.44, ieeEstimado2: 6.77, meta2026: 7.42 },
  // Bloco 6
  { name: "EM Arthur de Andrade", iee2024: 7.56, ieeEstimado1: 6.43, ieeEstimado2: 6.77, meta2026: 8.01 },
  { name: "EM Odete Correa (Odete C. Madureira)", iee2024: 7.39, ieeEstimado1: 6.42, ieeEstimado2: 6.76, meta2026: 7.83 },
  { name: "EM Elias Bargis Mathias", iee2024: 6.69, ieeEstimado1: 6.16, ieeEstimado2: 6.48, meta2026: 6.90 },
  { name: "EM Mario de Assis César", iee2024: 6.97, ieeEstimado1: 5.99, ieeEstimado2: 6.31, meta2026: 7.17 },
  { name: "EM Helena Ribeiro (Maria Helena R. Vilela)", iee2024: 7.27, ieeEstimado1: 6.60, ieeEstimado2: 6.94, meta2026: 7.70 },
  // Bloco 7
  { name: "EM Regina Célia", iee2024: 6.47, ieeEstimado1: 6.11, ieeEstimado2: 6.43, meta2026: 6.65 },
  { name: "EM Ruth Azevedo", iee2024: 7.10, ieeEstimado1: 6.73, ieeEstimado2: 7.08, meta2026: 7.52 },
  { name: "EM Serafim Ferreira", iee2024: 7.12, ieeEstimado1: 6.81, ieeEstimado2: 7.17, meta2026: 7.54 },
  { name: "EM Vito Ardito", iee2024: 7.30, ieeEstimado1: 6.81, ieeEstimado2: 7.17, meta2026: 7.52 },
  { name: "EM Joaquim Pereira da Silva", iee2024: 7.06, ieeEstimado1: 7.20, ieeEstimado2: 7.58, meta2026: 7.35 },
  { name: "EM Paulo Freire", iee2024: 7.32, ieeEstimado1: 6.95, ieeEstimado2: 7.31, meta2026: 7.75 }
];

const schoolNames = [
  "EM Dona Maria Antonieta", "EM João Silva",
  "EM Profª Helena", "EM Monteiro Lobato",
  "EM Cecília Meireles", "EM Machado de Assis", "EM Cora Coralina",
  "EM Ruth Rocha", "EM Ziraldo", "EM Carlos Drummond", "EM Vinícius de Moraes",
  "EM Clarice Lispector", "EM Jorge Amado", "EM Guimarães Rosa", "EM Mário de Andrade",
  "EM Oswald de Andrade", "EM Tarsila do Amaral", "EM Anita Malfatti", "EM Di Cavalcanti",
  "EM Portinari", "EM Villa-Lobos", "EM Santos Dumont", "EM Princesa Isabel",
  "EM Dom Pedro II", "EM Tiradentes", "EM Castro Alves"
];

// Generate mock data for 37 schools (10 real + 27 mock)
export const rawSchools: SchoolData[] = Array.from({ length: 37 }).map((_, index) => {
  if (index < realSchoolsData.length) {
    const real = realSchoolsData[index];
    return {
      id: index + 1,
      name: real.name,
      iee2024: real.iee2024,
      ieeEstimado1: real.ieeEstimado1,
      ieeEstimado2: real.ieeEstimado2,
      meta2026: real.meta2026,
      ratio2ndYear: Number((Math.random() * 0.6 + 0.4).toFixed(2)),
      ratio5thYear: Number((Math.random() * 0.6 + 0.4).toFixed(2))
    };
  }

  const name = schoolNames[index - realSchoolsData.length];
  const iee2024 = Number((Math.random() * 3 + 4).toFixed(2)); // Historical 2024 between 4.0 and 7.0
  const ieeEstimado1 = Number((iee2024 + (Math.random() * 1.0 - 0.2)).toFixed(2)); // Projeção 1
  const ieeEstimado2 = Number((iee2024 + (Math.random() * 1.2 - 0.3)).toFixed(2)); // Projeção 2
  const meta2026 = Number((iee2024 + 0.5).toFixed(2)); // Meta is usually higher than 2024
  
  // Ratios between 0.4 and 1.0
  const ratio2ndYear = Number((Math.random() * 0.6 + 0.4).toFixed(2));
  const ratio5thYear = Number((Math.random() * 0.6 + 0.4).toFixed(2));

  return {
    id: index + 1,
    name,
    iee2024,
    ieeEstimado1,
    ieeEstimado2,
    meta2026: Math.max(4.5, meta2026),
    ratio2ndYear,
    ratio5thYear
  };
});

export const processSchools = (schools: SchoolData[]): ProcessedSchool[] => {
  return schools.map(school => {
    // Média de Desempenho
    const ieeAtual = Number(((school.ieeEstimado1 + school.ieeEstimado2) / 2).toFixed(2));
    
    // Premiação
    const isAwarded = ieeAtual >= school.meta2026;
    const awardStatus = isAwarded ? "BATEU A META - PREMIADA" : "NÃO BATEU A META";
    
    // Evolução Histórica
    let evolucao: "Crescimento" | "Queda" | "Estável" = "Estável";
    if (ieeAtual > school.iee2024) evolucao = "Crescimento";
    else if (ieeAtual < school.iee2024) evolucao = "Queda";

    const efficiencyPercent = (ieeAtual / school.meta2026) * 100;
    const remainingPercent = isAwarded ? 0 : ((school.meta2026 - ieeAtual) / school.meta2026) * 100;
    
    // Gargalo (Apenas se não bateu a meta)
    let bottleneck = "Meta Atingida";
    if (!isAwarded) {
      if (school.ratio2ndYear < school.ratio5thYear) {
        bottleneck = "2º ano (Alfabetização)";
      } else if (school.ratio5thYear < school.ratio2ndYear) {
        bottleneck = "5º ano (Consolidação)";
      } else {
        bottleneck = "Equilibrado (Ambos)";
      }
    }

    // Output de Visualização
    const vizSuggestion = "Gráfico de Barras Agrupadas (Série Histórica) e Gráfico de Bullet (Progresso da Meta)";

    return {
      ...school,
      ieeAtual,
      efficiencyPercent: Number(efficiencyPercent.toFixed(1)),
      isAwarded,
      awardStatus,
      evolucao,
      remainingPercent: Number(remainingPercent.toFixed(1)),
      bottleneck,
      vizSuggestion
    };
  });
};

export const processedData = processSchools(rawSchools);

export const generateMarkdownTable = (data: ProcessedSchool[]) => {
  let md = "| Escola | IEE 2024 | IEE Atual (Média) | Meta 2026 | Evolução | Status | Gargalo | Sugestão de Visualização |\n";
  md += "|---|---|---|---|---|---|---|---|\n";
  
  data.forEach(s => {
    const evolucaoIcon = s.evolucao === 'Crescimento' ? '📈' : s.evolucao === 'Queda' ? '📉' : '➖';
    const status = s.isAwarded ? "🏆 BATEU A META - PREMIADA" : "⚠️ NÃO BATEU A META";
    md += `| ${s.name} | ${s.iee2024} | ${s.ieeAtual} | ${s.meta2026} | ${evolucaoIcon} ${s.evolucao} | ${status} | ${s.bottleneck} | ${s.vizSuggestion} |\n`;
  });
  
  return md;
};

export const generateJSON = (data: ProcessedSchool[]) => {
  return JSON.stringify(data.map(s => ({
    escola: s.name,
    iee_2024: s.iee2024,
    iee_estimado_1: s.ieeEstimado1,
    iee_estimado_2: s.ieeEstimado2,
    iee_atual_media: s.ieeAtual,
    meta_2026: s.meta2026,
    evolucao_historica: s.evolucao,
    status_premiacao: s.awardStatus,
    gargalo_identificado: s.bottleneck,
    sugestao_visualizacao: s.vizSuggestion
  })), null, 2);
};
