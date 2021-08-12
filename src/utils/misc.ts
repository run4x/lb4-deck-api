import {Card} from '../models/card.model';

export const shuffleCards = (array: Card[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const rnd = Math.floor(Math.random() * array.length);
    const card = array[i];
    array[i] = array[rnd];
    array[rnd] = card;
  }
}
