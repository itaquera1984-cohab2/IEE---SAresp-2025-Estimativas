import React, { useState } from 'react';
import { processedData } from './GoalAnalyst';
import { SchoolDashboard } from './components/SchoolDashboard';
import { DataTable } from './components/DataTable';
import { ExportView } from './components/ExportView';
import { ReportView } from './components/ReportView';
import { BarChart3, Table2, FileJson, GraduationCap, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'table' | 'export' | 'report'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">IEE Analytics</h1>
                <p className="text-xs text-slate-500 font-medium">Pindamonhangaba - SP</p>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <BarChart3 size={16} />
                <span>Visão Geral</span>
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'table' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Table2 size={16} />
                <span>Dados Detalhados</span>
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'report' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <FileText size={16} />
                <span>Relatório Final</span>
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'export' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <FileJson size={16} />
                <span>Exportar (BI)</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center p-2 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <BarChart3 size={20} />
          <span className="text-[10px] mt-1 font-medium">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`flex flex-col items-center p-2 ${activeTab === 'table' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <Table2 size={20} />
          <span className="text-[10px] mt-1 font-medium">Tabela</span>
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex flex-col items-center p-2 ${activeTab === 'report' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <FileText size={20} />
          <span className="text-[10px] mt-1 font-medium">Relatório</span>
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex flex-col items-center p-2 ${activeTab === 'export' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <FileJson size={20} />
          <span className="text-[10px] mt-1 font-medium">Exportar</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {activeTab === 'dashboard' && 'Análise de Eficiência Educacional (IEE)'}
            {activeTab === 'table' && 'Tabela de Resultados por Escola'}
            {activeTab === 'report' && 'Relatório Final Consolidado'}
            {activeTab === 'export' && 'Integração de Dados'}
          </h2>
          <p className="text-slate-500 mt-1">
            {activeTab === 'dashboard' && 'Visão consolidada das 37 escolas da rede municipal em relação às metas de 2026.'}
            {activeTab === 'table' && 'Explore os dados detalhados, filtre e ordene as escolas conforme a necessidade.'}
            {activeTab === 'report' && 'Ranking geral, destaques positivos e análise de gap de todas as escolas.'}
            {activeTab === 'export' && 'Gere os dados no formato JSON ou Markdown para importar no seu software de BI favorito.'}
          </p>
        </div>

        {activeTab === 'dashboard' && <SchoolDashboard data={processedData} />}
        {activeTab === 'table' && <DataTable data={processedData} />}
        {activeTab === 'report' && <ReportView />}
        {activeTab === 'export' && <ExportView data={processedData} />}
      </main>
    </div>
  );
}
