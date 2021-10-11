import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import schedule = require('node-schedule');
import { ItemService } from "../api/services/ItemService";
import { Container } from 'typedi';
import { Logger } from '../lib/logger/Logger';
const log = new Logger(__filename);

const schedulerLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    const itemService : ItemService = Container.get(ItemService)
    //scheduler to delete expired items
    schedule.scheduleJob('00 00 00 * * *', function(){
        itemService.purgeExpiredItems();
        log.info("Purged Database")
    });

}

export default schedulerLoader
