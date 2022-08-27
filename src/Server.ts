import * as express from "express";
import { configuration } from "./config";
import router from './routes';
import errorHandler from "./libs/middleware/errorHandler";
import notFoundRoute from "./libs/middleware/notFoundRoute";
import Database from "./libs/Database";
import { getSwaggerUI } from './libs/swagger';

export default class Server {
    private app: express.Express;

    constructor() {
        this.app = express();
    }

    bootstrap() {
        this.initJsonParser();
        this.initSwagger();
        this.setupRoutes();
        return this.app;
    }

    public setupRoutes() {
        this.app.use('/health-check', (req, res) => {
            res.send('i am ok');
        });
        this.app.use('/api', router);
        this.app.use(notFoundRoute);
        this.app.use(errorHandler);
    }

    private initJsonParser() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initSwagger() {
        const { serve, setup } = getSwaggerUI();
        this.app.use('/api-docs', serve, setup);
    }

    public run() {
        const { port, env, mongoUrl } = configuration;
        Database.open(mongoUrl).then(() => {
            this.app.listen(port, () => {
                console.log(`APP IS RUNNING ON PORT ${port} IN ${env} MODE`);
            });
        })
            .catch((err) => {
                console.log('Error recieved in server', err);
            })
    }
}