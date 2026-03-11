import React from 'react';
import { ProcessedSchool } from '../data';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Award, Target, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  data: ProcessedSchool[];
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const awardedCount = data.filter(d => d.isAwarded).length;
  const notAwardedCount = data.length - awardedCount;
  
  const growthCount = data.filter(d => d.evolucao === 'Crescimento').length;
  const declineCount = data.filter(d => d.evolucao === 'Queda').length;
  
  const bottleneck2nd = data.filter(d => d.bottleneck.includes('2º ano')).length;
  const bottleneck5th = data.filter(d => d.bottleneck.includes('5º ano')).length;

  const pieData = [
    { name: 'BATEU A META - PREMIADA', value: awardedCount, color: '#10b981' },
    { name: 'NÃO BATEU A META', value: notAwardedCount, color: '#f59e0b' }
  ];

  const evolucaoData = [
    { name: 'Crescimento', value: growthCount, color: '#3b82f6' },
    { name: 'Queda', value: declineCount, color: '#ef4444' },
    { name: 'Estável', value: data.length - growthCount - declineCount, color: '#94a3b8' }
  ];

  // Top 5 for the grouped bar chart (Série Histórica)
  const sortedByIeeAtual = [...data].sort((a, b) => b.ieeAtual - a.ieeAtual);
  const top5 = sortedByIeeAtual.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Escolas Premiadas</p>
            <h3 className="text-2xl font-bold text-slate-900">{awardedCount} <span className="text-sm font-normal text-slate-500">/ 37</span></h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Não Bateram a Meta</p>
            <h3 className="text-2xl font-bold text-slate-900">{notAwardedCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Em Crescimento</p>
            <h3 className="text-2xl font-bold text-slate-900">{growthCount} <span className="text-sm font-normal text-slate-500">escolas</span></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Em Queda</p>
            <h3 className="text-2xl font-bold text-slate-900">{declineCount} <span className="text-sm font-normal text-slate-500">escolas</span></h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Status de Premiação</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Evolução Histórica (2024 vs Atual)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={evolucaoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {evolucaoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Série Histórica: Top 5 Escolas (Barras Agrupadas)</h3>
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">Visualização Sugerida</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top5} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis domain={[0, 10]} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Legend />
                <Bar dataKey="iee2024" name="IEE 2024 (Real)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ieeAtual" name="IEE Atual (Média)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta2026" name="Meta 2026" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
