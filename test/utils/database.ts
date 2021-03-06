import { Container } from 'typedi';
import { Connection, createConnection, getConnectionOptions, useContainer } from 'typeorm';

import { env } from '../../src/env';

declare type LoggerOptions = boolean | 'all' | Array<('query' | 'schema' | 'error' | 'warn' | 'info' | 'log' | 'migration')>;

export const createDatabaseConnection = async (): Promise<Connection> => {
    useContainer(Container);

    //TODOD::
    // const connection = await createConnection({
    //     type: env.db.type as any,
    //     database: env.db.database,
    //     logging: env.db.logging as LoggerOptions,
    //     entities: env.app.dirs.entities,
    //     migrations: env.app.dirs.migrations,
    //     synchronize: true,
    // });

    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any, // See createConnection options for valid types
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,

    });



  // // const connection = await createConnection(connectionOptions);
  const connection = await createConnection(connectionOptions);

    return connection;
};

export const synchronizeDatabase = async (connection: Connection) => {
    await connection.dropDatabase();
    return connection.synchronize(true);
};

export const migrateDatabase = async (connection: Connection) => {
    await connection.dropDatabase();
    return connection.runMigrations();
};

export const closeDatabase = (connection: Connection) => {
    return connection.close();
};
