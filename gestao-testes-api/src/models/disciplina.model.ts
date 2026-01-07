import {Entity, model, property, hasMany} from '@loopback/repository';
import {Teste} from './teste.model';
import {Inscricao} from './inscricao.model';

@model()
export class Disciplina extends Entity {
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
    type: 'number',
    required: true,
  })
  numero_horas: number;

  @property({
    type: 'date',
  })
  criado_em?: string;

  @property({
    type: 'number',
    required: true,
   
  })
  professor_id: number;

  @hasMany(() => Teste, {keyTo: 'disciplina_id'})
  testes: Teste[];

  @hasMany(() => Inscricao, {keyTo: 'disciplina_id'})
  inscricoes: Inscricao[];

  constructor(data?: Partial<Disciplina>) {
    super(data);
  }
}

export interface DisciplinaRelations {
  // describe navigational properties here
}

export type DisciplinaWithRelations = Disciplina & DisciplinaRelations;
