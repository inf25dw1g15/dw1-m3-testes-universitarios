import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Teste, TesteRelations, Resultado} from '../models';
import {ResultadoRepository} from './resultado.repository';

export class TesteRepository extends DefaultCrudRepository<
  Teste,
  typeof Teste.prototype.id,
  TesteRelations
> {

  public readonly resultados: HasManyRepositoryFactory<Resultado, typeof Teste.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ResultadoRepository') protected resultadoRepositoryGetter: Getter<ResultadoRepository>,
  ) {
    super(Teste, dataSource);
    this.resultados = this.createHasManyRepositoryFactoryFor('resultados', resultadoRepositoryGetter,);
    this.registerInclusionResolver('resultados', this.resultados.inclusionResolver);
  }
}
