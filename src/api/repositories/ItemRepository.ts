import { EntityRepository, Repository } from "typeorm";
import { Item } from "../../entity/Item";
import { ItemResponse } from "../controllers/requests/item";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item>{
  public sellItem(item: string, quantity: number) {
    return this.manager.query(`UPDATE item SET quantity = quantity - $3  WHERE id = 
      (SELECT id FROM item WHERE name = $1 AND valid_till > $2 AND (quantity - $3 >= 0) ORDER BY valid_till ASC LIMIT 1)`,
      [item, Date.now(), quantity])
  }
  public findValidItem(name: string): Promise<any[]> {
    return this.manager.query(`SELECT (SELECT SUM(quantity) FROM item WHERE name = $1 AND valid_till > $2) as quantity, 
      (SELECT valid_till FROM item WHERE name = $1 AND valid_till > $2 ORDER BY valid_till ASC LIMIT 1) as validTill`, [name, Date.now()])

  }

  public findEarliestItem(name: string): Promise<any> {
    console.log(Date.now());
    
    return this.manager.query(`SELECT valid_till FROM item WHERE name = $1 AND valid_till > $2 ORDER BY valid_till ASC`, [name, Date.now()])

  }
}
