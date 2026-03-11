const fs = require('fs');

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

const processed = realSchoolsData.map(s => {
  const ieeAtual = Number(((s.ieeEstimado1 + s.ieeEstimado2) / 2).toFixed(2));
  const isAwarded = ieeAtual >= s.meta2026;
  const evolucao = ieeAtual > s.iee2024 ? "📈 Crescimento" : ieeAtual < s.iee2024 ? "📉 Queda" : "➖ Estável";
  const gap = Number((s.meta2026 - ieeAtual).toFixed(2));
  return { ...s, ieeAtual, isAwarded, evolucao, gap };
});

processed.sort((a, b) => b.ieeAtual - a.ieeAtual);

let md = "### 🏆 Ranking Geral (Ordem de IEE Atual)\n\n";
md += "| Pos | Escola | IEE Atual | IEE 2024 | Meta 2026 | Evolução Histórica | Status |\n";
md += "|---|---|---|---|---|---|---|\n";

processed.forEach((s, i) => {
  const status = s.isAwarded ? "✅ Premiada" : "⚠️ Não Bateu";
  md += `| ${i + 1}º | ${s.name} | **${s.ieeAtual.toFixed(2)}** | ${s.iee2024.toFixed(2)} | ${s.meta2026.toFixed(2)} | ${s.evolucao} | ${status} |\n`;
});

const topPerformance = processed.filter(s => s.isAwarded).sort((a, b) => b.ieeAtual - a.ieeAtual);
md += "\n### ⭐ Escolas Top Performance (Bateram a Meta)\n\n";
topPerformance.forEach((s, i) => {
  md += `- **${s.name}**: IEE Atual ${s.ieeAtual.toFixed(2)} (Meta: ${s.meta2026.toFixed(2)})\n`;
});

const gapAnalysis = processed.filter(s => !s.isAwarded).sort((a, b) => b.gap - a.gap).slice(0, 5);
md += "\n### 🚨 Análise de Gap (Maiores Desafios)\n\n";
gapAnalysis.forEach((s, i) => {
  md += `- **${s.name}**: Distância de **${s.gap.toFixed(2)}** pontos (Atual: ${s.ieeAtual.toFixed(2)} / Meta: ${s.meta2026.toFixed(2)})\n`;
});

console.log(md);
