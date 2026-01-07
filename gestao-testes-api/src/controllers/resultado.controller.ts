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
import {Resultado} from '../models';
import {ResultadoRepository} from '../repositories';

export class ResultadoController {
  constructor(
    @repository(ResultadoRepository)
    public resultadoRepository: ResultadoRepository,
  ) {}

  @get('/resultados/count')
  async count(
    @param.where(Resultado) where?: Where<Resultado>,
  ): Promise<Count> {
    return this.resultadoRepository.count(where);
  }

  @post('/resultados', {
    summary: 'Criar resultado',
    description: 'Regista o resultado (nota) de um aluno num teste.',
    responses: {
      '201': {
        description: 'Resultado criado com sucesso',
        content: {'application/json': {schema: getModelSchemaRef(Resultado)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultado, {
            title: 'NewResultado',
            exclude: ['id'],
          }),
        },
      },
    })
    resultado: Omit<Resultado, 'id'>,
  ): Promise<Resultado> {
    return this.resultadoRepository.create(resultado);
  }

  @get('/resultados', {
    summary: 'Listar resultados',
    description: 'Lista todos os resultados existentes.',
    responses: {
      '200': {
        description: 'Lista de resultados',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Resultado),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Resultado) filter?: Filter<Resultado>,
  ): Promise<Resultado[]> {
    return this.resultadoRepository.find();
  }

  @get('/resultados/{id}', {
    summary: 'Obter resultado por ID',
    description: 'Obtém os dados de um resultado específico.',
    responses: {
      '200': {
        description: 'Resultado encontrado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Resultado),
          },
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Resultado> {
    return this.resultadoRepository.findById(id);
  }

  @patch('/resultados/{id}', {
    summary: 'Atualizar resultado',
    description: 'Atualiza parcialmente os dados de um resultado.',
    responses: {
      '204': {
        description: 'Resultado atualizado com sucesso',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultado, {partial: true}),
        },
      },
    })
    resultado: Resultado,
  ): Promise<void> {
    await this.resultadoRepository.updateById(id, resultado);
  }

  @del('/resultados/{id}', {
    summary: 'Apagar resultado',
    description: 'Remove um resultado do sistema.',
    responses: {
      '204': {
        description: 'Resultado removido com sucesso',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultadoRepository.deleteById(id);
  }
}
