import { Body, Get, JsonController, OnUndefined, Param, Post} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Container, Service } from 'typedi';

import { ItemNotFoundError } from './errors/ItemNotFoundError';
import { Item } from '../../entity/Item';
import { ItemService } from '../services/ItemService';
import {ItemRequest, ItemResponse, SellRequest, } from './requests/item';


@JsonController()
@Service()
@OpenAPI({})
export class ItemController {
  constructor(
      // private itemService: ItemService
    ){}
  itemService = Container.get(ItemService)

   @Get('/:item/get')
   @OnUndefined(ItemNotFoundError)
  async getOne(@Param('item') item: string) : Promise<ItemResponse>{
      return this.itemService.findItem(item);
  }

  @Post('/:item/add')
  add(@Body() itemReq: ItemRequest, @Param('item') item: string) {
    let newItem: Item = new Item(item, itemReq.quantity, itemReq.expiry.toString());
    return this.itemService.create(newItem);
  }

  @Post('/:item/sell')
  sell(@Body() sellReq: SellRequest, @Param('item') item: string) {
    return this.itemService.sellItem(item, sellReq.quantity);
  }
}
