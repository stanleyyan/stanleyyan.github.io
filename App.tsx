
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import CaptureView from './components/CaptureView';
import LibraryView from './components/LibraryView';
import AnalyticsView from './components/AnalyticsView';
import IconAssets from './components/IconAssets';
import { NavigationTab, KnowledgeEntry, Language } from './types';
import { translations } from './translations';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Ingest);
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('audlis_lang');
    return (saved as Language) || 'zh';
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('audlis_lang', language);
  }, [language]);

  useEffect(() => {
    const saved = localStorage.getItem('audlis_entries');
    if (saved && JSON.parse(saved).length > 1) {
      setEntries(JSON.parse(saved));
    } else {
      const initial: KnowledgeEntry[] = [
        {
          id: '1',
          timestamp: Date.now() - 3600000 * 2,
          title: language === 'zh' ? 'Q1 季度战略对齐会议' : 'Q1 Strategic Alignment',
          content: 'Focus on scaling global operations and integrating AI nodes.',
          summary: language === 'zh' 
            ? '确立了以 AI 驱动的全球化扩张战略，重点优化人力资源配置与自动化流程。'
            : 'Established AI-driven global expansion strategy, focusing on HR optimization and automated workflows.',
          tags: ['strategy', 'global', 'AI'],
          type: 'strategy',
          valueScore: 94,
          actionItems: language === 'zh' ? ['制定全球化路线图', '启动 AI 节点集成计划'] : ['Develop global roadmap', 'Initiate AI node integration'],
          language: language
        },
        {
          id: '2',
          timestamp: Date.now() - 86400000,
          title: language === 'zh' ? '核心产品技术架构研讨' : 'Core Architecture Review',
          content: 'Moving towards a decentralized knowledge index.',
          summary: language === 'zh' 
            ? '针对分布式知识索引架构进行深度评审，确保高并发下的资产同步稳定性。'
            : 'In-depth review of decentralized knowledge index architecture, ensuring sync stability under high loads.',
          tags: ['tech', 'architecture', 'stability'],
          type: 'operations',
          valueScore: 88,
          actionItems: language === 'zh' ? ['优化数据库分片方案', '升级边缘同步节点'] : ['Optimize DB sharding', 'Upgrade edge sync nodes'],
          language: language
        },
        {
          id: '3',
          timestamp: Date.now() - 86400000 * 3,
          title: language === 'zh' ? '客户成功案例库建设' : 'Customer Success Library',
          content: 'Building a shared repository for client wins.',
          summary: language === 'zh' 
            ? '通过分析 50+ 真实案例，提炼出关键成功因素并转化为可复制的培训模组。'
            : 'Analyzed 50+ cases to extract key success factors into reproducible training modules.',
          tags: ['client', 'training', 'success'],
          type: 'training',
          valueScore: 91,
          actionItems: language === 'zh' ? ['发布成功案例白皮书', '组织跨部门培训营'] : ['Publish success whitepaper', 'Organize cross-dept training'],
          language: language
        }
      ];
      setEntries(initial);
      localStorage.setItem('audlis_entries', JSON.stringify(initial));
    }
  }, [language]);

  const handleAddEntry = (entry: KnowledgeEntry) => {
    const newEntryWithLang = { ...entry, language };
    const newEntries = [newEntryWithLang, ...entries];
    setEntries(newEntries);
    localStorage.setItem('audlis_entries', JSON.stringify(newEntries));
    setActiveTab(NavigationTab.Assets);
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.Ingest:
        return <CaptureView onAddEntry={handleAddEntry} language={language} entries={entries} />;
      case NavigationTab.Assets:
        return <LibraryView entries={entries} language={language} />;
      case NavigationTab.Intelligence:
        return <AnalyticsView entries={entries} language={language} />;
      case NavigationTab.Settings:
        return (
          <div className="space-y-16 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Standard Settings Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 sm:p-16 text-left">
              <h2 className="text-3xl font-extrabold mb-12 text-slate-900">{t.settings.title}</h2>
              <div className="space-y-10">
                <div className="flex items-center justify-between py-6 border-b border-slate-50">
                  <div className="pr-4">
                    <p className="text-base font-extrabold text-slate-800">{t.settings.langLabel}</p>
                    <p className="text-sm text-slate-400 font-medium">Configure primary synthesis interface</p>
                  </div>
                  <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <button onClick={() => setLanguage('en')} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>English</button>
                    <button onClick={() => setLanguage('zh')} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${language === 'zh' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>中文简体</button>
                  </div>
                </div>
                
                <div className="py-6 border-b border-slate-50">
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-4">{t.settings.modelLabel}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="px-6 py-4 bg-white border-2 border-sky-500 rounded-2xl text-left relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-2 text-sky-500">✓</div>
                       <p className="font-extrabold text-slate-900">Audlis Pro (Pro Core)</p>
                       <p className="text-xs text-slate-400 mt-1 font-bold">Deep Reasoning Synthesis</p>
                    </button>
                    <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-left hover:border-sky-200 transition-colors">
                       <p className="font-extrabold text-slate-500">Audlis Flash (Speed Core)</p>
                       <p className="text-xs text-slate-300 mt-1 font-bold">Real-time Rapid Indexing</p>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-6">
                  <div className="pr-4 text-left">
                    <p className="text-base font-extrabold text-slate-800">{t.settings.syncLabel}</p>
                    <p className="text-sm text-slate-400 font-medium">{language === 'zh' ? '已连接至 Audlis.com 云拓扑节点' : 'Connected to Audlis.com cloud topology'}</p>
                  </div>
                  <div className="w-14 h-8 bg-sky-500 rounded-full flex items-center px-1 shrink-0 cursor-pointer shadow-lg shadow-sky-200">
                    <div className="w-6 h-6 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>

                <div className="pt-10 flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-slate-50 mt-10">
                  <button className="w-full sm:w-auto bg-slate-50 text-slate-400 border border-slate-100 px-10 py-4 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all font-black text-sm uppercase tracking-widest">{t.settings.signOut}</button>
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">Deployment ID: com.audlis.core</span>
                    <span className="text-[11px] text-sky-500 font-bold">v16.0 ETHERIC PRO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Assets Preview */}
            <div className="text-left space-y-10">
              <div className="px-2">
                <h2 className="text-3xl font-extrabold text-slate-900">{language === 'zh' ? '视觉标准规范' : 'Visual Identity Standards'}</h2>
                <p className="text-base text-slate-400 mt-3 font-medium">{language === 'zh' ? '用于跨平台部署的品牌图标规范与设计哲学。' : 'Brand icon standards and design philosophy for multi-platform deployment.'}</p>
              </div>
              <IconAssets language={language} />
            </div>
          </div>
        );
      default:
        return <CaptureView onAddEntry={handleAddEntry} language={language} entries={entries} />;
    }
  };

  return (
    <div className={`flex bg-[#f8fafc] min-h-screen text-slate-800 overflow-x-hidden ${language === 'zh' ? 'lang-zh' : ''}`}>
      <style>{`
        .lang-zh { font-family: 'Inter', "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; }
        .lang-zh h1, .lang-zh h2, .lang-zh h3, .lang-zh button { font-weight: 800 !important; }
        .lang-zh p, .lang-zh span { line-height: 1.7; font-weight: 500; }
        .animate-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="hidden lg:block shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} language={language} setLanguage={setLanguage} />
      </div>
      
      <main className="flex-1 lg:ml-72 p-6 sm:p-10 xl:p-20 min-h-screen pb-32 lg:pb-20 w-full flex flex-col">
        <div className="max-w-[1400px] w-full mx-auto flex-1">
          {renderContent()}
        </div>
      </main>

      <div className="lg:hidden">
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
      </div>
    </div>
  );
};

export default App;
