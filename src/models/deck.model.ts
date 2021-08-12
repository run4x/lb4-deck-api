import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {shuffleCards} from '../utils/misc';
import {Card, Rank, ranks, Suit, suits} from './card.model';

@model({settings: {strict: false}})
export class Deck extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    default: () => uuid(),
  })
  id: string;

  @property({
    type: 'boolean',
  })
  shuffled: boolean;

  @property({
    type: 'number',
  })
  remaining: number;

  @property.array(Card)
  cards: Card[]

  public get cardCollection(): Card[] {
    return this.cards;
  }

  constructor(data?: Partial<Deck>) {
    super(data);
  }

  toJSON() {
    return {
      // eslint-disable-next-line
      deck_id: this.id,
      shuffled: this.shuffled,
      remaining: this.remaining,
      cards: this.cards
    }
  }

  buildDeck(shuffle: boolean) {
    this.cards = [];
    suits.forEach((suit: Suit) => {
      ranks.forEach((rank: Rank) => {
        let code;
        if (parseInt(rank) > 0) {
          code = rank + suit.charAt(0).toUpperCase();
        } else {
          code = rank.charAt(0).toUpperCase() + suit.charAt(0).toUpperCase();
        }
        this.cards.push(new Card({value: rank, suit: suit, code: code}));
      });
    });
    if (shuffle) {
      this.shuffleDeck(1);
    }
    this.shuffled = shuffle;
    this.remaining = this.cards.length;
  }

  draw(count = 1): Card[] {
    const list = <Card[]>[];
    if (this.cards.length === 0) {
      console.log('Deck is empty!');
      return list;
    }
    if (count > this.cards.length) {
      console.log(`Deck contains only ${this.cards.length} cards!`);
      return list;
    }
    for (let index = 0; index < count; index++) {
      const x = Math.floor(Math.random() * this.cards.length);
      // remove from deck & add to result
      const item = this.cards.splice(x, 1);
      list.push(item[0]);
    }
    this.remaining = this.cards.length;
    return list;
  }

  shuffleDeck(times = 1) {
    for (let index = 0; index < times; index++) {
      shuffleCards(this.cards);
    }
  }
}

export interface DeckRelations {
  // describe navigational properties here
}

export type DeckWithRelations = Deck & DeckRelations;
