import {Entity, model, property, hasMany} from '@loopback/repository';
import {Disciplina} from './disciplina.model';

@model()
export class Professor extends Entity {
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
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
  })
  criado_em?: string;

  @hasMany(() => Disciplina, {keyTo: 'professor_id'})
  disciplinas: Disciplina[];

  constructor(data?: Partial<Professor>) {
    super(data);
  }
}

export interface ProfessorRelations {
  // describe navigational properties here
}

export type ProfessorWithRelations = Professor & ProfessorRelations;
