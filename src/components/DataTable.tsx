import React, { useState } from 'react';
import { ProcessedSchool } from '../GoalAnalyst';
import { Search, ArrowUpDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DataTableProps {
  data: ProcessedSchool[];
}

type SortField = 'name' | 'iee2024' | 'ieeAtual' | 'meta2026' | 'evolucao';

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('ieeAtual');
  const [sortDesc, setSortDesc] = useState(true);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortField(field);
      setSortDesc(true);
    }
  };

  const filteredData = data.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.bottleneck.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.awardStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }
    
    return sortDesc ? (valB as number) - (valA as number) : (valA as number) - (valB as number);
  });

  const SortIcon = () => <ArrowUpDown size={14} className="inline ml-1 text-slate-400" />;

  const getEvolucaoIcon = (evolucao: string) => {
    if (evolucao === 'Crescimento') return <TrendingUp size={16} className="text-emerald-500 mr-1" />;
    if (evolucao === 'Queda') return <TrendingDown size={16} className="text-red-500 mr-1" />;
    return <Minus size={16} className="text-slate-400 mr-1" />;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-800">Resultados Detalhados (37 Escolas)</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar escola, status ou gargalo..."
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('name')}>
                Escola <SortIcon />
              </th>
              <th className="px-6 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('iee2024')}>
                IEE 2024 <SortIcon />
              </th>
              <th className="px-6 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('ieeAtual')}>
                IEE Atual (Média) <SortIcon />
              </th>
              <th className="px-6 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('meta2026')}>
                Meta 2026 <SortIcon />
              </th>
              <th className="px-6 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('evolucao')}>
                Evolução <SortIcon />
              </th>
              <th className="px-6 py-3 font-medium">Status da Premiação</th>
              <th className="px-6 py-3 font-medium">Gargalo (Perda de Pontos)</th>
              <th className="px-6 py-3 font-medium">Sugestão de Visualização</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((school) => (
              <tr key={school.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{school.name}</td>
                <td className="px-6 py-4 text-slate-500">{school.iee2024.toFixed(2)}</td>
                <td className="px-6 py-4 font-semibold text-blue-600">
                  {school.ieeAtual.toFixed(2)}
                  <span className="text-[10px] text-slate-400 font-normal block">
                    (Est.1: {school.ieeEstimado1.toFixed(2)} | Est.2: {school.ieeEstimado2.toFixed(2)})
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{school.meta2026.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getEvolucaoIcon(school.evolucao)}
                    <span className={
                      school.evolucao === 'Crescimento' ? 'text-emerald-600 font-medium' :
                      school.evolucao === 'Queda' ? 'text-red-600 font-medium' : 'text-slate-500'
                    }>
                      {school.evolucao}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {school.isAwarded ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      🏆 BATEU A META - PREMIADA
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      ⚠️ NÃO BATEU A META
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                    school.bottleneck.includes('2º') ? 'bg-red-50 text-red-700 border border-red-200' : 
                    school.bottleneck.includes('5º') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 
                    school.isAwarded ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {school.bottleneck}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-[11px] max-w-xs truncate" title={school.vizSuggestion}>
                  {school.vizSuggestion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedData.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            Nenhuma escola encontrada para a busca "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};
