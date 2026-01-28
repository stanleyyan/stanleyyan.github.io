
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, YAxis } from 'recharts';
import { KnowledgeEntry, Language } from '../types';
import { translations } from '../translations';

interface AnalyticsViewProps {
  entries: KnowledgeEntry[];
  language: Language;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ entries, language }) => {
  const t = translations[language].intel;
  
  const typeData = [
    { name: t.categories.strategy, value: entries.filter(e => e.type === 'strategy').length, key: 'strategy' },
    { name: t.categories.training, value: entries.filter(e => e.type === 'training').length, key: 'training' },
    { name: t.categories.operations, value: entries.filter(e => e.type === 'operations').length, key: 'operations' },
    { name: t.categories.client, value: entries.filter(e => e.type === 'client').length, key: 'client' },
  ].filter(d => d.value > 0);

  const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#64748B'];

  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-right-8 duration-700 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-1 bg-emerald-500 rounded-full"></div>
             <span className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em]">{t.dashboard}</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-slate-500 mt-3 text-base lg:text-xl font-medium max-w-xl">{t.description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
           <div className="px-8 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col min-w-[140px]">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{language === 'zh' ? '总资产值' : 'Total Asset Value'}</span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">$142,500</span>
           </div>
           <div className="px-8 py-5 bg-emerald-500 border border-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 flex flex-col min-w-[140px]">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">{language === 'zh' ? '本周增长' : 'Weekly Growth'}</span>
              <span className="text-2xl font-extrabold text-white tracking-tight">+12.4%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t.stats.valueIndex, val: Math.round(entries.reduce((a, b) => a + (b.valueScore || 0), 0) / (entries.length || 1)) + '%', color: 'text-sky-600', icon: '💎', sub: 'Performance' },
          { label: t.stats.trainingNodes, val: entries.filter(e => e.type === 'training').length, color: 'text-emerald-600', icon: '🎓', sub: 'Education' },
          { label: t.stats.total, val: entries.length, color: 'text-slate-800', icon: '🏦', sub: 'Registry' },
          { label: t.stats.delta, val: '+24', color: 'text-amber-600', icon: '📈', sub: 'Strategic' },
        ].map((stat, i) => (StatCard(stat, i)))}
      </div>

      {/* Pulse Section */}
      <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm overflow-x-auto">
         <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8">{language === 'zh' ? '智力摄取频率' : 'Intelligence Ingestion Frequency'}</h3>
         <div className="flex gap-2.5 min-w-[700px]">
            {Array.from({length: 24}).map((_, i) => (
              <div key={i} className="flex-1 space-y-2.5">
                 {Array.from({length: 7}).map((_, j) => {
                   const opacity = Math.random() > 0.4 ? (Math.random() * 0.8 + 0.2) : 0.08;
                   return <div key={j} className="h-5 rounded-md bg-sky-500" style={{ opacity }}></div>;
                 })}
              </div>
            ))}
         </div>
         <div className="flex justify-between mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span>Jan 2025</span>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-sky-500"></div>
               <span>Current Pulse</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1 bg-white border border-slate-100 p-10 rounded-[2.5rem] flex flex-col h-[500px] shadow-sm">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-10">{t.catChart}</h3>
          <div className="flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeData} innerRadius="75%" outerRadius="100%" paddingAngle={8} dataKey="value" stroke="none">
                  {typeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-5xl font-extrabold text-slate-900">{entries.length}</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Assets</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
             {typeData.map((d, i) => (
               <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-xs font-bold text-slate-500">{d.name}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="xl:col-span-2 bg-white border border-slate-100 p-10 rounded-[2.5rem] flex flex-col h-[500px] shadow-sm">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-10">{t.densityChart}</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} fontWeight="bold" axisLine={false} tickLine={false} width={100} />
                <Tooltip cursor={{fill: 'rgba(241,245,249,0.5)'}} contentStyle={{ backgroundColor: '#ffffff', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }} />
                <Bar dataKey="value" fill="#0EA5E9" radius={[0, 8, 8, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                <p className="text-sm font-bold text-slate-800 italic">Audlis Axis v16.0</p>
             </div>
             <div className="text-right space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Integrity</p>
                <p className="text-sm font-bold text-emerald-600">High-Fidelity Verified</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function StatCard(stat: any, i: number) {
  return (
    <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2rem] relative overflow-hidden group hover:shadow-xl transition-all duration-500 shadow-sm">
      <div className="absolute -top-2 -right-2 p-6 text-6xl opacity-[0.05] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 pointer-events-none">{stat.icon}</div>
      <div className="flex justify-between items-start mb-4">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</p>
      </div>
      <p className={`text-4xl lg:text-5xl font-extrabold ${stat.color} tracking-tight`}>{stat.val}</p>
      <div className="mt-6 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
         <div className={`h-full ${stat.color.replace('text-', 'bg-')}`} style={{ width: '65%', opacity: 0.6 }}></div>
      </div>
      <p className="mt-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">{stat.sub} Level Metrical</p>
    </div>
  );
}

export default AnalyticsView;
