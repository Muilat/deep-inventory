import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Item } from '../../src/entity/Item';
import { ItemService } from '../../src/api/services/ItemService';
import { closeDatabase, createDatabaseConnection, migrateDatabase, synchronizeDatabase } from '../utils/database';
import { configureLogger } from '../utils/logger';

describe('ItemService', () => {

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  let connection: Connection;
  beforeAll(async () => {
    configureLogger();
    connection = await createDatabaseConnection();
  });
  beforeEach(() => synchronizeDatabase(connection));

  // -------------------------------------------------------------------------
  // Tear down
  // -------------------------------------------------------------------------

  afterAll(() => closeDatabase(connection));

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('should create a new item in the database', async () => {
    const item = new Item("foo", 20, (Date.now() + 10000000) + "");

    const service = Container.get<ItemService>(ItemService);
    const resultCreate = await service.create(item);
    expect(resultCreate).toStrictEqual({});

    const resultFind = await service.findItem(item.name);

    if (resultFind) {
      expect(resultFind.quantity).toBe(item.quantity);
      expect(resultFind.validTill).toBe(Number(item.validTill));
    } else {
      fail('Could not find item');
    }
  });

  test('should deduct item quantity in the database on sell', async () => {
    let item = new Item("foo", 20, (Date.now() + 10000000) + "");
    let total = item.quantity;

    const service = Container.get<ItemService>(ItemService);
    const resultCreate = await service.create(item);
    expect(resultCreate).toStrictEqual({});

    item = new Item("foo", 10, (Date.now() + 10000000) + "");
    total += item.quantity;
    await service.create(item);

    await service.sellItem(item.name, 5);
    const resultFind = await service.findItem(item.name);

    if (resultFind) {
      expect(resultFind.quantity).toBe(total - 5);
    } else {
      fail('Could not find item');
    }
  });

  test('should return only non expired items quantity in the database on sell', async () => {
    let item = new Item("foo", 20, (Date.now()) + "");

    const service = Container.get<ItemService>(ItemService);
    const resultCreate = await service.create(item);
    expect(resultCreate).toStrictEqual({});

    item = new Item("foo", 10, (Date.now() + 10000000) + "");
    await service.create(item);

    const resultFind = await service.findItem(item.name);

    if (resultFind) {
      expect(resultFind.quantity).toBe(item.quantity);
    } else {
      fail('Could not find item');
    }
  });


});
