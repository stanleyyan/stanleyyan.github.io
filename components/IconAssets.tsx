
import React, { useState } from 'react';
import BrandIcon from './BrandIcon';
import { generateBrandImage } from '../services/geminiService';

const IconAssets: React.FC<{ language: string }> = ({ language }) => {
  const isZh = language === 'zh';
  const [genImg, setGenImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customStyle, setCustomStyle] = useState('');

  const presets = [
    { label: isZh ? '碎裂玻璃质感' : 'Glass Fracture', value: 'Abstract shattered glass sculpture, sharp translucent edges, navy and silver lighting' },
    { label: isZh ? '拉丝铝金属' : 'Brushed Aluminum', value: 'Industrial precision brushed metal, complex mechanical geometry, soft raytraced shadows' },
    { label: isZh ? '液态水银形态' : 'Liquid Mercury', value: 'Flowing molten silver, high reflectivity, dark obsidian floor, minimalist abstract' }
  ];

  const handleGenerate = async (styleContext: string) => {
    setIsGenerating(true);
    const context = styleContext || customStyle || "Geometric 3D glass motif";
    const img = await generateBrandImage(context);
    if (img) setGenImg(img);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-32 py-16 text-left">
      {/* Platform IDs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Identity: io.audlis.app</p>
          <div className="bg-[#020617] rounded-[4rem] p-12 flex flex-col items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* The finalized high-end bitmap logo container */}
            <div className="w-56 h-56 bg-black/40 backdrop-blur-md rounded-[3.5rem] flex items-center justify-center border border-white/10 z-10 shadow-inner">
               <BrandIcon className="w-44 h-44" animate={true} />
            </div>

            <div className="mt-10 text-center z-10">
               <h3 className="text-white text-4xl font-black tracking-tighter uppercase">AUDLIS</h3>
               <p className="text-slate-500 text-[11px] font-black tracking-[0.4em] mt-3 uppercase">Bitmap Master v38.5</p>
            </div>
          </div>
        </div>

        {/* Nano Banana Designer Section */}
        <div className="space-y-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nano Banana Studio (Asset Gen)</p>
          <div className="bg-white rounded-[4rem] p-10 flex flex-col border border-slate-100 shadow-xl min-h-[500px]">
             
             <div className="flex-1 flex items-center justify-center mb-10">
                {genImg ? (
                  <img src={genImg} alt="AI Generated Variant" className="w-64 h-64 rounded-[3.5rem] object-cover shadow-2xl border border-slate-100" />
                ) : (
                  <div className="w-64 h-64 bg-slate-50 rounded-[3.5rem] flex flex-col items-center justify-center border border-dashed border-slate-200 gap-4 text-center px-6">
                     <span className="text-4xl opacity-30">🖼️</span>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed italic">Asset Fidelity Sync: ON</p>
                  </div>
                )}
             </div>

             <div className="space-y-6">
               <div className="flex flex-wrap gap-2">
                 {presets.map(p => (
                   <button 
                     key={p.value}
                     onClick={() => handleGenerate(p.value)}
                     disabled={isGenerating}
                     className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-[9px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-all"
                   >
                     {p.label}
                   </button>
                 ))}
               </div>

               <div className="relative">
                 <input 
                   type="text"
                   placeholder={isZh ? "生成配套视觉资产..." : "Generate supporting visual assets..."}
                   value={customStyle}
                   onChange={(e) => setCustomStyle(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500/20 placeholder:text-slate-300"
                 />
                 <button 
                    onClick={() => handleGenerate(customStyle)}
                    disabled={isGenerating || !customStyle}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-[#020617] text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-20"
                 >
                   {isGenerating ? '...' : 'GENERATE'}
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl border-l-8 border-slate-950 pl-12 space-y-8">
        <h4 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
          {isZh ? '视觉主权：资产级标准' : 'Visual Sovereignty: Asset Standards'}
        </h4>
        <p className="text-2xl text-slate-600 font-medium leading-relaxed">
          {isZh ? 
            '在 v38.5 中，我们放弃了代码模拟，转而采用工业级的位图资产作为核心。这一选定的 3D "A" 标志现在是 Audlis 跨 iOS、Android、PC 和 Web 的唯一身份视觉源。所有的代码逻辑现在都服务于这一高保真视觉标准的完美呈现。' : 
            'In v38.5, we move beyond code simulation to embrace industrial-grade bitmap assets as our core. The selected 3D "A" logo is now the singular visual source of truth for Audlis across iOS, Android, PC, and Web. All code logic now serves to perfectly present this high-fidelity visual standard.'}
        </p>
      </div>
    </div>
  );
};

export default IconAssets;
