import * as express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as path from 'path';
import favicon from 'serve-favicon';

export const publicLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        expressApp
        //this is to serve static files
            .use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }))

            .use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

    }
};
