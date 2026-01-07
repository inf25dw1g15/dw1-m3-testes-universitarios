import {Entity, model, property, hasMany} from '@loopback/repository';
import {Resultado} from './resultado.model';

@model()
export class Teste extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  tema: string;

  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'date',
  })
  criado_em?: string;

  @property({
    type: 'number',
    required: true,
  })
  disciplina_id: number;

  @hasMany(() => Resultado, {keyTo: 'teste_id'})
  resultados: Resultado[];

  constructor(data?: Partial<Teste>) {
    super(data);
  }
}

export interface TesteRelations {
  // describe navigational properties here
}

export type TesteWithRelations = Teste & TesteRelations;
