import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resultado, ResultadoRelations} from '../models';

export class ResultadoRepository extends DefaultCrudRepository<
  Resultado,
  typeof Resultado.prototype.id,
  ResultadoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Resultado, dataSource);
  }
}
