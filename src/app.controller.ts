import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GameService } from './game/game.service';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly gameService: GameService,
  ) {}

  @Get()
  main(): string {
    const playerId = uuidv4();

    const found = this.gameService.findGame();
    if (found) {
      const res = this.gameService.joinGame(found.id, playerId);
      return JSON.stringify(res);
    }

    const res = this.gameService.createGame(playerId);
    return JSON.stringify(res);
  }
}
