import { HttpError } from 'routing-controllers';

export class ItemNotFoundError extends HttpError {
    constructor() {
        super(404, 'Item not found!');
    }
}
