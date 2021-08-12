import {DeckRepository} from '../../repositories';
import {testdb} from '../fixtures/testdb.datasource';

export async function givenEmptyDatabase() {
  await new DeckRepository(testdb).deleteAll();
}
