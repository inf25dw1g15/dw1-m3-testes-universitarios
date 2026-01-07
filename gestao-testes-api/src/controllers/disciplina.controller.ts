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
import {Disciplina} from '../models';
import {DisciplinaRepository, TesteRepository} from '../repositories';

export class DisciplinaController {
  constructor(
    @repository(DisciplinaRepository)
    public disciplinaRepository: DisciplinaRepository,
    @repository(TesteRepository)
    public testeRepository: TesteRepository,
  ) {}

  @get('/disciplinas/count')
  async count(
    @param.where(Disciplina) where?: Where<Disciplina>,
  ): Promise<Count> {
    return this.disciplinaRepository.count(where);
  }

  @post('/disciplinas', {
    summary: 'Criar nova disciplina',
    description:
      'Endpoint para criar uma nova disciplina associada a um professor.',
    responses: {
      '201': {
        description: 'Disciplina criada com sucesso',
        content: {'application/json': {schema: getModelSchemaRef(Disciplina)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disciplina, {
            title: 'NewDisciplina',
            exclude: ['id'],
          }),
        },
      },
    })
    disciplina: Omit<Disciplina, 'id'>,
  ): Promise<Disciplina> {
    return this.disciplinaRepository.create(disciplina);
  }

  @get('/disciplinas', {
    summary: 'Listar disciplinas',
    description: 'Obtém a lista de todas as disciplinas registadas.',
    responses: {
      '200': {
        description: 'Lista de disciplinas',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Disciplina),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Disciplina) filter?: Filter<Disciplina>,
  ): Promise<Disciplina[]> {
    return this.disciplinaRepository.find();
  }

  @get('/disciplinas/{id}', {
    summary: 'Obter disciplina por ID',
    description: 'Obtém os dados de uma disciplina específica.',
    responses: {
      '200': {
        description: 'Disciplina encontrada',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Disciplina),
          },
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Disciplina> {
    return this.disciplinaRepository.findById(id);
  }

  @patch('/disciplinas/{id}', {
    summary: 'Atualizar disciplina',
    description: 'Atualiza parcialmente os dados de uma disciplina.',
    responses: {
      '204': {
        description: 'Disciplina atualizada com sucesso',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disciplina, {partial: true}),
        },
      },
    })
    disciplina: Disciplina,
  ): Promise<void> {
    await this.disciplinaRepository.updateById(id, disciplina);
  }

  @del('/disciplinas/{id}', {
    summary: 'Apagar disciplina',
    description: 'Remove uma disciplina do sistema.',
    responses: {
      '204': {
        description: 'Disciplina removida com sucesso',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.disciplinaRepository.deleteById(id);
  }

  @get('/disciplinas/{id}/testes', {
    summary: 'Listar testes de uma disciplina',
    description: 'Obtém todos os testes associados a uma disciplina.',
    responses: {
      '200': {
        description: 'Lista de testes da disciplina',
      },
    },
  })
  async listarTestes(@param.path.number('id') id: number) {
    return this.testeRepository.find({
      where: {disciplina_id: id},
    });
  }
}
