import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Disciplina, DisciplinaRelations, Teste, Inscricao} from '../models';
import {TesteRepository} from './teste.repository';
import {InscricaoRepository} from './inscricao.repository';

export class DisciplinaRepository extends DefaultCrudRepository<
  Disciplina,
  typeof Disciplina.prototype.id,
  DisciplinaRelations
> {

  public readonly testes: HasManyRepositoryFactory<Teste, typeof Disciplina.prototype.id>;

  public readonly inscricoes: HasManyRepositoryFactory<Inscricao, typeof Disciplina.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TesteRepository') protected testeRepositoryGetter: Getter<TesteRepository>, @repository.getter('InscricaoRepository') protected inscricaoRepositoryGetter: Getter<InscricaoRepository>,
  ) {
    super(Disciplina, dataSource);
    this.inscricoes = this.createHasManyRepositoryFactoryFor('inscricoes', inscricaoRepositoryGetter,);
    this.registerInclusionResolver('inscricoes', this.inscricoes.inclusionResolver);
    this.testes = this.createHasManyRepositoryFactoryFor('testes', testeRepositoryGetter,);
    this.registerInclusionResolver('testes', this.testes.inclusionResolver);
  }
}
