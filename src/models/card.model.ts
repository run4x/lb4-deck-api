import {Model, model, property} from '@loopback/repository';

export const suits = ['hearts', 'spades', 'diamonds', 'clubs'] as const;
export type Suit = typeof suits[number];
export const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'] as const;
export type Rank = typeof ranks[number];

@model()
export class Card extends Model {
  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  suit: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  constructor(data?: Partial<Card>) {
    super(data);
    Object.assign(this, data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;
