import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Aluno} from '../models';
import {AlunoRepository} from '../repositories';

import {InscricaoRepository} from '../repositories';

import {ResultadoRepository} from '../repositories';

export class AlunoControllerController {
  constructor(
    @repository(AlunoRepository)
    public alunoRepository: AlunoRepository,

    @repository(InscricaoRepository)
    public inscricaoRepository: InscricaoRepository,

    @repository(ResultadoRepository)
    public resultadoRepository: ResultadoRepository,
  ) {}

  @get('/alunos/count')
  async count(@param.where(Aluno) where?: Where<Aluno>): Promise<Count> {
    return this.alunoRepository.count(where);
  }

  @post('/alunos', {
    summary: 'Criar Novo Aluno',
    description: 'Endpoint para registar um novo estudante.',
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aluno)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {
            title: 'NewAluno',
            exclude: ['id'],
          }),
        },
      },
    })
    aluno: Omit<Aluno, 'id'>,
  ): Promise<Aluno> {
    return this.alunoRepository.create(aluno);
  }

  @get('/alunos', {
    summary: 'Listar alunos',
    description: 'Obtém a lista de todos os alunos registados.',
    responses: {
      '200': {
        description: 'Lista de alunos',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Aluno, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Aluno) filter?: Filter<Aluno>): Promise<Aluno[]> {
    return this.alunoRepository.find(filter);
  }

  @get('/alunos/{id}', {
    summary: 'Obter aluno por ID',
    description:
      'Obtém os dados de um aluno específico através do seu identificador.',
    responses: {
      '200': {
        description: 'Aluno encontrado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aluno, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Aluno, {exclude: 'where'})
    filter?: FilterExcludingWhere<Aluno>,
  ): Promise<Aluno> {
    return this.alunoRepository.findById(id, filter);
  }

  @patch('/alunos/{id}', {
    summary: 'Atualizar aluno',
    description: 'Atualiza parcialmente os dados de um aluno.',
    responses: {
      '204': {
        description: 'Aluno atualizado com sucesso',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {partial: true}),
        },
      },
    })
    aluno: Aluno,
  ): Promise<void> {
    await this.alunoRepository.updateById(id, aluno);
  }

  @del('/alunos/{id}', {
    summary: 'Apagar aluno',
    description: 'Remove um aluno do sistema.',
    responses: {
      '204': {
        description: 'Aluno removido com sucesso',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alunoRepository.deleteById(id);
  }

  @get('/alunos/{id}/inscricoes', {
    summary: 'Listar inscrições de um aluno',
    description: 'Obtém todas as inscrições associadas a um aluno.',
    responses: {
      '200': {
        description: 'Lista de inscrições do aluno',
      },
    },
  })
  async listarInscricoes(@param.path.number('id') id: number) {
    return this.inscricaoRepository.find({
      where: {aluno_id: id},
    });
  }

  @get('/alunos/{id}/resultados', {
    summary: 'Listar resultados de um aluno',
    description: 'Obtém todos os resultados associados a um aluno.',
    responses: {
      '200': {
        description: 'Lista de resultados do aluno',
      },
    },
  })
  async listarResultados(@param.path.number('id') id: number) {
    return this.resultadoRepository.find({
      where: {aluno_id: id},
    });
  }
}
