import {Entity, model, property} from '@loopback/repository';

@model()
export class Resultado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  nota: number;

  @property({
    type: 'number',
    required: true,
  })
  teste_id: number;

  @property({
    type: 'number',
    required: true,
  })
  aluno_id: number;


  constructor(data?: Partial<Resultado>) {
    super(data);
  }
}

export interface ResultadoRelations {
  // describe navigational properties here
}

export type ResultadoWithRelations = Resultado & ResultadoRelations;
