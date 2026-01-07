import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Inscricao, InscricaoRelations} from '../models';

export class InscricaoRepository extends DefaultCrudRepository<
  Inscricao,
  typeof Inscricao.prototype.id,
  InscricaoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Inscricao, dataSource);
  }
}
