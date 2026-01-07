import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Aluno, AlunoRelations, Inscricao, Resultado} from '../models';
import {InscricaoRepository} from './inscricao.repository';
import {ResultadoRepository} from './resultado.repository';

export class AlunoRepository extends DefaultCrudRepository<
  Aluno,
  typeof Aluno.prototype.id,
  AlunoRelations
> {

  public readonly inscricaos: HasManyRepositoryFactory<Inscricao, typeof Aluno.prototype.id>;

  public readonly resultados: HasManyRepositoryFactory<Resultado, typeof Aluno.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('InscricaoRepository') protected inscricaoRepositoryGetter: Getter<InscricaoRepository>, @repository.getter('ResultadoRepository') protected resultadoRepositoryGetter: Getter<ResultadoRepository>,
  ) {
    super(Aluno, dataSource);
    this.resultados = this.createHasManyRepositoryFactoryFor('resultados', resultadoRepositoryGetter,);
    this.registerInclusionResolver('resultados', this.resultados.inclusionResolver);
    this.inscricaos = this.createHasManyRepositoryFactoryFor('inscricaos', inscricaoRepositoryGetter,);
    this.registerInclusionResolver('inscricaos', this.inscricaos.inclusionResolver);
  }
}
