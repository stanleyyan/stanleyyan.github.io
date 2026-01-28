
export type Language = 'en' | 'zh';

export interface KnowledgeEntry {
  id: string;
  timestamp: number;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  type: 'strategy' | 'training' | 'operations' | 'client';
  valueScore: number; 
  actionItems: string[];
  language: Language; // Track which language this entry was generated in
}

export interface ProcessingState {
  isRecording: boolean;
  isProcessing: boolean;
  error: string | null;
}

export enum NavigationTab {
  Ingest = 'ingest',
  Assets = 'assets',
  Intelligence = 'intelligence',
  Settings = 'settings'
}
