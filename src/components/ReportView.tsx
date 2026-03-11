import React from 'react';
import { processedData } from '../data';
import { Trophy, AlertTriangle, TrendingUp, TrendingDown, Minus, Table2, CheckCircle, AlertCircle } from 'lucide-react';

const getCategory = (iee: number) => {
  if (iee > 7.3) return 'Excelência';
  if (iee >= 7.0) return 'Estável';
  if (iee >= 6.6) return 'Atenção';
  return 'Alerta';
};

export function ReportView() {
  const sortedSchools = [...processedData].sort((a, b) => b.ieeAtual - a.ieeAtual);
  const topPerformance = sortedSchools.filter(s => s.isAwarded);
  const gapAnalysis = [...processedData]
    .filter(s => !s.isAwarded)
    .map(s => ({ ...s, gap: s.meta2026 - s.ieeAtual }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 5);

  const summaryCounts = {
    Excelência: sortedSchools.filter(s => getCategory(s.ieeAtual) === 'Excelência').length,
    Estável: sortedSchools.filter(s => getCategory(s.ieeAtual) === 'Estável').length,
    Atenção: sortedSchools.filter(s => getCategory(s.ieeAtual) === 'Atenção').length,
    Alerta: sortedSchools.filter(s => getCategory(s.ieeAtual) === 'Alerta').length,
  };

  const alertaSchools = sortedSchools.filter(s => getCategory(s.ieeAtual) === 'Alerta');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Trophy size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Relatório Final Consolidado</h3>
        </div>
        <p className="text-slate-600 mb-8">
          Análise completa das {processedData.length} escolas da rede municipal de Pindamonhangaba, 
          ordenadas pelo IEE Atual (média das estimativas).
        </p>

        <div className="mb-12">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="text-blue-500" size={20} />
            Resumo Executivo: Sinalização de Gestão
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-black text-emerald-700">{summaryCounts.Excelência}</p>
              <p className="text-xs font-bold text-emerald-900 uppercase mt-1">🏆 Excelência</p>
              <p className="text-[10px] text-emerald-600 mt-1">&gt; 7.3</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-black text-blue-700">{summaryCounts.Estável}</p>
              <p className="text-xs font-bold text-blue-900 uppercase mt-1">✅ Estável</p>
              <p className="text-[10px] text-blue-600 mt-1">7.0 a 7.3</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-black text-amber-700">{summaryCounts.Atenção}</p>
              <p className="text-xs font-bold text-amber-900 uppercase mt-1">⚠️ Atenção</p>
              <p className="text-[10px] text-amber-600 mt-1">6.6 a 6.99</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-black text-rose-700">{summaryCounts.Alerta}</p>
              <p className="text-xs font-bold text-rose-900 uppercase mt-1">🚨 Alerta</p>
              <p className="text-[10px] text-rose-600 mt-1">&lt; 6.6</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Trophy className="text-amber-500" size={20} />
            Destaques Positivos: Escolas Top Performance
          </h4>
          <p className="text-sm text-slate-500 mb-4">
            Escolas que já atingiram ou superaram a Meta de 2026.
            <br/><span className="font-medium text-blue-600">Sugestão de Gráfico (Dashboard):</span> Gráfico de Barras Horizontais (Top 5) ou Cards de Destaque.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPerformance.map(s => (
              <div key={s.id} className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                <p className="font-bold text-emerald-900 truncate">{s.name}</p>
                <div className="mt-2 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">IEE Atual</p>
                    <p className="text-2xl font-black text-emerald-700">{s.ieeAtual.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Meta</p>
                    <p className="text-sm font-bold text-emerald-700">{s.meta2026.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            {topPerformance.length === 0 && (
              <p className="text-slate-500 italic">Nenhuma escola atingiu a meta ainda.</p>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-500" size={20} />
            Análise de Gap: Maiores Desafios
          </h4>
          <p className="text-sm text-slate-500 mb-4">
            As 5 escolas com a maior distância numérica para alcançar a Meta de 2026.
            <br/><span className="font-medium text-blue-600">Sugestão de Gráfico (Dashboard):</span> Gráfico de Barras de Erro (Gap) ou Gráfico de Cascata (Waterfall).
          </p>
          <div className="space-y-3">
            {gapAnalysis.map((s, i) => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-rose-50 border border-rose-100 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-rose-900">{s.name}</p>
                    <p className="text-xs text-rose-600">Atual: {s.ieeAtual.toFixed(2)} | Meta: {s.meta2026.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-rose-600 font-medium uppercase tracking-wider">Distância</p>
                  <p className="text-lg font-black text-rose-700">-{s.gap.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="text-rose-500" size={20} />
            Análise de Prioridade (Escolas em Alerta)
          </h4>
          <p className="text-sm text-slate-500 mb-4">
            Identificação do menor Ratio (2º ou 5º ano) para direcionamento de intervenção pedagógica nas escolas com IEE &lt; 6.6.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertaSchools.map(s => {
              const is2ndLower = s.ratio2ndYear <= s.ratio5thYear;
              return (
                <div key={s.id} className="bg-white border border-rose-200 p-4 rounded-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-slate-900">{s.name}</p>
                      <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded-full">IEE: {s.ieeAtual.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-4 text-sm mt-3">
                      <div className={`flex-1 p-2 rounded-lg ${is2ndLower ? 'bg-rose-50 border border-rose-200' : 'bg-slate-50 border border-slate-100'}`}>
                        <p className="text-xs text-slate-500 mb-1">Ratio 2º Ano</p>
                        <p className={`font-bold ${is2ndLower ? 'text-rose-700' : 'text-slate-700'}`}>{(s.ratio2ndYear * 100).toFixed(1)}%</p>
                      </div>
                      <div className={`flex-1 p-2 rounded-lg ${!is2ndLower ? 'bg-rose-50 border border-rose-200' : 'bg-slate-50 border border-slate-100'}`}>
                        <p className="text-xs text-slate-500 mb-1">Ratio 5º Ano</p>
                        <p className={`font-bold ${!is2ndLower ? 'text-rose-700' : 'text-slate-700'}`}>{(s.ratio5thYear * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-sm font-medium text-slate-700">
                      Foco de Intervenção: <span className="text-rose-600 font-bold">{is2ndLower ? '2º Ano (Alfabetização)' : '5º Ano (Anos Iniciais)'}</span>
                    </p>
                  </div>
                </div>
              );
            })}
            {alertaSchools.length === 0 && (
              <p className="text-slate-500 italic">Nenhuma escola em estado de alerta.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Table2 className="text-blue-500" size={20} />
            Ranking Geral
          </h4>
          <p className="text-sm text-slate-500 mb-4">
            Lista completa ordenada pelo IEE Atual.
            <br/><span className="font-medium text-blue-600">Sugestão de Gráfico (Dashboard):</span> Tabela de Dados Interativa com paginação e ordenação.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pos</th>
                  <th className="px-4 py-3 font-semibold">Escola</th>
                  <th className="px-4 py-3 font-semibold text-center">Sinalização</th>
                  <th className="px-4 py-3 font-semibold text-right">IEE Atual</th>
                  <th className="px-4 py-3 font-semibold text-right hidden sm:table-cell">IEE 2024</th>
                  <th className="px-4 py-3 font-semibold text-right hidden sm:table-cell">Meta 2026</th>
                  <th className="px-4 py-3 font-semibold text-center">Evolução</th>
                  <th className="px-4 py-3 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedSchools.map((s, i) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-500">{i + 1}º</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                    <td className="px-4 py-3 text-center">
                      {getCategory(s.ieeAtual) === 'Excelência' && <span title="Excelência" className="text-xl">🏆</span>}
                      {getCategory(s.ieeAtual) === 'Estável' && <span title="Estável" className="text-xl">✅</span>}
                      {getCategory(s.ieeAtual) === 'Atenção' && <span title="Atenção" className="text-xl">⚠️</span>}
                      {getCategory(s.ieeAtual) === 'Alerta' && <span title="Alerta" className="text-xl">🚨</span>}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900 text-right">{s.ieeAtual.toFixed(2)}</td>
                    <td className="px-4 py-3 text-slate-500 text-right hidden sm:table-cell">{s.iee2024.toFixed(2)}</td>
                    <td className="px-4 py-3 text-slate-500 text-right hidden sm:table-cell">{s.meta2026.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        s.evolucao === 'Crescimento' ? 'bg-emerald-100 text-emerald-700' :
                        s.evolucao === 'Queda' ? 'bg-rose-100 text-rose-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {s.evolucao === 'Crescimento' && <TrendingUp size={12} />}
                        {s.evolucao === 'Queda' && <TrendingDown size={12} />}
                        {s.evolucao === 'Estável' && <Minus size={12} />}
                        <span className="hidden sm:inline">{s.evolucao}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                        s.isAwarded ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {s.isAwarded ? '🏆 Premiada' : '⚠️ Não Bateu'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
