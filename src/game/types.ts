export interface Game {
  id: string;
  players: string[];
  step: number;
  status: 'waiting' | 'ongoing';
}
