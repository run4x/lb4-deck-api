import {expect} from '@loopback/testlab';
import {Deck} from '../../models';
import {DeckRepository} from '../../repositories';
import {testdb} from '../fixtures/testdb.datasource';
import {givenEmptyDatabase} from '../helpers/database.helpers';

describe('Deck Repository', () => {
  let repo: DeckRepository;
  let deck1: Deck;
  let deck2: Deck;

  before(async () => {
    await givenEmptyDatabase();
    repo = new DeckRepository(testdb);
    deck1 = await repo.createDeck(false);
    deck2 = await repo.createDeck(true);
  });

  it('check deck without shuffle', async () => {
    const result = await repo.findById(deck1.id);
    expect(result.remaining).to.equal(deck1.remaining);
    expect(result.shuffled).to.equal(false);
  });

  it('check deck with shuffle', async () => {
    const result = await repo.findById(deck2.id);
    expect(result.remaining).to.equal(deck2.remaining);
    expect(result.shuffled).to.equal(true);
  });

  it('draw 2 cards from deck one', async () => {
    const result = await repo.drawCards(deck1.id, 2);
    expect(result.length).to.equal(2);
    const deck = await repo.findById(deck1.id);
    expect(deck.remaining).to.equal(50);
  });

  it('draw too many cards from deck two', async () => {
    const result = await repo.drawCards(deck2.id, 55);
    expect(result.length).to.equal(0);
    const deck = await repo.findById(deck2.id);
    expect(deck.remaining).to.equal(52);
  });
});
