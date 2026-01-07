import {Entity, model, property} from '@loopback/repository';

@model()
export class Inscricao extends Entity {
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
  aluno_id: number;

  @property({
    type: 'number',
    required: true,
  })
  disciplina_id: number;

  @property({
    type: 'date',
  })
  data_inscricao?: Date;


  constructor(data?: Partial<Inscricao>) {
    super(data);
  }
}

export interface InscricaoRelations {
  // describe navigational properties here
}

export type InscricaoWithRelations = Inscricao & InscricaoRelations;
