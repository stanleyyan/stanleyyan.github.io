
import React, { useState } from 'react';
import { KnowledgeEntry, Language } from '../types';
import { translations } from '../translations';

interface LibraryViewProps {
  entries: KnowledgeEntry[];
  language: Language;
}

const LibraryView: React.FC<LibraryViewProps> = ({ entries, language }) => {
  const [search, setSearch] = useState('');
  const t = translations[language].assets;

  const filtered = entries.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-16 py-12 text-left">
      <div className="flex justify-between items-end border-b-2 border-black pb-8">
        <div>
          <h2 className="text-6xl font-black text-black tracking-tighter uppercase">{t.title}</h2>
          <p className="text-slate-400 font-bold text-sm uppercase mt-2">{t.description}</p>
        </div>
        <input 
          type="text" 
          placeholder="SEARCH"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-b border-slate-200 text-sm font-black text-black focus:outline-none focus:border-black w-48 py-2 placeholder:text-slate-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
        {filtered.map((entry) => (
          <div key={entry.id} className="space-y-6 group">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-300 border-b border-slate-100 pb-2">
              <span>{entry.type}</span>
              <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-black text-black uppercase leading-tight line-clamp-2">{entry.title}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">{entry.summary}</p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm font-black text-black">{entry.valueScore}%</span>
              <button className="text-[10px] font-black uppercase tracking-widest text-black hover:underline">Open →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryView;
