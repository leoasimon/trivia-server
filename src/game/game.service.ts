import { Injectable } from '@nestjs/common';
import { Game } from './types';

interface Games {
  [key: string]: Game;
}

@Injectable()
export class GameService {
  games: Games = {};
  queue: string[] = [];

  createGame(player: string) {
    const game: Game = {
      id: player,
      players: [player],
      status: 'waiting',
      step: 0,
    };

    this.games[player] = game;
    this.queue.push(player);
    return game;
  }

  findGame() {
    if (this.queue.length === 0) {
      return null;
    }

    const [first, ...rest] = this.queue;
    const game = this.games[first];

    this.queue = rest;
    return game;
  }

  joinGame(gameId: string, player: string) {
    const game = this.games[gameId];

    if (!game) {
      return null;
    }

    this.games[gameId] = {
      ...game,
      players: [...game.players, player],
      status: 'ongoing',
    };

    return this.games[gameId];
  }
}
