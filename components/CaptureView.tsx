
import React, { useState, useRef } from 'react';
import { processTranscriptToKnowledge } from '../services/geminiService';
import { KnowledgeEntry, Language } from '../types';
import { translations } from '../translations';

interface CaptureViewProps {
  onAddEntry: (entry: KnowledgeEntry) => void;
  language: Language;
  entries: KnowledgeEntry[];
}

const CaptureView: React.FC<CaptureViewProps> = ({ onAddEntry, language, entries }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  const t = translations[language].ingest;
  const recentEntries = entries.slice(0, 3);

  const startRecording = () => {
    setIsRecording(true);
    setSeconds(0);
    const demoTranscript = language === 'en' 
      ? 'Strategic synthesis: "Accelerate deep-learning integration to optimize core asset indexing by 40%."'
      : '战略合成：“加速深度学习集成，以优化 40% 的核心资产索引。”';
    setTranscript(demoTranscript);
    timerRef.current = window.setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsProcessing(true);
    const result = await processTranscriptToKnowledge(transcript, language);
    onAddEntry({
      id: Date.now().toString(),
      timestamp: Date.now(),
      title: result.title || 'Titan Entry',
      content: transcript,
      summary: result.summary || '',
      tags: result.tags || [],
      type: (result.type as any) || 'operations',
      valueScore: result.valueScore || 70,
      actionItems: result.actionItems || [],
      language: language
    });
    setIsProcessing(false);
    setTranscript('');
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-8 items-start text-left">
      <div className="lg:col-span-7 space-y-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Audlis Titan Node</span>
          </div>
          <h2 className="text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-none">
            {t.title} <span className="text-tech">{t.titleAccent}</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg font-medium leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-blue-100/20 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
          <div className="absolute top-1/2 left-20 -translate-y-1/2 w-64 h-64 bg-blue-100/20 blur-[100px] pointer-events-none group-hover:bg-blue-200/30 transition-all"></div>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
              isRecording ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'tech-gradient text-white shadow-[0_0_40px_rgba(0,102,255,0.3)]'
            } ${isProcessing ? 'opacity-20' : 'hover:scale-105 active:scale-95'}`}
          >
            {isRecording ? (
              <div className="w-8 h-8 bg-white rounded-sm animate-pulse"></div>
            ) : (
              <div className="w-0 h-0 border-l-[18px] border-l-white border-y-[12px] border-y-transparent ml-2"></div>
            )}
          </button>
          
          <div className="flex-1 space-y-2 relative z-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acoustic Feed Ingest</span>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-extrabold text-slate-900 tabular-nums tracking-tighter">
                {formatTime(seconds)}
              </span>
              <span className={`text-xs font-bold ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                {isRecording ? 'STREAMING' : 'IDLE'}
              </span>
            </div>
            <div className="flex gap-1 h-8 items-end">
               {Array.from({length: 30}).map((_, i) => (
                 <div key={i} 
                      className={`w-1 transition-all duration-200 rounded-full ${isRecording ? 'bg-blue-500' : 'bg-slate-100'}`} 
                      style={{ height: isRecording ? `${30 + Math.random() * 70}%` : '15%' }}></div>
               ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-8">
        <div className="bg-[#000510] rounded-[2.5rem] p-10 text-white shadow-2xl space-y-8 overflow-hidden relative">
          <div className="absolute -bottom-10 -right-10 opacity-10">
             <div className="text-[20rem] font-black leading-none select-none italic text-blue-500">A</div>
          </div>
          <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] relative z-10">Vault Registry</h3>
          <div className="space-y-6 relative z-10">
            {recentEntries.map(entry => (
              <div key={entry.id} className="border-l-4 border-blue-900 pl-6 space-y-1 hover:border-blue-400 transition-all cursor-default group">
                <span className="text-[9px] font-bold text-slate-600 uppercase group-hover:text-blue-300 transition-colors">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                <p className="text-base font-bold text-slate-300 group-hover:text-white transition-colors line-clamp-1">{entry.title}</p>
              </div>
            ))}
          </div>
          <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors relative z-10">Expand Archive →</button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Sync Confidence</p>
              <p className="text-xl font-black text-slate-900">100%</p>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Core Health</p>
              <p className="text-xl font-black text-emerald-500 italic">OPTIMAL</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureView;
