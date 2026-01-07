import {
  Count,
  Filter,
  repository,
  Where,
  type FilterExcludingWhere,
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
import {Professor} from '../models';
import {DisciplinaRepository, ProfessorRepository} from '../repositories';

export class ProfessorController {
  constructor(
    @repository(ProfessorRepository)
    public professorRepository: ProfessorRepository,

    @repository(DisciplinaRepository)
    public disciplinaRepository: DisciplinaRepository,
  ) {}

  @get('/professors/count')
  async count(
    @param.where(Professor) where?: Where<Professor>,
  ): Promise<Count> {
    return this.professorRepository.count(where);
  }

  @post('/professors', {
    summary: 'Criar professor',
    description: 'Cria um novo professor no sistema.',
    responses: {
      '201': {
        description: 'Professor criado com sucesso',
        content: {'application/json': {schema: getModelSchemaRef(Professor)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {
            title: 'NewProfessor',
            exclude: ['id'],
          }),
        },
      },
    })
    professor: Omit<Professor, 'id'>,
  ): Promise<Professor> {
    return this.professorRepository.create(professor);
  }

  @get('/professors', {
    summary: 'Listar professores',
    description: 'Lista todos os professores existentes.',
    responses: {
      '200': {
        description: 'Lista de professores',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Professor),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Professor) filter?: Filter<Professor>,
  ): Promise<Professor[]> {
    return this.professorRepository.find(filter);
  }

  @get('/professors/{id}', {
    summary: 'Obter professor por ID',
    description: 'Obtém os dados de um professor específico.',
    responses: {
      '200': {
        description: 'Professor encontrado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Professor),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Professor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Professor>,
  ): Promise<Professor> {
    return this.professorRepository.findById(id, filter);
  }

  @patch('/professors/{id}', {
    summary: 'Atualizar professor',
    description: 'Atualiza parcialmente os dados de um professor.',
    responses: {
      '204': {
        description: 'Professor atualizado com sucesso',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {partial: true}),
        },
      },
    })
    professor: Professor,
  ): Promise<void> {
    await this.professorRepository.updateById(id, professor);
  }

  @del('/professors/{id}', {
    summary: 'Apagar professor',
    description: 'Remove um professor do sistema.',
    responses: {
      '204': {
        description: 'Professor removido com sucesso',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.professorRepository.deleteById(id);
  }

  @get('/professores/{id}/disciplinas', {
    summary: 'Listar disciplinas do professor',
    description: 'Lista todas as disciplinas lecionadas por um professor.',
    responses: {
      '200': {
        description: 'Lista de disciplinas do professor',
      },
    },
  })
  async listarDisciplinas(@param.path.number('id') id: number) {
    return this.disciplinaRepository.find({
      where: {professor_id: id},
    });
  }
}
