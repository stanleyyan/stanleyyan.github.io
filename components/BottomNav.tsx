
import React from 'react';
import { NavigationTab, Language } from '../types';
import { translations } from '../translations';

interface BottomNavProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  language: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, language }) => {
  const t = translations[language];
  const navItems = [
    { id: NavigationTab.Ingest, icon: '⚡', label: t.nav.mobileIngest },
    { id: NavigationTab.Assets, icon: '🏛️', label: t.nav.mobileAssets },
    { id: NavigationTab.Intelligence, icon: '📈', label: t.nav.mobileIntel },
    { id: NavigationTab.Settings, icon: '⚙️', label: t.nav.mobileSettings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-8 pt-2">
      <nav className="max-w-md mx-auto bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-[2rem] flex items-center justify-around p-3 shadow-2xl shadow-slate-200/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-2 flex-1 py-3 transition-all duration-300 rounded-2xl ${
              activeTab === item.id 
                ? 'bg-sky-50 text-sky-600' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
