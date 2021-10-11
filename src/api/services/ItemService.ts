import { NotFoundError, OnUndefined } from 'routing-controllers';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
// import uuid from 'uuid';

import { Item } from '../../entity/Item';
import { ItemNotFoundError } from '../controllers/errors/ItemNotFoundError';
import { ItemResponse } from '../controllers/requests/item';
import { ItemRepository } from '../repositories/ItemRepository';

@Service()
export class ItemService {

  constructor(
    @InjectRepository() private itemRepository: ItemRepository
  ) { }

  public async findItem(name: string): Promise<ItemResponse> {

    //TODO::add log
    // let item =  this.findOne(name);
    let [item] = await this.itemRepository.findValidItem(name);

    let itemRes: ItemResponse = {
      quantity: item.quantity ? Number(item.quantity) : 0,
      validTill: item.validtill ? Number(item.validtill) : null
    }

    return itemRes

  }

  public async create(item: Item) {
    //TODO::add log
    await this.itemRepository.save(item);
    return {};
  }

  public async sellItem(item: string, quantity: number) {
    //TODO::add log
    await this.itemRepository.sellItem(item, quantity);
    return {};
  }

  public purgeExpiredItems() {
    this.itemRepository
      .createQueryBuilder()
      .delete()
      .where("valid_till <= :curr", { curr: Date.now() })
      .execute();
  }

}
