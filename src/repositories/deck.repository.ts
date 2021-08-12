import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Card, Deck, DeckRelations} from '../models';

export class DeckRepository extends DefaultCrudRepository<
  Deck,
  typeof Deck.prototype.id,
  DeckRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Deck, dataSource);
  }

  public createDeck(shuffle: boolean): Promise<Deck> {
    const deck = new Deck();
    deck.buildDeck(shuffle);
    return this.create(deck);
  }

  public async drawCards(id: string, count: number): Promise<Card[]> {
    const deck = await this.findById(id);
    const cards = deck.draw(count);
    // update db
    await this.update(deck);
    return cards;
  }

}
