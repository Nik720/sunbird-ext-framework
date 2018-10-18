/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest } from '../../models/Manifest';
import * as ExpressCassandra from 'express-cassandra';
import { Util } from '../../util';
import { ICassandraConfig } from "../../interfaces";
import { SchemaService } from './schemaService';
import { Inject } from 'typescript-ioc';
import * as _ from 'lodash';
export class CassandraDB {

  private _config: ICassandraConfig;

  @Inject
  private schemaService: SchemaService

  public initialize(config: ICassandraConfig) {
    this._config = config;
  }

  public async getConnectionByKeyspace(keyspace?: string, defaultSettings?: ICassandraConfig["defaultKeyspaceSettings"]) {
    const connection = this.getConnection(keyspace, defaultSettings);
    await connection.initAsync()
    const schema: any = this.schemaService.getSchemaBykeyspace(keyspace);
    if (schema) {
      schema.column_families.forEach(table => connection.loadSchema(table.table_name, table));
    }
    return connection;
  }

  public getConnectionByPlugin(pluginId: string) {
    let connection: any;
    const schema: any = this.schemaService.getSchemaByPlugin(pluginId);
    if (schema) {
      connection = this.getConnection(schema.keyspace_name, schema.config);
      schema.column_families.forEach(table => connection.loadSchema(table.table_name, table));
    }
    return connection;
  }

  public getConnection(keyspace: string, defaultSettings?: ICassandraConfig["defaultKeyspaceSettings"]): any {
    const config: any  = {
      clientOptions: {
        contactPoints: this._config.contactPoints,
        protocolOptions: { port: this._config.port || 9042 },
        keyspace: keyspace || this._config.keyspace
      }, ormOptions: {
        defaultReplicationStrategy: defaultSettings && defaultSettings.replication || 
        _.get(this._config, 'defaultKeyspaceSettings.replication') && this._config.defaultKeyspaceSettings.replication ||  {
          class: 'SimpleStrategy',
          replication_factor: 1
        }
      }
    }
    if(this._config.queryOptions) config.clientOptions.queryOptions = this._config.queryOptions;
    if(_.get(defaultSettings, 'udts')) config.ormOptions.udts = defaultSettings.udts;
    return ExpressCassandra.createClient(config);
  }

}
