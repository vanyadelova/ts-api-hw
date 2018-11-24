import { JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity'


const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length


@JsonController()
export default class GameController {

    

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,
      @Body() update: Partial<Game>
    ) {
      const game = await Game.findOne(id)
      if (!game) throw new NotFoundError('Cannot find game')
      if (update.color) {
        if (!colors.includes(update.color)) throw new BadRequestError('Please choose among these colors: red, blue, green, yellow or magenta')
      }
      if (update.board) {
        if (moves(game.board, update.board) > 1) throw new BadRequestError('only one move per turn is allowed')
      }
      return Game.merge(game, update).save()
    }

    @Post('/games')
    @HttpCode(201)
    createGame(@Body() game: Game) {
      game.color = colors[Math.floor(Math.random() * colors.length)]
      return game.save()
    }
}   