import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Card, Deck} from '../models';
import {DeckRepository} from '../repositories';

export class DeckController {
  constructor(
    @repository(DeckRepository)
    public deckRepository: DeckRepository,
  ) { }

  /*
   * Create new deck
   */
  @post('/decks')
  @response(200, {
    description: 'Deck model instance',
    content: {'application/json': {schema: getModelSchemaRef(Deck)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {
            title: 'NewDeck',
            exclude: ['id', 'remaining'],
          }),
        },
      },
    })
    deck: Omit<Deck, 'deck_id'>,
  ): Promise<Deck> {
    return this.deckRepository.createDeck(deck.shuffled);
  }

  /*
   * Open existing deck
   */
  @get('/decks/open/{id}')
  @response(200, {
    description: 'Deck model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deck, {includeRelations: true}),
      },
    },
  })
  async openById(
    @param.path.string('id') id: string,
    @param.filter(Deck, {exclude: 'where'}) filter?: FilterExcludingWhere<Deck>
  ): Promise<Deck> {
    return this.deckRepository.findById(id, filter);
  }

  /*
   * Draw cards from deck
   */
  @get('/decks/draw/{id}/{count}')
  @response(200, {
    description: 'Card model array',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Card, {includeRelations: true}),
      },
    },
  })
  async drawCards(
    @param.path.string('id') id: string,
    @param.path.string('count') count: number,
  ): Promise<Card[]> {
    return this.deckRepository.drawCards(id, count);
  }



  @get('/decks/count')
  @response(200, {
    description: 'Deck model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Deck) where?: Where<Deck>,
  ): Promise<Count> {
    return this.deckRepository.count(where);
  }

  @get('/decks')
  @response(200, {
    description: 'Array of Deck model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Deck, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Deck) filter?: Filter<Deck>,
  ): Promise<Deck[]> {
    return this.deckRepository.find(filter);
  }

  @patch('/decks')
  @response(200, {
    description: 'Deck PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {partial: true}),
        },
      },
    })
    deck: Deck,
    @param.where(Deck) where?: Where<Deck>,
  ): Promise<Count> {
    return this.deckRepository.updateAll(deck, where);
  }

  @get('/decks/{id}')
  @response(200, {
    description: 'Deck model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deck, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Deck, {exclude: 'where'}) filter?: FilterExcludingWhere<Deck>
  ): Promise<Deck> {
    return this.deckRepository.findById(id, filter);
  }

  @patch('/decks/{id}')
  @response(204, {
    description: 'Deck PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {partial: true}),
        },
      },
    })
    deck: Deck,
  ): Promise<void> {
    await this.deckRepository.updateById(id, deck);
  }

  @put('/decks/{id}')
  @response(204, {
    description: 'Deck PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() deck: Deck,
  ): Promise<void> {
    await this.deckRepository.replaceById(id, deck);
  }

  @del('/decks/{id}')
  @response(204, {
    description: 'Deck DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deckRepository.deleteById(id);
  }
}
