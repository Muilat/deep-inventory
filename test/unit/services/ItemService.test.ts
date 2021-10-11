import { Item } from '../../../src/entity/Item';
import { ItemService } from '../../../src/api/services/ItemService';
import { LogMock } from '../lib/LogMock';
import { RepositoryMock } from '../lib/RepositoryMock';

describe('ItemService', () => {

    test('findItem should return an unexpired item', async () => {
        const log = new LogMock();
        const repo = new RepositoryMock();
        const item = new Item("foo", 20, (Date.now() + 100000)+"");
        repo.one = [item];
        const itemService = new ItemService(repo as any);
        const returnItem = await itemService.findItem("foo");
        expect(returnItem.quantity).toBe(item.quantity);
    });

    test('Create should add new Item', async () => {
        const log = new LogMock();
        const repo = new RepositoryMock();
        const item = new Item("foo", 20, (Date.now() + 100000)+"");
        const itemService = new ItemService(repo as any);
        const newItem = await itemService.create(item);
        expect(newItem).toStrictEqual({});
    });

    test('Sell should return {}', async () => {
      const log = new LogMock();
      const repo = new RepositoryMock();
      const item = new Item("foo", 20, (Date.now() + 100000)+"");
      const itemService = new ItemService(repo as any);
      const newItem = await itemService.sellItem(item.name, 10);
      expect(newItem).toStrictEqual({});
  });

});
