
export type Tab = 'chat' | 'images' | 'games';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
