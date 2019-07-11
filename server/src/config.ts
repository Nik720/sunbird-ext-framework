/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { FrameworkConfig } from './interfaces'

export const defaultConfig: FrameworkConfig = {
  db: {
    cassandra: {
      contactPoints: ['127.0.0.1'],
      defaultKeyspaceSettings: {
        replication: {
          'class': 'SimpleStrategy',
          'replication_factor': '1'
        }
      }
    },
    elasticsearch: {
      host: '127.0.0.1:9200',
      disabledApis: ['cat', 'cluster', 'ingest', 'nodes', 'remote', 'snapshot', 'tasks']
    },
    couchdb: {
      url: 'http://127.0.0.1:5984',
    },
    pouchdb: {
      path: "",
      adaptor: "leveldb"
    }
  },
  plugins: [],
  pluginBasePath: '',
  logLevel: 'debug',
  port: 9000, // default
  logBasePath: ''
}
