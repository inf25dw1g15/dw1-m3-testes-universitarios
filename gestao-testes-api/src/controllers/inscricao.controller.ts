import {Count, Filter, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Inscricao} from '../models';
import {InscricaoRepository} from '../repositories';

export class InscricaoController {
  constructor(
    @repository(InscricaoRepository)
    public inscricaoRepository: InscricaoRepository,
  ) {}

  @get('/inscricaos/count')
  async count(
    @param.where(Inscricao) where?: Where<Inscricao>,
  ): Promise<Count> {
    return this.inscricaoRepository.count(where);
  }

  @post('/inscricaos', {
    summary: 'Criar inscrição',
    description: 'Cria a inscrição de um aluno numa disciplina.',
    responses: {
      '201': {
        description: 'Inscrição criada com sucesso',
        content: {'application/json': {schema: getModelSchemaRef(Inscricao)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inscricao, {
            title: 'NewInscricao',
            exclude: ['id'],
          }),
        },
      },
    })
    inscricao: Omit<Inscricao, 'id'>,
  ): Promise<Inscricao> {
    return this.inscricaoRepository.create(inscricao);
  }

  @get('/inscricaos', {
    summary: 'Listar inscrições',
    description: 'Lista todas as inscrições existentes.',
    responses: {
      '200': {
        description: 'Lista de inscrições',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Inscricao),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Inscricao) filter?: Filter<Inscricao>,
  ): Promise<Inscricao[]> {
    return this.inscricaoRepository.find();
  }

  @get('/inscricaos/{id}', {
    summary: 'Obter inscrição por ID',
    description: 'Obtém os dados de uma inscrição específica.',
    responses: {
      '200': {
        description: 'Inscrição encontrada',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inscricao),
          },
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Inscricao> {
    return this.inscricaoRepository.findById(id);
  }

  @patch('/inscricaos/{id}', {
    summary: 'Atualizar inscrição',
    description: 'Atualiza parcialmente os dados de uma inscrição.',
    responses: {
      '204': {
        description: 'Inscrição atualizada com sucesso',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inscricao, {partial: true}),
        },
      },
    })
    inscricao: Inscricao,
  ): Promise<void> {
    await this.inscricaoRepository.updateById(id, inscricao);
  }

  @del('/inscricaos/{id}', {
    summary: 'Apagar inscrição',
    description: 'Remove uma inscrição do sistema.',
    responses: {
      '204': {
        description: 'Inscrição removida com sucesso',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.inscricaoRepository.deleteById(id);
  }
}
