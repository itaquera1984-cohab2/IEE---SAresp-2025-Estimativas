import React, { useState } from 'react';
import { ProcessedSchool, generateJSON, generateMarkdownTable } from '../data';
import { Copy, Check, Download } from 'lucide-react';

interface ExportViewProps {
  data: ProcessedSchool[];
}

export const ExportView: React.FC<ExportViewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'json' | 'markdown'>('json');
  const [copied, setCopied] = useState(false);

  const jsonContent = generateJSON(data);
  const markdownContent = generateMarkdownTable(data);
  
  const currentContent = activeTab === 'json' ? jsonContent : markdownContent;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `iee_export_pindamonhangaba.${activeTab === 'json' ? 'json' : 'md'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Exportação para BI</h2>
        <p className="text-slate-500 text-sm">
          Copie ou baixe os dados processados no formato desejado para integração com Power BI, Tableau, Looker ou outras ferramentas.
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
          <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('json')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'json' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              JSON
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'markdown' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Markdown Table
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Download size={16} />
              <span>Baixar Arquivo</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <pre className="bg-slate-900 text-slate-50 p-6 rounded-xl overflow-x-auto text-sm font-mono max-h-[500px] shadow-inner">
            <code>{currentContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
