import schoolsData from './assets/dataSchools.json';

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

export const rawSchools: SchoolData[] = schoolsData.map((school, index) => ({
  id: index + 1,
  name: school.name,
  iee2024: school.iee2024,
  ieeEstimado1: school.ieeEstimado1,
  ieeEstimado2: school.ieeEstimado2,
  meta2026: school.meta2026,
  ratio2ndYear: Number((Math.random() * 0.6 + 0.4).toFixed(2)),
  ratio5thYear: Number((Math.random() * 0.6 + 0.4).toFixed(2))
}));

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
