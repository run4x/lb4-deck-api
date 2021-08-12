import {Client, expect} from '@loopback/testlab';
import {DeckApiApplication} from '../..';
import {DeckRepository} from '../../repositories';
import {setupApplication} from './test-helper';

describe('DeckController', () => {
  let app: DeckApiApplication;
  let client: Client;
  let repo: DeckRepository;
  let id: string;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  before(async () => {
    repo = await app.get('repositories.DeckRepository');
    await clearDatabase();
  });

  after(async () => {
    await clearDatabase();
    await app.stop();
  });

  it('invoke GET /decks/count', async () => {
    await client.get('/decks/count')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('create a new deck', async () => {
    const res = await client
      .post('/decks')
      .send({"shuffled": false})
      .expect(200);
    expect(res.body.shuffled).to.equal(false);
    id = res.body.deck_id;
  });

  it('draw 3 cards from deck', async () => {
    const res = await client
      .get(`/decks/draw/${id}/3`)
      .expect(200);
    expect(Array.isArray(res.body)).to.equal(true);
  });

  it('open created deck', async () => {
    const res = await client
      .get(`/decks/open/${id}`)
      .expect(200);
    expect(res.body.remaining).to.equal(49);
  });

  it('draw 1 card from unknown deck', async () => {
    await client
      .get('/decks/draw/this-is-not-uuid/1')
      .expect(404);
  });

  it('open unknown deck', async () => {
    await client
      .get('/decks/open/this-is-not-uuid')
      .expect(404);
  });

  async function clearDatabase() {
    await repo.deleteAll();
  }
});
