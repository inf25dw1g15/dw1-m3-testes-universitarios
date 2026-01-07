import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Professor, ProfessorRelations, Disciplina} from '../models';
import {DisciplinaRepository} from './disciplina.repository';

export class ProfessorRepository extends DefaultCrudRepository<
  Professor,
  typeof Professor.prototype.id,
  ProfessorRelations
> {

  public readonly disciplinas: HasManyRepositoryFactory<Disciplina, typeof Professor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DisciplinaRepository') protected disciplinaRepositoryGetter: Getter<DisciplinaRepository>,
  ) {
    super(Professor, dataSource);
    this.disciplinas = this.createHasManyRepositoryFactoryFor('disciplinas', disciplinaRepositoryGetter,);
    this.registerInclusionResolver('disciplinas', this.disciplinas.inclusionResolver);
  }
}