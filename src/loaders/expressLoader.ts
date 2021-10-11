import { Application } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createExpressServer, useContainer } from 'routing-controllers';

// import { UserController } from "../api/controllers/userController";
import { env } from '../env';

// const d = createExpressServer({
//   controllers: [useContainer]
// });

const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {

  if (settings) {

      const connection = settings.getData('connection');

      /**
       * We create a new express server instance.
       * We could have also use useExpressServer here to attach controllers to an existing express instance.
       */
      const expressApp: Application = createExpressServer({
          cors: true,
          classTransformer: true,
          routePrefix: env.app.routePrefix,
          defaultErrorHandler: false,

          controllers: env.app.dirs.controllers,
          middlewares: env.app.dirs.middlewares,
          interceptors: env.app.dirs.interceptors,

      });



      // Run application to listen on given port
      if (!env.isTest) {
          const server = expressApp.listen(env.app.port);
          settings.setData('express_server', server);

      }

      // Here we can set the data for other loaders
      settings.setData('express_app', expressApp);

      settings.onShutdown(() => connection.close());
  }
};



export default expressLoader
