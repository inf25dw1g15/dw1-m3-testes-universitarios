import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inscricao} from './inscricao.model';
import {Resultado} from './resultado.model';

@model()
export class Aluno extends Entity {
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

  @hasMany(() => Inscricao, {keyTo: 'aluno_id'})
  inscricaos: Inscricao[];

  @hasMany(() => Resultado, {keyTo: 'aluno_id'})
  resultados: Resultado[];

  constructor(data?: Partial<Aluno>) {
    super(data);
  }
}

export interface AlunoRelations {
  // describe navigational properties here
}

export type AlunoWithRelations = Aluno & AlunoRelations;
