
import { Language } from './types';

export const translations = {
  en: {
    brand: "Audlis",
    tagline: "Acoustic Axis",
    nav: {
      ingest: "Index",
      assets: "Registry",
      intelligence: "Analysis",
      settings: "System",
      mobileIngest: "Index",
      mobileAssets: "Assets",
      mobileIntel: "Intel",
      mobileSettings: "Core"
    },
    sidebar: {
      syncStatus: "System Sync Active",
      nodesConnected: "Online",
      langSwitch: "Locale"
    },
    ingest: {
      feed: "Intel Stream",
      title: "Synthesize",
      titleAccent: "Knowledge",
      description: "Audlis converts unstructured acoustic streams into high-precision knowledge registry. The definitive platform for enterprise intelligence synthesis.",
      buttonStart: "Capture",
      buttonStop: "Refine",
      processing: "Processing...",
      aiThought: "Synthesizing structural nodes from acoustic frequency patterns...",
      streaming: "Capture Active",
      stats: {
        density: "Density Index",
        longevity: "Permanence",
        latency: "Realtime"
      }
    },
    assets: {
      ledger: "Asset Ledger",
      title: "Registry",
      description: "Structured intelligence assets indexed via Audlis Axis protocols.",
      searchPlaceholder: "Query Registry...",
      valueLabel: "Score",
      decisionNodes: "Refined Nodes",
      empty: "Registry Empty",
      emptySub: "No data captured.",
      types: {
        strategy: "Strategy",
        training: "Training",
        operations: "Operations",
        client: "External"
      }
    },
    intel: {
      dashboard: "Analytics Engine",
      title: "Intelligence yield",
      description: "Structural density and growth metrics of synthesized knowledge.",
      catChart: "Domain Map",
      densityChart: "Yield Distribution",
      stats: {
        valueIndex: "Yield",
        trainingNodes: "Nodes",
        total: "Registry",
        delta: "Delta"
      },
      categories: {
        strategy: "Strategy",
        training: "Training",
        operations: "Ops",
        client: "External"
      }
    },
    settings: {
      title: "System Infrastructure",
      modelLabel: "Cognitive Engine",
      syncLabel: "Cloud Topology",
      syncSub: "Distributed sync across multiple end-points",
      signOut: "Deactivate Node",
      langLabel: "Display Language"
    }
  },
  zh: {
    brand: "Audlis (语枢)",
    tagline: "声学智能中轴",
    nav: {
      ingest: "捕获索引",
      assets: "情报金库",
      intelligence: "数据分析",
      settings: "系统设置",
      mobileIngest: "捕获",
      mobileAssets: "资产",
      mobileIntel: "情报",
      mobileSettings: "设置"
    },
    sidebar: {
      syncStatus: "系统同步活跃",
      nodesConnected: "已在线",
      langSwitch: "界面语言"
    },
    ingest: {
      feed: "情报流",
      title: "合成",
      titleAccent: "知识资产",
      description: "Audlis 将非结构化声学流转化为高精度知识注册表。企业级情报合成的终极平台。",
      buttonStart: "开始捕获",
      buttonStop: "完成精炼",
      processing: "处理中...",
      aiThought: "正在从声学频率模式中合成结构化节点...",
      streaming: "捕获中",
      stats: {
        density: "密度指数",
        longevity: "永久性",
        latency: "实时性"
      }
    },
    assets: {
      ledger: "资产账本",
      title: "知识金库",
      description: "通过 Audlis Axis 协议索引的结构化情报资产。",
      searchPlaceholder: "检索知识库...",
      valueLabel: "权重",
      decisionNodes: "精炼节点",
      empty: "金库为空",
      emptySub: "暂无捕获数据。",
      types: {
        strategy: "战略规划",
        training: "知识培训",
        operations: "战术运营",
        client: "外部关系"
      }
    },
    intel: {
      dashboard: "分析引擎",
      title: "智力产出分析",
      description: "合成知识的结构密度与增长指标。",
      catChart: "领域映射",
      densityChart: "产出分布",
      stats: {
        valueIndex: "产出率",
        trainingNodes: "节点数",
        total: "总资产",
        delta: "增量"
      },
      categories: {
        strategy: "战略",
        training: "培训",
        operations: "运营",
        client: "客户"
      }
    },
    settings: {
      title: "系统基础设施",
      modelLabel: "认知引擎核心",
      syncLabel: "云端拓扑架构",
      syncSub: "跨终端的分布式同步",
      signOut: "断开节点连接",
      langLabel: "界面语言"
    }
  }
};
