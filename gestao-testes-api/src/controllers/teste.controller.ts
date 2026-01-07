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
import {Teste} from '../models';
import {TesteRepository} from '../repositories';

export class TesteController {
  constructor(
    @repository(TesteRepository)
    public testeRepository: TesteRepository,
  ) {}

  @get('/testes/count')
  async count(@param.where(Teste) where?: Where<Teste>): Promise<Count> {
    return this.testeRepository.count(where);
  }

  @post('/testes', {
    summary: 'Criar teste',
    description: 'Cria um novo teste associado a uma disciplina.',
    responses: {
      '201': {
        description: 'Teste criado com sucesso',
        content: {'application/json': {schema: getModelSchemaRef(Teste)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teste, {
            title: 'NewTeste',
            exclude: ['id'],
          }),
        },
      },
    })
    teste: Omit<Teste, 'id'>,
  ): Promise<Teste> {
    return this.testeRepository.create(teste);
  }

  @get('/testes', {
    summary: 'Listar testes',
    description: 'Lista todos os testes existentes.',
    responses: {
      '200': {
        description: 'Lista de testes',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Teste),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Teste) filter?: Filter<Teste>): Promise<Teste[]> {
    return this.testeRepository.find();
  }

  @get('/testes/{id}', {
    summary: 'Obter teste por ID',
    description: 'Obtém os dados de um teste específico.',
    responses: {
      '200': {
        description: 'Teste encontrado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Teste),
          },
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Teste> {
    return this.testeRepository.findById(id);
  }

  @patch('/testes/{id}', {
    summary: 'Atualizar teste',
    description: 'Atualiza parcialmente os dados de um teste.',
    responses: {
      '204': {
        description: 'Teste atualizado com sucesso',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teste, {partial: true}),
        },
      },
    })
    teste: Teste,
  ): Promise<void> {
    await this.testeRepository.updateById(id, teste);
  }

  @del('/testes/{id}', {
    summary: 'Apagar teste',
    description: 'Remove um teste do sistema.',
    responses: {
      '204': {
        description: 'Teste removido com sucesso',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testeRepository.deleteById(id);
  }
}
