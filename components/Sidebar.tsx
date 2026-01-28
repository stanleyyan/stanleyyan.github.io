
import React from 'react';
import { NavigationTab, Language } from '../types';
import { translations } from '../translations';
import BrandIcon from './BrandIcon';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, language, setLanguage }) => {
  const t = translations[language];
  
  const navItems = [
    { id: NavigationTab.Ingest, label: t.nav.ingest },
    { id: NavigationTab.Assets, label: t.nav.assets },
    { id: NavigationTab.Intelligence, label: t.nav.intelligence },
    { id: NavigationTab.Settings, label: t.nav.settings },
  ];

  return (
    <div className="w-72 bg-white h-screen border-r border-slate-100 flex flex-col px-10 py-16 fixed left-0 top-0 z-50">
      <div className="mb-20 flex flex-col items-start gap-5">
        <BrandIcon className="w-16 h-16" animate={true} />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{t.brand}</h1>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em]">{t.tagline}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left group flex items-center px-5 py-4 rounded-2xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-slate-950 text-white shadow-xl shadow-slate-200' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className={`text-sm font-black uppercase tracking-wider`}>
              {item.label}
            </span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-100 space-y-8">
        <div className="flex gap-6 items-center">
          <button onClick={() => setLanguage('zh')} className={`text-[10px] font-black tracking-widest ${language === 'zh' ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}>ZH</button>
          <div className="w-[1px] h-3 bg-slate-200"></div>
          <button onClick={() => setLanguage('en')} className={`text-[10px] font-black tracking-widest ${language === 'en' ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}>EN</button>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_5px_rgba(0,82,255,0.8)]"></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Universal Node v22.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
