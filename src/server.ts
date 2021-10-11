import expressLoader from './loaders/expressLoader'
import swaggerLoader from './loaders/swaggerLoader'
import typeormLoader from './loaders/typeormLoader'
import iocLoader from './loaders/iocLoader'
import scheduleLoader from './loaders/scheduleLoader'
import winstonLoader from './loaders/winstonLoader'
import { bootstrapMicroframework } from 'microframework-w3tec';
import "reflect-metadata"
import { banner } from './lib/banner';
import { Logger } from './lib/logger';
const log = new Logger(__filename);


bootstrapMicroframework({
  loaders: [
    winstonLoader,
    expressLoader,
    iocLoader,
    swaggerLoader,
    typeormLoader,
    scheduleLoader,
  ]
}).then(()=> {
  banner(log)
})
